import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle21Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle21 = async () => {
    setIsInserting(true);

    const bundle21Cards = [
      { front: "full name", back: "氏名|shimei", category: "vocabulary", id: "1" },
      { front: "tonight", back: "今夜|konya", category: "vocabulary", id: "2" },
      { front: "midnight", back: "夜中|yonaka", category: "vocabulary", id: "3" },
      { front: "next week", back: "来週|raishuu", category: "vocabulary", id: "4" },
      { front: "someone", back: "誰か|dareka", category: "vocabulary", id: "5" },
      { front: "what", back: "何|nan", category: "vocabulary", id: "6" },
      { front: "this morning", back: "今朝|kesa", category: "vocabulary", id: "7" },
      { front: "sushi", back: "寿司|sushi", category: "vocabulary", id: "8" },
      { front: "put on (shoes)", back: "履く|haku", category: "vocabulary", id: "9" },
      { front: "uncle", back: "おじさん|ojisan", category: "vocabulary", id: "10" },
      { front: "aunt", back: "おばさん|obasan", category: "vocabulary", id: "11" },
      { front: "grandmother", back: "お祖母さん|obaasan", category: "vocabulary", id: "12" },
      { front: "cousin", back: "いとこ|itoko", category: "vocabulary", id: "13" },
      { front: "dictionary", back: "辞書|jisho", category: "vocabulary", id: "14" },
      { front: "breakfast", back: "朝ご飯|asagohan", category: "vocabulary", id: "15" },
      { front: "white", back: "白|shiro", category: "vocabulary", id: "16" },
      { front: "which (casual)", back: "どっち|docchi", category: "vocabulary", id: "17" },
      { front: "there (casual)", back: "そっち|socchi", category: "vocabulary", id: "18" },
      { front: "tomorrow", back: "明日|ashita", category: "vocabulary", id: "19" },
      { front: "day after tomorrow", back: "明後日|myougonichi", category: "vocabulary", id: "20" },
      { front: "day before yesterday", back: "一昨日|ototoi", category: "vocabulary", id: "21" },
      { front: "garden, yard", back: "庭|niwa", category: "vocabulary", id: "22" },
      { front: "left side", back: "左側|hidarigawa", category: "vocabulary", id: "23" },
      { front: "right side", back: "右側|migigawa", category: "vocabulary", id: "24" },
      { front: "finger, toe", back: "指|yubi", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 21 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle21Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 21 Flashcards créé:', data);
      toast.success("Exercice Bundle 21 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 21 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 21"
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
            onClick={insertBundle21}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 21 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle21Flashcard;
