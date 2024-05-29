<template>
  <NuxtLoadingIndicator :throttle="0" />
  <UContainer>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UContainer>
  <UNotifications />
</template>