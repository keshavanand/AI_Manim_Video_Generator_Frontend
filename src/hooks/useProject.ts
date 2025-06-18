import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from '@/api/projectAPI';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Project, Projects, UpdateProject as UpdateProjectType } from '@/zodTypes/project';

/**
 * Custom hook to fetch all projects.
 */
export const useProjects = () =>
  useQuery<Projects[]>({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

/**
 * Custom hook to create a new project.
 * Invalidates 'projects' query on success to refetch updated data.
 */
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: Project) => createProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

/**
 * Custom hook to update an existing project.
 * Invalidates 'projects' query on success to refetch updated data.
 */
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updateData,
    }: {
      id: string;
      updateData: UpdateProjectType;
    }) => updateProject(id, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

/**
 * Custom hook to delete a project.
 * Invalidates 'projects' query on success to refetch updated data.
 */
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};