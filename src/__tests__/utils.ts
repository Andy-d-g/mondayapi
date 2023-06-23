import Api from "../api";

const apiKey = process.env.MONDAY_API_KEY;
if (!apiKey) throw new Error("Api key not found");
const api = new Api(apiKey);
export default api;
