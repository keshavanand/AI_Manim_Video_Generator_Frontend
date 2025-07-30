// Zustand store for managing authentication state (user and token)
import { create } from 'zustand';
import type { User_data } from '@/zodTypes/user';
import type { Project } from '@/zodTypes/project';
import type { Scene } from '@/zodTypes/scene';
import { persist } from 'zustand/middleware';

// Define the shape of the authentication store
interface AuthStore {
    user: User_data | null;
    token: string | null;
    alpha_token: string | null;
    setUser: (user: User_data) => void;
    setToken: (token: string) => void;
    setAlphaToken: (alpha_token: string | null) => void;
    clearAuth: () => void;
    getAuthState: ()=> { token: string | null; alpha_token: string | null }; 
}

// Create the Zustand store for authentication
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      alpha_token: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setAlphaToken: (alpha_token) => set({ alpha_token }),
      clearAuth: () => set({ user: null, token: null, alpha_token: null }),

      getAuthState: () => {
        const { token, alpha_token } = get();
        return { token, alpha_token };
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);


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


interface globalAuthCheck{
  isTokExpired: boolean | false;
  setIsTokExpired: (value: boolean)=> void
}

export const useGlobalAuthCheck = create<globalAuthCheck>((set)=>({
  isTokExpired: false,
  setIsTokExpired: (value: boolean)=> set({isTokExpired:value})
}))
