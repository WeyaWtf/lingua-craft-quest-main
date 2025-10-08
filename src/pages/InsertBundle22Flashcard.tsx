import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle22Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle22 = async () => {
    setIsInserting(true);

    const bundle22Cards = [
      { front: "glasses", back: "眼鏡|megane", category: "vocabulary", id: "1" },
      { front: "bag, handbag", back: "鞄|kaban", category: "vocabulary", id: "2" },
      { front: "over there", back: "あっち|acchi", category: "vocabulary", id: "3" },
      { front: "gentle, quiet", back: "大人しい|otonashii", category: "vocabulary", id: "4" },
      { front: "not good at", back: "下手|heta", category: "vocabulary", id: "5" },
      { front: "strict, severe", back: "厳しい|kibishii", category: "vocabulary", id: "6" },
      { front: "by oneself, alone", back: "一人で|hitoride", category: "vocabulary", id: "7" },
      { front: "answer, solution", back: "答え|kotae", category: "vocabulary", id: "8" },
      { front: "these days", back: "この頃|konogoro", category: "vocabulary", id: "9" },
      { front: "regretful", back: "残念|zannen", category: "vocabulary", id: "10" },
      { front: "put away", back: "仕舞う|shimau", category: "vocabulary", id: "11" },
      { front: "anxiety, worry", back: "心配|shinpai", category: "vocabulary", id: "12" },
      { front: "outside", back: "外|soto", category: "vocabulary", id: "13" },
      { front: "important", back: "大切|taisetsu", category: "vocabulary", id: "14" },
      { front: "just, exactly", back: "ちょうど|choudo", category: "vocabulary", id: "15" },
      { front: "help, save", back: "助ける|tasukeru", category: "vocabulary", id: "16" },
      { front: "hold a job", back: "勤める|tsutomeru", category: "vocabulary", id: "17" },
      { front: "take along", back: "連れていく|tsureteiku", category: "vocabulary", id: "18" },
      { front: "healthy, sturdy", back: "丈夫|joubu", category: "vocabulary", id: "19" },
      { front: "lively, exciting", back: "賑やか|nigiyaka", category: "vocabulary", id: "20" },
      { front: "sleepy", back: "眠い|nemui", category: "vocabulary", id: "21" },
      { front: "mountain", back: "山|yama", category: "vocabulary", id: "22" },
      { front: "bridge", back: "橋|hashi", category: "vocabulary", id: "23" },
      { front: "come to a stop", back: "止まる|tomaru", category: "vocabulary", id: "24" },
      { front: "fall, come down", back: "降る|furu", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 22 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle22Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 22 Flashcards créé:', data);
      toast.success("Exercice Bundle 22 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 22 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 22"
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
            onClick={insertBundle22}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 22 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle22Flashcard;
