import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle37Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle37 = async () => {
    setIsInserting(true);

    const bundle37Cards = [
      { front: "something, some", back: "何か|nanika", category: "vocabulary", id: "1" },
      { front: "over there", back: "向こう|mukou", category: "vocabulary", id: "2" },
      { front: "center, middle", back: "真ん中|mannaka", category: "vocabulary", id: "3" },
      { front: "far away", back: "遠く|tooku", category: "vocabulary", id: "4" },
      { front: "side, width across", back: "横|yoko", category: "vocabulary", id: "5" },
      { front: "boring, dull", back: "つまらない|tsumaranai", category: "vocabulary", id: "6" },
      { front: "excellent", back: "素晴らしい|subarashii", category: "vocabulary", id: "7" },
      { front: "every year", back: "毎年|maitoshi", category: "vocabulary", id: "8" },
      { front: "next month", back: "来月|raigetsu", category: "vocabulary", id: "9" },
      { front: "date and time", back: "日時|nichiji", category: "vocabulary", id: "10" },
      { front: "early evening", back: "夕方|yuugata", category: "vocabulary", id: "11" },
      { front: "pass, go through", back: "通る|tooru", category: "vocabulary", id: "12" },
      { front: "automobile", back: "自動車|jidousha", category: "vocabulary", id: "13" },
      { front: "get used to", back: "慣れる|nareru", category: "vocabulary", id: "14" },
      { front: "take (photograph)", back: "撮る|toru", category: "vocabulary", id: "15" },
      { front: "at last, finally", back: "やっと|yatto", category: "vocabulary", id: "16" },
      { front: "knock, bang", back: "どんどん|dondon", category: "vocabulary", id: "17" },
      { front: "line up, arrange", back: "並べる|naraberu", category: "vocabulary", id: "18" },
      { front: "escape, run away", back: "逃げる|nigeru", category: "vocabulary", id: "19" },
      { front: "hand over, give", back: "渡す|watasu", category: "vocabulary", id: "20" },
      { front: "price", back: "値段|nedan", category: "vocabulary", id: "21" },
      { front: "both", back: "両方|ryouhou", category: "vocabulary", id: "22" },
      { front: "promise, vow", back: "約束|yakusoku", category: "vocabulary", id: "23" },
      { front: "part", back: "一部|ichibu", category: "vocabulary", id: "24" },
      { front: "radio", back: "ラジオ|rajio", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 37 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle37Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 37 Flashcards créé:', data);
      toast.success("Exercice Bundle 37 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 37 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 37"
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
            onClick={insertBundle37}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 37 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle37Flashcard;
