import admin from "../utils/firebase-admin";
import run from "../utils/prompts/gemini.service.faktsgen";

const useTags = (toGet) => {
    const list = {
        "uselect": [
            { name: "General", value: "general" },
            { name: "Language", value: "language" },
            { name: "Mathematics", value: "math" },
            { name: "Programming", value: "programming" },
            { name: "Science", value: "science" },
            { name: "Technology", value: "technology" },
            { name: "Health", value: "health" },
            { name: "Education", value: "education" },
            { name: "Sports", value: "sports" },
            { name: "History", value: "history" },
            { name: "Art", value: "art" },
            { name: "Literature", value: "literature" },
            { name: "Geography", value: "geography" },
            { name: "Music", value: "music" },
            { name: "Movies", value: "movies" },
            { name: "Nature", value: "nature" },
            { name: "Travel", value: "travel" },
            { name: "Food", value: "food" },
            { name: "Business", value: "business" },
            { name: "Economics", value: "economics" },
            { name: "Politics", value: "politics" },
            { name: "Psychology", value: "psychology" },
            { name: "Philosophy", value: "philosophy" },
            { name: "Astronomy", value: "astronomy" },
            { name: "Environment", value: "environment" },
            { name: "Engineering", value: "engineering" },
            { name: "Law", value: "law" },
            { name: "Sociology", value: "sociology" },
            { name: "Religion", value: "religion" },
            { name: "Culture", value: "culture" },
            { name: "Fashion", value: "fashion" },
            { name: "Animals", value: "animals" },
            { name: "Physics", value: "physics" },
            { name: "Chemistry", value: "chemistry" },
            { name: "Biology", value: "biology" },
            { name: "Gaming", value: "gaming" },
            { name: "Fitness", value: "fitness" },
            { name: "Lifestyle", value: "lifestyle" },
            { name: "Finance", value: "finance" },
            { name: "DIY", value: "diy" },
        ],
        "ui": [
            { tags: "General", filter: "general" },
            { tags: "Language", filter: "language" },
            { tags: "Mathematics", filter: "math" },
            { tags: "Programming", filter: "programming" },
            { tags: "Science", filter: "science" },
            { tags: "Technology", filter: "technology" },
            { tags: "Health", filter: "health" },
            { tags: "Education", filter: "education" },
            { tags: "Sports", filter: "sports" },
            { tags: "History", filter: "history" },
            { tags: "Art", filter: "art" },
            { tags: "Literature", filter: "literature" },
            { tags: "Geography", filter: "geography" },
            { tags: "Music", filter: "music" },
            { tags: "Movies", filter: "movies" },
            { tags: "Nature", filter: "nature" },
            { tags: "Travel", filter: "travel" },
            { tags: "Food", filter: "food" },
            { tags: "Business", filter: "business" },
            { tags: "Economics", filter: "economics" },
            { tags: "Politics", filter: "politics" },
            { tags: "Psychology", filter: "psychology" },
            { tags: "Philosophy", filter: "philosophy" },
            { tags: "Astronomy", filter: "astronomy" },
            { tags: "Environment", filter: "environment" },
            { tags: "Engineering", filter: "engineering" },
            { tags: "Law", filter: "law" },
            { tags: "Sociology", filter: "sociology" },
            { tags: "Religion", filter: "religion" },
            { tags: "Culture", filter: "culture" },
            { tags: "Fashion", filter: "fashion" },
            { tags: "Animals", filter: "animals" },
            { tags: "Physics", filter: "physics" },
            { tags: "Chemistry", filter: "chemistry" },
            { tags: "Biology", filter: "biology" },
            { tags: "Gaming", filter: "gaming" },
            { tags: "Fitness", filter: "fitness" },
            { tags: "Lifestyle", filter: "lifestyle" },
            { tags: "Finance", filter: "finance" },
            { tags: "DIY", filter: "diy" }
        ]
    }
    return list[toGet];
}


// In production, this route will only accept requests from Cloudflare cron jobs
export default defineEventHandler(async (event) => {
    try {
        const min = 5;
        const max = 20;
        const numberOfPosts = Math.floor(Math.random() * (max - min + 1)) + min;

        // Step 1: Get the list of tags from useTags utility
        const tagsList = useTags("uselect").map(tag => tag.value);

        // Step 2: Select a random tag from the existing tags
        const selectedTag = tagsList[Math.floor(Math.random() * tagsList.length)];

        // Step 3: Get existing content for the selected tag to avoid duplicates
        const db = admin.firestore();
        const postsCollection = db.collection('posts');
        const existingPostsSnapshot = await postsCollection.where('tag', '==', selectedTag).get();
        const existingContent = existingPostsSnapshot.docs.map(doc => doc.data().faktContent);

        // Step 4: Generate new facts using the Gemini service
        const geminiResponse = await run(numberOfPosts, selectedTag, existingContent);
        const newPosts = JSON.parse(geminiResponse);

        // Step 5: Batch write the new posts to the database
        const batch = db.batch();

        newPosts.forEach(post => {
            const postRef = postsCollection.doc(); // Create a new document reference with an auto-generated ID
            batch.set(postRef, {
                ...post,
                featured: false,
                createdAt: admin.firestore.FieldValue.serverTimestamp(), // Adding server-side timestamp
                userId: process.env.FAKT_BOT_USER_ID
            });
        });

        await batch.commit();
        return `Batch write successful for ${numberOfPosts} posts`;
    } catch (error) {
        setResponseStatus(500);
        console.error('Error processing request:', error);
        return error.message;
    }
});
