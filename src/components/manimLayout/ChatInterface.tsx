import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { useProjectStore } from "@/store/states";
import { useCreateProject } from "@/hooks/useProject";

export default function ChatInterface() {
  const {currentProject} = useProjectStore();
  const createMutation  = useCreateProject();
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", from: "bot" },
    { text: "Can you explain how this chat works?", from: "user" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, from: "user" as const };
    setMessages((msgs) => [...msgs, userMessage]);
    await createMutation.mutateAsync({
      id: currentProject?.id,
      prompt: input,
    })
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          text:
            "This is an AI-generated response to your prompt: " +
            userMessage.text,
          from: "bot" as const,
        },
      ]);
      setIsLoading(false);
    }, 1200);
  };

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
              <div className="bg-cyan-900/60 text-cyan-100 px-4 py-3 rounded-2xl rounded-bl-none max-w-xl shadow border border-cyan-800/40 backdrop-blur">
                {msg.text}
              </div>
            </div>
          ) : (
            <div className="flex justify-end" key={idx}>
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-3 rounded-2xl rounded-br-none max-w-xl shadow border border-cyan-400/40">
                {msg.text}
              </div>
            </div>
          )
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