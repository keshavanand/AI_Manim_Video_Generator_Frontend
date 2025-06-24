import { useState } from "react";
import { MoreVertical, FileVideo, FileCode2, X} from "lucide-react";
import ChatInterface from "@/components/manimLayout/ChatInterface";
import VideoPlayer from "@/components/manimLayout/VideoPlayer";
import CodeEditor from "@/components/manimLayout/CodeEditor";
import CodeOutput from "@/components/manimLayout/CodeOutput";
import ProjectList from "@/components/manimLayout/ProjectList";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteProject, useUpdateProject } from "@/hooks/useProject";
import { useProjectStore } from "@/store/states";
import { useScenes } from "@/hooks/useScene";
import type { Scene } from "@/zodTypes/scene";

export default function Dashboard() {
  const [showProjectList, setShowProjectList] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {currentProject, setCurrentProject} = useProjectStore();
  const [ editMode, setEditMode ] = useState(false);
  const {logout} = useAuth();
  const  updateMutation = useUpdateProject()
  const deleteMutation = useDeleteProject()
  const {data: scenes=[]} = useScenes(currentProject?.id || "");
  const [selectedScene, setSelectedScene] = useState<Scene>();

  // Handle project edit
  const handleProjectEdit = () => {
    if (currentProject){
      updateMutation.mutate({
        id: currentProject.id,
        updateData: {
          title: currentProject.title
        }
      })
    }
    setEditMode(false)
  }

  const handleProjectDelete = () => {
    if (currentProject){
      deleteMutation.mutate(currentProject.id)
    }
  }
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
          <ProjectList/>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex flex-col">
          <div className="flex justify-end px-3 py-2 border-t border-[#232323]">
            <button
              onClick={logout}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#232323] hover:bg-cyan-700 text-cyan-200 transition text-xs"
            >
              <X className="w-4 h-4" /> Logout
            </button>
          </div>
          <div className="px-3 pb-2 text-xs text-[#b3b3b3] text-left">
            © 2025 MAnim
          </div>
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
          {!editMode ? 
          <span className="text-base font-semibold">{currentProject?.title}</span> :
          <input autoFocus className="bg-[#232323] text-cyan-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
            type="text"
            value={currentProject?.title || ""}
            onChange={(e) => {
              if (currentProject) {
                setCurrentProject({
                  ...currentProject,
                  title: e.target.value,
                });
              }
            }}
            onKeyDown={(e)=>{
              if(e.key === 'Enter'){
                handleProjectEdit();
              }
            }}
            onBlur={()=>{
              handleProjectEdit();
            }}
            placeholder="Project Title"
          />}
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
                    setEditMode(true);
                  }}
                >
                  Edit Project
                </button>
                <button
                  className="w-full text-left px-3 py-2 hover:bg-[#18181b] text-red-400 transition"
                  onClick={() => {
                    setShowMenu(false);
                    handleProjectDelete()
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
      <aside className="flex-1 bg-[#18181b] flex h-full overflow-hidden">
        {/* Left: Code Editor */}
        <div className="flex w-[70%] min-w-[300px] h-full border-r border-[#232323]">
          <CodeEditor scenes={scenes} selectedScene={selectedScene} setSelectedScene={(scene)=> setSelectedScene(scene)} />
        </div>

        {/* Right: Video on top, Output below */}
        <div className="flex flex-col w-[30%] min-w-[300px] h-full">
          {/* Video */}
          <div className="h-[50%] border-b border-[#232323] flex items-center justify-center">
            <VideoPlayer selectedScene={selectedScene} />
          </div>

          {/* Output */}
          <div className="h-[50%]">
            <CodeOutput selectedScene={selectedScene} />
          </div>
        </div>
      </aside>
      </div>
    </div>
  );
}