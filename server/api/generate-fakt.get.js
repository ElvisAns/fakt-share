import admin from "../utils/firebase-admin"
import run from "../utils/prompts/gemini.service.faktsgen"

//In prod this route will only accept if request come from cloudflare cron jobs
export default defineEventHandler(async (event) => {
    //admin
    try {
        const min = 5;
        const max = 20;
        const numberofposts = Math.floor(Math.random() * (max - min + 1)) + min;
        const gemini_response = await run(numberofposts);
        const new_posts = JSON.parse(gemini_response);
        const db = admin.firestore();
        const batch = db.batch();
        const postsCollection = db.collection('posts');

        new_posts.forEach(post => {
            const postRef = postsCollection.doc(); // Create a new document reference with an auto-generated ID
            batch.set(postRef, {
                ...post,
                featured : false,
                createdAt: admin.firestore.FieldValue.serverTimestamp(), // Adding server-side timestamp
                userId : process.env.FAKT_BOT_USER_ID
            });
        });

        try {
            await batch.commit();
            return `Batch write successful for ${numberofposts} posts`;
        } catch (error) {
            setResponseStatus(500);
            console.error('Error committing batch write:', error);
            return error;
        }
    }
    catch (error) {
        setResponseStatus(500);
        return error;
    }
})