<template>
   <section class="relative mt-20 flex w-full max-w-3xl flex-col place-items-center gap-2 md:flex-row">
      <div
         class="absolute -right-20 top-0 -z-10 h-56 w-56 rotate-180 rounded-full bg-gradient-to-r from-teal-500 via-transparent to-emerald-300 blur-3xl">
      </div>
      <div
         class="flex cursor-pointer flex-col items-center justify-center text-left transition-transform duration-700 sm:max-w-md md:-translate-x-10 md:-translate-y-10 md:items-end md:text-right md:hover:-translate-x-5 md:hover:-translate-y-5">
         <h2 class="mb-2 w-full font-semibold">Wait, Guess what?</h2>
         <svg class="mr-16 mt-12 hidden h-auto w-20 rotate-45 md:block" viewBox="0 0 220 87" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
               d="M3.17247 25.8421C5.28745 28.1788 7.82542 30.0907 9.7289 32.6399C26.0142 55.3699 49.279 66.6287 75.0817 72.7892C83.9646 74.9135 94.1165 74.7011 103.211 72.7892C129.225 67.6909 152.913 56.8569 173.428 39.8625C179.35 34.9766 184.426 28.8161 188.656 21.8059C186.33 22.6556 183.792 23.5054 181.465 24.5675C174.697 27.5415 167.929 30.728 160.95 33.2772C157.989 34.3393 154.393 34.3393 151.009 34.1269C149.74 34.1269 147.837 32.215 147.625 30.9404C147.414 29.6658 148.683 27.3291 149.74 27.1167C167.718 21.5935 183.369 10.972 199.654 1.83746C205.364 -1.34899 208.96 -0.49927 211.498 5.23635C217.631 19.4692 220.381 34.5517 219.958 50.0592C219.958 50.484 219.112 51.1213 217.843 52.3959C205.364 47.7224 209.171 34.1269 203.038 23.2929C201.557 25.8421 200.5 27.9664 199.231 29.6658C172.582 62.5926 137.262 80.0118 96.2315 86.3848C90.0981 87.4469 83.3301 87.022 76.9852 85.9599C53.7205 81.9237 32.9937 72.1519 15.8623 55.7948C10.3634 50.484 6.34493 43.4738 2.32647 36.8885C0.634492 34.3393 0.634494 30.728 0 27.754C1.05749 27.1167 2.11498 26.4794 3.17247 25.8421Z"
               fill="currentColor"></path>
         </svg>
         <svg class="-ml-12 mt-12 h-auto w-16 rotate-90 md:hidden" viewBox="0 0 193 40" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
               d="M173.928 21.1292C115.811 44.9386 58.751 45.774 0 26.1417C4.22669 21.7558 7.81938 23.4266 10.5667 24.262C31.7002 29.9011 53.4676 30.5277 75.0238 31.3631C106.09 32.6162 135.465 25.5151 164.207 14.0282C165.475 13.6104 166.532 12.775 169.068 11.1042C154.486 8.18025 139.903 13.1928 127.223 7.34485C127.435 6.50944 127.435 5.46513 127.646 4.62971C137.156 4.00315 146.877 3.37658 156.388 2.54117C165.898 1.70575 175.196 0.661517 184.706 0.0349538C191.68 -0.382755 194.639 2.9589 192.103 9.22453C188.933 17.3698 184.495 24.8886 180.48 32.6162C180.057 33.4516 179.423 34.4959 178.578 34.9136C176.253 35.749 173.928 35.9579 171.392 36.5845C170.97 34.4959 169.913 32.1985 170.124 30.3188C170.547 27.8126 172.026 25.724 173.928 21.1292Z"
               fill="currentColor"></path>
         </svg>
      </div>
      <div class="mt-10 flex w-full flex-col gap-8 sm:max-w-md md:mt-0">
         <FaktCard v-for="fakt in home_fakts" :key="fakt.id" :createdAt="fakt.createdAt" :userId="fakt.userId"
            :faktContent="fakt.faktContent" :illustration="fakt.illustration" :tag="fakt.tag" :post_uid="fakt.id" />
      </div>
   </section>
</template>

<script setup>
import { collection, where, doc, updateDoc, addDoc, getDoc, getDocs, getCountFromServer, orderBy, query, onSnapshot, limit } from "firebase/firestore";
const { $db } = useNuxtApp();
const home_fakts = ref([]);

onMounted(async () => {
   let q = query(collection($db, "posts"), where("featured", "==", true), orderBy("createdAt", "desc"), limit(3));
   onSnapshot(q, (querysnapshot) => {
      const values = [];
      querysnapshot.forEach((doc) => {
         if (!doc.metadata.hasPendingWrites) { //only server changes
            values.push({ id: doc.id, ...doc.data() });
         }
      })
      home_fakts.value = values;
   })
})

</script>