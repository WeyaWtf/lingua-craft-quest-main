import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedTime: string;
  exerciseIds: string[];
  structure?: any[]; // Structure hiérarchique (chapitres, sous-chapitres, etc.)
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  isPublished: boolean;
  rating?: number;
}

export interface LearningPathProgress {
  pathId: string;
  userId: string;
  completedExercises: string[];
  currentExerciseIndex: number;
  startedAt: Date;
  lastAccessedAt: Date;
}

interface LearningPathContextType {
  learningPaths: LearningPath[];
  pathProgress: Map<string, LearningPathProgress>;
  loading: boolean;
  addLearningPath: (path: Omit<LearningPath, "id" | "createdAt" | "updatedAt">) => Promise<LearningPath | null>;
  updateLearningPath: (id: string, path: Partial<LearningPath>) => Promise<void>;
  deleteLearningPath: (id: string) => Promise<void>;
  getLearningPath: (id: string) => LearningPath | undefined;
  getPathProgress: (pathId: string) => LearningPathProgress | undefined;
  markExerciseComplete: (pathId: string, exerciseId: string) => void;
  startPath: (pathId: string) => void;
  refreshPaths: () => Promise<void>;
}

const LearningPathContext = createContext<LearningPathContextType | undefined>(undefined);

export const LearningPathProvider = ({ children }: { children: ReactNode }) => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [pathProgress, setPathProgress] = useState<Map<string, LearningPathProgress>>(new Map());
  const [loading, setLoading] = useState(true);

  // Load learning paths from Supabase on mount
  useEffect(() => {
    loadPathsFromSupabase();
  }, []);

  const loadPathsFromSupabase = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        // Temporarily load all paths for debugging
        // .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading learning paths:', error);
        toast.error('Erreur lors du chargement des parcours');
        return;
      }

      const paths: LearningPath[] = (data || []).map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        language: row.language,
        difficulty: row.difficulty as 1 | 2 | 3 | 4 | 5,
        estimatedTime: row.estimated_time,
        exerciseIds: row.exercise_ids || [],
        structure: row.structure || [],
        icon: row.icon || '🎯',
        color: row.color || 'from-blue-500 to-cyan-500',
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        authorId: row.created_by || 'system',
        isPublished: row.is_published,
        rating: row.rating || 5.0
      }));

      setLearningPaths(paths);
    } catch (err) {
      console.error('Error in loadPathsFromSupabase:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshPaths = async () => {
    await loadPathsFromSupabase();
  };

  const addLearningPath = async (pathData: Omit<LearningPath, "id" | "createdAt" | "updatedAt">): Promise<LearningPath | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error('Vous devez être connecté pour créer un parcours');
        return null;
      }

      // Generate ID from title
      const slug = pathData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const id = `path-${slug}`;

      const { data, error } = await supabase
        .from('learning_paths')
        .insert({
          id,
          title: pathData.title,
          description: pathData.description,
          language: pathData.language,
          difficulty: pathData.difficulty,
          estimated_time: pathData.estimatedTime,
          exercise_ids: pathData.exerciseIds,
          structure: pathData.structure || [],
          icon: pathData.icon,
          color: pathData.color,
          created_by: user.id,
          is_published: pathData.isPublished,
          rating: pathData.rating || 5.0
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating learning path:', error);
        toast.error('Erreur lors de la création du parcours');
        return null;
      }

      const newPath: LearningPath = {
        id: data.id,
        title: data.title,
        description: data.description,
        language: data.language,
        difficulty: data.difficulty,
        estimatedTime: data.estimated_time,
        exerciseIds: data.exercise_ids || [],
        structure: data.structure || [],
        icon: data.icon,
        color: data.color,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        authorId: data.created_by,
        isPublished: data.is_published,
        rating: data.rating
      };

      setLearningPaths([...learningPaths, newPath]);
      toast.success('Parcours créé avec succès !');
      return newPath;
    } catch (err) {
      console.error('Error in addLearningPath:', err);
      toast.error('Erreur lors de la création du parcours');
      return null;
    }
  };

  const updateLearningPath = async (id: string, pathData: Partial<LearningPath>) => {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString()
      };

      if (pathData.title) updateData.title = pathData.title;
      if (pathData.description) updateData.description = pathData.description;
      if (pathData.language) updateData.language = pathData.language;
      if (pathData.difficulty) updateData.difficulty = pathData.difficulty;
      if (pathData.estimatedTime) updateData.estimated_time = pathData.estimatedTime;
      if (pathData.exerciseIds !== undefined) updateData.exercise_ids = pathData.exerciseIds;
      if (pathData.structure !== undefined) updateData.structure = pathData.structure;
      if (pathData.icon) updateData.icon = pathData.icon;
      if (pathData.color) updateData.color = pathData.color;
      if (pathData.isPublished !== undefined) updateData.is_published = pathData.isPublished;
      if (pathData.rating) updateData.rating = pathData.rating;

      const { error } = await supabase
        .from('learning_paths')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Error updating learning path:', error);
        toast.error('Erreur lors de la mise à jour du parcours');
        return;
      }

      setLearningPaths(
        learningPaths.map((path) =>
          path.id === id ? { ...path, ...pathData, updatedAt: new Date() } : path
        )
      );

      toast.success('Parcours mis à jour !');
    } catch (err) {
      console.error('Error in updateLearningPath:', err);
      toast.error('Erreur lors de la mise à jour du parcours');
    }
  };

  const deleteLearningPath = async (id: string) => {
    try {
      const { error } = await supabase
        .from('learning_paths')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting learning path:', error);
        toast.error('Erreur lors de la suppression du parcours');
        return;
      }

      setLearningPaths(learningPaths.filter((path) => path.id !== id));
      pathProgress.delete(id);
      setPathProgress(new Map(pathProgress));
      toast.success('Parcours supprimé');
    } catch (err) {
      console.error('Error in deleteLearningPath:', err);
      toast.error('Erreur lors de la suppression du parcours');
    }
  };

  const getLearningPath = (id: string): LearningPath | undefined => {
    return learningPaths.find((path) => path.id === id);
  };

  const getPathProgress = (pathId: string): LearningPathProgress | undefined => {
    return pathProgress.get(pathId);
  };

  const startPath = (pathId: string) => {
    if (!pathProgress.has(pathId)) {
      const newProgress: LearningPathProgress = {
        pathId,
        userId: "current-user",
        completedExercises: [],
        currentExerciseIndex: 0,
        startedAt: new Date(),
        lastAccessedAt: new Date()
      };
      pathProgress.set(pathId, newProgress);
      setPathProgress(new Map(pathProgress));
    }
  };

  const markExerciseComplete = (pathId: string, exerciseId: string) => {
    const progress = pathProgress.get(pathId);
    if (progress && !progress.completedExercises.includes(exerciseId)) {
      progress.completedExercises.push(exerciseId);
      progress.currentExerciseIndex = Math.min(
        progress.currentExerciseIndex + 1,
        learningPaths.find(p => p.id === pathId)?.exerciseIds.length || 0
      );
      progress.lastAccessedAt = new Date();
      setPathProgress(new Map(pathProgress));
    }
  };

  return (
    <LearningPathContext.Provider
      value={{
        learningPaths,
        pathProgress,
        loading,
        addLearningPath,
        updateLearningPath,
        deleteLearningPath,
        getLearningPath,
        getPathProgress,
        markExerciseComplete,
        startPath,
        refreshPaths
      }}
    >
      {children}
    </LearningPathContext.Provider>
  );
};

export const useLearningPaths = () => {
  const context = useContext(LearningPathContext);
  if (!context) {
    throw new Error("useLearningPaths must be used within a LearningPathProvider");
  }
  return context;
};
