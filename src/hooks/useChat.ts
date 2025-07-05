import { useQuery } from "@tanstack/react-query";
import { getChatHistory } from "@/api/chatAPI";
import type { ChatHistory } from "@/zodTypes/chat";

export function useChat(projectId: string | undefined) {
  return useQuery<ChatHistory[]>({
    queryKey: ['chatHistory', projectId],
    queryFn: () => {
      if (!projectId) throw new Error("Project ID is required");
      return getChatHistory(projectId);
    },
    enabled: !!projectId,
  });
}