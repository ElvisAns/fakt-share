import execute from "../gemini.wrapper";
async function run(prompt,language) {
    const parts = [
        { text: `Your role is to translate the following text from detected language to ${language}.`}, {
            text : `${prompt}`
        }
    ];
    const response = await execute(parts)
    return response;
}

export default run;