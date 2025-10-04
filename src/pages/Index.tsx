import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, BookOpen, Users, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Catalogue Riche",
      description: "Des centaines d'exercices dans plusieurs langues",
      color: "bg-exercise-translation-light text-exercise-translation",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Création Intuitive",
      description: "Créez vos propres exercices en quelques clics",
      color: "bg-exercise-quiz-light text-exercise-quiz",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Communauté Active",
      description: "Partagez et apprenez avec d'autres passionnés",
      color: "bg-exercise-flashcard-light text-exercise-flashcard",
    },
  ];

  const exerciseTypes = [
    { icon: "📇", label: "Cartes Flash", color: "bg-exercise-flashcard" },
    { icon: "🔗", label: "Association", color: "bg-exercise-association" },
    { icon: "🎯", label: "Quiz", color: "bg-exercise-quiz" },
    { icon: "✍️", label: "Complétion", color: "bg-exercise-completion" },
    { icon: "📖", label: "Traduction", color: "bg-exercise-translation" },
    { icon: "💬", label: "Conversation", color: "bg-exercise-conversation" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Plateforme d'apprentissage collaborative
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Apprenez les langues
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              à votre manière
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Créez, partagez et pratiquez des exercices de langues adaptés à votre niveau.
            Rejoignez une communauté passionnée d'apprenants.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg group">
                Parcourir le catalogue
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/creator">
              <Button size="lg" variant="outline" className="border-2">
                Créer un exercice
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Exercise Types */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Types d'exercices disponibles
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {exerciseTypes.map((type, index) => (
              <div
                key={type.label}
                className="bg-card rounded-xl p-6 text-center border border-border hover:shadow-lg transition-all cursor-pointer group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center text-3xl mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                  {type.icon}
                </div>
                <p className="text-sm font-medium text-foreground">{type.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto bg-gradient-hero rounded-2xl p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à commencer votre voyage linguistique ?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Rejoignez des milliers d'apprenants passionnés
          </p>
          <Link to="/catalog">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
              Commencer maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
