<template>
    <form @submit.prevent="handleSubmit" class="mb-5">
        <div class="relative group/menu mt-10">
            <div>
                <textarea 
                    v-model="comment" 
                    @input="checkCommentLength" 
                    class="w-full p-3 text-white caret-white focus:border-orange-500 border-slate-800 bg-slate-900 backdrop-blur-sm focus:ring-slate-900 rounded-lg shadow-sm sm:text-sm" 
                    placeholder="Write a comment..." 
                    rows="3">
                </textarea>
                <p v-if="error" class="text-red-500">{{ error }}</p>
            </div>
            <p class="text-right text-xs text-slate-400">{{ comment.length }} / 1000</p>
        </div>
        <div class="mt-2 flex items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                <UButton type="submit" loading-icon="i-heroicons-sparkles" variant="solid" label="Comment"
                    icon="i-heroicons-rocket-launch" :loading="pendingRequest" :disabled="pendingRequest" color="blue"
                    class="px-6 py-2 transition duration-300 scan-button font-extrabold">
                </UButton>
            </div>
        </div>
    </form>
</template>

<script setup>
const props = defineProps(["post_uid"])
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref } from 'vue';
const {$db} = useNuxtApp();
const userUid = useState("userUid");
const comment = ref('');
const error = ref('');
const checkCommentLength = () => {
    if (comment.value.length > 1000) {
        comment.value = comment.value.substring(0, 1000);
    }
};
const pendingRequest = ref(false);
const toast = useToast();
const handleSubmit = async () => {
    if(!userUid.value){
      toast.add({
         title: 'Sorry!', description: "Please login first!", icon: 'i-heroicons-information-circle', actions: [{
            label: 'Login',
            click: async () => await navigateTo(`/signin`)
         }]
      });
      return;
    }
    pendingRequest.value = true;
    if(comment.value.length<10){
        error.value = 'Comment too short, please type 15 characters or more';
        pendingRequest.value = false;
        return;
    }
    error.value = "";
    await addDoc (collection($db,"comments"),{
        text : comment.value,
        createdAt : serverTimestamp(),
        user_id : userUid.value,
        post_uid : props.post_uid
    })
    pendingRequest.value = false;
};
</script>
