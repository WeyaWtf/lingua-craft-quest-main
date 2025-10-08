import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle31Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle31 = async () => {
    setIsInserting(true);

    const bundle31Cards = [
      { front: "ticket gate", back: "改札口|kaisatsuguchi", category: "vocabulary", id: "1" },
      { front: "fine weather", back: "晴れ|hare", category: "vocabulary", id: "2" },
      { front: "bus stop", back: "バス停|basutei", category: "vocabulary", id: "3" },
      { front: "cloudy weather", back: "曇り|kumori", category: "vocabulary", id: "4" },
      { front: "salt", back: "塩|shio", category: "vocabulary", id: "5" },
      { front: "a lot", back: "たくさん|takusan", category: "vocabulary", id: "6" },
      { front: "hate", back: "大嫌い|daikirai", category: "vocabulary", id: "7" },
      { front: "inside, middle", back: "中|naka", category: "vocabulary", id: "8" },
      { front: "second floor", back: "二階|nikai", category: "vocabulary", id: "9" },
      { front: "lose, get rid of", back: "無くす|nakusu", category: "vocabulary", id: "10" },
      { front: "OK, not bad", back: "まあまあ|maamaa", category: "vocabulary", id: "11" },
      { front: "yellow color", back: "黄色|kiiro", category: "vocabulary", id: "12" },
      { front: "lunch", back: "ランチ|ranchi", category: "vocabulary", id: "13" },
      { front: "fish", back: "魚|sakana", category: "vocabulary", id: "14" },
      { front: "taste, flavor", back: "味|aji", category: "vocabulary", id: "15" },
      { front: "apple", back: "りんご|ringo", category: "vocabulary", id: "16" },
      { front: "tangerine", back: "みかん|mikan", category: "vocabulary", id: "17" },
      { front: "plate", back: "皿|sara", category: "vocabulary", id: "18" },
      { front: "coffee", back: "コーヒー|ko-hi-", category: "vocabulary", id: "19" },
      { front: "cup, glass", back: "コップ|koppu", category: "vocabulary", id: "20" },
      { front: "two persons", back: "二人|futari", category: "vocabulary", id: "21" },
      { front: "stop, cease", back: "止む|yamu", category: "vocabulary", id: "22" },
      { front: "nine", back: "九|kyuu", category: "vocabulary", id: "23" },
      { front: "daytime", back: "昼間|hiruma", category: "vocabulary", id: "24" },
      { front: "about when", back: "いつ頃|itsugoro", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 31 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle31Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 31 Flashcards créé:', data);
      toast.success("Exercice Bundle 31 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 31 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 31"
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
            onClick={insertBundle31}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 31 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle31Flashcard;
