<template>
    <div class="container mx-auto p-4">
      <FactCard v-for="fact in facts" :key="fact.id" :fact="fact" />
    </div>
  </template>
  
  <script setup>
  import {ref} from 'vue';
  
  definePageMeta({
    layout: 'main'
  })
  const facts = ref( [
    { id: 1, text: 'Bananas are berries, but strawberries are not.', image: null },
    { id: 2, text: 'Honey never spoils.', image: null }
  ]);
  
  </script>