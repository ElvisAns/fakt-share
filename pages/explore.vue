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
import { collection, where, doc, updateDoc, addDoc, getDoc, getDocs, getCountFromServer, query, onSnapshot, orderBy } from "firebase/firestore";
import useTags from "~/composables/tags";

const fakt_feed = ref([]); // we will load here based on post ids load track
const all_posts = reactive({});
const post_ids_load_track = ref([]); //this will come straight from the recommandation system and if no watched, we show them in order
const userId = useCookie('userId'); //we will need userId to query the recommandation system to give us the post ids we will show first
const route = useRoute();

const userUid = useState("userUid");
const liked_posts = ref([]);
const commented_on_posts = ref([]);
const viewed_post = ref([]); //load from google analytics data
const loading = ref(true)

let post_load_index = ref(0);

const { $db } = useNuxtApp();
var date_format_options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
onMounted(async () => {
    if (userId.value) { //recommandation system is only for logged in users
        //alert("logged in")
    }
    let q = query(collection($db, "posts"), orderBy("createdAt", "desc"));
    const filter = route.query.tag;
    if (filter) {
        q = query(collection($db, "posts"), where("tag", "==", filter), orderBy("createdAt", "desc"));
    }
    onSnapshot(q, (querysnapshot) => {
        querysnapshot.forEach((doc) => {
            if (!doc.metadata.hasPendingWrites) { //only server changes
                const entry = doc.data();
                all_posts[doc.id] = entry; //pass all post to recommandation order them for us
            }
        })
        setTimeout(function () {
            loading.value = false;
        }, 1000);
    })
})



watch(all_posts, async (currentValue) => {
    if (post_ids_load_track.value.length < 1 && post_load_index.value == 0) { //first load or recommandation system has not yet give the order of loading
        const [first_id] = Object.keys(currentValue);
        fakt_feed.value.push({ id: first_id, ...currentValue[first_id] });
        post_load_index.value++;
    }
    if (userId.value) { //only if user is logged in
        const postids = Object.keys(currentValue);
        if (postids.length > 0) {
            //we have some posts
            const posts_for_recommandation = postids.map((id) => {
                const post = currentValue[id];
                let post_content = post.faktContent.substring(0, 80);
                post_content += "...";
                return { post_id: id, post_content, tag: post.tag }
            })
            const commentedOn = [];
            const liked = [];
            const favorites = [];

            const userCommentsQuery = query(collection($db, "comments"), where("user_id", "==", userId.value));
            const commentsSnapshot = await getDocs(userCommentsQuery);
            commentsSnapshot.forEach((snapshot) => {
                const data = snapshot.data();
                commentedOn.push(data.post_uid);
            })

            const userLikesQuery = query(collection($db, "likes"), where("user_id", "==", userId.value));
            const likesSnapshot = await getDocs(userLikesQuery);
            likesSnapshot.forEach((snapshot) => {
                const data = snapshot.data();
                liked.push(data.post_uid);
            })

            const userfavoritesQuery = query(collection($db, "favorites"), where("user_id", "==", userId.value));
            const favoritesSnapshot = await getDocs(userfavoritesQuery);
            favoritesSnapshot.forEach((snapshot) => {
                const data = snapshot.data();
                favorites.push(data.post_uid);
            })
            const recommandation_payload = {
                all_posts: posts_for_recommandation,
                liked_posts: liked,
                commented_on_posts: commentedOn,
                favorite_posts: favorites
            }
            const response = await $fetch("/api/recommandations", {
                method: "POST",
                body: { data: recommandation_payload }
            })
            try{
                const reco = JSON.parse(response);
                post_ids_load_track.value = reco;
            }
            catch(error){
                console.log(error)
            }
        }
    }
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

const load_next_post = ({ post_uid }) => {
    const previous_post_id = post_uid;
    let nextPostId = null;
    if (post_ids_load_track.value.length < 1) {
        // No recommended posts; load based on all posts
        nextPostId = getNextKeyOrShuffle(all_posts, previous_post_id);
    } else {
        // Use recommendation system's order
        if (post_load_index.value >= post_ids_load_track.value.length) {
            post_load_index.value = 0; // Reset index if out of bounds
        }
        nextPostId = post_ids_load_track.value[post_load_index.value];
    }
    let post = all_posts[nextPostId];
    if (post) {
        fakt_feed.value.push({ id: nextPostId, ...post });
    } else {
        // Fallback to loading from all posts if post ID not found in the recommendation list
        nextPostId = getNextKeyOrShuffle(all_posts, previous_post_id);
        post = all_posts[nextPostId];
        if (post) {
            fakt_feed.value.push({ id: nextPostId, ...post });
            console.warn(`Post with ID ${nextPostId} not found in recommendations. Loaded from all posts.`);
        } else {
            console.error(`Post with ID ${nextPostId} could not be loaded.`);
        }
    }
    post_load_index.value++;
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
</script>