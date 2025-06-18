import { useState } from "react";
import { FileText, ChevronDown, ChevronRight } from "lucide-react";

// Dummy scene files data
const scenes = [
  {
    id: "scene1",
    name: "Scene1",
    code: `from manim import *

class Scene1(Scene):
    def construct(self):
        self.play(Create(Circle()))
`,
  },
  {
    id: "scene2",
    name: "Scene2",
    code: `from manim import *

class Scene2(Scene):
    def construct(self):
        self.play(Create(Square()))
`,
  },
];

export default function SceneFiles() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(scenes[0].id);

  return (
    <div className="mb-4">
      <button
        className="flex items-center gap-2 text-sm font-semibold text-white mb-2 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        Scenes
      </button>
      {open && (
        <ul className="space-y-1">
          {scenes.map((scene) => (
            <li key={scene.id}>
              <button
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition text-left
                  ${
                    selected === scene.id
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "hover:bg-white/10 text-white"
                  }`}
                onClick={() => setSelected(scene.id)}
              >
                <FileText className="w-4 h-4" />
                {scene.name}
              </button>
              {selected === scene.id && (
                <pre className="bg-[#101012] border border-[#232323] rounded-lg p-3 mt-2 text-xs text-white font-mono whitespace-pre-wrap">
                  {scene.code}
                </pre>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

}