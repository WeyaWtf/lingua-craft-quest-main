import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle35Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle35 = async () => {
    setIsInserting(true);

    const bundle35Cards = [
      { front: "mathematics", back: "数学|suugaku", category: "vocabulary", id: "1" },
      { front: "numeric characters", back: "数字|suuji", category: "vocabulary", id: "2" },
      { front: "music", back: "音楽|ongaku", category: "vocabulary", id: "3" },
      { front: "meal", back: "食事|shokuji", category: "vocabulary", id: "4" },
      { front: "wall, partition", back: "壁|kabe", category: "vocabulary", id: "5" },
      { front: "believe, trust", back: "信じる|shinjiru", category: "vocabulary", id: "6" },
      { front: "bring up, raise", back: "育てる|sodateru", category: "vocabulary", id: "7" },
      { front: "fall over", back: "倒れる|taoreru", category: "vocabulary", id: "8" },
      { front: "drop", back: "落とす|otosu", category: "vocabulary", id: "9" },
      { front: "substitute", back: "代わる|kawaru", category: "vocabulary", id: "10" },
      { front: "taxi", back: "タクシー|takushi-", category: "vocabulary", id: "11" },
      { front: "for sure", back: "確か|tashika", category: "vocabulary", id: "12" },
      { front: "stand, set up", back: "立てる|tateru", category: "vocabulary", id: "13" },
      { front: "junior high student", back: "中学生|chuugakusei", category: "vocabulary", id: "14" },
      { front: "sell, in demand", back: "売れる|ureru", category: "vocabulary", id: "15" },
      { front: "arrive at, reach", back: "着く|tsuku", category: "vocabulary", id: "16" },
      { front: "be decided", back: "決まる|kimaru", category: "vocabulary", id: "17" },
      { front: "decorate", back: "飾る|kazaru", category: "vocabulary", id: "18" },
      { front: "kill", back: "殺す|korosu", category: "vocabulary", id: "19" },
      { front: "lower, turn down", back: "下げる|sageru", category: "vocabulary", id: "20" },
      { front: "offer, give", back: "贈る|okuru", category: "vocabulary", id: "21" },
      { front: "visit, go to see", back: "訪ねる|tazuneru", category: "vocabulary", id: "22" },
      { front: "hit, strike", back: "打つ|utsu", category: "vocabulary", id: "23" },
      { front: "consultation", back: "相談|soudan", category: "vocabulary", id: "24" },
      { front: "entrance, door", back: "玄関|genkan", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 35 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle35Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 35 Flashcards créé:', data);
      toast.success("Exercice Bundle 35 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 35 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 35"
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
            onClick={insertBundle35}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 35 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle35Flashcard;
