import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import ExerciseCard from "@/components/ExerciseCard";
import TopicCard from "@/components/TopicCard";
import { useExercises } from "@/contexts/ExerciseContext";
import { useTopics } from "@/contexts/TopicContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Catalog = () => {
  const navigate = useNavigate();
  const { exercises: allExercises } = useExercises();
  const { topics: allTopics } = useTopics();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [contentType, setContentType] = useState<"exercises" | "topics">("exercises");

  // Filter only published exercises and topics
  const exercises = allExercises.filter(ex => ex.isPublished);
  const topics = allTopics.filter(t => t.isPublished);

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = !searchQuery ||
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === "all" || ex.type === selectedType;
    const matchesDifficulty = selectedDifficulty === "all" || ex.difficulty.toString() === selectedDifficulty;
    const matchesLanguage = selectedLanguage === "all" || ex.language === selectedLanguage;

    return matchesSearch && matchesType && matchesDifficulty && matchesLanguage;
  });

  const filteredTopics = topics.filter(t => {
    const matchesSearch = !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLanguage = selectedLanguage === "all" || t.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  const languages = [
    { label: "🇲🇲 Birman", value: "birman" },
    { label: "🇹🇭 Thaï", value: "thai" },
    { label: "🇰🇷 Coréen", value: "korean" },
    { label: "🇯🇵 Japonais", value: "japanese" },
    { label: "🇻🇳 Vietnamien", value: "vietnamese" }
  ];

  // Compter le nombre d'exercices et topics par langue
  const languageCounts = languages.map(lang => ({
    ...lang,
    exerciseCount: exercises.filter(ex => ex.language === lang.value).length,
    topicCount: topics.filter(t => t.language === lang.value).length,
    count: contentType === "exercises"
      ? exercises.filter(ex => ex.language === lang.value).length
      : topics.filter(t => t.language === lang.value).length
  }));

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Catalogue
          </h1>
          <p className="text-muted-foreground text-lg">
            Découvrez et pratiquez avec nos exercices et topics
          </p>
        </div>

        {/* Content Type Tabs */}
        <Tabs value={contentType} onValueChange={(v) => setContentType(v as "exercises" | "topics")} className="mb-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="exercises">Exercices ({exercises.length})</TabsTrigger>
            <TabsTrigger value="topics">Topics ({topics.length})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Language Filter */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-foreground">Filtrer par langue :</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedLanguage === "all" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors px-4 py-2"
              onClick={() => setSelectedLanguage("all")}
            >
              Toutes ({contentType === "exercises" ? exercises.length : topics.length})
            </Badge>
            {languageCounts.map((lang) => (
              <Badge
                key={lang.value}
                variant={selectedLanguage === lang.value ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors px-4 py-2"
                onClick={() => setSelectedLanguage(lang.value)}
              >
                {lang.label} ({lang.count})
              </Badge>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8 shadow-sm animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder={contentType === "exercises" ? "Rechercher un exercice..." : "Rechercher un topic..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {contentType === "exercises" && (
              <>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous types</SelectItem>
                    <SelectItem value="flashcard">📇 Cartes Flash</SelectItem>
                    <SelectItem value="association">🔗 Association</SelectItem>
                    <SelectItem value="quiz">🎯 Quiz</SelectItem>
                    <SelectItem value="completion">✍️ Complétion</SelectItem>
                    <SelectItem value="translation">📖 Traduction</SelectItem>
                    <SelectItem value="conversation">💬 Conversation</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes difficultés" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes difficultés</SelectItem>
                    <SelectItem value="1">Niveau 1 - Débutant</SelectItem>
                    <SelectItem value="2">Niveau 2 - Élémentaire</SelectItem>
                    <SelectItem value="3">Niveau 3 - Intermédiaire</SelectItem>
                    <SelectItem value="4">Niveau 4 - Avancé</SelectItem>
                    <SelectItem value="5">Niveau 5 - Expert</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentType === "exercises" && filteredExercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ExerciseCard
                {...exercise}
                description={exercise.description || ""}
                completions={exercise.stats.completions}
                rating={exercise.stats.rating}
                onPlay={() => navigate(`/player/exercise/${exercise.id}`)}
                onEdit={undefined}
              />
            </div>
          ))}

          {contentType === "topics" && filteredTopics.map((topic, index) => (
            <div
              key={topic.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TopicCard
                title={topic.title}
                description={topic.description}
                icon={topic.icon}
                color={topic.color}
                language={topic.language}
                tags={topic.tags}
                pathCount={topic.pathIds.length}
                exerciseCount={topic.exerciseIds.length}
                onClick={() => navigate(`/topic/${topic.id}`)}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {contentType === "exercises" && filteredExercises.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Aucun exercice trouvé
            </h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos filtres
            </p>
          </div>
        )}

        {contentType === "topics" && filteredTopics.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Aucun topic trouvé
            </h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos filtres
            </p>
          </div>
        )}

        {/* Pagination Placeholder */}
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  page === 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-accent border border-border"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
