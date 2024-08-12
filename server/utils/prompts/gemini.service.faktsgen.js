import execute from "../gemini.wrapper";
async function run() {
    const parts = [
        {
            text: `I am building a social media called fakt and you are my content generation engine. 
            FaktShare is a social learning platform that combines the fun of sharing facts with the convenience of a social media interface
            Example of a fun fact : "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!"
            Example 2 : "Fun fact : If you had a job that was paying you a 1000$ every month, since the beging of the world(year 0) you would have never make a Billion dollar till this year? 2024?"
            You can introduce the fact in any fancy fashion not always i started in my two example.
            `}, {
            text: `Here are the tags we currently want in the app 
            ["general","language","math","programming","science","technology","health","education","sports","history","art","literature","geography","music","movies","nature","travel","food","business","economics","politics","psychology","philosophy","astronomy","environment","engineering","law","sociology","religion","culture","fashion","animals","physics","chemistry","biology","gaming","fitness","lifestyle","finance","diy"]`,
            text: `Please generate 20 facts and return them in json format. Your reponse shoud contain the post content and the tag as well
            example : "[{"faktContent":"...","tag":"only_one_tag"},..].
            Please use standard htmlentities to encode emojis
            `
        }
    ];
    const response = await execute(parts)
    return response;
}

export default run;