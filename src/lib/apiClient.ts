import { ofetch } from "ofetch";
const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
const apiClient = ofetch.create({
  baseURL: baseUrl,
  credentials: "include",
});

export default apiClient;
