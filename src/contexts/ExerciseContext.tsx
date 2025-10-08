import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface Exercise {
  id: string;
  type: "flashcard" | "association" | "quiz" | "completion" | "translation" | "conversation";
  title: string;
  description?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  source: "community" | "official" | "personal";
  language: string;
  tags: string[];
  content: any;
  authorId: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  stats: {
    completions: number;
    rating: number;
  };
}

interface ExerciseContextType {
  exercises: Exercise[];
  addExercise: (exercise: Omit<Exercise, "id" | "createdAt" | "updatedAt" | "stats">) => Exercise;
  updateExercise: (id: string, exercise: Partial<Exercise>) => void;
  deleteExercise: (id: string) => void;
  getExercise: (id: string) => Exercise | undefined;
  publishExercise: (id: string) => void;
  refreshExercises: () => Promise<void>;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour charger les exercices depuis Supabase
  const loadExercises = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading exercises:', error);
        toast.error("Erreur lors du chargement des exercices");
        return;
      }

      if (data) {
        const formattedExercises: Exercise[] = data.map((ex: any) => ({
          id: ex.id,
          type: ex.type,
          title: ex.title,
          description: ex.description,
          difficulty: ex.difficulty,
          source: ex.source,
          language: ex.language,
          tags: ex.tags || [],
          content: ex.content || {},
          authorId: ex.author_id,
          isPublished: ex.is_published,
          createdAt: new Date(ex.created_at),
          updatedAt: new Date(ex.updated_at),
          stats: {
            completions: ex.completions || 0,
            rating: ex.rating || 0,
          },
        }));
        setExercises(formattedExercises);
      }
    } catch (error) {
      console.error('Error loading exercises:', error);
      toast.error("Erreur lors du chargement des exercices");
    } finally {
      setLoading(false);
    }
  };

  // Charger les exercices au montage du composant
  useEffect(() => {
    loadExercises();

    // Écouter les changements en temps réel
    const subscription = supabase
      .channel('exercises-changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'exercises'
        },
        (payload) => {
          console.log('Exercise change detected:', payload);
          // Recharger tous les exercices quand un changement est détecté
          loadExercises();
        }
      )
      .subscribe();

    // Nettoyer l'abonnement au démontage
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addExercise = async (exerciseData: Omit<Exercise, "id" | "createdAt" | "updatedAt" | "stats">) => {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .insert([
          {
            type: exerciseData.type,
            title: exerciseData.title,
            description: exerciseData.description,
            difficulty: exerciseData.difficulty,
            source: exerciseData.source,
            language: exerciseData.language,
            tags: exerciseData.tags,
            content: exerciseData.content,
            author_id: exerciseData.authorId,
            is_published: exerciseData.isPublished,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error adding exercise:', error);
        toast.error("Erreur lors de l'ajout de l'exercice");
        throw error;
      }

      if (data) {
        const newExercise: Exercise = {
          id: data.id,
          type: data.type,
          title: data.title,
          description: data.description,
          difficulty: data.difficulty,
          source: data.source,
          language: data.language,
          tags: data.tags || [],
          content: data.content || {},
          authorId: data.author_id,
          isPublished: data.is_published,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          stats: {
            completions: data.completions || 0,
            rating: data.rating || 0,
          },
        };
        setExercises((prev) => [newExercise, ...prev]);
        return newExercise;
      }
    } catch (error) {
      console.error('Error adding exercise:', error);
      throw error;
    }

    // Fallback si erreur
    const fallbackExercise: Exercise = {
      ...exerciseData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      stats: { completions: 0, rating: 0 },
    };
    return fallbackExercise;
  };

  const updateExercise = async (id: string, exerciseData: Partial<Exercise>) => {
    try {
      const updateData: any = {};
      if (exerciseData.type) updateData.type = exerciseData.type;
      if (exerciseData.title) updateData.title = exerciseData.title;
      if (exerciseData.description !== undefined) updateData.description = exerciseData.description;
      if (exerciseData.difficulty) updateData.difficulty = exerciseData.difficulty;
      if (exerciseData.source) updateData.source = exerciseData.source;
      if (exerciseData.language) updateData.language = exerciseData.language;
      if (exerciseData.tags) updateData.tags = exerciseData.tags;
      if (exerciseData.content) updateData.content = exerciseData.content;
      if (exerciseData.authorId) updateData.author_id = exerciseData.authorId;
      if (exerciseData.isPublished !== undefined) updateData.is_published = exerciseData.isPublished;

      const { error } = await supabase
        .from('exercises')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Error updating exercise:', error);
        toast.error("Erreur lors de la mise à jour de l'exercice");
        return;
      }

      setExercises((prev) =>
        prev.map((ex) =>
          ex.id === id
            ? { ...ex, ...exerciseData, updatedAt: new Date() }
            : ex
        )
      );
      toast.success("Exercice mis à jour avec succès");
    } catch (error) {
      console.error('Error updating exercise:', error);
      toast.error("Erreur lors de la mise à jour de l'exercice");
    }
  };

  const deleteExercise = async (id: string) => {
    try {
      const { error } = await supabase
        .from('exercises')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting exercise:', error);
        toast.error("Erreur lors de la suppression de l'exercice");
        return;
      }

      setExercises((prev) => prev.filter((ex) => ex.id !== id));
      toast.success("Exercice supprimé avec succès");
    } catch (error) {
      console.error('Error deleting exercise:', error);
      toast.error("Erreur lors de la suppression de l'exercice");
    }
  };

  const getExercise = (id: string) => {
    return exercises.find((ex) => ex.id === id);
  };

  const publishExercise = async (id: string) => {
    await updateExercise(id, { isPublished: true });
  };

  const refreshExercises = async () => {
    await loadExercises();
  };

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        addExercise,
        updateExercise,
        deleteExercise,
        getExercise,
        publishExercise,
        refreshExercises,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExercises must be used within ExerciseProvider");
  }
  return context;
};
