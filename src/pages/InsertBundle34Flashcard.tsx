import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle34Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle34 = async () => {
    setIsInserting(true);

    const bundle34Cards = [
      { front: "cut well, sharp", back: "切れる|kireru", category: "vocabulary", id: "1" },
      { front: "correct", back: "正しい|tadashii", category: "vocabulary", id: "2" },
      { front: "painful", back: "苦しい|kurushii", category: "vocabulary", id: "3" },
      { front: "minute, fine", back: "細かい|komakai", category: "vocabulary", id: "4" },
      { front: "quiet, tranquil", back: "静か|shizuka", category: "vocabulary", id: "5" },
      { front: "health", back: "健康|kenkou", category: "vocabulary", id: "6" },
      { front: "golf", back: "ゴルフ|gorufu", category: "vocabulary", id: "7" },
      { front: "course, route", back: "コース|ko-su", category: "vocabulary", id: "8" },
      { front: "order, ask for", back: "頼む|tanomu", category: "vocabulary", id: "9" },
      { front: "be in trouble", back: "困る|komaru", category: "vocabulary", id: "10" },
      { front: "all the time", back: "ずっと|zutto", category: "vocabulary", id: "11" },
      { front: "for example", back: "例えば|tatoeba", category: "vocabulary", id: "12" },
      { front: "intention", back: "つもり|tsumori", category: "vocabulary", id: "13" },
      { front: "a little while", back: "しばらく|shibaraku", category: "vocabulary", id: "14" },
      { front: "introduction", back: "紹介|shoukai", category: "vocabulary", id: "15" },
      { front: "elementary school", back: "小学校|shougakkou", category: "vocabulary", id: "16" },
      { front: "park", back: "公園|kouen", category: "vocabulary", id: "17" },
      { front: "junior high", back: "中学|chuugaku", category: "vocabulary", id: "18" },
      { front: "results, grade", back: "成績|seiseki", category: "vocabulary", id: "19" },
      { front: "textbook", back: "教科書|kyoukasho", category: "vocabulary", id: "20" },
      { front: "seat, one's place", back: "席|seki", category: "vocabulary", id: "21" },
      { front: "classroom, class", back: "教室|kyoushitsu", category: "vocabulary", id: "22" },
      { front: "teacher", back: "教師|kyoushi", category: "vocabulary", id: "23" },
      { front: "exam", back: "試験|shiken", category: "vocabulary", id: "24" },
      { front: "pass examination", back: "合格|goukaku", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 34 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle34Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 34 Flashcards créé:', data);
      toast.success("Exercice Bundle 34 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 34 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 34"
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
            onClick={insertBundle34}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 34 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle34Flashcard;
