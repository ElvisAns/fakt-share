<template>
   <article class="block" ref="target">
      <div data-parent="true" class="group p-4 mt-3 rounded-2xl bg-slate-900
               transition-colors duration-100 ease-in-out hover:bg-slate-700/60">
         <div class="flex justify-between items-end gap-1 flex-wrap">
            <NuxtLink :to="profile_link" class="group/profile flex items-center gap-3">
               <figure v-if="author_data.photoURL"
                  class="rounded-full h-10 w-10 flex-shrink-0 bg-slate-800 transition-opacity group-hover/profile:opacity-90">
                  <img :src="author_data.photoURL" alt="image" @error="image_failed_to_load"
                     class="rounded-full h-10 w-10">
               </figure>
               <div v-else
                  class="flex justify-center items-center h-10 w-10 aspect-1 bg-blue-500 text-black font-bold text-center rounded-full">
                  <span>{{ firstLetterOfName }}</span>
               </div>
               <div class="overflow-hidden text-sm">
                  <div class="items flex">
                     <p class="truncate font-medium text-slate-50">
                        {{ author_data.displayName }}
                     </p>
                     <svg v-if="author_data.certified"
                        class="fill-current saturate-200 text-orange-500 ml-1 mt-0.5 h-3.5 w-3.5" aria-label="Verified"
                        role="img" viewBox="0 0 40 40">
                        <title>Verified</title>
                        <path
                           d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                           fill-rule="evenodd"></path>
                     </svg>
                  </div>
                  <p class="truncate text-slate-500 transition-colors group-hover/profile:text-slate-400">
                     {{ author_data.username }}
                  </p>
               </div>
            </NuxtLink>
            <span class="text-xs block text-right">{{ createdAtFormated }}</span>
         </div>
         <NuxtLink class="cursor-pointer" :to="{ name: 'posts-id', params: { id: post_uid } }">
            <div class="mt-3 break-words text-slate-200 overflow-hidden answer">
               <img class="w-full max-h-56 object-cover rounded-lg mb-3" :src="illustration">
               <p v-html="fact_content_updated"></p><!--TODO: we can use marked to highlight hashtags -->
               <p v-show="tag" class="text-xs font-bold text-orange-500 pt-3">#{{ tag }}</p>
            </div>
         </NuxtLink>
         <div class="mt-3 flex items-center justify-between text-sm text-slate-500">
            <div class="flex items-center gap-1 relative w-full pb-5">
               <div :title="`${comments} comments`"
                  class="flex items-center transition-colors group-hover:text-pink-500 hover:text-slate-400 focus:outline-none cursor-pointer">
                  <UIcon name="i-heroicons-chat-bubble-left-right" />
                  <span class="mx-1">
                     {{ comments }}
                  </span>
               </div>
               <span>•</span>
               <button :title="`${likes} likes`" @click="like_post"
                  class="flex items-center transition-colors hover:text-slate-400 focus:outline-none">
                  <UIcon class="w-5 h-5" name="i-heroicons-heart" :class="{ 'text-primary': hasLiked }" />
                  <LoadingSpiner v-if="pendingRequest_like" class="scale-50" />
                  <span class="ml-1">
                     {{ likes }}
                  </span>
               </button>
               <span>•</span>
               <p class="inline-flex cursor-help items-center" :title="`${views} views`">
                  <UIcon class="w-5 h-5" name="i-heroicons-eye" />
                  <span class="mx-1">
                     {{ views }}
                  </span>
               </p>
               <button :title="`translate to ${browserlanguage}`" @click="translate_post"
                  class="flex self items-center transition-colors hover:text-slate-400 focus:outline-none">
                  <UIcon class="w-5 h-5" name="i-heroicons-language" />
                  <LoadingSpiner v-if="pendingRequest_translate" class="scale-50" />
                  <span class="ml-1">
                     {{ hastranslated ? "Original text" : "Translate" }}
                  </span>
               </button>
               <div class=" absolute right-0 flex gap-1 -mb-12">
                  <UButton :color="isFavorite ? 'primary' : 'black'"
                     :title="isFavorite ? 'remove bookmark' : 'bookmark'" @click="bookmark_post" variant="ghost"
                     loading-icon="i-heroicons-bookmark-slash"
                     :icon="isFavorite ? 'i-heroicons-bookmark-slash' : 'i-heroicons-bookmark'" color="red"
                     :loading="pendingRequest"></UButton>
                  <UButton v-if="isByCurrentUser" @click="delete_post" variant="ghost" loading-icon="i-heroicons-trash"
                     icon="i-heroicons-trash" color="red" :loading="pendingRequest"></UButton>
               </div>
            </div>
         </div>
      </div>
   </article>
</template>

<script setup>
const emit = defineEmits({
   hasLoadedFakt: ({ post_uid }) => {
      let valid = post_uid !== undefined;
      if (valid) {
         //console.log("Submitted correct data")
      }
      return valid;
   }
})
import { collection, query, where, doc, updateDoc, addDoc, getDoc, getDocs, getCountFromServer, deleteDoc, writeBatch, onSnapshot } from "firebase/firestore";
const props = defineProps({
   userId: String,
   faktContent: String,
   illustration: String,
   tag: String,
   post_uid: String,
   createdAt: Object
})
const createdAtFormated = ref(useTimeAgo(props.createdAt.toDate().toLocaleString()))
const comments = ref('...'); //load from firebase
const likes = ref('...'); //load from firebase
const views = ref('...'); //load from google analytics
const hasLiked = ref(false); //load from firebase
const isFavorite = ref(false); //load from firebase


const profile_link = ref('#');
const { $db } = useNuxtApp();
const author_data = ref({})
const loggedInUserInfos = useState("userInfos", () => { return { photoURL: "", displayName: "", email: "" } });
const loggedInUser_name = ref('');
const isByCurrentUser = ref(false); //we will compare from store if post exist in users made posts

const userIdCookie = useCookie('userId');
const userUid = useState("userUid");

onMounted(async () => {
   loggedInUser_name.value = useUsernameExtractor(loggedInUserInfos.value.email).value;
   const userQuery = query(collection($db, "usersExtraInfo"), where("userId", "==", props.userId));
   let querySnapshot = await getDocs(userQuery);
   if (querySnapshot.docs.length > 0) {
      author_data.value = querySnapshot.docs[0].data();
      profile_link.value = `/profile/${author_data.value.username}`;
      isByCurrentUser.value = author_data.value.username == loggedInUser_name.value;
   }

   // Track the count of likes in real-time
   const likesQuery = query(collection($db, "likes"), where("post_uid", "==", props.post_uid));
   onSnapshot(likesQuery, (snapshot) => {
      likes.value = snapshot.size;
   });

   // Track the count of comments in real-time
   const commentsQuery = query(collection($db, "comments"), where("post_uid", "==", props.post_uid));
   onSnapshot(commentsQuery, (snapshot) => {
      comments.value = snapshot.size;
   });

   // Track if the post is a favorite in real-time
   const isfavQuery = query(collection($db, "favorites"), where("post_uid", "==", props.post_uid), where("user_id", "==", userUid.value));
   onSnapshot(isfavQuery, (snapshot) => {
      isFavorite.value = snapshot.size > 0;
   });

   // Track if the user has liked the post in real-time
   const hasLikedQuery = query(collection($db, "likes"), where("post_uid", "==", props.post_uid), where("user_id", "==", userUid.value));
   onSnapshot(hasLikedQuery, (snapshot) => {
      hasLiked.value = snapshot.size > 0;
   });
   try {
      let response = await $fetch(`/api/stats/?action=check&post_id=${props.post_uid}`)
      response =  JSON.parse(response);
      views.value = response.views;
   }
   catch (error) {
      views.value = 0;
   }
})

const image_failed_to_load = () => {
   author_data.value.photoURL = null;
}
/*
watch(loggedInUserInfos, (newValue) => {
   loggedInUser_name.value = useUsernameExtractor(newValue.email).value;
   isByCurrentUser.value = props.at_username == loggedInUser_name.value;
})
*/

const fact_content_updated = ref(props.faktContent); //we will need this for translation
const browserlanguage = ref('');
onMounted(() => {
   browserlanguage.value = navigator.language
})

const bookmark_post = async () => {
   pendingRequest.value = true;
   if (userUid.value) {
      if (!isFavorite.value) {
         await addDoc(collection($db, "favorites"), {
            post_uid: props.post_uid,
            user_id: userUid.value,
         });
         isFavorite.value = true;
         pendingRequest.value = false;
         toast.add({ title: 'Done!', description: "Post add to your favorites", icon: 'i-heroicons-information-circle' })
      }
      else {
         const q = query(collection($db, "favorites"), where("post_uid", "==", props.post_uid));
         const querySnapshot = await getDocs(q);
         if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await deleteDoc(docRef);
            isFavorite.value = false;
            pendingRequest.value = false;
            toast.add({ title: 'Done!', description: "Post removed from your favorites", icon: 'i-heroicons-information-circle' })
         }
         else {
            pendingRequest.value = false;
            toast.add({ title: 'Error!', description: "Post not found", icon: 'i-heroicons-information-circle' })
         }
      }
   }
   else {
      toast.add({
         title: 'Sorry!', description: "You can't save as favorite when you are not logged In", icon: 'i-heroicons-information-circle', actions: [{
            label: 'Login',
            click: async () => await navigateTo(`/signin`)
         }]
      })
      pendingRequest.value = true;
   }
}

const toast = useToast();
const pendingRequest = ref(false);
const delete_post = async () => {
   pendingRequest.value = true;
   await deleteDoc(doc($db, "posts", props.post_uid));
   const queries = [
      query(collection($db, "likes"), where("post_uid", "==", props.post_uid)),
      query(collection($db, "favorites"), where("post_uid", "==", props.post_uid)),
      query(collection($db, "comments"), where("post_uid", "==", props.post_uid)),
   ];
   for (const q of queries) {
      const querySnapshot = await getDocs(q);
      const batch = writeBatch($db);
      querySnapshot.forEach((docSnapshot) => {
         batch.delete(docSnapshot.ref);
      });
      await batch.commit();
   }
   pendingRequest.value = false;
   toast.add({ title: 'Great job.', description: 'Post was deleted!', icon: 'i-heroicons-information-circle', callback: () => { window.location.reload() } })
}
const pendingRequest_like = ref(false);

const like_post = async () => {
   pendingRequest_like.value = true;
   if (userUid.value) {
      if (!hasLiked.value) {
         await addDoc(collection($db, "likes"), {
            post_uid: props.post_uid,
            user_id: userUid.value,
         });
         hasLiked.value = true;
         pendingRequest_like.value = false;
      }
      else {
         const q = query(collection($db, "likes"), where("post_uid", "==", props.post_uid));
         const querySnapshot = await getDocs(q);
         if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await deleteDoc(docRef);
            hasLiked.value = false;
            pendingRequest_like.value = false;
         }
         else {
            pendingRequest_like.value = false;
            toast.add({ title: 'Error!', description: "Post not found", icon: 'i-heroicons-information-circle' })
         }
      }
   }
   else {
      pendingRequest_like.value = false;
      toast.add({
         title: 'Sorry!', description: "You can't like a post when you are not logged In", icon: 'i-heroicons-information-circle', actions: [{
            label: 'Login',
            click: async () => await navigateTo(`/signin`)
         }]
      })
   }
}
let hastranslated = ref(false);
const pendingRequest_translate = ref(false);
const translate_post = async () => {
   hastranslated.value = !hastranslated.value;
   if (!hastranslated.value) fact_content_updated.value = props.faktContent;
   else {
      pendingRequest_translate.value = true;
      try {
         const response = await $fetch('/api/translate', {
            method: "POST",
            body: { prompt: props.faktContent, language: browserlanguage.value }
         })
         fact_content_updated.value = response;
         pendingRequest_translate.value = false;
      }
      catch (error) {
         fact_content_updated.value = "Translation have failed, try again";
         pendingRequest_translate.value = false;
      }
   }
}

const { width } = useWindowSize();
const target = ref(null);

watch(width, (currentValue, previousValue) => {
   if (currentValue <= 767 && previousValue > 767) {
      window.location.reload(); //we must force reload
   }
})

const firstLetterOfName = computed(() => {
   if (author_data.value.displayName)
      return author_data.value.displayName.substring(0, 1);
   return "";
})
onMounted(async () => {
   const loadMoreCallback = (entries, observer) => {
      entries.forEach(async (entry) => {
         if (entry.isIntersecting) {
            window.gtag('event', 'view_post', { post_id: props.post_uid, user_id: userIdCookie.value });
            emit("hasLoadedFakt", { post_uid: props.post_uid }); //we inform the parent component so we can load next post
            observer.unobserve(entry.target);
            await $fetch(`/api/stats/?action=track&post_id=${props.post_uid}`)
         }
      });
   };
   const observer = new IntersectionObserver(loadMoreCallback, {
      root: width.value <= 767 ? null : document.querySelector("#middlepart"), //on mobile device we must observe on root while on wide screen we will do on the middlepart container
      rootMargin: '0px',
      threshold: 0.7
   });
   observer.observe(target.value);
})
</script>