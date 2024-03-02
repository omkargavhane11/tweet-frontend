export const API =
  process.env.NODE_ENV === "production"
    ? "https://tweet-backend-production.up.railway.app"
    : "http://localhost:8080";
