<template>
    <NuxtLink :href="link" class="inline-flex items-center px-4 py-2 border text-white
        border-white rounded-lg font-semibold text-xs tracking-widest hover:bg-orange-500 focus:outline-none
        focus:ring-0 focus:ring-offset-0 transition ease-in-out duration-150">
        {{text}}
    </NuxtLink>
</template>

<script setup>
    defineProps(['text','link'])
</script>