import { createContext, useContext, useState, ReactNode } from "react";

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedTime: string;
  exerciseIds: string[];
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
  addLearningPath: (path: Omit<LearningPath, "id" | "createdAt" | "updatedAt">) => LearningPath;
  updateLearningPath: (id: string, path: Partial<LearningPath>) => void;
  deleteLearningPath: (id: string) => void;
  getLearningPath: (id: string) => LearningPath | undefined;
  getPathProgress: (pathId: string) => LearningPathProgress | undefined;
  markExerciseComplete: (pathId: string, exerciseId: string) => void;
  startPath: (pathId: string) => void;
}

const LearningPathContext = createContext<LearningPathContextType | undefined>(undefined);

export const LearningPathProvider = ({ children }: { children: ReactNode }) => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: "path-burmese-fundamentals",
      title: "Birman - Les Fondamentaux",
      description: "Maîtrisez l'alphabet birman, les voyelles, et les premières phrases essentielles",
      language: "Birman",
      difficulty: 1,
      estimatedTime: "3 heures",
      exerciseIds: [], // À remplir avec les vrais IDs d'exercices
      icon: "🇲🇲",
      color: "from-yellow-500 to-red-500",
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "system",
      isPublished: true,
      rating: 4.8
    },
    {
      id: "path-japanese-kana",
      title: "Japonais - Hiragana & Katakana",
      description: "Apprenez les deux systèmes d'écriture syllabique japonais",
      language: "Japonais",
      difficulty: 1,
      estimatedTime: "5 heures",
      exerciseIds: [],
      icon: "🇯🇵",
      color: "from-pink-500 to-purple-500",
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "system",
      isPublished: true,
      rating: 4.9
    },
    {
      id: "path-korean-hangeul",
      title: "Coréen - Hangeul Complet",
      description: "Du système d'écriture coréen aux premières conversations",
      language: "Coréen",
      difficulty: 2,
      estimatedTime: "4 heures",
      exerciseIds: [],
      icon: "🇰🇷",
      color: "from-blue-500 to-cyan-500",
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "system",
      isPublished: true,
      rating: 4.7
    }
  ]);

  const [pathProgress, setPathProgress] = useState<Map<string, LearningPathProgress>>(new Map());

  const addLearningPath = (pathData: Omit<LearningPath, "id" | "createdAt" | "updatedAt">): LearningPath => {
    const newPath: LearningPath = {
      id: `path-${Date.now()}`,
      ...pathData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setLearningPaths([...learningPaths, newPath]);
    return newPath;
  };

  const updateLearningPath = (id: string, pathData: Partial<LearningPath>) => {
    setLearningPaths(
      learningPaths.map((path) =>
        path.id === id ? { ...path, ...pathData, updatedAt: new Date() } : path
      )
    );
  };

  const deleteLearningPath = (id: string) => {
    setLearningPaths(learningPaths.filter((path) => path.id !== id));
    pathProgress.delete(id);
    setPathProgress(new Map(pathProgress));
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
        userId: "current-user", // À remplacer par l'ID utilisateur réel
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
        addLearningPath,
        updateLearningPath,
        deleteLearningPath,
        getLearningPath,
        getPathProgress,
        markExerciseComplete,
        startPath
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
