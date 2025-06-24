import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { Scene } from "@/zodTypes/scene";

interface CodeOutputProps {
    selectedScene?: Scene;
    placeholder?: string;
    className?: string;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({ 
    selectedScene,
    placeholder="Output",
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(selectedScene?.scene_output || placeholder);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div className="w-full h-full flex-1 bg-gradient-to-r from-[#18181b] via-[#15171a] to-[#1a222d] rounded-2xl shadow-xl border border-[#232323] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#232323] bg-[#18181b]">
                <span className="text-xs text-cyan-300 font-mono uppercase tracking-wider">Output</span>
                <button
                    className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/80 hover:bg-cyan-400/90 text-white text-xs font-semibold transition"
                    onClick={handleCopy}
                    type="button"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre className="flex-1 w-full overflow-x-auto overflow-y-auto bg-[#101012] text-white text-sm font-mono p-4 rounded-b-2xl">
                <code>{selectedScene?.scene_output || placeholder}</code>
            </pre>
        </div>
    );
};

export default CodeOutput;