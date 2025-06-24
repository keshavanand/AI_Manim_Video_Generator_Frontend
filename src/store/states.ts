// Zustand store for managing authentication state (user and token)
import { create } from 'zustand';
import type { User_data } from '@/zodTypes/user';
import type { Project } from '@/zodTypes/project';
import type { Scene } from '@/zodTypes/scene';

// Define the shape of the authentication store
interface AuthStore {
    user: User_data | null;
    token: string | null;
    setUser: (user: User_data) => void;
    setToken: (token: string) => void;
    clearAuth: () => void;
}

// Create the Zustand store for authentication
export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    clearAuth: () => set({ user: null, token: null }),
}));

interface ProjectStore {
    currentProject: Project | null;
    setCurrentProject: (project: Project | null) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
    currentProject: null,
    setCurrentProject: (project) => set({currentProject:project})
}))

interface PromptStore{
    prompt: string | '',
    setPrompt: (value: string) => void
}

export const usePromptStore = create<PromptStore>((set)=>({
    prompt: '',
    setPrompt: (value: string) => set({prompt:value})
}))

interface SceneListStore{
    sceneList: Scene[] | [];
    setSceneList: (scenes: Scene[]) => void;
}

export const useSceneListStore = create<SceneListStore>((set)=> ({
    sceneList: [],
    setSceneList: (scenes) => set({sceneList:scenes})
}))