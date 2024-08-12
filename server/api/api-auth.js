import jwt from 'jsonwebtoken'
let auth_token;

export default defineEventHandler(async (event) => {
  const secret = process.env.AUTH_JWT_SECRET;
  auth_token = getCookie(event, "X-API-TOKEN");
  if (!auth_token) {
    auth_token = jwt.sign({ username: 'anonymous', issuer: 'fakt.social' }, secret, { expiresIn: '24h' });
    setCookie(event, "X-API-TOKEN", auth_token, { maxAge: 60 * 60 * 24, secure: true });
  }
  return "ok"
})