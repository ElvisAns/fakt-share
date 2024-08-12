<template>
    <NuxtLink :href="link" exactActiveClass="active-route" class="inline-flex items-center my-2 text-black
        font-semibold text-md tracking-widest hover:text-orange-500 focus:outline-none
        focus:ring-0 focus:ring-offset-0 transition ease-in-out duration-150">
        {{text}}
    </NuxtLink>
</template>

<script setup>
    defineProps(['text','link'])
</script>

<style>
.active-route{
    background-color: unset !important;
    font-weight: 900 !important;
    color: #f97316 !important;
}
</style>