import run from '~/server/utils/prompts/gemini.service.recommandation';
import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => { //shoudbe cached to avoid translating some content and request api
    const auth_token = getCookie(event, "X-API-TOKEN");
    const secret = process.env.AUTH_JWT_SECRET;
    const body = await readBody(event);
    try {
        jwt.verify(auth_token, secret);
        const { data } = body;
        const gemini_response = await run(data);
        return gemini_response;
    }
    catch (error) {
        setResponseStatus(event, 401);
        return {
            error: `You don't have access to this ressource`,
        }
    }
})