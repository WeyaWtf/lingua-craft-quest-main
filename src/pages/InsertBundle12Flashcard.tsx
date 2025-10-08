import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle12Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle12 = async () => {
    setIsInserting(true);

    const bundle12Cards = [
      { front: "day of the week", back: "曜日|youbi", category: "vocabulary", id: "1" },
      { front: "side, vicinity", back: "そば|soba", category: "vocabulary", id: "2" },
      { front: "here, this way", back: "こっち|kocchi", category: "vocabulary", id: "3" },
      { front: "Tuesday", back: "火曜日|kayoubi", category: "vocabulary", id: "4" },
      { front: "be thirsty", back: "渇く|kawaku", category: "vocabulary", id: "5" },
      { front: "three", back: "三|san", category: "vocabulary", id: "6" },
      { front: "Wednesday", back: "水曜日|suiyoubi", category: "vocabulary", id: "7" },
      { front: "two (things)", back: "二つ|futatsu", category: "vocabulary", id: "8" },
      { front: "this evening", back: "今晩|konban", category: "vocabulary", id: "9" },
      { front: "thousand", back: "千|sen", category: "vocabulary", id: "10" },
      { front: "six days, sixth", back: "六日|muika", category: "vocabulary", id: "11" },
      { front: "older sister", back: "お姉さん|onesan", category: "vocabulary", id: "12" },
      { front: "be repaired", back: "直る|naoru", category: "vocabulary", id: "13" },
      { front: "just a moment", back: "ちょっと|chotto", category: "vocabulary", id: "14" },
      { front: "four", back: "四|yon", category: "vocabulary", id: "15" },
      { front: "from now on", back: "これから|korekara", category: "vocabulary", id: "16" },
      { front: "think, consider", back: "考える|kangaeru", category: "vocabulary", id: "17" },
      { front: "return", back: "戻る|modoru", category: "vocabulary", id: "18" },
      { front: "change, alter", back: "変える|kaeru", category: "vocabulary", id: "19" },
      { front: "morning", back: "朝|asa", category: "vocabulary", id: "20" },
      { front: "tooth", back: "歯|ha", category: "vocabulary", id: "21" },
      { front: "work hard", back: "頑張る|ganbaru", category: "vocabulary", id: "22" },
      { front: "cellular phone", back: "携帯電話|keitaidenwa", category: "vocabulary", id: "23" },
      { front: "rain", back: "雨|ame", category: "vocabulary", id: "24" },
      { front: "money", back: "金|kane", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 12 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle12Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 12 Flashcards créé:', data);
      toast.success("Exercice Bundle 12 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 12 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 12"
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
            onClick={insertBundle12}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 12 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle12Flashcard;
