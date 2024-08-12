import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => { //shoudbe cached to avoid translating some content and request api
    const auth_token = getCookie(event, "X-API-TOKEN");
    const secret = process.env.AUTH_JWT_SECRET;
    try {
        jwt.verify(auth_token, secret);
        const { action, post_id } = getQuery(event);
        return await fetch(`https://faktshare-views-tracker.kvolts-labs.workers.dev/?action=${action}&post_id=${post_id}`);
    }
    catch (error) {
        setResponseStatus(event, 401);
        return {
            error: `You don't have access to this ressource`,
        }
    }
})