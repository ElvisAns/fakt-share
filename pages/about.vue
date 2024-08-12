<template>
    <NavigationBar />
    <div class="max-w-full py-8 min-h-[100dvh] bg-black text-white px-5 md:px-10 xl:px-24 text-center">
        <div class="pt-20 flex items-center justify-center min-h-[50vh] flex-col pb-20">
            <div class="logo">Fakt Share</div>
            <p class="text-xl">Learn while having fun</p>
            <p class="pt-10 text-sm max-w-sm mx-auto">Fakt is here to help! We're a social media platform that uses AI
                to help you discover new things,
                learn, and share your knowledge with people around the world. All you have to do is scroll
                through our feed like you do with other social media. Easy-peasy!
            </p>
        </div>
        <Footer />
    </div>
</template>

<style>
.logo {
    font-family: "Pink Sunday";
    font-size: 100px;
    line-height: 100px;
}
</style>

<script setup>
useSeoMeta({
    title: 'About | Fakt Share',
    ogTitle: 'About | Fakt Share ',
    description: 'About us, Learn while having fun, Fakt Share will make your day by teaching you fun things.',
    ogDescription: 'About us, Learn while having fun, Fakt Share will make your day by teaching you fun things.',
    ogImage: 'https://firebasestorage.googleapis.com/v0/b/faktshare.appspot.com/o/og-image.png?alt=media&token=59cc7e77-f651-42b7-bf48-bc612c31dbdb',
    twitterCard: 'summary_large_image',
})
</script>