import { getSceneVideo } from "@/api/media";
import { useQuery } from "@tanstack/react-query";

export function useSceneVideo(scene_id:string | undefined){
    return useQuery({
        queryKey:['sceneVideo', scene_id],
        queryFn: ()=>{
            if(!scene_id) throw new Error("sceneId is required");
            return getSceneVideo(scene_id);
        },
        enabled: !!scene_id,
    })
}