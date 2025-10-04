import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBunble = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBunble1 = async () => {
    setIsInserting(true);

    const bunble1Cards = [
      { front: "go", back: "行く|iku", category: "vocabulary", id: "1" },
      { front: "see, look at", back: "見る|miru", category: "vocabulary", id: "2" },
      { front: "a lot of, many", back: "多い|ooi", category: "vocabulary", id: "3" },
      { front: "home, household", back: "家|ie", category: "vocabulary", id: "4" },
      { front: "this, this one", back: "これ|kore", category: "vocabulary", id: "5" },
      { front: "that, that one", back: "それ|sore", category: "vocabulary", id: "6" },
      { front: "I", back: "私|watashi", category: "vocabulary", id: "7" },
      { front: "work, job", back: "仕事|shigoto", category: "vocabulary", id: "8" },
      { front: "when", back: "いつ|itsu", category: "vocabulary", id: "9" },
      { front: "do, make", back: "する|suru", category: "vocabulary", id: "10" },
      { front: "go out, leave", back: "出る|deru", category: "vocabulary", id: "11" },
      { front: "use, make use of", back: "使う|tsukau", category: "vocabulary", id: "12" },
      { front: "place", back: "所|tokoro", category: "vocabulary", id: "13" },
      { front: "make, create", back: "作る|tsukuru", category: "vocabulary", id: "14" },
      { front: "think", back: "思う|omou", category: "vocabulary", id: "15" },
      { front: "have, possess", back: "持つ|motsu", category: "vocabulary", id: "16" },
      { front: "buy", back: "買う|kau", category: "vocabulary", id: "17" },
      { front: "time, hour", back: "時間|jikan", category: "vocabulary", id: "18" },
      { front: "know", back: "知る|shiru", category: "vocabulary", id: "19" },
      { front: "same, identical", back: "同じ|onaji", category: "vocabulary", id: "20" },
      { front: "now", back: "今|ima", category: "vocabulary", id: "21" },
      { front: "new", back: "新しい|atarashii", category: "vocabulary", id: "22" },
      { front: "become", back: "なる|naru", category: "vocabulary", id: "23" },
      { front: "(not) yet, still", back: "まだ|mada", category: "vocabulary", id: "24" },
      { front: "after", back: "あと|ato", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "Bundle 1",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bunble1Cards,
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

      console.log('✅ Exercice Bundle 1 créé:', data);
      toast.success("Exercice Bundle 1 créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer Bundle 1</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 1"
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
            onClick={insertBunble1}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 1"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBunble;
