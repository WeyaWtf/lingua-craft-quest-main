import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle2Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle2 = async () => {
    setIsInserting(true);

    const bundle2Cards = [
      { front: "hear, ask", back: "聞く|kiku", category: "vocabulary", id: "1" },
      { front: "say, tell", back: "言う|iu", category: "vocabulary", id: "2" },
      { front: "few, little", back: "少ない|sukunai", category: "vocabulary", id: "3" },
      { front: "high, tall", back: "高い|takai", category: "vocabulary", id: "4" },
      { front: "child", back: "子供|kodomo", category: "vocabulary", id: "5" },
      { front: "so, that way", back: "そう|sou", category: "vocabulary", id: "6" },
      { front: "already, yet", back: "もう|mou", category: "vocabulary", id: "7" },
      { front: "student", back: "学生|gakusei", category: "vocabulary", id: "8" },
      { front: "hot (to touch)", back: "熱い|atsui", category: "vocabulary", id: "9" },
      { front: "please", back: "どうぞ|douzo", category: "vocabulary", id: "10" },
      { front: "afternoon, p.m.", back: "午後|gogo", category: "vocabulary", id: "11" },
      { front: "long", back: "長い|nagai", category: "vocabulary", id: "12" },
      { front: "book, volume", back: "本|hon", category: "vocabulary", id: "13" },
      { front: "this year", back: "今年|kotoshi", category: "vocabulary", id: "14" },
      { front: "often, well", back: "よく|yoku", category: "vocabulary", id: "15" },
      { front: "she, girlfriend", back: "彼女|kanojo", category: "vocabulary", id: "16" },
      { front: "how, what", back: "どう|dou", category: "vocabulary", id: "17" },
      { front: "word, language", back: "言葉|kotoba", category: "vocabulary", id: "18" },
      { front: "face", back: "顔|kao", category: "vocabulary", id: "19" },
      { front: "finish, end", back: "終わる|owaru", category: "vocabulary", id: "20" },
      { front: "one (thing)", back: "一つ|hitotsu", category: "vocabulary", id: "21" },
      { front: "give, offer", back: "あげる|ageru", category: "vocabulary", id: "22" },
      { front: "like this, such", back: "こう|kou", category: "vocabulary", id: "23" },
      { front: "school", back: "学校|gakkou", category: "vocabulary", id: "24" },
      { front: "be given", back: "くれる|kureru", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "Bundle 2",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle2Cards,
        shuffleSides: true
      },
      author_id: "demo",
      is_published: true
    };

    try {
      const { data, error } = await supabase
        .from('exercises')
        .insert([exerciseData])
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de l\'insertion:', error);
        toast.error("Erreur lors de la création de l'exercice");
        setIsInserting(false);
        return;
      }

      console.log('✅ Exercice Bundle 2 créé:', data);
      toast.success("Exercice Bundle 2 créé avec succès !");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) {
      console.error('Erreur:', err);
      toast.error("Erreur lors de la création");
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer Bundle 2</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 2"
            avec 25 mots de base (niveau N5).
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Flashcards</li>
              <li>• Nombre de cartes : 25</li>
              <li>• Langue : Japonais 🇯🇵</li>
              <li>• Niveau : Débutant (N5)</li>
              <li>• Mélange recto/verso : Activé</li>
              <li>• Format : Anglais → Japonais (kanji + romanji)</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBundle2}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 2"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle2Flashcard;
