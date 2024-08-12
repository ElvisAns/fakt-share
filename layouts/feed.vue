<template>
    <div class="bg-slate-950 bg-center bg-repeat font-sans text-slate-50 antialiased">
        <div class="flex min-h-screen flex-col">
            <main class="flex-grow">
                <div class="fixed right-0">
                </div>
                <div class="flex min-h-screen flex-col justify-center overflow-hidden">
                    <div class="relative flex justify-center">
                        <div
                            class="absolute -top-48 -z-10 size-[400px] -rotate-45 rounded-full bg-gradient-to-br from-indigo-300 via-rose-200 to-blue-600 opacity-70 blur-3xl lg:size-[500px]">
                        </div>
                    </div>
                    <NavBar />
                    <main class="my-8 flex w-full flex-1 flex-col overflow-x-hidden">
                        <section class="pt-5">
                            <div
                                class="bg-slate-950 bg-center bg-repeat font-sans text-slate-50 flex flex-col gap-4 md:flex-row lg:flex-row px-4 min-h-screen">
                                <div
                                    class="w-full md:w-1/3 p-4 lg:p-8 mb-4 lg:mb-0 md:border-r-lime-50/20 md:border-r hidden md:block">
                                    <div class="pt-4 md:pt-1"> <!--Sticky not working for now-->
                                        <h2 class="text-xl font-bold">Tags & Topics 🏷️</h2>
                                        <div class="search-container relative mt-2 mb-12" :key="search_key">
                                            <VuePredictiveSearch @selected="viewUserSelection"
                                                inputPlaceholder="Quickly find any tag"
                                                inputClasses="block px-5 py-2 w-full rounded-md block" :source="tags"
                                                label="filter" :fieldsToSearchFrom="['tags']"
                                                :fieldsToReturnOnMatch="['tags', 'filter']">
                                                <template #no-element-found>
                                                    <p class="text-red-400 ">
                                                        <UIcon name="i-heroicons-exclamation-triangle"></UIcon> Did not
                                                        find match
                                                    </p>
                                                </template>
                                                <template #item="{ tags, filter }">
                                                    <div
                                                        class="item cursor-pointer line-clamp-1 py-1 hover:text-primary-400 transition-all">
                                                        <p>{{ tags }}</p>
                                                    </div>
                                                </template>
                                            </VuePredictiveSearch>
                                        </div>
                                        <div
                                            class="flex flex-col text-left justify-start mt-5 max-h-[20vh]  md:max-h-[70vh] overflow-auto gap-2">
                                            <button @click="() => filter_posts()"
                                                class="text-left underline">All</button>
                                            <button class="text-left underline" v-for="tag in tags" :key="tag.filter"
                                                @click="() => filter_posts(tag.filter)">
                                                {{ tag.tags }}</button>
                                        </div>

                                    </div>
                                </div>
                                <div v-if="showMiddlePart"
                                    class="w-full lg:w-1/2 pt-8 md:pt-8 lg:px-8 mb-4 lg:mb-0 lg:mx-4 md:mt-0 pr-0 max-h-none md:max-h-[90dvh] overflow-auto"
                                    id="middlepart">
                                    <slot></slot>
                                </div>
                                <div
                                    class="w-full md:w-1/3 p-4 lg:p-8 mb-4 lg:mb-0 md:border-l-lime-50/20 md:border-l hidden md:block">
                                    <h2 class="text-xl font-bold md:pt-1">Trending 🔥</h2>
                                    <div
                                        class="flex flex-col text-left justify-start mt-5 max-h-[22vh]  md:max-h-[70vh] overflow-auto gap-3">
                                        <NuxtLink class="text-left hover:underline flex gap-2 items-stretch"
                                            v-for="post in trending_fakts" :href="`/posts/${post.id}`">
                                            <!--img class="w-20 rounded-md object-cover" :src="post.illustration"-->
                                            <div>
                                                <p class="line-clamp-2">{{ post.faktContent }}</p>
                                                <div class="flex items-center align-center text-center w-full flex-row">
                                                    <div
                                                        class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid">
                                                    </div>
                                                </div>
                                            </div>
                                        </NuxtLink>
                                        <LoadingSpiner v-if="loading_trending"></LoadingSpiner>
                                    </div>
                                    <h2 class="text-xl font-bold mt-10">Bookmark 📝</h2>
                                    <div
                                        class="flex flex-col text-left justify-start mt-5 max-h-[22vh] md:max-h-[70vh] overflow-auto gap-3">

                                        <NuxtLink class="text-left hover:underline flex gap-2 items-stretch"
                                            v-for="post in favorite_fakts" :href="`/posts/${post.post_id}`">
                                            <!--img class="w-20 rounded-md object-cover" :src="post.illustration"-->
                                            <div>
                                                <p class="line-clamp-2">{{ post.faktContent }}</p>
                                                <div class="flex items-center align-center text-center w-full flex-row">
                                                    <div
                                                        class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid">
                                                    </div>
                                                </div>
                                            </div>
                                        </NuxtLink>
                                        <LoadingSpiner v-if="loading_fav"></LoadingSpiner>
                                    </div>
                                </div>
                            </div>
                            <div class="block md:hidden bg-slate-200/50 p-1 fixed bottom-4 right-4 rounded-full">
                                <UButton color="primary" size="xl"
                                    class="rounded-full w-12 h-12 flex items-center justify-center"
                                    :icon="sliderIsOpen ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-plus'"
                                    @click="sliderIsOpen = true">
                                </UButton>
                            </div>
                            <USlideover v-model="sliderIsOpen">
                                <UCard class="flex flex-col flex-1"
                                    :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                                    <template #header>
                                        <div class="flex items-center justify-between">
                                            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                Shortcut menu
                                            </h3>
                                            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                                                class="-my-1" @click="sliderIsOpen = false" />
                                        </div>
                                    </template>
                                    <div class="max-h-[85dvh] overflow-auto shortcut-menu pl-4">
                                        <div class="pt-4 md:pt-0"> <!--Sticky not working for now-->
                                            <h2 class="text-xl font-bold">Tags & Topics 🏷️</h2>
                                            <div class="search-container relative mt-2 mb-12" :key="search_key">
                                                <VuePredictiveSearch @selected="viewUserSelection"
                                                    inputPlaceholder="Quickly find any tag"
                                                    inputClasses="block px-5 py-2 w-full rounded-md block"
                                                    :source="tags" label="filter" :fieldsToSearchFrom="['tags']"
                                                    :fieldsToReturnOnMatch="['tags', 'filter']">
                                                    <template #no-element-found>
                                                        <p class="text-red-400 ">
                                                            <UIcon name="i-heroicons-exclamation-triangle"></UIcon> Did
                                                            not find match
                                                        </p>
                                                    </template>
                                                    <template #item="{ tags, filter }">
                                                        <div
                                                            class="item cursor-pointer line-clamp-1 py-1 hover:text-primary-400 transition-all">
                                                            <p>{{ tags }}</p>
                                                        </div>
                                                    </template>
                                                </VuePredictiveSearch>
                                            </div>
                                            <div
                                                class="flex flex-col text-left justify-start mt-5 max-h-[40dvh] overflow-auto gap-2">
                                                <button class="text-left underline" v-for="tag in tags"
                                                    :key="tag.filter" @click="() => filter_posts(tag.filter)"> {{
                                                        tag.tags }}</button>
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <h2 class="text-xl font-bold">Trending 🔥</h2>
                                            <div
                                                class="flex flex-col text-left justify-start mt-5 max-h-[20dvh] overflow-auto gap-3">
                                                <NuxtLink class="text-left hover:underline flex gap-2 items-center"
                                                    v-for="post in trending_fakts" :href="`/posts/${post.id}`">
                                                    <!--img class="w-20 rounded-md object-cover" :src="post.illustration"-->
                                                    <div>
                                                        <p class="line-clamp-2">{{ post.faktContent }}</p>
                                                        <div
                                                            class="flex items-center align-center text-center w-full flex-row">
                                                            <div
                                                                class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NuxtLink>
                                                <LoadingSpiner v-if="loading_trending"></LoadingSpiner>
                                            </div>
                                            <h2 class="text-xl font-bold mt-10">Bookmark 📝</h2>
                                            <div
                                                class="flex flex-col text-left justify-start mt-5 max-h-[20vh] overflow-auto gap-3">
                                                <NuxtLink class="text-left hover:underline flex gap-2 items-center"
                                                    v-for="post in favorite_fakts" :href="`/posts/${post.post_id}`">
                                                    <!--img class="w-20 rounded-md object-cover" :src="post.illustration"-->
                                                    <div>
                                                        <p class="line-clamp-2">{{ post.faktContent }}</p>
                                                        <div
                                                            class="flex items-center align-center text-center w-full flex-row">
                                                            <div
                                                                class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NuxtLink>
                                                <LoadingSpiner v-if="loading_fav"></LoadingSpiner>
                                            </div>
                                        </div>
                                    </div>
                                </UCard>
                            </USlideover>
                        </section>
                    </main>
                </div>
            </main>
            <Footer />
        </div>
    </div>
</template>

<script setup>
import { collection, getDoc, limit, onSnapshot, orderBy, query, where, doc, getDocs } from 'firebase/firestore';
import { VuePredictiveSearch } from 'vue-predictive-search';
import useTags from "~/composables/tags";
const home_fakt_demo = ref([])
const search_key = ref(0);
const favorite_fakts = ref([]);
const userUid = useState("userUid");
const { $db } = useNuxtApp();
const sliderIsOpen = ref(false);
const showMiddlePart = ref(true);
const tags = ref(useTags("ui"));
const trending_fakts = ref([]);
const loading_fav = ref(false);
const loading_trending = ref(false);
const sync_fav = () => {
    const favQuery = query(collection($db, "favorites"), where("user_id", "==", userUid.value));
    onSnapshot(favQuery, async (querysnapshot) => {
        loading_fav.value = true;
        const values = [];
        for (const docu of querysnapshot.docs) {
            //if (!docu.metadata.hasPendingWrites) { //only server changes
            const favData = docu.data();
            const postDoc = await getDoc(doc($db, "posts", favData.post_uid));
            const userDoc = await getDocs(query(collection($db, "usersExtraInfo")), where('userId', '==', favData.user_id));
            if (postDoc.exists() && !userDoc.empty) {
                values.push({ id: docu.id, post_id: postDoc.id, ...postDoc.data(), ...userDoc.docs[0].data(), ...favData, });
            }
            //}
        }
        loading_fav.value = false;
        favorite_fakts.value = values;
    })
}
watch(userUid, () => {
    if (userUid.value) {
        sync_fav();
    }
})
onMounted(() => {
    if (userUid.value) {
        sync_fav();
    }
})
const viewUserSelection = ({ filter }) => {
    filter_posts(filter)
}
const filter_posts = async (value) => {
    if (!value) {
        await navigateTo('/explore');
    }
    else {
        await navigateTo(`/explore?tag=${value}`)
    }
    showMiddlePart.value = false;
    await nextTick();
    showMiddlePart.value = true;
    search_key.value++;
}

async function getTopPostsWithMostLikes() {
    const likesQuery = query(collection($db, "likes"));
    const querySnapshot = await getDocs(likesQuery);
    const likeCounts = {};
    querySnapshot.forEach((doc) => {
        const { post_uid } = doc.data();
        if (likeCounts[post_uid]) {
            likeCounts[post_uid]++;
        } else {
            likeCounts[post_uid] = 1;
        }
    });
    const sortedPosts = Object.entries(likeCounts)
        .sort(([, a], [, b]) => b - a) // Sort by count in descending order
        .slice(0, 3); // Get the top 3
    // Extract the post_ids from the sorted array
    const topPostIds = sortedPosts.map(([post_uid]) => post_uid);
    return topPostIds;
}
async function fetchTrendingPosts(topPostIds) {
    const trendingPosts = [];
    for (const postId of topPostIds) {
        const postRef = doc($db, "posts", postId);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
            trendingPosts.push({ id: postDoc.id, ...postDoc.data() });
        }
    }
    return trendingPosts;
}

// Usage example
onMounted(async () => {
    loading_trending.value = true;
    const topPostIds = await getTopPostsWithMostLikes(); // Get the top post IDs
    trending_fakts.value = await fetchTrendingPosts(topPostIds); // Fetch the posts
    loading_trending.value = false;
});

const route = useRoute();
watch(() => route.fullPath, () => {
    sliderIsOpen.value = false;
});
</script>

<style>
@font-face {
    font-family: 'Pink Sunday';
    src: local('Pink Sunday'), url('@/assets/PinkySunday.ttf') format('truetype');
}

.logo-custom span {
    font-family: "Pink Sunday";
    font-size: 100px;
}

.shortcut-menu {
    direction: rtl;
}

.shortcut-menu>div {
    direction: ltr;
}

.search-container input+* {
    position: absolute;
    width: 100%;
    background-color: #020617;
    padding: 5px 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1)
}

.search-container ul:empty {
    display: none;
}
</style>