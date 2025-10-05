import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle6Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle6 = async () => {
    setIsInserting(true);

    const bundle6Cards = [
      { front: "forget, leave behind", back: "忘れる|wasureru", category: "vocabulary", id: "1" },
      { front: "alcohol, rice wine", back: "酒|sake", category: "vocabulary", id: "2" },
      { front: "which (polite)", back: "どちら|dochira", category: "vocabulary", id: "3" },
      { front: "older sister", back: "姉|ane", category: "vocabulary", id: "4" },
      { front: "memorize, learn", back: "覚える|oboeru", category: "vocabulary", id: "5" },
      { front: "narrow, small", back: "狭い|semai", category: "vocabulary", id: "6" },
      { front: "red", back: "赤い|akai", category: "vocabulary", id: "7" },
      { front: "wear, put on", back: "着る|kiru", category: "vocabulary", id: "8" },
      { front: "laugh, smile", back: "笑う|warau", category: "vocabulary", id: "9" },
      { front: "most, best", back: "一番|ichiban", category: "vocabulary", id: "10" },
      { front: "class session", back: "授業|jugyou", category: "vocabulary", id: "11" },
      { front: "week", back: "週|shuu", category: "vocabulary", id: "12" },
      { front: "Chinese character", back: "漢字|kanji", category: "vocabulary", id: "13" },
      { front: "bicycle", back: "自転車|jitensha", category: "vocabulary", id: "14" },
      { front: "train", back: "電車|densha", category: "vocabulary", id: "15" },
      { front: "search for", back: "探す|sagasu", category: "vocabulary", id: "16" },
      { front: "paper", back: "紙|kami", category: "vocabulary", id: "17" },
      { front: "sing", back: "歌う|utau", category: "vocabulary", id: "18" },
      { front: "slow, late", back: "遅い|osoi", category: "vocabulary", id: "19" },
      { front: "neck", back: "首|kubi", category: "vocabulary", id: "20" },
      { front: "fast", back: "速い|hayai", category: "vocabulary", id: "21" },
      { front: "together", back: "一緒に|issho ni", category: "vocabulary", id: "22" },
      { front: "this month", back: "今月|kongetsu", category: "vocabulary", id: "23" },
      { front: "play", back: "遊ぶ|asobu", category: "vocabulary", id: "24" },
      { front: "far, distant", back: "遠い|tooi", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 6 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle6Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 6 Flashcards créé:', data);
      toast.success("Exercice Bundle 6 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 6 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 6"
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
            onClick={insertBundle6}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 6 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle6Flashcard;
