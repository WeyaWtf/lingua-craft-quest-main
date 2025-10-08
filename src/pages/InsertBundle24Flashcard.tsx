import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle24Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle24 = async () => {
    setIsInserting(true);

    const bundle24Cards = [
      { front: "visitor, customer", back: "客|kyaku", category: "vocabulary", id: "1" },
      { front: "desk", back: "机|tsukue", category: "vocabulary", id: "2" },
      { front: "bath", back: "風呂|furo", category: "vocabulary", id: "3" },
      { front: "hot water", back: "湯|yu", category: "vocabulary", id: "4" },
      { front: "tepid, lukewarm", back: "ぬるい|nurui", category: "vocabulary", id: "5" },
      { front: "cold medicine", back: "風邪薬|kazegusuri", category: "vocabulary", id: "6" },
      { front: "socks", back: "靴下|kutsushita", category: "vocabulary", id: "7" },
      { front: "tobacco, cigarette", back: "タバコ|tabako", category: "vocabulary", id: "8" },
      { front: "iced coffee", back: "アイスコーヒー|aisuko-hi-", category: "vocabulary", id: "9" },
      { front: "deep-fried food", back: "天ぷら|tempura", category: "vocabulary", id: "10" },
      { front: "flesh, meat", back: "肉|niku", category: "vocabulary", id: "11" },
      { front: "last night", back: "昨夜|sakuya", category: "vocabulary", id: "12" },
      { front: "be in fashion", back: "流行る|hayaru", category: "vocabulary", id: "13" },
      { front: "bring (a person)", back: "連れて来る|tsuretekuru", category: "vocabulary", id: "14" },
      { front: "person (polite)", back: "方|kata", category: "vocabulary", id: "15" },
      { front: "zero", back: "零|rei", category: "vocabulary", id: "16" },
      { front: "cloud", back: "雲|kumo", category: "vocabulary", id: "17" },
      { front: "sky", back: "空|sora", category: "vocabulary", id: "18" },
      { front: "popularity", back: "人気|ninki", category: "vocabulary", id: "19" },
      { front: "older brother", back: "兄さん|niisan", category: "vocabulary", id: "20" },
      { front: "older sister", back: "姉さん|neesan", category: "vocabulary", id: "21" },
      { front: "Heisei era", back: "平成|heisei", category: "vocabulary", id: "22" },
      { front: "every month", back: "毎月|maitsuki", category: "vocabulary", id: "23" },
      { front: "half a day", back: "半日|hannichi", category: "vocabulary", id: "24" },
      { front: "half a month", back: "半月|hantsuki", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 24 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle24Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 24 Flashcards créé:', data);
      toast.success("Exercice Bundle 24 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 24 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 24"
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
            onClick={insertBundle24}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 24 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle24Flashcard;
