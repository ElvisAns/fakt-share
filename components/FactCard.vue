<template>
  <div class="p-4 border rounded-lg shadow-lg">
    <div class="text-lg font-semibold">{{ fact.text }}</div>
    <div v-if="fact.image" class="mt-2">
      <img :src="fact.image" alt="Fun fact image" class="w-full h-auto rounded-lg">
    </div>
    <div class="flex mt-2 space-x-4">
      <button @click="likeFact" class="text-blue-500">Like</button>
      <button @click="shareFact" class="text-green-500">Share</button>
      <button @click="commentFact" class="text-gray-500">Comment</button>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    fact: {
      type: Object,
      required: true
    }
  });

  function likeFact() {
    // Handle like action
  }
  function shareFact() {
    // Handle share action
  }

  function commentFact() {
    // Handle comment action
  }
</script>

<style scoped>
  /* Add any additional styling here */
</style>