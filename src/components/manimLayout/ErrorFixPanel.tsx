import type { Scene } from "@/zodTypes/scene";
import { AlertTriangle } from "lucide-react";

interface ErrorFixPanelProps {
    scenes: Scene[];
    onFix: (scene: Scene) => void;
}

export const ErrorFixPanel: React.FC<ErrorFixPanelProps> = ({
    scenes,
    onFix,
}) => {
        if (scenes.length === 0) return null;

        return (
            <div className="bg-red-900/20 border border-red-500/30 text-sm text-red-200 rounded-xl px-3 py-2 space-y-1 shadow-sm">
            <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span>{scenes.length === 1 ? "1 error found" : `${scenes.length} errors found`}:</span>
            </div>
            <ul className="space-y-1">
                {scenes.map((scene) => (
                <li key={scene.id} className="flex items-center justify-between">
                    <span className="truncate">{scene.scene_name}</span>
                    <button
                    onClick={() => onFix(scene)}
                    className="text-xs px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
                    >
                    Fix
                    </button>
                </li>
                ))}
            </ul>
            </div>
    );
};
