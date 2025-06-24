import instance from "./axiosInstance";

export async function getSceneVideo(scene_id: string): Promise<Blob> {
    const response = await instance.get(`/media/get_scene_video/${scene_id}`,{
      responseType: 'blob'
    });
    return response.data;
}