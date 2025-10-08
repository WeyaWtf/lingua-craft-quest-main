import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle36Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle36 = async () => {
    setIsInserting(true);

    const bundle36Cards = [
      { front: "sibling", back: "兄弟|kyoudai", category: "vocabulary", id: "1" },
      { front: "eldest son", back: "長男|chounan", category: "vocabulary", id: "2" },
      { front: "height", back: "高さ|takasa", category: "vocabulary", id: "3" },
      { front: "things to do", back: "用|you", category: "vocabulary", id: "4" },
      { front: "age, era", back: "時代|jidai", category: "vocabulary", id: "5" },
      { front: "position, location", back: "位置|ichi", category: "vocabulary", id: "6" },
      { front: "season", back: "季節|kisetsu", category: "vocabulary", id: "7" },
      { front: "hole", back: "穴|ana", category: "vocabulary", id: "8" },
      { front: "the back", back: "裏|ura", category: "vocabulary", id: "9" },
      { front: "island", back: "島|shima", category: "vocabulary", id: "10" },
      { front: "seashore, coast", back: "海岸|kaigan", category: "vocabulary", id: "11" },
      { front: "glass (material)", back: "ガラス|garasu", category: "vocabulary", id: "12" },
      { front: "natural", back: "自然|shizen", category: "vocabulary", id: "13" },
      { front: "wind", back: "風|kaze", category: "vocabulary", id: "14" },
      { front: "science", back: "科学|kagaku", category: "vocabulary", id: "15" },
      { front: "sun", back: "太陽|taiyou", category: "vocabulary", id: "16" },
      { front: "typhoon", back: "台風|taifuu", category: "vocabulary", id: "17" },
      { front: "north", back: "北|kita", category: "vocabulary", id: "18" },
      { front: "horse", back: "馬|uma", category: "vocabulary", id: "19" },
      { front: "beef", back: "牛肉|gyuuniku", category: "vocabulary", id: "20" },
      { front: "magazine, journal", back: "雑誌|zasshi", category: "vocabulary", id: "21" },
      { front: "novel", back: "小説|shousetsu", category: "vocabulary", id: "22" },
      { front: "embassy", back: "大使館|taishikan", category: "vocabulary", id: "23" },
      { front: "malfunction", back: "故障|koshou", category: "vocabulary", id: "24" },
      { front: "temperature", back: "温度|ondo", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 36 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle36Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 36 Flashcards créé:', data);
      toast.success("Exercice Bundle 36 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 36 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 36"
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
            onClick={insertBundle36}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 36 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle36Flashcard;
