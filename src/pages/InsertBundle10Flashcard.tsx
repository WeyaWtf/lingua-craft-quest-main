import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle10Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle10 = async () => {
    setIsInserting(true);

    const bundle10Cards = [
      { front: "begin", back: "始まる|hajimaru", category: "vocabulary", id: "1" },
      { front: "game", back: "ゲーム|ge-mu", category: "vocabulary", id: "2" },
      { front: "ten", back: "十|juu", category: "vocabulary", id: "3" },
      { front: "weather", back: "天気|tenki", category: "vocabulary", id: "4" },
      { front: "hot (weather)", back: "暑い|atsui", category: "vocabulary", id: "5" },
      { front: "thick, fat", back: "太い|futoi", category: "vocabulary", id: "6" },
      { front: "evening, night", back: "晩|ban", category: "vocabulary", id: "7" },
      { front: "Saturday", back: "土曜日|doyoubi", category: "vocabulary", id: "8" },
      { front: "sore, painful", back: "痛い|itai", category: "vocabulary", id: "9" },
      { front: "father, dad", back: "お父さん|otousan", category: "vocabulary", id: "10" },
      { front: "probably, perhaps", back: "多分|tabun", category: "vocabulary", id: "11" },
      { front: "clock, watch", back: "時計|tokei", category: "vocabulary", id: "12" },
      { front: "stay overnight", back: "泊まる|tomaru", category: "vocabulary", id: "13" },
      { front: "how come", back: "どうして|doushite", category: "vocabulary", id: "14" },
      { front: "hang, put on", back: "掛ける|kakeru", category: "vocabulary", id: "15" },
      { front: "make a turn", back: "曲がる|magaru", category: "vocabulary", id: "16" },
      { front: "stomach, belly", back: "お腹|onaka", category: "vocabulary", id: "17" },
      { front: "meeting", back: "ミーティング|mi-tingu", category: "vocabulary", id: "18" },
      { front: "dislike", back: "嫌い|kirai", category: "vocabulary", id: "19" },
      { front: "Friday", back: "金曜日|kinyoubi", category: "vocabulary", id: "20" },
      { front: "need, require", back: "要る|iru", category: "vocabulary", id: "21" },
      { front: "to not be", back: "無い|nai", category: "vocabulary", id: "22" },
      { front: "cold (illness)", back: "風邪|kaze", category: "vocabulary", id: "23" },
      { front: "yellow", back: "黄色い|kiiroi", category: "vocabulary", id: "24" },
      { front: "gentle, kind", back: "優しい|yasashii", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 10 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle10Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 10 Flashcards créé:', data);
      toast.success("Exercice Bundle 10 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 10 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 10"
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
            onClick={insertBundle10}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 10 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle10Flashcard;
