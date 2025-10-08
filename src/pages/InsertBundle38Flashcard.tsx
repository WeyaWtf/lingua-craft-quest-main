import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle38Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle38 = async () => {
    setIsInserting(true);

    const bundle38Cards = [
      { front: "be hospitalized", back: "入院|nyuuin", category: "vocabulary", id: "1" },
      { front: "news", back: "ニュース|nyu-su", category: "vocabulary", id: "2" },
      { front: "travel, trip", back: "旅行|ryokou", category: "vocabulary", id: "3" },
      { front: "preparation", back: "用意|youi", category: "vocabulary", id: "4" },
      { front: "stretch, grow", back: "伸びる|nobiru", category: "vocabulary", id: "5" },
      { front: "party", back: "パーティー|pa-ti-", category: "vocabulary", id: "6" },
      { front: "beer", back: "ビール|bi-ru", category: "vocabulary", id: "7" },
      { front: "early, soon", back: "早く|hayaku", category: "vocabulary", id: "8" },
      { front: "program", back: "番組|bangumi", category: "vocabulary", id: "9" },
      { front: "video", back: "ビデオ|bideo", category: "vocabulary", id: "10" },
      { front: "increase", back: "増やす|fuyasu", category: "vocabulary", id: "11" },
      { front: "wave, shake", back: "振る|furu", category: "vocabulary", id: "12" },
      { front: "welcome, receive", back: "迎える|mukaeru", category: "vocabulary", id: "13" },
      { front: "unreasonable", back: "無理|muri", category: "vocabulary", id: "14" },
      { front: "rare, scarce", back: "珍しい|mezurashii", category: "vocabulary", id: "15" },
      { front: "famous", back: "有名|yuumei", category: "vocabulary", id: "16" },
      { front: "be happy", back: "喜ぶ|yorokobu", category: "vocabulary", id: "17" },
      { front: "study abroad", back: "留学|ryuugaku", category: "vocabulary", id: "18" },
      { front: "cooking", back: "料理|ryouri", category: "vocabulary", id: "19" },
      { front: "vegetable", back: "野菜|yasai", category: "vocabulary", id: "20" },
      { front: "be divided", back: "分かれる|wakareru", category: "vocabulary", id: "21" },
      { front: "special", back: "特別|tokubetsu", category: "vocabulary", id: "22" },
      { front: "reason, excuse", back: "理由|riyuu", category: "vocabulary", id: "23" },
      { front: "freedom", back: "自由|jiyuu", category: "vocabulary", id: "24" },
      { front: "direction, course", back: "方向|houkou", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 38 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle38Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 38 Flashcards créé:', data);
      toast.success("Exercice Bundle 38 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 38 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 38"
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
            onClick={insertBundle38}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 38 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle38Flashcard;
