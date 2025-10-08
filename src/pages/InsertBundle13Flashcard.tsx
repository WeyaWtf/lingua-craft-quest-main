import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle13Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle13 = async () => {
    setIsInserting(true);

    const bundle13Cards = [
      { front: "easy, simple", back: "易しい|yasashii", category: "vocabulary", id: "1" },
      { front: "older brother", back: "お兄さん|oniisan", category: "vocabulary", id: "2" },
      { front: "big", back: "大きい|ooki", category: "vocabulary", id: "3" },
      { front: "small", back: "小さい|chiisai", category: "vocabulary", id: "4" },
      { front: "spicy, hot", back: "辛い|karai", category: "vocabulary", id: "5" },
      { front: "eight", back: "八|hachi", category: "vocabulary", id: "6" },
      { front: "over there", back: "あそこ|asoko", category: "vocabulary", id: "7" },
      { front: "come", back: "来る|kuru", category: "vocabulary", id: "8" },
      { front: "front, before", back: "前|mae", category: "vocabulary", id: "9" },
      { front: "five days, fifth", back: "五日|itsuka", category: "vocabulary", id: "10" },
      { front: "full", back: "いっぱい|ippai", category: "vocabulary", id: "11" },
      { front: "nine", back: "九|kyu", category: "vocabulary", id: "12" },
      { front: "sour", back: "酸っぱい|suppai", category: "vocabulary", id: "13" },
      { front: "differ, be wrong", back: "違う|chigau", category: "vocabulary", id: "14" },
      { front: "thin, slender", back: "細い|hosoi", category: "vocabulary", id: "15" },
      { front: "three (things)", back: "三つ|mittsu", category: "vocabulary", id: "16" },
      { front: "eight days", back: "八日|youka", category: "vocabulary", id: "17" },
      { front: "high school student", back: "高校生|koukousei", category: "vocabulary", id: "18" },
      { front: "good, skilled", back: "上手|jouzu", category: "vocabulary", id: "19" },
      { front: "strong", back: "強い|tsuyoi", category: "vocabulary", id: "20" },
      { front: "seven", back: "七|nana", category: "vocabulary", id: "21" },
      { front: "20 days, 20th", back: "二十日|hatsuka", category: "vocabulary", id: "22" },
      { front: "left", back: "左|hidari", category: "vocabulary", id: "23" },
      { front: "two days, second", back: "二日|futsuka", category: "vocabulary", id: "24" },
      { front: "four (things)", back: "四つ|yottsu", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 13 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle13Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 13 Flashcards créé:', data);
      toast.success("Exercice Bundle 13 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 13 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 13"
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
            onClick={insertBundle13}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 13 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle13Flashcard;
