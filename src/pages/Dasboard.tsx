import { useState } from "react";
import { MoreVertical, FileVideo, FileCode2, X, Film, Code2 } from "lucide-react";
import ChatInterface from "@/components/manimLayout/ChatInterface";
import VideoPlayer from "@/components/manimLayout/VideoPlayer";
import CodeEditor from "@/components/manimLayout/CodeEditor";
import CodeOutput from "@/components/manimLayout/CodeOutput";
import ProjectList from "@/components/manimLayout/ProjectList";

const projectName = "Neural Network Animation";

export default function Dashboard() {
  const [showProjectList, setShowProjectList] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<"scenes" | "preview">("scenes");

  // Dummy code and video
  const code = `from manim import *\n\nclass Scene1(Scene):\n    def construct(self):\n        self.play(Create(Circle()))`;
  const videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4";

  // Show project list when hovering near left edge
  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.clientX < 32) setShowProjectList(true);
    else if (e.clientX > 400) setShowProjectList(false);
  };

  return (
    <div
      className="relative min-h-screen h-screen w-screen bg-gradient-to-br from-[#18181b] via-[#15171a] to-[#181b20] text-white overflow-hidden text-sm"
      onMouseMove={handleMouseMove}
    >
      {/* Project List Drawer (left side, hover to open) */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#18181b] border-r border-[#232323] shadow-2xl z-30 transition-transform duration-300 ${
          showProjectList ? "translate-x-0" : "-translate-x-full"
        }`}
        onMouseLeave={() => setShowProjectList(false)}
      >
        <div className="flex items-center justify-between px-3 py-3 border-b border-[#232323]">
          <span className="text-lg font-bold text-cyan-300">Projects</span>
          <button
            className="p-1.5 rounded hover:bg-[#232323]"
            onClick={() => setShowProjectList(false)}
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-1 py-1">
          <ProjectList />
        </div>
        <div className="px-3 py-2 border-t border-[#232323] text-xs text-[#b3b3b3]">
          © 2025 MAnim
        </div>
      </div>

      {/* Top Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-[#232323] bg-[#18181b] shadow z-20 h-[44px] text-base">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold tracking-tight text-cyan-300">MAnim</span>
        </div>
        {/* Center: Project Name + Menu */}
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">{projectName}</span>
          <div className="relative">
            <button
              className="p-1.5 rounded hover:bg-[#232323] transition"
              onClick={() => setShowMenu((v) => !v)}
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-[#232323] rounded shadow-lg z-30 text-sm">
                <button
                  className="w-full text-left px-3 py-2 hover:bg-[#18181b] transition"
                  onClick={() => {
                    setShowMenu(false);
                    // handle edit
                  }}
                >
                  Edit Project
                </button>
                <button
                  className="w-full text-left px-3 py-2 hover:bg-[#18181b] text-red-400 transition"
                  onClick={() => {
                    setShowMenu(false);
                    // handle delete
                  }}
                >
                  Delete Project
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Right: Export */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#232323] hover:bg-cyan-700 text-cyan-200 transition text-xs">
            <FileVideo className="w-4 h-4" /> Export Video
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#232323] hover:bg-cyan-700 text-cyan-200 transition text-xs">
            <FileCode2 className="w-4 h-4" /> Export Code
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-44px)] w-full">
        {/* Chat Section (left) */}
        <section className="flex flex-col justify-center items-center h-full w-[30vw] min-w-[260px] max-w-[340px] bg-[#18181b] border-r border-[#232323]">
          <div className="w-full h-full flex flex-col justify-center">
            <ChatInterface />
          </div>
        </section>

        {/* Right Panel: Tabs (no gap, fills remaining space) */}
        <aside className="flex-1 bg-[#18181b] flex flex-col h-full">
          {/* Tabs */}
          <div className="flex items-center border-b border-[#232323] bg-[#15171a]">
            <button
              className={`flex-1 py-2 text-center flex items-center justify-center gap-2 font-semibold text-base transition rounded-t-xl
                ${
                  activeTab === "scenes"
                    ? "bg-[#232323] text-cyan-200 shadow"
                    : "hover:bg-cyan-900/30 text-cyan-100"
                }`}
              onClick={() => setActiveTab("scenes")}
            >
              <Code2 className="w-4 h-4" />
              Scenes
            </button>
            <button
              className={`flex-1 py-2 text-center flex items-center justify-center gap-2 font-semibold text-base transition rounded-t-xl
                ${
                  activeTab === "preview"
                    ? "bg-[#232323] text-cyan-200 shadow"
                    : "hover:bg-cyan-900/30 text-cyan-100"
                }`}
              onClick={() => setActiveTab("preview")}
            >
              <Film className="w-4 h-4" />
              Preview
            </button>
          </div>
          {/* Tab Content */}
          <div className="flex-1 flex flex-col h-full w-full">
            {activeTab === "preview" && (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full flex justify-center items-center h-full">
                  <div className="w-full max-w-[520px] min-w-[320px] h-[60%] flex items-center justify-center">
                    <VideoPlayer src={videoSrc} />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "scenes" && (
              <div className="flex flex-col h-full w-full">
                <div className="flex-grow" style={{ flexBasis: "70%", minHeight: 0 }}>
                  <CodeEditor value={code} onChange={() => {}} />
                </div>
                <div className="flex-grow" style={{ flexBasis: "30%", minHeight: 0 }}>
                  <div className="h-full w-full">
                    <CodeOutput code={code} language="python" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}