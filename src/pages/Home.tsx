import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, Code, Sparkles, Pencil, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <Sparkles className="w-6 h-6 text-cyan-300" />,
    title: "AI-Powered Animation",
    desc: "Describe your idea in plain English and let our AI generate Manim code for you.",
  },
  {
    icon: <Code className="w-6 h-6 text-cyan-300" />,
    title: "Editable Scenes",
    desc: "Edit generated code for each scene directly in your browser with instant preview.",
  },
  {
    icon: <Video className="w-6 h-6 text-cyan-300" />,
    title: "Instant Video Output",
    desc: "Get high-quality Manim video output in seconds, ready to download or share.",
  },
  {
    icon: <Pencil className="w-6 h-6 text-cyan-300" />,
    title: "Manual Fine-Tuning",
    desc: "Tweak any part of the animation manually for full creative control.",
  },
];

export default function Home() {
  // Demo data
  const demoPrompt = "Show the Pythagorean theorem visually";
  const demoCode = `from manim import *

class Pythagoras(Scene):
    def construct(self):
        square = Square()
        self.play(Create(square))
        # ...more code...
`;
  const demoVideo = "src/Demo.mp4";

  // Feature hover state
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Demo code copy state
  const [copied, setCopied] = useState(false);

  // Copy code to clipboard
  const handleCopy = async () => {
    await navigator.clipboard.writeText(demoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#232323] to-[#101014] text-white font-sans flex flex-col text-base">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-[#232323] bg-[#18181b]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-300" />
          <span className="text-2xl font-bold tracking-tight">Manim AI</span>
        </div>
        <nav className="flex items-center gap-3">
          <Button variant="ghost" className="px-3 py-2 text-base" onClick={() => navigate("/login")}>
            <span className="flex items-center gap-1"><LogIn className="w-5 h-5" />Login</span>
          </Button>
          <Button variant="ghost" className="px-3 py-2 text-base" onClick={() => navigate("/register")}>
            <span className="flex items-center gap-1"><UserPlus className="w-5 h-5" />Register</span>
          </Button>
          <Button className="px-5 py-2 text-base font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded" onClick={() => navigate("/project")}>
            Head Start
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-14 px-2 bg-gradient-to-b from-[#18181b] to-black">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight leading-tight">
          Create Stunning Math Animations <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
            with AI & Manim
          </span>
        </h1>
        <p className="text-lg md:text-xl text-[#b3b3b3] mb-6 max-w-2xl">
          Describe your idea, let AI generate Manim code, and get instant video output. Edit scenes, tweak code, and bring your math concepts to life.
        </p>
        <Button size="lg" className="text-lg px-8 py-4 font-semibold bg-cyan-600 hover:bg-cyan-500" onClick={() => navigate("/register")}>
          Get Started Free
        </Button>
      </section>

      {/* Features */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 bg-[#18181b] rounded-xl border border-[#232323] p-6 shadow transition-all cursor-pointer
                ${hoveredFeature === i ? "border-cyan-400 shadow-cyan-300/20 scale-[1.025]" : "hover:border-cyan-400 hover:shadow-cyan-300/10"}
              `}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
              tabIndex={0}
              aria-label={f.title}
            >
              <div className="flex-shrink-0 bg-[#232323] rounded-lg p-3">{f.icon}</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
                <p className="text-[#b3b3b3] text-base">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Demo */}
      <section className="py-10 px-4 max-w-5xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-8 text-center">See It In Action</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Prompt & Code */}
          <div className="flex-1 w-full">
            <div className="mb-2 text-sm text-[#b3b3b3]">Prompt</div>
            <div className="bg-[#18181b] border border-[#232323] rounded-lg p-4 font-mono text-white text-base">
              {demoPrompt}
            </div>
            <div className="mb-2 mt-6 text-sm text-[#b3b3b3] flex items-center justify-between">
              <span>Generated Manim Code</span>
              <button
                className="text-cyan-400 hover:underline text-sm px-1"
                onClick={handleCopy}
                aria-label="Copy code"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-black border border-[#232323] rounded-lg p-4 text-base text-white overflow-x-auto font-mono whitespace-pre-wrap">
              {demoCode}
            </pre>
          </div>
          {/* Video */}
          <div className="flex-1 w-full flex flex-col items-center">
            <div className="mb-2 text-sm text-[#b3b3b3]">Output Video</div>
            <div className="bg-[#18181b] border border-[#232323] rounded-lg p-4 flex items-center justify-center">
              <video
                src={demoVideo}
                autoPlay
                muted
                playsInline
                loop
                className="rounded-lg w-full max-w-md bg-black border border-[#232323]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-10 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">About Manim AI</h2>
        <p className="text-[#b3b3b3] text-lg">
          Manim AI Animation Generator is built for educators, students, and creators who want to visualize math and science concepts effortlessly. Powered by advanced AI and the Manim engine, our platform turns your ideas into beautiful, editable animations in seconds.
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-5 px-8 border-t border-[#232323] bg-[#18181b] text-center text-[#b3b3b3] text-base">
        © {new Date().getFullYear()} Manim AI. All rights reserved.
      </footer>
    </div>
  );
}