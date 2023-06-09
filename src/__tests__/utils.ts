import Api from "../api";

const apiKey = process.env.MONDAY_API_KEY;
const api = new Api(apiKey as string);
export default api;
