import { useCallback, useState } from "react";
import { FileText, Check, Copy, Play } from "lucide-react";
import {type Scene } from "@/zodTypes/scene";
import Editor from '@monaco-editor/react';
import { useRunScene, useUpdateScene } from "@/hooks/useScene";
import debounce from "lodash.debounce";

interface CodeEditorProps {
  scenes: Scene[];
  selectedScene?: Scene;
  setSelectedScene: (scene: Scene) => void;
  placeholder?: string;
  className?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  scenes=[],
  selectedScene,
  setSelectedScene,
  placeholder = "Type your code here...",
  className = "",
}) => {
        const [copied, setCopied] = useState(false);
        const updatedSceneMutation = useUpdateScene();
        const runSceneMutation = useRunScene();
        const handleCopy = () => {
          navigator.clipboard.writeText(selectedScene?.scene_code || placeholder);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        };

        
        const handleRun = () => {
          if (selectedScene) {
            runSceneMutation.mutate(selectedScene.id);
          }
        };

        const updateSceneOnBackend = async(scene: Scene) =>{
          updatedSceneMutation.mutate({
            id: scene.id,
            updateData: scene
          })
        }

        const debouncedUpdate = useCallback(
          debounce((scene:Scene)=>{
            updateSceneOnBackend(scene);
          },1000),
          []
        );

        const onChangeCode = (value: string| undefined)=>{
            if (!selectedScene) return;
            const updatedScene = { ...selectedScene, scene_code: value };
            setSelectedScene(updatedScene)
            debouncedUpdate(updatedScene)
          }

        return (
          <div
            className={`flex w-full h-full bg-gradient-to-br from-[#18181b] via-[#15171a] to-[#1a222d] rounded-2xl shadow-xl border border-[#232323] overflow-hidden ${className}`}
          >
            {/* Scene List */}
            <div className="w-[25%] min-w-[90px] max-w-[300px] bg-[#18181b] border-r border-[#232323] flex flex-col">
              <div className="px-4 py-3 text-xs font-semibold text-cyan-300 border-b border-[#232323]">
                Scenes
              </div>
              <ul className="flex-1 overflow-y-auto">
                {scenes.map((scene) => (
                  <li key={scene.id}>
                    <button
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition font-medium
                        ${
                          selectedScene === scene
                            ? "bg-gradient-to-r from-cyan-600/80 to-blue-600/80 text-white shadow ring-2 ring-cyan-400"
                            : "hover:bg-cyan-900/40 text-cyan-100"
                        }`}
                      onClick={() => setSelectedScene(scene)}
                    >
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate" title={scene.scene_name}>{scene.scene_name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Code Editor */}
            <div className="flex-1 flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#232323] bg-[#18181b]">
                <span className="text-xs text-cyan-300 font-mono uppercase tracking-wider">
                  Python
                </span>
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/80 hover:bg-cyan-400/90 text-white text-xs font-semibold transition"
                  onClick={handleCopy}
                  type="button"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/80 hover:bg-cyan-400/90 text-white text-xs font-semibold transition"
                  onClick={handleRun}
                  type="button"
                >
                  <Play className="w-4 h-4"/>
                </button>
              </div>
              <Editor
                theme="vs-dark"
                defaultLanguage="python"
                defaultValue="#Manim Code"
                value={selectedScene?.scene_code}
                onChange={onChangeCode}
                className="flex-1 w-full resize-none bg-[#101012] text-white placeholder:text-[#888] border-none outline-none p-4 text-sm font-mono rounded-b-2xl focus:ring-2 focus:ring-cyan-500/60 transition"
              />
            </div>
          </div>
        );
      }

export default CodeEditor;