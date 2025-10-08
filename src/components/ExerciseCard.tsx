import { Play, Edit2, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface ExerciseCardProps {
  type: "flashcard" | "association" | "quiz" | "completion" | "translation" | "conversation" | "grammar-identification" | "sentence-mixer" | "grammar-transformation" | "error-hunt";
  title: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  language: string;
  tags: string[];
  completions?: number;
  rating?: number;
  onPlay?: () => void;
  onEdit?: () => void;
}

const exerciseConfig = {
  flashcard: {
    icon: "📇",
    label: "Carte Flash",
    colorClass: "bg-exercise-flashcard-light text-exercise-flashcard border-exercise-flashcard/20",
  },
  association: {
    icon: "🔗",
    label: "Association",
    colorClass: "bg-exercise-association-light text-exercise-association border-exercise-association/20",
  },
  quiz: {
    icon: "🎯",
    label: "Quiz",
    colorClass: "bg-exercise-quiz-light text-exercise-quiz border-exercise-quiz/20",
  },
  completion: {
    icon: "✍️",
    label: "Complétion",
    colorClass: "bg-exercise-completion-light text-exercise-completion border-exercise-completion/20",
  },
  translation: {
    icon: "📖",
    label: "Traduction",
    colorClass: "bg-exercise-translation-light text-exercise-translation border-exercise-translation/20",
  },
  conversation: {
    icon: "💬",
    label: "Conversation",
    colorClass: "bg-exercise-conversation-light text-exercise-conversation border-exercise-conversation/20",
  },
  "grammar-identification": {
    icon: "🔍",
    label: "Identification Grammaticale",
    colorClass: "bg-blue-50 text-blue-700 border-blue-200",
  },
  "sentence-mixer": {
    icon: "🔀",
    label: "Mixeur de Phrases",
    colorClass: "bg-purple-50 text-purple-700 border-purple-200",
  },
  "grammar-transformation": {
    icon: "💬",
    label: "Transformation Grammaticale",
    colorClass: "bg-green-50 text-green-700 border-green-200",
  },
  "error-hunt": {
    icon: "🎯",
    label: "Chasse aux Erreurs",
    colorClass: "bg-red-50 text-red-700 border-red-200",
  },
};

const difficultyLabels = {
  1: "Débutant",
  2: "Élémentaire",
  3: "Intermédiaire",
  4: "Avancé",
  5: "Expert",
};

const ExerciseCard = ({
  type,
  title,
  description,
  difficulty,
  language,
  tags,
  completions = 0,
  rating = 0,
  onPlay,
  onEdit,
}: ExerciseCardProps) => {
  const config = exerciseConfig[type];

  return (
    <div className="group bg-card rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-in">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge className={`${config.colorClass} border font-medium`}>
            <span className="mr-1">{config.icon}</span>
            {config.label}
          </Badge>
          <Badge variant="outline" className={`bg-level-${difficulty}/10 text-level-${difficulty} border-level-${difficulty}/20`}>
            Niveau {difficulty}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            🌐 {language}
          </span>
          {completions > 0 && (
            <span className="flex items-center gap-1">
              ✅ {completions} complétions
            </span>
          )}
          {rating > 0 && (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={onPlay} className="flex-1 bg-primary hover:bg-primary-hover">
            <Play className="w-4 h-4 mr-2" />
            Jouer
          </Button>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="icon">
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
