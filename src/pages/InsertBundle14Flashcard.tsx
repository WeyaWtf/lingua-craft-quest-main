import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle14Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle14 = async () => {
    setIsInserting(true);

    const bundle14Cards = [
      { front: "warm", back: "暖かい|atatakai", category: "vocabulary", id: "1" },
      { front: "exist, there is", back: "ある|aru", category: "vocabulary", id: "2" },
      { front: "good", back: "いい|ii", category: "vocabulary", id: "3" },
      { front: "up, above", back: "上|ue", category: "vocabulary", id: "4" },
      { front: "train station", back: "駅|eki", category: "vocabulary", id: "5" },
      { front: "tasty", back: "美味しい|oishii", category: "vocabulary", id: "6" },
      { front: "yesterday", back: "昨日|kinou", category: "vocabulary", id: "7" },
      { front: "pretty, clean", back: "綺麗|kirei", category: "vocabulary", id: "8" },
      { front: "five", back: "五|go", category: "vocabulary", id: "9" },
      { front: "nine (things)", back: "九つ|kokonotsu", category: "vocabulary", id: "10" },
      { front: "favor", back: "お願い|onegai", category: "vocabulary", id: "11" },
      { front: "give an answer", back: "答える|kotaeru", category: "vocabulary", id: "12" },
      { front: "ahead, first", back: "先|saki", category: "vocabulary", id: "13" },
      { front: "cold (air)", back: "寒い|samui", category: "vocabulary", id: "14" },
      { front: "four", back: "四|shi", category: "vocabulary", id: "15" },
      { front: "three days", back: "三日|mikka", category: "vocabulary", id: "16" },
      { front: "under, below", back: "下|shita", category: "vocabulary", id: "17" },
      { front: "all right, OK", back: "大丈夫|daijoubu", category: "vocabulary", id: "18" },
      { front: "adult", back: "大人|otona", category: "vocabulary", id: "19" },
      { front: "take out", back: "出す|dasu", category: "vocabulary", id: "20" },
      { front: "father", back: "父|chichi", category: "vocabulary", id: "21" },
      { front: "mother", back: "母|haha", category: "vocabulary", id: "22" },
      { front: "moon", back: "月|tsuki", category: "vocabulary", id: "23" },
      { front: "younger sister", back: "妹|imouto", category: "vocabulary", id: "24" },
      { front: "cold (touch)", back: "冷たい|tsumetai", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 14 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: { cards: bundle14Cards, shuffleSides: true },
      author_id: "demo",
      is_published: true
    };

    try {
      const { data, error } = await supabase.from('exercises').insert([exerciseData]).select().single();
      if (error) {
        console.error('Erreur lors de l\'insertion:', error);
        toast.error("Erreur lors de la création de l'exercice");
        setIsInserting(false);
        return;
      }
      console.log('✅ Exercice JAP LIST 1000 - Bundle 14 Flashcards créé:', data);
      toast.success("Exercice Bundle 14 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 14 Flashcards</h1>
          <p className="text-muted-foreground mb-6">Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 14" avec 25 mots de base (niveau N5).</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Flashcards</li>
              <li>• Nombre de cartes : 25</li>
              <li>• Langue : Japonais 🇯🇵</li>
              <li>• Niveau : Débutant (N5)</li>
            </ul>
          </div>
          <Button size="lg" onClick={insertBundle14} disabled={isInserting} className="min-w-[200px]">
            {isInserting ? "Insertion en cours..." : "Créer Bundle 14 Flashcards"}
          </Button>
          <p className="text-xs text-muted-foreground mt-4">Une fois créé, l'exercice sera disponible dans le catalogue</p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle14Flashcard;
