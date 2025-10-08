import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle40Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle40 = async () => {
    setIsInserting(true);

    const bundle40Cards = [
      { front: "rather, pretty", back: "なかなか|nakanaka", category: "vocabulary", id: "1" },
      { front: "encourage", back: "励ます|hagemasu", category: "vocabulary", id: "2" },
      { front: "tear", back: "涙|namida", category: "vocabulary", id: "3" },
      { front: "dream", back: "夢|yume", category: "vocabulary", id: "4" },
      { front: "place of work", back: "職場|shokuba", category: "vocabulary", id: "5" },
      { front: "next to", back: "隣|tonari", category: "vocabulary", id: "6" },
      { front: "apartment", back: "マンション|manshon", category: "vocabulary", id: "7" },
      { front: "elevator", back: "エレベーター|erebe-ta-", category: "vocabulary", id: "8" },
      { front: "window", back: "窓|mado", category: "vocabulary", id: "9" },
      { front: "push, press down", back: "押す|osu", category: "vocabulary", id: "10" },
      { front: "enter a school", back: "入学|nyuugaku", category: "vocabulary", id: "11" },
      { front: "door, sliding door", back: "戸|to", category: "vocabulary", id: "12" },
      { front: "street, road", back: "通り|toori", category: "vocabulary", id: "13" },
      { front: "die, pass away", back: "亡くなる|nakunaru", category: "vocabulary", id: "14" },
      { front: "husband and wife", back: "夫婦|fuufu", category: "vocabulary", id: "15" },
      { front: "woman, female", back: "女性|josei", category: "vocabulary", id: "16" },
      { front: "forest", back: "森|mori", category: "vocabulary", id: "17" },
      { front: "truck", back: "トラック|torakku", category: "vocabulary", id: "18" },
      { front: "record", back: "レコード|reko-do", category: "vocabulary", id: "19" },
      { front: "heat, fever", back: "熱|netsu", category: "vocabulary", id: "20" },
      { front: "page", back: "ページ|pe-ji", category: "vocabulary", id: "21" },
      { front: "dance", back: "踊る|odoru", category: "vocabulary", id: "22" },
      { front: "length", back: "長さ|nagasa", category: "vocabulary", id: "23" },
      { front: "thickness", back: "厚さ|atsusa", category: "vocabulary", id: "24" },
      { front: "secret, privacy", back: "秘密|himitsu", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 40 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle40Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 40 Flashcards créé:', data);
      toast.success("Exercice Bundle 40 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 40 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 40"
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
            onClick={insertBundle40}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 40 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle40Flashcard;
