import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle11Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle11 = async () => {
    setIsInserting(true);

    const bundle11Cards = [
      { front: "be sunny", back: "晴れる|hareru", category: "vocabulary", id: "1" },
      { front: "dirty", back: "汚い|kitanai", category: "vocabulary", id: "2" },
      { front: "brown", back: "茶色|chairo", category: "vocabulary", id: "3" },
      { front: "be empty", back: "空く|suku", category: "vocabulary", id: "4" },
      { front: "go up, climb", back: "上る|noboru", category: "vocabulary", id: "5" },
      { front: "meal, rice", back: "ご飯|gohan", category: "vocabulary", id: "6" },
      { front: "counter for days", back: "日|nichi", category: "vocabulary", id: "7" },
      { front: "hair", back: "髪の毛|kaminoke", category: "vocabulary", id: "8" },
      { front: "switch on", back: "つける|tsukeru", category: "vocabulary", id: "9" },
      { front: "Monday", back: "月曜日|getsuyoubi", category: "vocabulary", id: "10" },
      { front: "enter", back: "入る|hairu", category: "vocabulary", id: "11" },
      { front: "katakana", back: "カタカナ|katakana", category: "vocabulary", id: "12" },
      { front: "this week", back: "今週|konshuu", category: "vocabulary", id: "13" },
      { front: "open", back: "開く|hiraku", category: "vocabulary", id: "14" },
      { front: "water", back: "水|mizu", category: "vocabulary", id: "15" },
      { front: "that (over there)", back: "あれ|are", category: "vocabulary", id: "16" },
      { front: "two", back: "二|ni", category: "vocabulary", id: "17" },
      { front: "tighten, fasten", back: "締める|shimeru", category: "vocabulary", id: "18" },
      { front: "bad (taste)", back: "まずい|mazui", category: "vocabulary", id: "19" },
      { front: "hiragana", back: "平仮名|hiragana", category: "vocabulary", id: "20" },
      { front: "become cloudy", back: "曇る|kumoru", category: "vocabulary", id: "21" },
      { front: "touch, feel", back: "触る|sawaru", category: "vocabulary", id: "22" },
      { front: "no good", back: "駄目|dame", category: "vocabulary", id: "23" },
      { front: "beverage, drink", back: "飲み物|nomimono", category: "vocabulary", id: "24" },
      { front: "Thursday", back: "木曜日|mokuyoubi", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 11 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle11Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 11 Flashcards créé:', data);
      toast.success("Exercice Bundle 11 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 11 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 11"
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
            onClick={insertBundle11}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 11 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle11Flashcard;
