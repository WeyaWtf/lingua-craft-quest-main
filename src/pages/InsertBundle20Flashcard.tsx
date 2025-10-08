import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle20Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle20 = async () => {
    setIsInserting(true);

    const bundle20Cards = [
      { front: "address", back: "住所|juusho", category: "vocabulary", id: "1" },
      { front: "here, this way", back: "こちら|kochira", category: "vocabulary", id: "2" },
      { front: "purse, wallet", back: "財布|saifu", category: "vocabulary", id: "3" },
      { front: "passport", back: "パスポート|pasupo-to", category: "vocabulary", id: "4" },
      { front: "chair", back: "椅子|isu", category: "vocabulary", id: "5" },
      { front: "cute, sweet", back: "可愛い|kawaii", category: "vocabulary", id: "6" },
      { front: "grandfather", back: "お祖父さん|ojiisan", category: "vocabulary", id: "7" },
      { front: "postage stamp", back: "切手|kitte", category: "vocabulary", id: "8" },
      { front: "cool (temperature)", back: "涼しい|suzushii", category: "vocabulary", id: "9" },
      { front: "how many, how old", back: "いくつ|ikutsu", category: "vocabulary", id: "10" },
      { front: "menu", back: "メニュー|menyu-", category: "vocabulary", id: "11" },
      { front: "electricity", back: "電気|denki", category: "vocabulary", id: "12" },
      { front: "win", back: "勝つ|katsu", category: "vocabulary", id: "13" },
      { front: "lose", back: "負ける|makeru", category: "vocabulary", id: "14" },
      { front: "build, erect", back: "建てる|tateru", category: "vocabulary", id: "15" },
      { front: "diary", back: "日記|nikki", category: "vocabulary", id: "16" },
      { front: "sell out", back: "売り切れ|urikire", category: "vocabulary", id: "17" },
      { front: "police officer", back: "お巡りさん|omawarisan", category: "vocabulary", id: "18" },
      { front: "alarm clock", back: "目覚まし時計|mezamashitokei", category: "vocabulary", id: "19" },
      { front: "receipt", back: "レシート|reshi-to", category: "vocabulary", id: "20" },
      { front: "tissue", back: "ティッシュ|tisshu", category: "vocabulary", id: "21" },
      { front: "toothbrush", back: "歯ブラシ|haburashi", category: "vocabulary", id: "22" },
      { front: "go down", back: "下りる|oriru", category: "vocabulary", id: "23" },
      { front: "wash", back: "洗う|arau", category: "vocabulary", id: "24" },
      { front: "part-time", back: "パート|pa-to", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 20 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle20Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 20 Flashcards créé:', data);
      toast.success("Exercice Bundle 20 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 20 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 20"
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
            onClick={insertBundle20}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 20 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle20Flashcard;
