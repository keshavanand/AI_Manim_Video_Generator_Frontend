import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { useProjectStore } from "@/store/states";
import { useEditProject } from "@/hooks/useProject";
import { useChat } from "@/hooks/useChat";
import type { Scene } from "@/zodTypes/scene";
import { ErrorFixPanel } from "./ErrorFixPanel";

interface ChatProps{
  errorScenes: Scene[];
}

export const ChatInterface: React.FC<ChatProps>=({
  errorScenes = [],
})=>{
  const { currentProject } = useProjectStore();
  const createMutation = useEditProject();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Local messages state is synced with chatHistory
  const { data: chatHistory, refetch } = useChat(currentProject?.id || "");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", from: "bot" },
  ]);

  // Sync messages with chatHistory from backend
  useEffect(() => {
    if (chatHistory && Array.isArray(chatHistory)) {
      try {
        setMessages(
          chatHistory.map((msg) => ({
            text: msg.content,
            from: msg.role === "user" ? "user" : "bot",
          }))
        );
      } catch (error) {
        console.error("Error parsing chat history:", error);
        setMessages([]);
      }
    }
  }, [chatHistory]);

  // Scroll to bottom on messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle user input submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsLoading(true);

    // Optimistically add user message
    setMessages((prev) => [
      ...prev,
      { text: input, from: "user" }
    ]);

    try {
      await createMutation.mutateAsync({
        id: currentProject?.id,
        prompt: input,
      });
      setInput("");
      // Refetch chat history to get latest messages from backend
      await refetch();
    } catch (error) {
      console.log("Error:error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorFix = async (scene:Scene) =>{
    setIsLoading(true);
    try{
      await createMutation.mutateAsync({
        id: currentProject?.id,
        prompt: scene.scene_output + "Fix this error"
      })
      await refetch();
    }catch (error){
      console.log("Error", error)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-[#18181b] via-[#15171a] to-[#1a222d] rounded-2xl shadow-xl border border-[#232323]">
      {/* Chat Header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-[#232323] bg-[#18181b] rounded-t-2xl">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <h1 className="text-lg font-semibold text-white">AI Chat</h1>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, idx) =>
          msg.from === "bot" ? (
            <div className="flex items-start gap-2" key={idx}>
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-white shadow">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-cyan-900/60 text-cyan-100 px-4 py-3 rounded-2xl rounded-bl-none max-w-xl w-full sm:w-fit shadow border border-cyan-800/40 backdrop-blur break-words overflow-hidden">
                {msg.text}
              </div>
            </div>
          ) : (
            <div className="flex justify-end" key={idx}>
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-3 rounded-2xl rounded-br-none max-w-xl w-full sm:w-fit shadow border border-cyan-400/40 break-words overflow-hidden">
                {msg.text}
              </div>
            </div>
          )
        )}
        {errorScenes.length > 0 && (
          <ErrorFixPanel scenes={errorScenes} onFix={handleErrorFix} />
        )}
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-white shadow">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-cyan-900/60 text-cyan-100 px-4 py-3 rounded-2xl rounded-bl-none max-w-xl shadow border border-cyan-800/40 backdrop-blur">
              <span className="italic opacity-70">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      {/* Input */}
      <form
        className="px-6 py-4 border-t border-[#232323] bg-[#18181b] rounded-b-2xl flex items-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-xl border border-[#232323] bg-[#101012] text-white placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-cyan-500/60 transition"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-5 py-3 rounded-xl transition-colors hover:from-cyan-400 hover:to-blue-400 disabled:opacity-60 flex items-center gap-2"
          disabled={!input.trim() || isLoading}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
