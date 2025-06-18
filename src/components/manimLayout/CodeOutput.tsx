import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeOutputProps {
    code: string;
    language?: string;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({ code, language = "plaintext" }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div className="w-full h-full max-h-[20vh] bg-gradient-to-r from-[#18181b] via-[#15171a] to-[#1a222d] rounded-2xl shadow-xl border border-[#232323] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#232323] bg-[#18181b]">
                <span className="text-xs text-cyan-300 font-mono uppercase tracking-wider">{language}</span>
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
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeOutput;