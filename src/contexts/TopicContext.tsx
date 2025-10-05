import { createContext, useContext, useState, ReactNode } from "react";

export interface Topic {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown content
  icon: string;
  color: string;
  language: string;
  pathIds: string[];
  exerciseIds: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  isPublished: boolean;
}

interface TopicContextType {
  topics: Topic[];
  addTopic: (topic: Omit<Topic, "id" | "createdAt" | "updatedAt">) => Topic;
  updateTopic: (id: string, topic: Partial<Topic>) => void;
  deleteTopic: (id: string) => void;
  getTopic: (id: string) => Topic | undefined;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export const TopicProvider = ({ children }: { children: ReactNode }) => {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: "topic-japanese-beginner",
      title: "Japonais pour Débutants",
      description: "Tout ce qu'il faut pour commencer le japonais : hiragana, katakana, et vocabulaire de base",
      content: `# Japonais pour Débutants

## Introduction

Bienvenue dans ce topic dédié à l'apprentissage du japonais pour débutants !

## Les Systèmes d'Écriture

Le japonais utilise trois systèmes d'écriture :

1. **Hiragana** (ひらがな) - pour les mots japonais
2. **Katakana** (カタカナ) - pour les mots étrangers
3. **Kanji** (漢字) - caractères chinois

## Premiers Pas

- Apprendre les hiragana
- Pratiquer la prononciation
- Découvrir le vocabulaire de base`,
      icon: "🇯🇵",
      color: "from-pink-500 to-purple-500",
      language: "Japonais",
      pathIds: ["path-japanese-kana"],
      exerciseIds: [],
      tags: ["débutant", "japonais", "kana"],
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "system",
      isPublished: true
    },
    {
      id: "topic-burmese-fundamentals",
      title: "Birman - Fondamentaux",
      description: "Les bases de l'alphabet et de la prononciation birmane",
      content: `# Birman - Fondamentaux

## L'Alphabet Birman

L'alphabet birman (မြန်မာအက္ခရာ) est un système d'écriture unique et fascinant.

## Caractéristiques

- **33 consonnes** de base
- **12 voyelles** indépendantes
- Système de **diacritiques** pour modifier les sons

## Objectifs d'Apprentissage

1. Maîtriser les consonnes de base
2. Comprendre le système vocalique
3. Lire des mots simples`,
      icon: "🇲🇲",
      color: "from-yellow-500 to-red-500",
      language: "Birman",
      pathIds: ["path-burmese-fundamentals"],
      exerciseIds: [],
      tags: ["débutant", "birman", "alphabet"],
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "system",
      isPublished: true
    }
  ]);

  const addTopic = (topicData: Omit<Topic, "id" | "createdAt" | "updatedAt">): Topic => {
    const newTopic: Topic = {
      id: `topic-${Date.now()}`,
      ...topicData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTopics([...topics, newTopic]);
    return newTopic;
  };

  const updateTopic = (id: string, topicData: Partial<Topic>) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, ...topicData, updatedAt: new Date() } : topic
      )
    );
  };

  const deleteTopic = (id: string) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  const getTopic = (id: string): Topic | undefined => {
    return topics.find((topic) => topic.id === id);
  };

  return (
    <TopicContext.Provider
      value={{
        topics,
        addTopic,
        updateTopic,
        deleteTopic,
        getTopic
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export const useTopics = () => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error("useTopics must be used within a TopicProvider");
  }
  return context;
};
