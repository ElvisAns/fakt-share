<template>
    <NavigationBar />
    <div class="min-h-[100dvh] bg-slate-950 text-white">
        <!-- Background decoration -->
        <div class="absolute inset-0 overflow-hidden">
            <div class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-orange-500/20 to-pink-500/20 blur-3xl"></div>
            <div class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"></div>
        </div>

        <div class="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div class="w-full max-w-4xl">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <!-- Left Column - Sign In Form -->
                    <div class="space-y-8">
                        <div class="text-center lg:text-left">
                            <h1 class="text-4xl font-bold mb-2">Welcome to</h1>
                            <NuxtLink class="logo-custom inline-block" href="/about">
                                <span>Fakt Share</span>
                            </NuxtLink>
                            <p class="text-xl text-slate-400 mt-4">
                                Join thousands of curious minds discovering fascinating facts
                            </p>
                        </div>

                        <!-- Sign In Benefits -->
                        <div class="space-y-4">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span class="text-slate-300">Access to 10,000+ fascinating facts</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span class="text-slate-300">Share your own knowledge with the community</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span class="text-slate-300">Personalized fact recommendations</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span class="text-slate-300">Connect with fellow knowledge seekers</span>
                            </div>
                        </div>

                        <!-- Sign In Button -->
                        <div class="pt-4">
                            <button @click="signin()" :disabled="processing"
                                class="w-full px-6 py-4 border-2 border-orange-500 bg-orange-100 text-slate-900 font-semibold rounded-lg hover:bg-orange-400 hover:border-orange-400 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                                <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy"
                                    alt="google logo">
                                <span>{{ processing ? 'Signing in...' : 'Continue with Google' }}</span>
                                <div v-if="processing" class="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                            </button>
                            
                            <p class="text-xs text-slate-500 text-center mt-4">
                                By continuing, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </div>

                    <!-- Right Column - Visual Content -->
                    <div class="hidden lg:block space-y-8">
                        <!-- Sample Facts Preview -->
                        <div class="space-y-6">
                            <h3 class="text-2xl font-bold text-center mb-6">Discover Amazing Facts</h3>
                            
                            <div class="space-y-4">
                                <div class="bg-slate-900 p-6 rounded-lg border border-slate-800">
                                    <div class="flex items-center mb-3">
                                        <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-slate-900 font-bold text-sm">S</span>
                                        </div>
                                        <div>
                                            <div class="font-semibold text-sm">Science Facts</div>
                                            <div class="text-slate-500 text-xs">2 hours ago</div>
                                        </div>
                                    </div>
                                    <p class="text-slate-300 text-sm leading-relaxed">
                                        "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!"
                                    </p>
                                    <div class="flex items-center mt-4 text-slate-500 text-xs">
                                        <span class="flex items-center mr-4">
                                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                            </svg>
                                            42
                                        </span>
                                        <span class="flex items-center mr-4">
                                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                            </svg>
                                            8
                                        </span>
                                        <span class="flex items-center">
                                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                            156
                                        </span>
                                    </div>
                                </div>

                                <div class="bg-slate-900 p-6 rounded-lg border border-slate-800">
                                    <div class="flex items-center mb-3">
                                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-slate-900 font-bold text-sm">T</span>
                                        </div>
                                        <div>
                                            <div class="font-semibold text-sm">Tech Facts</div>
                                            <div class="text-slate-500 text-xs">5 hours ago</div>
                                        </div>
                                    </div>
                                    <p class="text-slate-300 text-sm leading-relaxed">
                                        "The first computer programmer was a woman! Ada Lovelace wrote the first algorithm intended to be processed by a machine in the 1840s."
                                    </p>
                                    <div class="flex items-center mt-4 text-slate-500 text-xs">
                                        <span class="flex items-center mr-4">
                                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                            </svg>
                                            67
                                        </span>
                                        <span class="flex items-center mr-4">
                                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                            </svg>
                                            12
                                        </span>
                                        <span class="flex items-center">
                                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                            234
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Stats -->
                        <div class="grid grid-cols-3 gap-4 pt-6">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-orange-500">10K+</div>
                                <div class="text-sm text-slate-400">Facts Shared</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-orange-500">5K+</div>
                                <div class="text-sm text-slate-400">Active Users</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-orange-500">50+</div>
                                <div class="text-sm text-slate-400">Topics</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
useSeoMeta({
  title: 'Sign In | Fakt Share',
  ogTitle: 'Sign In | Fakt Share ',
  description: 'Join Fakt Share and start discovering fascinating facts! Sign in with Google to access thousands of interesting facts and share your knowledge with the community.',
  ogDescription: 'Join Fakt Share and start discovering fascinating facts! Sign in with Google to access thousands of interesting facts and share your knowledge with the community.',
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
        let username = email.split('@')[0];
        username = `@${username}`;
        const userQuery = query(collection($db, "usersExtraInfo"), where("userId", "==", userId.value));
        const querySnapshot = await getCountFromServer(userQuery);
        if (querySnapshot.data().count == 0) {
            await addDoc(collection($db, "usersExtraInfo"), { userId: uid, photoURL, displayName, email, username: username, certified: false, bio: "" });
        }
        await navigateTo("/explore");
    }).catch((error) => {
        console.log(error)
        processing.value = false;
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