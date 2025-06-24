import { createScene, getScenes } from "@/api/sceneAPI"
import { type Scene, type CreateScene } from "@/zodTypes/scene"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useScenes = (project_id: string) =>
  useQuery<Scene[]>({
    queryKey: ['scenes', project_id],  // include project ID for caching
    queryFn: () => getScenes(project_id),  // pass the ID to the function
    enabled: !!project_id,  // only run if project_id is valid
  });


export const useCreateScene = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newScene: CreateScene) => createScene(newScene),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['projects']})
        }
    })
}
