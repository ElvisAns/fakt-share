<template>
    <div>
        <CreateFaktForm :tags="tags" />
        <UDivider label="Feed" :ui="{ label: 'text-orange-500' }" />
        <h2 class="text-xl font-bold mb-3">Explore</h2>
        <div class="my-5" v-if="loading">
            <LoadingSpiner />
        </div>
        <p v-show="!fakt_feed.length && !loading" class="text-center text-red-400 mt-10">
            <UIcon name="i-heroicons-exclamation-triangle"></UIcon> Ahw! please come back later, we promise to have some
            content for you
        </p>
        <FaktCard v-for="(fakt, index) in fakt_feed" :createdAt="fakt.createdAt" :key="index" :userId="fakt.userId"
            :faktContent="fakt.faktContent" :illustration="fakt.illustration" :tag="fakt.tag" :post_uid="fakt.id"
            @hasLoadedFakt="load_next_post" />
    </div>
</template>

<script setup>
import { collection, where, doc, updateDoc, addDoc, getDoc, getDocs, getCountFromServer, query, onSnapshot, orderBy, startAfter, limit as fsLimit } from "firebase/firestore";
import useTags from "~/composables/tags";

const fakt_feed = ref([]); // we will load here based on post ids load track
const all_posts = reactive({});
const userId = useCookie('userId'); //we will need userId to query the recommandation system to give us the post ids we will show first
const route = useRoute();

const userUid = useState("userUid");
const loading = ref(true)

let post_load_index = ref(0);

let last_loaded_post_ref = ref(null);

const LIMIT = 10;

const { $db } = useNuxtApp();
var date_format_options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

let unsubscribe = null; // Add this to track the current listener

const load_count = ref(0);

const loadPosts = async (lastPostId = null) => {
    // Unsubscribe from previous listener if it exists
    if (unsubscribe) {
        unsubscribe();
    }
    
    let q = query(collection($db, "posts"), orderBy("createdAt", "desc"), fsLimit(LIMIT));
    const filter = route.query.tag;
    
    if (filter) {
        q = query(collection($db, "posts"), where("tag", "==", filter), orderBy("createdAt", "desc"), fsLimit(LIMIT));
    }
    
    if (lastPostId) {
        // Get the document reference first
        const lastDocRef = doc($db, "posts", lastPostId);
        const lastDocSnap = await getDoc(lastDocRef);
        
        if (lastDocSnap.exists()) {
            q = query(q, startAfter(lastDocSnap));
        }
    }
    
    unsubscribe = onSnapshot(q, (querysnapshot) => {
        querysnapshot.forEach((doc) => {
            if (!doc.metadata.hasPendingWrites) { //only server changes
                const entry = doc.data();
                last_loaded_post_ref.value = doc.id;
                all_posts[doc.id] = entry; //pass all post to recommandation order them for us
                load_count.value++;
            }
        })
        setTimeout(function () {
            loading.value = false;
        }, 1000);
    })
}

onMounted(async () => {
    if (userId.value) { //recommandation system is only for logged in users
        //alert("logged in")
    }
    loadPosts();
})

// Simplified watch - just add posts to feed as they come in
watch(all_posts, (currentValue) => {
    // Get all post IDs that aren't already in the feed
    const existingIds = fakt_feed.value.map(post => post.id);
    const newPostIds = Object.keys(currentValue).filter(id => !existingIds.includes(id));
    
    // Add new posts to the feed
    newPostIds.forEach(id => {
        fakt_feed.value.push({ id, ...currentValue[id] });
    });
})

function getNextKeyOrShuffle(obj, currentKey) {
    const keys = Object.keys(obj);
    const currentIndex = keys.indexOf(currentKey);
    if (currentIndex === -1) {
        return keys[0];
    }
    if (currentIndex < keys.length - 1) {
        return keys[currentIndex + 1];
    }
    const shuffledKeys = keys.sort(() => Math.random() - 0.5);
    return shuffledKeys[0];
}

const load_next_post = async ({ post_uid }) => {
    if (load_count.value % LIMIT == LIMIT - 1) {
        console.log("Will load next 10 posts");
        // Use the same loadPosts function with the skip parameter
        await loadPosts(last_loaded_post_ref.value);
    }
    
    const previous_post_id = post_uid;
    let nextPostId = null;
    
    // Use getNextKeyOrShuffle to get the next post from all_posts
    nextPostId = getNextKeyOrShuffle(all_posts, previous_post_id);
    
    let post = all_posts[nextPostId];
    if (post) {
        fakt_feed.value.push({ id: nextPostId, ...post });
    } else {
        console.error(`Post with ID ${nextPostId} could not be loaded.`);
    }
};
const tags = ref(useTags("uselect"));
definePageMeta({
    layout: 'feed'
})
useSeoMeta({
    title: 'Explore | Fakt Share',
    ogTitle: 'Explore | Fakt Share ',
    description: 'Explore posts on Fakt Share and have fun!',
    ogDescription: 'Explore posts on Fakt Share and have fun!',
    twitterCard: 'summary_large_image',
})

// Clean up listener when component unmounts
onUnmounted(() => {
    if (unsubscribe) {
        unsubscribe();
    }
})
</script>