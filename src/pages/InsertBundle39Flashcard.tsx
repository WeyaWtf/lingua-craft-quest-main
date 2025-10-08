import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle39Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle39 = async () => {
    setIsInserting(true);

    const bundle39Cards = [
      { front: "remain", back: "残る|nokoru", category: "vocabulary", id: "1" },
      { front: "building", back: "ビル|biru", category: "vocabulary", id: "2" },
      { front: "gather together", back: "まとめる|matomeru", category: "vocabulary", id: "3" },
      { front: "flow, run", back: "流れる|nagareru", category: "vocabulary", id: "4" },
      { front: "sweater", back: "セーター|se-ta-", category: "vocabulary", id: "5" },
      { front: "shirt", back: "シャツ|shatsu", category: "vocabulary", id: "6" },
      { front: "laundry, washing", back: "洗濯|sentaku", category: "vocabulary", id: "7" },
      { front: "make a mistake", back: "間違える|machigaeru", category: "vocabulary", id: "8" },
      { front: "ice cream", back: "アイスクリーム|aisukuri-mu", category: "vocabulary", id: "9" },
      { front: "become dry", back: "乾く|kawaku", category: "vocabulary", id: "10" },
      { front: "cool off", back: "冷める|sameru", category: "vocabulary", id: "11" },
      { front: "a variety of", back: "色々|iroiro", category: "vocabulary", id: "12" },
      { front: "take, bring", back: "持って行く|motteiku", category: "vocabulary", id: "13" },
      { front: "change clothes", back: "着替える|kigaeru", category: "vocabulary", id: "14" },
      { front: "soap", back: "石鹸|sekken", category: "vocabulary", id: "15" },
      { front: "baseball", back: "野球|yakyuu", category: "vocabulary", id: "16" },
      { front: "lunch", back: "昼食|chyuushoku", category: "vocabulary", id: "17" },
      { front: "breakfast", back: "朝食|choushoku", category: "vocabulary", id: "18" },
      { front: "sleep, lie idle", back: "眠る|nemuru", category: "vocabulary", id: "19" },
      { front: "beginning", back: "初め|hajime", category: "vocabulary", id: "20" },
      { front: "fire, flame", back: "火|hi", category: "vocabulary", id: "21" },
      { front: "west, western", back: "西|nishi", category: "vocabulary", id: "22" },
      { front: "east, eastern", back: "東|higashi", category: "vocabulary", id: "23" },
      { front: "south", back: "南|minami", category: "vocabulary", id: "24" },
      { front: "supper, dinner", back: "夕食|yuushoku", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 39 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle39Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 39 Flashcards créé:', data);
      toast.success("Exercice Bundle 39 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 39 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 39"
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
            onClick={insertBundle39}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 39 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle39Flashcard;
