<template>
  <div>
    <NuxtLoadingIndicator :throttle="0" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

body {
  background: #fefce8;
  font-family: "Montserrat", sans-serif;
}

body * {
  font-family: "Montserrat", sans-serif;
}

body {
  --sb-track-color: #020617;
  --sb-thumb-color: #ffffff;
  --sb-size: 5px;
}

*::-webkit-scrollbar {
  width: var(--sb-size)
}

*::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 10px;
  border: 3px solid #232E33;
}

@supports not selector(::-webkit-scrollbar) {
  * {
    scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  }
}
</style>

<script setup>
import { onAuthStateChanged } from 'firebase/auth';

useSeoMeta({
  title: 'Welcome | Fakt Share',
  ogTitle: 'Welcome | Fakt Share ',
  description: 'Learn while having fun, Fakt Share will make your day by teaching you fun things.',
  ogDescription: 'Learn while having fun, Fakt Share will make your day by teaching you fun things.',
  ogImage: 'https://firebasestorage.googleapis.com/v0/b/faktshare.appspot.com/o/og-image.png?alt=media&token=59cc7e77-f651-42b7-bf48-bc612c31dbdb',
  twitterCard: 'summary_large_image',
})

const { $auth } = useNuxtApp();
const userUid = useState("userUid");
const userInfos = useState("userInfos", () => { return { photoURL: "", displayName: "", email: "" } });
const userIdCookie = useCookie('userId');

onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    if (user) {
      const uid = user.uid;
      userUid.value = uid;
      userIdCookie.value = uid;
      const { photoURL, displayName, email } = user;
      userInfos.value = { photoURL, displayName, email };
    }
    else {
      userIdCookie.value = null;
      userUid.value = "";
      userInfos.value = { photoURL: "", displayName: "", email: "" };
    }
  });
  $fetch('/api/api-auth'); // no need to wait
})
</script>