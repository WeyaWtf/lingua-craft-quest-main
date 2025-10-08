import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle9Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle9 = async () => {
    setIsInserting(true);

    const bundle9Cards = [
      { front: "shut, close", back: "閉じる|tojiru", category: "vocabulary", id: "1" },
      { front: "time, moment", back: "時|toki", category: "vocabulary", id: "2" },
      { front: "rice (grain)", back: "米|kome", category: "vocabulary", id: "3" },
      { front: "cut", back: "切る|kiru", category: "vocabulary", id: "4" },
      { front: "fun, enjoyable", back: "楽しい|tanoshii", category: "vocabulary", id: "5" },
      { front: "clothes", back: "服|fuku", category: "vocabulary", id: "6" },
      { front: "back, behind", back: "後ろ|ushiro", category: "vocabulary", id: "7" },
      { front: "happy, glad", back: "嬉しい|ureshii", category: "vocabulary", id: "8" },
      { front: "waist, lower back", back: "腰|koshi", category: "vocabulary", id: "9" },
      { front: "Sunday", back: "日曜日|nichiyoubi", category: "vocabulary", id: "10" },
      { front: "daytime, midday", back: "昼|hiru", category: "vocabulary", id: "11" },
      { front: "mother", back: "お母さん|okaasan", category: "vocabulary", id: "12" },
      { front: "university student", back: "大学生|daigakusei", category: "vocabulary", id: "13" },
      { front: "end, conclusion", back: "終わり|owari", category: "vocabulary", id: "14" },
      { front: "height, stature", back: "背|se", category: "vocabulary", id: "15" },
      { front: "help, assist", back: "手伝う|tetsudau", category: "vocabulary", id: "16" },
      { front: "nose", back: "鼻|hana", category: "vocabulary", id: "17" },
      { front: "occur, wake up", back: "起きる|okiru", category: "vocabulary", id: "18" },
      { front: "place, put on", back: "載せる|noseru", category: "vocabulary", id: "19" },
      { front: "sad", back: "悲しい|kanashii", category: "vocabulary", id: "20" },
      { front: "chat, talk", back: "しゃべる|shaberu", category: "vocabulary", id: "21" },
      { front: "in the near future", back: "近く|chikaku", category: "vocabulary", id: "22" },
      { front: "sweet", back: "甘い|amai", category: "vocabulary", id: "23" },
      { front: "table", back: "テーブル|te-buru", category: "vocabulary", id: "24" },
      { front: "food", back: "食べ物|tabemono", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 9 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle9Cards,
        shuffleSides: true
      },
      author_id: "demo",
      is_published: true
    };

    try {
      const { data, error} = await supabase
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 9 Flashcards créé:', data);
      toast.success("Exercice Bundle 9 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 9 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 9"
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
            onClick={insertBundle9}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 9 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle9Flashcard;
