import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle8Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle8 = async () => {
    setIsInserting(true);

    const bundle8Cards = [
      { front: "autumn, fall", back: "秋|aki", category: "vocabulary", id: "1" },
      { front: "send", back: "送る|okuru", category: "vocabulary", id: "2" },
      { front: "die", back: "死ぬ|shinu", category: "vocabulary", id: "3" },
      { front: "feeling, sensation", back: "気持ち|kimochi", category: "vocabulary", id: "4" },
      { front: "ride, take", back: "乗る|noru", category: "vocabulary", id: "5" },
      { front: "be present, stay", back: "いる|iru", category: "vocabulary", id: "6" },
      { front: "tree, wood", back: "木|ki", category: "vocabulary", id: "7" },
      { front: "open, unlock", back: "開ける|akeru", category: "vocabulary", id: "8" },
      { front: "shut, close", back: "閉める|shimeru", category: "vocabulary", id: "9" },
      { front: "continue, follow", back: "続く|tsuzuku", category: "vocabulary", id: "10" },
      { front: "doctor", back: "お医者さん|oishasan", category: "vocabulary", id: "11" },
      { front: "Japanese yen", back: "円|en", category: "vocabulary", id: "12" },
      { front: "here", back: "ここ|koko", category: "vocabulary", id: "13" },
      { front: "wait, wait for", back: "待つ|matsu", category: "vocabulary", id: "14" },
      { front: "low, short", back: "低い|hikui", category: "vocabulary", id: "15" },
      { front: "receive", back: "もらう|morau", category: "vocabulary", id: "16" },
      { front: "eat", back: "食べる|taberu", category: "vocabulary", id: "17" },
      { front: "older brother", back: "兄|ani", category: "vocabulary", id: "18" },
      { front: "name", back: "名前|namae", category: "vocabulary", id: "19" },
      { front: "husband", back: "夫|otto", category: "vocabulary", id: "20" },
      { front: "one", back: "一|ichi", category: "vocabulary", id: "21" },
      { front: "marriage", back: "結婚|kekkon", category: "vocabulary", id: "22" },
      { front: "parent", back: "親|oya", category: "vocabulary", id: "23" },
      { front: "speak, talk", back: "話す|hanasu", category: "vocabulary", id: "24" },
      { front: "a bit, a little", back: "少し|sukoshi", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 8 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle8Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 8 Flashcards créé:', data);
      toast.success("Exercice Bundle 8 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 8 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 8"
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
            onClick={insertBundle8}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 8 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle8Flashcard;
