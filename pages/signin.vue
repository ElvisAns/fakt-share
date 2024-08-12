<template>
    <NavigationBar />
    <div
        class="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-black text-white">
        <div class="mx-auto max-w-md space-y-6 text-center">
            <div class="flex flex-col items-center justify-center space-y-2">
                <h1 class="text-3xl tracking-tight text-foreground">Welcome to</h1>
                <NuxtLink class="logo-custom" href="/about">
                    <span>Fakt Share</span>
                </NuxtLink>
            </div>
            <button @click="signin()" :disabled="processing"
                class="mx-auto px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy"
                    alt="google logo">
                <span>Signin with Google</span>
            </button>
        </div>
        <Footer />
    </div>
</template>

<script setup>
useSeoMeta({
  title: 'Signin | Fakt Share',
  ogTitle: 'Signin | Fakt Share ',
  description: 'Get access and share your thougts around! explore posts on Fakt Share and have fun!',
  ogDescription: 'Get access and share your thougts around! explore posts on Fakt Share and have fun!',
  twitterCard: 'summary_large_image',
})

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, query, where, addDoc, getCountFromServer } from "firebase/firestore";

const { $auth, $db } = useNuxtApp();
definePageMeta({
    middleware: ['auth'],
});
const userId = useCookie('userId');
const processing = ref(false)

const signin = () => {
    if (processing.value) return;
    processing.value = true;
    const provider = new GoogleAuthProvider();
    signInWithPopup($auth, provider).then(async (result) => {
        userId.value = result.user.uid;
        const { photoURL, displayName, email, uid } = result.user;
        const username = useUsernameExtractor(email);
        const userQuery = query(collection($db, "usersExtraInfo"), where("userId", "==", userId.value));
        const querySnapshot = await getCountFromServer(userQuery);
        if (querySnapshot.data().count == 0) {
            await addDoc(collection($db, "usersExtraInfo"), { userId: uid, photoURL, displayName, email, username: username.value, certified: false, bio: "" });
        }
        await navigateTo("/explore");
    }).catch((error) => {
        console.log(error)
    });
}
</script>

<style scoped>
.logo-custom span {
    font-family: "Pink Sunday";
    font-size: 100px;
    line-height: 100%;
}
</style>