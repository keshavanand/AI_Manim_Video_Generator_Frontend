import type { ChatHistory } from "@/zodTypes/chat";
import instance from "./axiosInstance";



export async function getChatHistory(projectId: string): Promise<ChatHistory[]> {
  const response = await instance.get(`/chat/history/${projectId}`);
  return response.data;
}