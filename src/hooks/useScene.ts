import { createScene, getScenes, updateScene , runScene} from "@/api/sceneAPI"
import { type Scene, type CreateScene, type UpdateScene } from "@/zodTypes/scene"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useScenes = (project_id: string) =>
  useQuery<Scene[]>({
    queryKey: ['scenes', project_id],  // include project ID for caching
    queryFn: () => getScenes(project_id),  // pass the ID to the function
    enabled: !!project_id,  // only run if project_id is valid
  });

export const useRunScene = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (scene_id: string) => runScene(scene_id),
    onSuccess: (_, scene_id) => {
      // Refetch the scene or scenes list after running
      queryClient.invalidateQueries({ queryKey: ['scenes'] });
      queryClient.invalidateQueries({ queryKey: ['scene', scene_id] }); // if you have a single scene query
    },
  });
};

export const useCreateScene = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newScene: CreateScene) => createScene(newScene),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['scenes']})
        }
    })
}

export const useUpdateScene = () =>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:({
      id,
      updateData
    }: {id: string,updateData: UpdateScene}) => updateScene(id,updateData),
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey:['scenes']})
    }
  })
}

