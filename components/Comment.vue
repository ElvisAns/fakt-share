<template>
    <div class="border-b border-lime-50/20 cursor-pointer transition duration-350 ease-in-out py-4 ">
        <div class="flex flex-shrink-0 py-4 pr-4 pb-0">
            <NuxtLink :href="profile_link" class="flex-shrink-0 group block">
                <div class="flex items-end">
                    <div>
                        <img v-if="author_data.photoURL" class="inline-block aspect-1 object-cover w-9 rounded-full"
                            @error="image_failed_to_load" :src="author_data.photoURL" alt="">
                        <div v-else
                            class="flex justify-center items-center h-10 w-10 aspect-1 bg-blue-500 text-black font-bold text-center rounded-full">
                            <span>{{ firstLetterOfName }}</span>
                        </div>
                    </div>
                    <div class="ml-3 flex flex-row flex-wrap justify-between w-full">
                        <p class="flex items-center text-base leading-6 font-medium text-gray-800">
                        <p class="truncate font-medium text-slate-50">
                            {{ author_data.displayName }}
                        </p>
                        <svg v-if="author_data.certified"
                            class="fill-current saturate-200 text-orange-500 ml-1 mt-0.5 h-3.5 w-3.5"
                            aria-label="Verified" role="img" viewBox="0 0 40 40">
                            <title>Verified</title>
                            <path
                                d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                                fill-rule="evenodd"></path>
                        </svg>
                        </p>
                        <span
                            class="ml-1 text-sm leading-5 font-medium text-gray-400 transition ease-in-out duration-150">
                            {{ author_data.username }} . {{ createdAtFormated }}
                        </span>
                    </div>
                </div>
            </NuxtLink>
        </div>
        <div class="pl-12 relative">
            <p class="text-base width-auto font-medium text-slate-50 flex-shrink">
                {{ comment }}
            </p>

            <button v-if="isByCurrentUser" @click="delete_comment"
                class="flex self items-center transition-colors hover:text-slate-400 focus:outline-none absolute right-0 -bottom-1">
                <UIcon name="i-heroicons-trash" class="text-red-500 w-5 h-5" />
            </button>
        </div>
        <LoadingSpiner v-if="pendingRequest" />
    </div>
</template>


<script setup>

const props = defineProps({
    id: String,
    comment: String,
    createdAt: Object,
    userId: String
})


const loggedInUser_name = ref('');
import { collection, query, where, doc, updateDoc, addDoc, getDoc, getDocs, getCountFromServer, deleteDoc, writeBatch, onSnapshot } from "firebase/firestore";

const { $db } = useNuxtApp();
const author_data = ref({})
const loggedInUserInfos = useState("userInfos", () => { return { photoURL: "", displayName: "", email: "" } });
const firstLetterOfName = computed(() => {
    if (author_data.value.displayName)
        return author_data.value.displayName.substring(0, 1);
    return "";
})
const image_failed_to_load = () => {
    author_data.value.photoURL = null;
}
const createdAtFormated = ref(useTimeAgo(props.createdAt.toDate().toLocaleString()));
const profile_link = ref("");
const isByCurrentUser = ref(false); //we will compare from store if comment exist in users made comments

const pendingRequest = ref(false);
const toast = useToast();
const delete_comment = async () => {
    pendingRequest.value = true;
    await deleteDoc(doc($db, "comments", props.id));
    pendingRequest.value = false;
    toast.add({ title: 'Great job.', description: 'Comment was deleted!', icon: 'i-heroicons-information-circle' })
}

onMounted(async () => {
    loggedInUser_name.value = useUsernameExtractor(loggedInUserInfos.value.email).value;
    const userQuery = query(collection($db, "usersExtraInfo"), where("userId", "==", props.userId));
    let querySnapshot = await getDocs(userQuery);
    if (querySnapshot.docs.length > 0) {
        author_data.value = querySnapshot.docs[0].data();
        profile_link.value = `/profile/${author_data.value.username}`;
        isByCurrentUser.value = author_data.value.username == loggedInUser_name.value;
    }
})

</script>