import type { CreateScene, Scene } from "@/zodTypes/scene";
import instance from "./axiosInstance";

/**
 * Retrieves all scenes of a project.
 * @returns An array of scenes.
 */
export async function getScenes(project_id: string): Promise<Scene[]> {
    const response = await instance.get<Scene[]>("/scene/get_scenes",{
        params: {
        projectID: project_id,
      },
    });
    return response.data;
}

/**
 * Creates a new scene.
 * @param project - The project id and scene prompt.
 * @returns The ID of the created scene.
 */
export async function createScene(project: CreateScene): Promise<Scene> {
    const response = await instance.post<Scene>("/project/create_project", project);
    return response.data;
}