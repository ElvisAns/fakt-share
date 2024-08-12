<template>
    <NuxtLayout>
        <div v-if="error.statusCode !== 404" class="text-red-500 w-full flex content-center justify-center h-[70vh] flex-col flex-wrap text-center gap-4">
            <h1 class="text-2xl">Error</h1>
            <p>
                <strong>{{ error.message }}</strong>
            </p>
            <p>Something went wrong...</p>
            <p>
                <button class="bg-red-600 hover:bg-red-500 text-white rounded-sm px-5 py-2" @click="handleError">
                    Go Back home.
                </button>
            </p>
        </div>
        <div v-else>
            <div
                class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div class="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div class="flex items-center pt-8 sm:justify-start sm:pt-0">
                        <div class="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
                            404 </div>

                        <div class="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                            Page Not Found </div>
                    </div>

                    <button class="bg-red-600 hover:bg-red-500 text-white rounded-sm px-5 py-2 mt-6 w-full"
                        @click="handleError">
                        Go Back home.
                    </button>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
const error = useError();

const handleError = () => {
    clearError({
        redirect: '/explore',
    });
};
useSeoMeta({
  title: 'Error | Fakt Share',
  ogTitle: 'Error | Fakt Share ',
  description: 'Sorry, Something went wrong',
  ogDescription: 'Sorry, Something went wrong',
  ogImage: 'https://firebasestorage.googleapis.com/v0/b/faktshare.appspot.com/o/og-image.png?alt=media&token=59cc7e77-f651-42b7-bf48-bc612c31dbdb',
  twitterCard: 'summary_large_image',
})
</script>