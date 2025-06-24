import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Folder } from "lucide-react";
import { useProjects } from "@/hooks/useProject";
import type { Project } from "@/zodTypes/project";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "@/store/states";


export default function ProjectList() {
  const { data: projects = [], isLoading, error } = useProjects();
  const [search, setSearch] = useState("");
  const {currentProject, setCurrentProject} = useProjectStore();

  const navigate = useNavigate();
  // Group projects by date (assuming each project has a 'updated_at' property)
  const grouped = useMemo(()=>{
      return projects.reduce((acc: Record<string, typeof projects>, proj: Project) => {
      const date = proj.updated_at
        ? new Date(proj.updated_at).toDateString()
        : "Unknown";
      acc[date] = acc[date] || [];
      acc[date].push(proj);
      return acc;
    }, {});
  },[projects]) 

  const sortedGrouped = useMemo( () => {
    return Object.entries(grouped).sort(([a],[b])=>{
        if (a === 'Unknown') return 1;
        if (b === 'Unknown') return -1;
        return new Date(b).getTime() - new Date(a).getTime();
    })
  },[grouped]) 

  useEffect(()=>{
    if(sortedGrouped.length > 0 && sortedGrouped[0][1].length > 0){
      setCurrentProject(sortedGrouped[0][1][0])
    }else{
      if (currentProject !== null) {
        setCurrentProject(null);
        navigate("/project");
      }
    }
  },[currentProject, navigate, setCurrentProject, sortedGrouped])

  if (isLoading) {
    return <div className="px-4 py-4 text-sm text-cyan-400 animate-pulse">Loading projects...</div>;
  }
  if (error) {
    return <div className="px-4 py-4 text-sm text-red-400">Failed to load projects.</div>;
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#18181b] via-[#15171a] to-[#1a222d] rounded-2xl shadow-xl border border-[#232323]">
      {/* Start new project */}
      <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium px-4 py-2 rounded-lg mx-4 mt-2 mb-3 transition shadow"
              onClick={()=>{
                const confirmed = window.confirm("Are you sure you want to leave?")
                if (confirmed){
                  navigate("/project")
                }
              }}
      >
        <Plus className="w-4 h-4" />
        Start new project
      </button>
      {/* Search */}
      <div className="px-4 mb-2">
        <div className="relative">
          <input
            className="w-full bg-[#101012] border border-[#232323] rounded-lg py-2 pl-10 pr-3 text-sm text-white placeholder:text-[#7dd3fc] focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-cyan-400" />
        </div>
      </div>
      {/* Projects List */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="text-xs text-cyan-300 font-semibold px-2 py-2 tracking-wide">Your Projects</div>
        {sortedGrouped.map(([date, projs]) => (
          <div key={date}>
            <div className="text-xs text-cyan-200 px-2 py-1">{date}</div>
            {projs
              .filter((p: Project) => p.title.toLowerCase().includes(search.toLowerCase()))
              .map((proj: Project) => (
                <button
                  key={proj.id}
                  className={`w-full text-left px-3 py-2 rounded-xl mb-1 transition flex items-center gap-2 font-medium
                    ${
                      currentProject?.id === proj.id
                        ? "bg-gradient-to-r from-cyan-600/80 to-blue-600/80 text-white shadow-lg ring-2 ring-cyan-400"
                        : "hover:bg-cyan-900/40 text-cyan-100"
                    }`}
                  onClick={() => setCurrentProject ? setCurrentProject(proj) : null}
                >
                  <Folder className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{proj.title}</span>
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
