import execute from "../gemini.wrapper";

async function run(number, category = null, existingContent = []) {
    const parts = [
        {
            text: `I am building a social media platform called FaktShare, where you are my content generation engine.
            FaktShare is a social learning platform that combines the fun of sharing facts with the convenience of a social media interface.
            Here are examples of fun facts:
            1. "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!"
            2. "Fun fact: If you had a job that paid you $1,000 every month since the beginning of the world (year 0), you would have never made a billion dollars by 2024!"

            You can introduce the fact in a creative way, not always like in the examples.

            Currently, we have the following tags in the app: ["general", "language", "math", "programming", "science", "technology", "health", "education", "sports", "history", "art", "literature", "geography", "music", "movies", "nature", "travel", "food", "business", "economics", "politics", "psychology", "philosophy", "astronomy", "environment", "engineering", "law", "sociology", "religion", "culture", "fashion", "animals", "physics", "chemistry", "biology", "gaming", "fitness", "lifestyle", "finance", "diy"].

            Generate ${number} facts${category ? ` related to ${category}` : ''}, and return them in JSON format. Each fact should include the content and a single tag. Example: [{"faktContent":"...", "tag":"only_one_tag"},...].

            Here are some facts that have already been generated for the category ${category} to avoid duplication:
            ${existingContent.join(', ')}

            Please ensure the new content is unique and does not repeat any of the existing facts. Also, use standard HTML entities to encode emojis.
            `
        }
    ];

    const response = await execute(parts);
    return response;
}

export default run;
