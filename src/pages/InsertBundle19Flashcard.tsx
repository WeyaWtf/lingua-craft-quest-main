import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle19Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle19 = async () => {
    setIsInserting(true);

    const bundle19Cards = [
      { front: "enough, plentiful", back: "十分|juubun", category: "vocabulary", id: "1" },
      { front: "(not) much", back: "あまり|amari", category: "vocabulary", id: "2" },
      { front: "photograph", back: "写真|shashin", category: "vocabulary", id: "3" },
      { front: "repeat", back: "繰り返す|kurikaesu", category: "vocabulary", id: "4" },
      { front: "kind, type", back: "種類|shurui", category: "vocabulary", id: "5" },
      { front: "opinion", back: "意見|iken", category: "vocabulary", id: "6" },
      { front: "newspaper", back: "新聞|shinbun", category: "vocabulary", id: "7" },
      { front: "sentence, writing", back: "文章|bunshou", category: "vocabulary", id: "8" },
      { front: "stand out", back: "目立つ|medatsu", category: "vocabulary", id: "9" },
      { front: "opponent", back: "相手|aite", category: "vocabulary", id: "10" },
      { front: "hospital", back: "病院|byouin", category: "vocabulary", id: "11" },
      { front: "thick, bulky", back: "厚い|atsui", category: "vocabulary", id: "12" },
      { front: "busy, occupied", back: "忙しい|isogashii", category: "vocabulary", id: "13" },
      { front: "thin, weak", back: "薄い|usui", category: "vocabulary", id: "14" },
      { front: "river, stream", back: "川|kawa", category: "vocabulary", id: "15" },
      { front: "dark, gloomy", back: "暗い|kurai", category: "vocabulary", id: "16" },
      { front: "class (school)", back: "クラス|kurasu", category: "vocabulary", id: "17" },
      { front: "black, dark", back: "黒い|kuroi", category: "vocabulary", id: "18" },
      { front: "bus", back: "バス|basu", category: "vocabulary", id: "19" },
      { front: "blue", back: "青い|aoi", category: "vocabulary", id: "20" },
      { front: "shopping", back: "買い物|kaimono", category: "vocabulary", id: "21" },
      { front: "drug, medicine", back: "薬|kusuri", category: "vocabulary", id: "22" },
      { front: "sugar", back: "砂糖|satou", category: "vocabulary", id: "23" },
      { front: "holiday, break", back: "休み|yasumi", category: "vocabulary", id: "24" },
      { front: "post office", back: "郵便局|yuubinkyoku", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 19 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle19Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 19 Flashcards créé:', data);
      toast.success("Exercice Bundle 19 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 19 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 19"
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
            onClick={insertBundle19}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 19 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle19Flashcard;
