import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle4Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle4 = async () => {
    setIsInserting(true);

    const bundle4Cards = [
      { front: "run", back: "走る|hashiru", category: "vocabulary", id: "1" },
      { front: "put in", back: "入れる|ireru", category: "vocabulary", id: "2" },
      { front: "teach, tell", back: "教える|oshieru", category: "vocabulary", id: "3" },
      { front: "walk, go on foot", back: "歩く|aruku", category: "vocabulary", id: "4" },
      { front: "meet", back: "会う|au", category: "vocabulary", id: "5" },
      { front: "write", back: "書く|kaku", category: "vocabulary", id: "6" },
      { front: "head", back: "頭|atama", category: "vocabulary", id: "7" },
      { front: "sell", back: "売る|uru", category: "vocabulary", id: "8" },
      { front: "like a lot", back: "大好き|daisuki", category: "vocabulary", id: "9" },
      { front: "body, physique", back: "体|karada", category: "vocabulary", id: "10" },
      { front: "at once, soon", back: "直ぐ|sugu", category: "vocabulary", id: "11" },
      { front: "fly", back: "飛ぶ|tobu", category: "vocabulary", id: "12" },
      { front: "very", back: "とても|totemo", category: "vocabulary", id: "13" },
      { front: "who", back: "誰|dare", category: "vocabulary", id: "14" },
      { front: "favorite, liked", back: "好き|suki", category: "vocabulary", id: "15" },
      { front: "read", back: "読む|yomu", category: "vocabulary", id: "16" },
      { front: "next", back: "次|tsugi", category: "vocabulary", id: "17" },
      { front: "you", back: "あなた|anata", category: "vocabulary", id: "18" },
      { front: "drink", back: "飲む|nomu", category: "vocabulary", id: "19" },
      { front: "old", back: "古い|furui", category: "vocabulary", id: "20" },
      { front: "question", back: "質問|shitsumon", category: "vocabulary", id: "21" },
      { front: "today", back: "今日|kyou", category: "vocabulary", id: "22" },
      { front: "friend, companion", back: "友達|tomodachi", category: "vocabulary", id: "23" },
      { front: "early", back: "早い|hayai", category: "vocabulary", id: "24" },
      { front: "what, which", back: "どれ|dore", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 4 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle4Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 4 Flashcards créé:', data);
      toast.success("Exercice Bundle 4 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 4 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 4"
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
            onClick={insertBundle4}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 4 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle4Flashcard;
