import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Github, Figma } from "lucide-react";
import { useCreateProject } from "@/hooks/useProject";
import { useProjectStore } from "@/store/states";
const suggestions = [
	"Visualize the Pythagorean theorem",
	"Animate sorting algorithms",
	"Explain neural networks",
	"Show a circle inscribed in a triangle",
];

export default function Project() {
	const [prompt, setPrompt] = useState("");
	const navigate = useNavigate();
	const createMutation  = useCreateProject();
	const [loading, setLoading] = useState(false);
	const setCurrentProject = useProjectStore((state)=> state.setCurrentProject)

	// Replace with your actual project creation logic
	const createProject = async (prompt: string) => {
		try {
			setLoading(true);
			const project = await createMutation.mutateAsync({ prompt });
			setCurrentProject({...project})
			navigate("/dashboard");
		} catch (error) {
			console.error("Failed to create project", error);
			// Optional: show error toast or message
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-t from-[#10151c] via-[#18181b] to-[#1a222d] flex flex-col items-center px-2 text-sm">
			{/* Header */}
			<header className="w-full flex items-center justify-between py-4 px-2 md:px-8">
				<div className="flex items-center gap-2">
					<Sparkles className="w-6 h-6 text-cyan-400" />
					<span className="text-xl font-bold tracking-tight text-white">
						ManiMind
					</span>
				</div>
				<nav className="flex items-center gap-5 text-[#b3b3b3] text-xs">
					<a
						href="#"
						className="hover:text-white transition"
					>
						Community
					</a>
					<a
						href="#"
						className="hover:text-white transition"
					>
						Resources
					</a>
					<a
						href="#"
						className="hover:text-white transition"
					>
						Pricing
					</a>
				</nav>
			</header>

			{/* Hero */}
			<main className="flex flex-col items-center justify-center flex-1 w-full">
				<h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1 text-center">
					What do you want to animate?
				</h1>
				<p className="text-base text-[#b3b3b3] mb-5 text-center">
					Create stunning math & science animations by chatting with AI.
				</p>
				{/* Prompt Box */}
				<form
					className="w-full max-w-md bg-[#18181b] border border-[#232323] rounded-xl shadow-lg p-4 mb-4 flex flex-col gap-3"
					onSubmit={(e) => {
						e.preventDefault();
						if (prompt.trim()) createProject(prompt);
					}}
				>
					<input
						className="w-full bg-transparent text-white text-base placeholder:text-[#888] outline-none border-none"
						placeholder="Describe your animation idea..."
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						autoFocus
					/>
					{loading ? (
						<Button disabled className="self-end bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs">
							Creating...</Button>
						):(<Button
							type="submit"
							size="sm"
							className="self-end bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs"
							disabled={!prompt.trim()}
							>
								Start Project{" "}
								<ArrowRight className="w-4 h-4" />
							</Button>
						)}
				</form>
				{/* Suggestions */}
				<div className="flex flex-wrap gap-2 justify-center mb-5">
					{suggestions.map((s, i) => (
						<button
							key={i}
							className="bg-white/10 hover:bg-cyan-500/20 text-white px-3 py-1.5 rounded-full text-xs transition border border-[#232323]"
							onClick={() => {
								setPrompt(s);
								/*setTimeout(() => createProject(s), 300); // quick UX*/
							}}
						>
							{s}
						</button>
					))}
				</div>
				{/* Import from */}
				{/* <div className="flex items-center gap-3 mb-5">
					<span className="text-[#b3b3b3] text-xs">or import from</span>
					<button className="flex items-center gap-2 bg-[#232323] hover:bg-cyan-500/20 text-white px-3 py-1.5 rounded-full text-xs border border-[#232323]">
						<Figma className="w-4 h-4" /> Figma
					</button>
					<button className="flex items-center gap-2 bg-[#232323] hover:bg-cyan-500/20 text-white px-3 py-1.5 rounded-full text-xs border border-[#232323]">
						<Github className="w-4 h-4" /> GitHub
					</button>
				</div> */}
				{/* Quick actions */}
				<div className="flex flex-wrap gap-2 justify-center">
					<button className="bg-[#232323] hover:bg-cyan-500/20 text-white px-3 py-1.5 rounded-full text-xs border border-[#232323]">
						Animate a proof
					</button>
					<button className="bg-[#232323] hover:bg-cyan-500/20 text-white px-3 py-1.5 rounded-full text-xs border border-[#232323]">
						Visualize a formula
					</button>
					<button className="bg-[#232323] hover:bg-cyan-500/20 text-white px-3 py-1.5 rounded-full text-xs border border-[#232323]">
						Explain a concept
					</button>
				</div>
			</main>

			{/* Footer */}
			<footer className="mt-auto py-6 px-8 border-t border-[#232323] bg-[#18181b] text-center text-[#b3b3b3] text-sm">
				© {new Date().getFullYear()} Manim AI. All rights reserved.
			</footer>
		</div>
	);
}