import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle32Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle32 = async () => {
    setIsInserting(true);

    const bundle32Cards = [
      { front: "character, letter", back: "字|ji", category: "vocabulary", id: "1" },
      { front: "seven", back: "七|nana", category: "vocabulary", id: "2" },
      { front: "change (money)", back: "お釣り|otsuri", category: "vocabulary", id: "3" },
      { front: "surname", back: "名字|myouji", category: "vocabulary", id: "4" },
      { front: "uncle", back: "おじ|oji", category: "vocabulary", id: "5" },
      { front: "aunt", back: "おば|oba", category: "vocabulary", id: "6" },
      { front: "grandfather", back: "祖父|sofu", category: "vocabulary", id: "7" },
      { front: "grandmother", back: "祖母|sobo", category: "vocabulary", id: "8" },
      { front: "importance", back: "大事|daiji", category: "vocabulary", id: "9" },
      { front: "view, perspective", back: "見方|mikata", category: "vocabulary", id: "10" },
      { front: "bird, poultry", back: "鳥|tori", category: "vocabulary", id: "11" },
      { front: "dog", back: "犬|inu", category: "vocabulary", id: "12" },
      { front: "reply, answer", back: "返事|henji", category: "vocabulary", id: "13" },
      { front: "again, also, or", back: "また|mata", category: "vocabulary", id: "14" },
      { front: "period of year", back: "年間|nenkan", category: "vocabulary", id: "15" },
      { front: "blue, green", back: "青|ao", category: "vocabulary", id: "16" },
      { front: "red color", back: "赤|aka", category: "vocabulary", id: "17" },
      { front: "signal, traffic light", back: "信号|shingou", category: "vocabulary", id: "18" },
      { front: "circle", back: "円|en", category: "vocabulary", id: "19" },
      { front: "very, extremely", back: "非常に|hijouni", category: "vocabulary", id: "20" },
      { front: "complicated", back: "複雑|fukuzatsu", category: "vocabulary", id: "21" },
      { front: "peace, harmony", back: "平和|heiwa", category: "vocabulary", id: "22" },
      { front: "turn round", back: "回る|mawaru", category: "vocabulary", id: "23" },
      { front: "young person", back: "若者|wakamono", category: "vocabulary", id: "24" },
      { front: "snow, snowfall", back: "雪|yuki", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 32 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle32Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 32 Flashcards créé:', data);
      toast.success("Exercice Bundle 32 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 32 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 32"
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
            onClick={insertBundle32}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 32 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle32Flashcard;
