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

            <h2 class="mt-12 max-w-4xl text-center font-mona text-3xl font-light md:text-4xl"
              style="font-stretch: 120%">
              Keep your mind juiced with interesting facts
              <span class="text-orange-500">as you scroll,</span>
              just like you do on other social media.
            </h2>

            <BenefitsCards />
            <SampleFaktHome />
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
                Don't waste your time
                <NuxtLink href="/signin" class="underline hover:no-underline">
                  Create your account today
                </NuxtLink>
                .
              </h2>
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