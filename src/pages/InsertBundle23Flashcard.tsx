import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle23Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle23 = async () => {
    setIsInserting(true);

    const bundle23Cards = [
      { front: "reality, genuine", back: "本当|hontou", category: "vocabulary", id: "1" },
      { front: "town, city", back: "町|machi", category: "vocabulary", id: "2" },
      { front: "sweets, snacks", back: "お菓子|okashi", category: "vocabulary", id: "3" },
      { front: "slack, loose", back: "緩い|yurui", category: "vocabulary", id: "4" },
      { front: "good (formal)", back: "良い|yoi", category: "vocabulary", id: "5" },
      { front: "welcome", back: "ようこそ|youkoso", category: "vocabulary", id: "6" },
      { front: "souvenir", back: "お土産|omiyage", category: "vocabulary", id: "7" },
      { front: "parents", back: "両親|ryoushin", category: "vocabulary", id: "8" },
      { front: "waiter", back: "ウェーター|we-ta-", category: "vocabulary", id: "9" },
      { front: "waitress", back: "ウェートレス|we-toresu", category: "vocabulary", id: "10" },
      { front: "absolutely", back: "絶対に|zettaini", category: "vocabulary", id: "11" },
      { front: "feast, treat", back: "ごちそう|gochisou", category: "vocabulary", id: "12" },
      { front: "fork", back: "フォーク|fo-ku", category: "vocabulary", id: "13" },
      { front: "spoon", back: "スプーン|supu-n", category: "vocabulary", id: "14" },
      { front: "bottle", back: "瓶|bin", category: "vocabulary", id: "15" },
      { front: "be on, switched on", back: "つく|tsuku", category: "vocabulary", id: "16" },
      { front: "soy sauce", back: "醤油|shouyu", category: "vocabulary", id: "17" },
      { front: "rice bowl", back: "茶碗|chawan", category: "vocabulary", id: "18" },
      { front: "decide", back: "決める|kimeru", category: "vocabulary", id: "19" },
      { front: "feel, sense", back: "感じる|kanjiru", category: "vocabulary", id: "20" },
      { front: "live (one's life)", back: "生きる|ikiru", category: "vocabulary", id: "21" },
      { front: "move (something)", back: "動かす|ugokasu", category: "vocabulary", id: "22" },
      { front: "break, break down", back: "壊れる|kowareru", category: "vocabulary", id: "23" },
      { front: "review", back: "復習|fukushuu", category: "vocabulary", id: "24" },
      { front: "eyebrow", back: "眉|mayu", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 23 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle23Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 23 Flashcards créé:', data);
      toast.success("Exercice Bundle 23 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 23 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 23"
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
            onClick={insertBundle23}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 23 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle23Flashcard;
