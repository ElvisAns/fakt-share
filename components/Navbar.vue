<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto p-4 flex justify-between">
      <div class="text-xl font-semibold">FunFacts</div>
      <div class="space-x-4">
        <nuxt-link to="/" class="text-gray-700 hover:text-blue-500">Home</nuxt-link>
        <nuxt-link to="/explore" class="text-gray-700 hover:text-blue-500">Explore</nuxt-link>
        <nuxt-link to="/notifications" class="text-gray-700 hover:text-blue-500">Notifications</nuxt-link>
        <nuxt-link to="/profile" class="text-gray-700 hover:text-blue-500">Profile</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Add any additional styling here */
</style>