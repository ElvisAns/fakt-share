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
          <NavigationBar />
          <main class="my-8 flex w-full flex-1 flex-col items-center justify-center gap-8 overflow-x-hidden p-4 pb-12">
            <!-- Hero Section -->
            <section class="mt-24 flex flex-col items-center">
              <NuxtLink class="logo-custom" href="/about">
                <span>Fakt Share</span>
              </NuxtLink>

              <div
                class="mt-5 rounded-full bg-orange-500 bg-opacity-90 px-3 py-1.5 font-mona text-sm font-medium uppercase text-slate-900"
                style="font-stretch: 120%">
                Learn while having fun
              </div>
            </section>

            <!-- Main Headline -->
            <h2 class="mt-12 max-w-4xl text-center font-mona text-3xl font-light md:text-4xl"
              style="font-stretch: 120%">
              Keep your mind juiced with interesting facts
              <span class="text-orange-500">as you scroll,</span>
              just like you do on other social media.
            </h2>

            <!-- Subtitle -->
            <p class="mt-6 max-w-2xl text-center text-lg text-slate-400">
              Join thousands of curious minds discovering fascinating facts about science, history, technology, and more. 
              Every scroll is a new learning opportunity.
            </p>

            <!-- CTA Buttons -->
            <div class="mt-8 flex flex-col sm:flex-row gap-4">
              <NuxtLink href="/signin" 
                class="inline-flex items-center px-8 py-3 bg-orange-500 text-slate-900 font-semibold rounded-lg hover:bg-orange-400 transition-colors duration-200">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Start Learning Today
              </NuxtLink>
              <NuxtLink href="/explore" 
                class="inline-flex items-center px-8 py-3 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 transition-colors duration-200">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Explore Facts
              </NuxtLink>
            </div>

            <!-- Statistics Section -->
            <section class="mt-16 w-full max-w-4xl">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center">
                  <div class="text-3xl font-bold text-orange-500 mb-2">10K+</div>
                  <div class="text-slate-400">Facts Shared</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-orange-500 mb-2">5K+</div>
                  <div class="text-slate-400">Active Learners</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-orange-500 mb-2">50+</div>
                  <div class="text-slate-400">Topics Covered</div>
                </div>
              </div>
            </section>

            <!-- Benefits Section -->
            <BenefitsCards />

            <!-- Sample Content Section -->
            <SampleFaktHome />

            <!-- How It Works Section -->
            <section class="mt-20 w-full max-w-4xl">
              <h3 class="text-2xl font-bold text-center mb-12">How Fakt Share Works</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center">
                  <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <h4 class="font-semibold mb-2">1. Sign Up</h4>
                  <p class="text-slate-400 text-sm">Create your account in seconds with Google</p>
                </div>
                <div class="text-center">
                  <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <h4 class="font-semibold mb-2">2. Discover</h4>
                  <p class="text-slate-400 text-sm">Scroll through fascinating facts from various topics</p>
                </div>
                <div class="text-center">
                  <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                    </svg>
                  </div>
                  <h4 class="font-semibold mb-2">3. Share</h4>
                  <p class="text-slate-400 text-sm">Share your own facts and engage with the community</p>
                </div>
              </div>
            </section>

            <!-- Topics Section -->
            <section class="mt-20 w-full max-w-4xl">
              <h3 class="text-2xl font-bold text-center mb-8">Explore Diverse Topics</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-slate-900 p-4 rounded-lg text-center hover:bg-slate-800 transition-colors">
                  <div class="text-orange-500 mb-2">🔬</div>
                  <div class="text-sm font-medium">Science</div>
                </div>
                <div class="bg-slate-900 p-4 rounded-lg text-center hover:bg-slate-800 transition-colors">
                  <div class="text-orange-500 mb-2">💻</div>
                  <div class="text-sm font-medium">Technology</div>
                </div>
                <div class="bg-slate-900 p-4 rounded-lg text-center hover:bg-slate-800 transition-colors">
                  <div class="text-orange-500 mb-2">🏛️</div>
                  <div class="text-sm font-medium">History</div>
                </div>
                <div class="bg-slate-900 p-4 rounded-lg text-center hover:bg-slate-800 transition-colors">
                  <div class="text-orange-500 mb-2">🌍</div>
                  <div class="text-sm font-medium">Geography</div>
                </div>
                <div class="bg-slate-900 p-4 rounded-lg text-center hover:bg-slate-800 transition-colors">
                  <div class="text-orange-500 mb-2">🎨</div>
                  <div class="text-sm font-medium">Art</div>
                </div>
                <div class="bg-slate-900 p-4 rounded-lg text-center hover:bg-slate-800 transition-colors">
                  <div class="text-orange-500 mb-2">🎵</div>
                  <div class="text-sm font-medium">Music</div>
                </div>
                <div class="bg-slate-900 p-4 rounded-lg text-center hover:bg-slate-800 transition-colors">
                  <div class="text-orange-500 mb-2">🍕</div>
                  <div class="text-sm font-medium">Food</div>
                </div>
                <div class="bg-slate-900 p-4 rounded-lg text-center hover:bg-slate-800 transition-colors">
                  <div class="text-orange-500 mb-2">🚀</div>
                  <div class="text-sm font-medium">Space</div>
                </div>
              </div>
            </section>

            <!-- Testimonials Section -->
            <section class="mt-20 w-full max-w-4xl">
              <h3 class="text-2xl font-bold text-center mb-12">What Our Users Say</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-slate-900 p-6 rounded-lg">
                  <div class="flex items-center mb-4">
                    <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span class="text-slate-900 font-bold">S</span>
                    </div>
                    <div>
                      <div class="font-semibold">Sarah M.</div>
                      <div class="text-slate-400 text-sm">Science Enthusiast</div>
                    </div>
                  </div>
                  <p class="text-slate-300">"I love how I can learn something new every time I scroll. The facts are always interesting and well-researched!"</p>
                </div>
                <div class="bg-slate-900 p-6 rounded-lg">
                  <div class="flex items-center mb-4">
                    <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span class="text-slate-900 font-bold">M</span>
                    </div>
                    <div>
                      <div class="font-semibold">Mike R.</div>
                      <div class="text-slate-400 text-sm">Tech Professional</div>
                    </div>
                  </div>
                  <p class="text-slate-300">"Perfect way to spend my breaks. I've learned so many fascinating things about technology and history!"</p>
                </div>
              </div>
            </section>

            <!-- Final CTA Section -->
            <div class="mt-28 flex max-w-2xl flex-col items-center gap-4 py-4 text-2xl font-light">
              <div class="animate-pulse">
                <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18">
                  </path>
                </svg>
              </div>

              <h2 class="text-center">
                Ready to start your learning journey?
                <NuxtLink href="/signin" class="underline hover:no-underline text-orange-500">
                  Create your account today
                </NuxtLink>
                and join thousands of curious minds!
              </h2>
              
              <p class="text-lg text-slate-400 text-center mt-4">
                It's free, it's fun, and it's educational. What are you waiting for?
              </p>
            </div>
          </main>
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
useSeoMeta({
  title: 'Welcome | Fakt Share',
  ogTitle: 'Welcome | Fakt Share ',
  description: 'Learn while having fun, Fakt Share will make your day by teaching you fun things.',
  ogDescription: 'Learn while having fun, Fakt Share will make your day by teaching you fun things.',
  ogImage: 'https://firebasestorage.googleapis.com/v0/b/faktshare.appspot.com/o/og-image.png?alt=media&token=59cc7e77-f651-42b7-bf48-bc612c31dbdb',
  twitterCard: 'summary_large_image',
})

</script>

<style>
@font-face {
    font-family: 'Pink Sunday';
    src: local('Pink Sunday'), url('@/assets/PinkySunday.ttf') format('truetype');
}
.logo-custom span{
  font-family: "Pink Sunday";
  font-size: 100px;
  line-height: 100%;
}
</style>