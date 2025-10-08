import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle7Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle7 = async () => {
    setIsInserting(true);

    const bundle7Cards = [
      { front: "weak", back: "弱い|yowai", category: "vocabulary", id: "1" },
      { front: "ear", back: "耳|mimi", category: "vocabulary", id: "2" },
      { front: "sit, sit down", back: "座る|suwaru", category: "vocabulary", id: "3" },
      { front: "right", back: "右|migi", category: "vocabulary", id: "4" },
      { front: "take (a shower)", back: "浴びる|abiru", category: "vocabulary", id: "5" },
      { front: "shoulder", back: "肩|kata", category: "vocabulary", id: "6" },
      { front: "sleep, lie down", back: "寝る|neru", category: "vocabulary", id: "7" },
      { front: "switch off", back: "消す|kesu", category: "vocabulary", id: "8" },
      { front: "healthy, energetic", back: "元気|genki", category: "vocabulary", id: "9" },
      { front: "all, whole", back: "全部|zenbu", category: "vocabulary", id: "10" },
      { front: "last year", back: "去年|kyonen", category: "vocabulary", id: "11" },
      { front: "draw, pull", back: "引く|hiku", category: "vocabulary", id: "12" },
      { front: "library", back: "図書館|toshokan", category: "vocabulary", id: "13" },
      { front: "raise, lift", back: "上げる|ageru", category: "vocabulary", id: "14" },
      { front: "green", back: "緑|midori", category: "vocabulary", id: "15" },
      { front: "arm", back: "腕|ude", category: "vocabulary", id: "16" },
      { front: "door", back: "ドア|doa", category: "vocabulary", id: "17" },
      { front: "little girl", back: "女の子|onna no ko", category: "vocabulary", id: "18" },
      { front: "boy", back: "男の子|otoko no ko", category: "vocabulary", id: "19" },
      { front: "we", back: "私たち|watashitachi", category: "vocabulary", id: "20" },
      { front: "near, close to", back: "近く|chikaku", category: "vocabulary", id: "21" },
      { front: "do, give", back: "やる|yaru", category: "vocabulary", id: "22" },
      { front: "fairly, rather", back: "かなり|kanari", category: "vocabulary", id: "23" },
      { front: "country", back: "国|kuni", category: "vocabulary", id: "24" },
      { front: "happen", back: "起こる|okoru", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 7 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle7Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 7 Flashcards créé:', data);
      toast.success("Exercice Bundle 7 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 7 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 7"
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
            onClick={insertBundle7}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 7 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle7Flashcard;
