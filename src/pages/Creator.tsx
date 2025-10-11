import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Gamepad2, FolderTree, ChevronRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const Creator = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('pages');

  const creatorOptions = [
    {
      id: "exercise",
      title: t('creator.createExercise'),
      description: t('creator.exerciseDescription'),
      icon: Gamepad2,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      createPath: "/creator/exercise",
      explorePath: "/creator/exercise-list"
    },
    {
      id: "path",
      title: t('creator.createPath'),
      description: t('creator.pathDescription'),
      icon: BookOpen,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      createPath: "/creator/path",
      explorePath: "/creator/path-list"
    },
    {
      id: "topic",
      title: t('creator.createTopic'),
      description: t('creator.topicDescription'),
      icon: FolderTree,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      createPath: "/creator/topic",
      explorePath: "/creator/topic-list"
    }
  ];

  const editOptions = [
    {
      id: "edit-exercise",
      title: t('creator.editExercise'),
      description: t('creator.exerciseDescription'),
      icon: Gamepad2,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      path: "/creator/exercise-list"
    },
    {
      id: "edit-path",
      title: t('creator.editPath'),
      description: t('creator.pathDescription'),
      icon: BookOpen,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      path: "/creator/path-list"
    },
    {
      id: "edit-topic",
      title: t('creator.editTopic'),
      description: t('creator.topicDescription'),
      icon: FolderTree,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      path: "/creator/topic-list"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">{t('creator.title')}</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('creator.subtitle')}
          </p>
        </div>

        {/* Create Options Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {creatorOptions.map((option, index) => {
            const Icon = option.icon;

            return (
              <Card
                key={option.id}
                className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group ${option.borderColor} border-2 animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className={`w-full h-32 bg-gradient-to-br ${option.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Icon className="w-16 h-16 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-sm min-h-[60px]">
                    {option.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => navigate(option.createPath)}
                  >
                    {t('creator.start')}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Edit Options Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {editOptions.map((option, index) => {
            const Icon = option.icon;

            return (
              <Card
                key={option.id}
                className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group ${option.borderColor} border-2 animate-scale-in`}
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <CardHeader>
                  <div className={`w-full h-32 bg-gradient-to-br ${option.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Icon className="w-16 h-16 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-sm min-h-[60px]">
                    {option.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => navigate(option.path)}
                  >
                    {t('creator.explore')}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="max-w-5xl mx-auto mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            💡 {t('creator.difference')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-5 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <Gamepad2 className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-blue-900">{t('creator.createExercise')}</h3>
              </div>
              <p className="text-sm text-blue-700">
                {t('creator.exerciseExplanation')}
              </p>
              <div className="mt-3 text-xs text-blue-600 font-semibold">
                {t('creator.example')} "{t('creator.exerciseExample')}"
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border border-purple-100">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-purple-900">{t('creator.createPath')}</h3>
              </div>
              <p className="text-sm text-purple-700">
                {t('creator.pathExplanation')}
              </p>
              <div className="mt-3 text-xs text-purple-600 font-semibold">
                {t('creator.example')} "{t('creator.pathExample')}"
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <FolderTree className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-green-900">{t('creator.createTopic')}</h3>
              </div>
              <p className="text-sm text-green-700">
                {t('creator.topicExplanation')}
              </p>
              <div className="mt-3 text-xs text-green-600 font-semibold">
                {t('creator.example')} "{t('creator.topicExample')}"
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-border text-center">
            <div className="text-3xl font-bold text-blue-600">📝</div>
            <div className="text-2xl font-bold text-foreground mt-2">{t('landing.simple')}</div>
            <p className="text-sm text-muted-foreground">{t('landing.simpleDesc')}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-border text-center">
            <div className="text-3xl font-bold text-purple-600">⚡</div>
            <div className="text-2xl font-bold text-foreground mt-2">{t('landing.fast')}</div>
            <p className="text-sm text-muted-foreground">{t('landing.fastDesc')}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-border text-center">
            <div className="text-3xl font-bold text-green-600">🌍</div>
            <div className="text-2xl font-bold text-foreground mt-2">{t('landing.shared')}</div>
            <p className="text-sm text-muted-foreground">{t('landing.sharedDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
