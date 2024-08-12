<template>
    <div v-if="Object.keys(fakt).length == 0">
        <div class="flex space-x-4 mt-5 mr-5">
            <USkeleton class="h-12 aspect-1" :ui="{ rounded: 'rounded-full' }" />
            <div class="space-y-2 w-full">
                <USkeleton class="h-4 w-full" />
                <USkeleton class="h-24 w-full" />
            </div>
        </div>
    </div>
    <div v-if="Object.keys(fakt).length > 0">
        <NuxtLink to="/explore" class="text-sm font-bold mb-3">
            <UIcon name="i-heroicons-chevron-left"></UIcon> Home
        </NuxtLink>
        <FaktCard v-if="Object.keys(fakt).length > 0" :names="fakt.names" :key="fakt.id" :userId="fakt.userId"
            :createdAt="fakt.createdAt" :faktContent="fakt.faktContent" :illustration="fakt.illustration"
            :tag="fakt.tag" :post_uid="fakt.id" />
        <CommentForm v-if="post_id" :post_uid="post_id" />
        <UDivider :label="`comment (${comments.length})`" :ui="{ label: 'text-orange-500' }" />
        <Comment v-for="comment in comments" :key="comment.id" :id="comment.id" :comment="comment.text"
            :createdAt="comment.createdAt" :userId="comment.user_id" />
    </div>
</template>

<script setup>
import { query, collection, onSnapshot, where, orderBy, doc, getDoc, getDocs } from 'firebase/firestore';

const { $db } = useNuxtApp();
const route = useRoute();
definePageMeta({
    layout: 'feed'
})
const fakt = ref({})
const post_id = route.params.id;
const comments = ref([]);
onMounted(async () => {
    const postRef = doc($db, "posts", post_id);
    const postSnapshot = await getDoc(postRef);
    if (postSnapshot.exists()) {
        fakt.value = { id: postSnapshot.id, ...postSnapshot.data() };
        const commentSnapshot = query(collection($db, "comments"), where("post_uid", "==", fakt.value.id), orderBy("createdAt", "desc"));
        const sn = await getDocs(commentSnapshot);
        onSnapshot(commentSnapshot, (querySnapshot) => {
            const values = [];
            querySnapshot.forEach((doc) => {
                if (!doc.metadata.hasPendingWrites) { //only server changes
                    values.push({ id: doc.id, ...doc.data() })
                }
            })
            comments.value = values;
        })
    } else {
        throw createError({
            statusCode: 404,
            statusMessage: 'Post Not Found',
            fatal: true
        })
    }
})
</script>