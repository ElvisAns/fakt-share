<template>
    <div class="relative bg-gradient-to-r p-5 text-center text-white">
        <div class="relative mx-auto h-24 w-24">
            <USkeleton class="size-24" v-show="!current_user.photoURL" :ui="{ rounded: 'rounded-full' }" />
            <img :src="current_user.photoURL" v-show="current_user.photoURL"
                class="rounded-full mx-auto mb-3 size-24 cursor-pointer object-cover">
            <div class="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-75 z-50"
                style="display: none;">
                <img :src="current_user.photoURL" v-show="current_user.photoURL"
                    class="rounded-lg size-48 md:size-80 sm:size-64 object-cover">
            </div>
        </div>
        <div class="items center flex items-center justify-center">
            <h2 class="text-2xl font-bold">{{ current_user.displayName }}</h2>
        </div>
        <a class="text-slate-400">
            <p class="text-sm">{{ current_user.username }}</p>
        </a>
        <div>
            <p v-html="current_user.bio " class="text-sm inline my-3 py-2 rounded-sm max-w-full min-w-16" :class="{ 'p-2': isEditing }"
                ref="bioEditable" @input="updateBio" :contenteditable="isEditing"></p>
            <UButton variant="ghost" class="inline" @click="isEditing = !isEditing" icon="i-heroicons-pencil"
                v-if="!isEditing && isCurrentUser"></UButton>
        </div>
        <UButton label="save" color="blue" @click="saveBio" icon="i-heroicons-sparkles" v-show="isEditing"></UButton>
        <div class="mt-2 text-sm">
            <p class="text-slate-400">
                <span class="cursor-help">{{ userPosts.length }} posts</span>
                <span class="mx-1">•</span>
                <span class="cursor-help">{{ current_user.likes }} likes</span>
                <span class="mx-1">•</span>
                <span class="cursor-help" title="total number of views on all posts">{{ current_user.views }}
                    Views</span>
            </p>
        </div>
        <UButton to="/signout" v-if="isCurrentUser" icon="i-heroicons-power" label="logout" class="mt-5"></UButton>
    </div>
    <div v-if="!isLoadingPosts">
        <h2 class="text-xl font-bold mb-3">Posts</h2>
        <p v-show="!userPosts.length" class="text-center text-red-400 mt-10"><UIcon name="i-heroicons-exclamation-triangle"></UIcon> has not yet made any post</p>
        <FaktCard v-for="fakt in userPosts" :key="fakt.id"  :createdAt="fakt.createdAt"  :userId="fakt.userId" :faktContent="fakt.faktContent" :illustration="fakt.illustration" :tag="fakt.tag" :post_uid="fakt.id"/>
    </div>
    <div v-else class="w-full">
        <div class="flex items-center space-x-4 mt-5">
            <USkeleton class="h-12 aspect-1" :ui="{ rounded: 'rounded-full' }" />
            <div class="space-y-2 w-full">
                <USkeleton class="h-4 w-full" />
                <USkeleton class="h-4 w-full" />
            </div>
        </div>
        <div class="flex items-center space-x-4 mt-5">
            <USkeleton class="h-12 aspect-1" :ui="{ rounded: 'rounded-full' }" />
            <div class="space-y-2 w-full">
                <USkeleton class="h-4 w-full" />
                <USkeleton class="h-4 w-full" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';

definePageMeta({
    layout: 'feed'
})

const userId = useCookie('userId');
const userInfos = useState("userInfos", () => { return { photoURL: "", displayName: "", email: "" } });
import { collection, query, where, doc, updateDoc, addDoc, getDoc, getDocs, getCountFromServer } from "firebase/firestore";

const { $db } = useNuxtApp()
const isLoadingPosts = ref(true);
const current_user = ref({})
const route = useRoute();
const isCurrentUser = ref(false)
const isEditing = ref(false)
const bio = ref('')
const bioEditable = ref(null)
const usersExtraInfoDocId = ref(null)

useSeoMeta({
  title: `Learn about ${route.params.username} | Fakt Share`,
  ogTitle: `Learn about ${route.params.username} | Fakt Share`,
  description: 'View fakt share user\'s profile to know what they are sharing',
  ogDescription: 'View fakt share user\'s profile to know what they are sharing',
  ogImage: 'https://firebasestorage.googleapis.com/v0/b/faktshare.appspot.com/o/og-image.png?alt=media&token=59cc7e77-f651-42b7-bf48-bc612c31dbdb',
  twitterCard: 'summary_large_image',
})


const updateBio = () => {
    bio.value = bioEditable.value.innerHTML;
}

const saveBio = async () => {
    isEditing.value = false;
    if (isCurrentUser.value) {
        const docRef = doc($db, "usersExtraInfo", usersExtraInfoDocId.value);
        await updateDoc(docRef, {
            bio: bio.value
        })
    }
}

function extractUsername(email) {
    const [name] = email.split('@');
    const username = `@${name}`;
    return username;
}

const userPosts = ref([]);
onMounted(async () => {
    const route = useRoute();
    const userQuery = query(collection($db, "usersExtraInfo"), where("username", "==", route.params.username));
    let querySnapshot = await getCountFromServer(userQuery);
    if (querySnapshot.data().count == 0) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User Not Found',
            fatal: true
        })
    }
    querySnapshot = await getDocs(userQuery);
    const queryData = querySnapshot.docs[0].data();
    usersExtraInfoDocId.value = querySnapshot.docs[0].id
    current_user.value = { ...queryData, views: 0, posts: 0, likes: 0 };
    bio.value = current_user.bio;
    isCurrentUser.value = extractUsername(userInfos.value.email) === route.params.username;
    const postsQuery = query(collection($db, "posts"), where("userId", "==", current_user.value.userId));
    querySnapshot = await getCountFromServer(postsQuery);
    if (querySnapshot.data().count > 0) {
        querySnapshot = await getDocs(postsQuery);
        querySnapshot.forEach(post => {
            userPosts.value.push({...post.data(),id:post.id});
        })
    }
    const likesQuery = query(collection($db, "likes"), where("user_id", "==", current_user.value.userId));
    let likesquerySnapshot = await getCountFromServer(likesQuery);
    current_user.value.likes = likesquerySnapshot.data().count;
    isLoadingPosts.value = false;
})

onMounted(()=>{
    const route = useRoute();
    let username = extractUsername(userInfos.value.email);
    isCurrentUser.value = username === route.params.username;
})
</script>

<style scoped>
p[contenteditable="true"] {
    display: inline-block;
    background-color: black;
    border: 2px #f97316 solid;
    outline: none;
    border-radius: 10px;
}
</style>