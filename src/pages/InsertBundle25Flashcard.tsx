import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle25Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle25 = async () => {
    setIsInserting(true);

    const bundle25Cards = [
      { front: "I see, really", back: "なるほど|naruhodo", category: "vocabulary", id: "1" },
      { front: "in short", back: "つまり|tsumari", category: "vocabulary", id: "2" },
      { front: "as it is", back: "そのまま|sonomama", category: "vocabulary", id: "3" },
      { front: "clearly", back: "はっきり|hakkiri", category: "vocabulary", id: "4" },
      { front: "awful, hard", back: "大変|taihen", category: "vocabulary", id: "5" },
      { front: "simple, easy", back: "簡単|kantan", category: "vocabulary", id: "6" },
      { front: "look like", back: "似ている|niteiru", category: "vocabulary", id: "7" },
      { front: "be surprised", back: "驚く|odoroku", category: "vocabulary", id: "8" },
      { front: "dislike", back: "嫌|iya", category: "vocabulary", id: "9" },
      { front: "fight, argument", back: "喧嘩|kenka", category: "vocabulary", id: "10" },
      { front: "be late", back: "遅れる|okureru", category: "vocabulary", id: "11" },
      { front: "carrot", back: "にんじん|ninjin", category: "vocabulary", id: "12" },
      { front: "potato", back: "ジャガイモ|jagaimo", category: "vocabulary", id: "13" },
      { front: "eggplant", back: "ナス|nasu", category: "vocabulary", id: "14" },
      { front: "kettle", back: "やかん|yakan", category: "vocabulary", id: "15" },
      { front: "discuss", back: "話し合う|hanashiau", category: "vocabulary", id: "16" },
      { front: "leave, leave undone", back: "残す|nokosu", category: "vocabulary", id: "17" },
      { front: "treat, host", back: "ごちそうする|gochisousuru", category: "vocabulary", id: "18" },
      { front: "fit, match", back: "合う|au", category: "vocabulary", id: "19" },
      { front: "hit, strike", back: "当たる|ataru", category: "vocabulary", id: "20" },
      { front: "gather", back: "集まる|atsumaru", category: "vocabulary", id: "21" },
      { front: "place, space", back: "場所|basho", category: "vocabulary", id: "22" },
      { front: "sea, ocean", back: "海|umi", category: "vocabulary", id: "23" },
      { front: "boy (7-18 years)", back: "少年|shounen", category: "vocabulary", id: "24" },
      { front: "grandchild", back: "孫|mago", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 25 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle25Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 25 Flashcards créé:', data);
      toast.success("Exercice Bundle 25 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 25 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 25"
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
            onClick={insertBundle25}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 25 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle25Flashcard;
