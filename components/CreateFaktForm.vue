<template>
    <form @submit.prevent="handleSubmit" @reset="handleFormReset" class="pb-5 px-1" v-if="userIdCookie">
        <div class="relative mt-10">
            <div class="py-2">
                <img class="w-full max-h-56 object-cover rounded-lg mb-3" v-show="imagepath" :src="imagepath">
                <UInput type="file" @change="(event) => handleFileChange(event)" accept="image/*"
                    placeholder="Choose caption image(not required)" size="sm" icon="i-heroicons-photo" />
                <p class="text-red-500 pb-1" v-show="formErrors.image">{{ formErrors.image }}</p>
            </div>
            <div class="pb-5 pt-4">
                <UTextarea v-model="post" resize placeholder="Post content..." rows.Number="3" class="w-full pb-1"
                    :color="formErrors.post ? 'red' : 'primary'" />
                <div class="flex w-full justify-between gap-2 flex-wrap">
                    <p class="text-red-500" v-show="formErrors.post">{{ formErrors.post }}</p>
                    <p class="text-right text-xs text-slate-400">{{ post.length }} / 1000</p>
                </div>
            </div>
            <div>
                <USelect v-model="tag" :options="tags" placeholder="Select one tag" />
                <p class="text-red-500" v-show="formErrors.tag">{{ formErrors.tag }}</p>
            </div>
        </div>
        <div class="mt-5 flex items-start justify-between gap-4 flex-col">
            <div class="flex items-center justify-around gap-4 w-full">
                <UButton type="submit" loading-icon="i-heroicons-sparkles" variant="solid" label="Post"
                    icon="i-heroicons-rocket-launch" :loading="uploading" :disabled="uploading" color="blue"
                    class="px-6 py-2 transition duration-300 scan-button font-extrabold">
                </UButton>
                <UButton type="reset" variant="solid" label="Reset" icon="i-heroicons-exclamation-circle"
                    :disabled="uploading" color="primary"
                    class="px-6 py-2 transition duration-300 scan-button font-extrabold">
                </UButton>
            </div>
            <UProgress :value="uploadProgress" indicator v-if="uploading" />
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { collection, query, where, doc, updateDoc, addDoc, getDoc, getDocs, getCountFromServer, serverTimestamp } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref as fbref } from 'firebase/storage';
const userInfos = useState("userInfos", () => { return { photoURL: "", displayName: "", email: "" } });
const userIdCookie = useCookie('userId');
const { $db, $storage } = useNuxtApp()
defineProps(['tags'])

const formErrors = reactive({ post: "", image: "", tag: "" })
const post = ref('');
const tag = ref(null);
const uploading = ref(false)
let reader = null;

onMounted(() => {
    reader = new FileReader();
    reader.onload = function (e) {
        if (selectedFile.type.startsWith('image/')) {
            imagepath.value = e.target.result;
        }
        else {
            imagepath.value = null;
        }
    };
})

const imagepath = ref('');

watch(post, (newValue) => {
    if (newValue.length > 1000) {
        post.value = newValue.substring(0, 1000);
    }
})
const illustrationPath = ref(null); //will come from firebase storage
const uploadProgress = ref(0);
let selectedFile = null;
const handleFileChange = (filelist) => {
    selectedFile = filelist[0];
    validedate_image_input();
    reader.readAsDataURL(selectedFile);
}
const validedate_image_input = () => {
    if (!selectedFile) {
        formErrors.image = "";
        return;
    }
    if (!selectedFile.type.startsWith('image/')) { //if user selected a file then we type check it
        formErrors.image = "Please select a valid image file.";
        return;
    }
    const maxSizeInMB = 1;
    if (selectedFile.size > maxSizeInMB * 1024 * 1024) {
        formErrors.image = "File size exceeds the 1MB limit.";
        return;
    }
    formErrors.image = "";
}

const upload_image_to_storage = () => {
    return new Promise((resolve, reject) => {
        try {
            // Generate a unique ID for the file
            const id = window.crypto.randomUUID();
            const storageRef = fbref($storage, `post_illustrations/${id}-${selectedFile.name}`);

            const uploadTask = uploadBytesResumable(storageRef, selectedFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    uploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.error('Upload failed:', error);
                    formErrors.image = "Error uploading this image, please try again.";
                    reject(error); // Reject the promise on error
                },
                async () => {
                    try {
                        formErrors.image = "";
                        const path = await getDownloadURL(uploadTask.snapshot.ref);
                        illustrationPath.value = path;
                        resolve(path); // Resolve the promise with the download URL
                    } catch (error) {
                        console.error('Error getting download URL:', error);
                        formErrors.image = "Error retrieving the download URL, please try again.";
                        reject(error); // Reject the promise if there's an error getting the URL
                    }
                }
            );
        } catch (error) {
            console.error('Error uploading file:', error);
            formErrors.image = "Error uploading this image, please try again.";
            reject(error); // Reject the promise on error
        }
    });
};

const toast = useToast()
let createPostid = null;
const actions = ref([{
  label: 'View post',
  click: async () => await navigateTo(`/posts/${createPostid}`)
}
])

const handleFormReset = () => {
    formErrors.image = "";
    formErrors.post = "";
    selectedFile = null;
    imagepath.value = null;
}
const handleSubmit = async () => {
    validedate_image_input();
    if (post.value.length < 30) {
        formErrors.post = `Too short, missing at least ${30 - post.value.length} chars`;
    }
    else {
        formErrors.post = "";
    }
    if (!tag.value) {
        formErrors.tag = "Please select one tag/category"
    }
    else {
        formErrors.tag = ""
    }
    if (formErrors.post || formErrors.image || formErrors.tag) {
        return;
    }
    uploading.value = true;
    if(selectedFile) await upload_image_to_storage();
    if (!selectedFile || !formErrors.image) {
        const doc = await addDoc(collection($db, "posts"), {
            faktContent: post.value,
            illustration: illustrationPath.value,
            tag: tag.value,
            userId: userIdCookie.value,
            featured: false,
            createdAt: serverTimestamp()
        });
        createPostid = doc.id;
        toast.add({ title: 'Great job.',description:'Your post was uploaded with success!',actions:actions,icon:'i-heroicons-information-circle' })
        handleFormReset();
    }
    setTimeout(() => {
        uploading.value = false;
    }, 1000)
};
</script>
