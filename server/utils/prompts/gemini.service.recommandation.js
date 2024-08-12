import execute from "../gemini.wrapper";
async function run(data) {
    const parts = [
        { text: `You act as my recommendation engine for my social media. I will give you data representing my past interaction with posts.
            The information I will give you is in json format. You will return ids of posts I would like to see in order so that i can be more engaged, from the most interesting at the beginning to the least interesting.
            For posts I will give you the post id, first 80 characters max of the post content and the post tag.
            For my interaction, I will give you the ids of posts I have previously commented on or liked then also posts that i have saved as my favorites.
            In some cases I may not have seen anything yet (empty data for liked posts and/or commented posts), just return all post ids in any order.
            The information json will look like this:
            {
                "all_posts":[
                    {
                        post_id : "xxx",
                        post_content : "xxxx",
                        tag : "category"
                    },
                    ...
                ],
                "liked_posts":["post_id1","post_id2",...],
                "commented_on_posts":["post_id1","post_id2",...],
                "favorites_posts":["post_id1","post_id2",...]
            }
            And your response will be in json format, with the following format
            ["post_id1","post_id2",...]
            Note :
            - The number of posts returned must be equal to the number of posts available.
            - Post content can be in a different language and you should be able to understand the content regardless of the language
            `}, {
            text : `My informations : ${JSON.stringify(data)}`
        }
    ];
    const response = await execute(parts)
    return response;
}

export default run;