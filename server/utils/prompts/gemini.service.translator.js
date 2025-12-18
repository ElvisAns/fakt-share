import execute from "../gemini.wrapper";
async function run(prompt,language) {
    const content = `Your role is to translate the following text from detected language to ${language}.
        Text to translate: ${prompt}`;
    const response = await execute(content);
    return response;
}

export default run;