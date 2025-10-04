import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertHiraganaMixer = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertHiraganaMixer = async () => {
    setIsInserting(true);

    const hiraganaData = {
      vowels: [
        { char: "あ", romaji: "a" },
        { char: "い", romaji: "i" },
        { char: "う", romaji: "u" },
        { char: "え", romaji: "e" },
        { char: "お", romaji: "o" }
      ],
      k_row: [
        { char: "か", romaji: "ka" },
        { char: "き", romaji: "ki" },
        { char: "く", romaji: "ku" },
        { char: "け", romaji: "ke" },
        { char: "こ", romaji: "ko" }
      ],
      s_row: [
        { char: "さ", romaji: "sa" },
        { char: "し", romaji: "shi" },
        { char: "す", romaji: "su" },
        { char: "せ", romaji: "se" },
        { char: "そ", romaji: "so" }
      ],
      t_row: [
        { char: "た", romaji: "ta" },
        { char: "ち", romaji: "chi" },
        { char: "つ", romaji: "tsu" },
        { char: "て", romaji: "te" },
        { char: "と", romaji: "to" }
      ],
      n_row: [
        { char: "な", romaji: "na" },
        { char: "に", romaji: "ni" },
        { char: "ぬ", romaji: "nu" },
        { char: "ね", romaji: "ne" },
        { char: "の", romaji: "no" }
      ],
      h_row: [
        { char: "は", romaji: "ha" },
        { char: "ひ", romaji: "hi" },
        { char: "ふ", romaji: "fu" },
        { char: "へ", romaji: "he" },
        { char: "ほ", romaji: "ho" }
      ],
      m_row: [
        { char: "ま", romaji: "ma" },
        { char: "み", romaji: "mi" },
        { char: "む", romaji: "mu" },
        { char: "め", romaji: "me" },
        { char: "も", romaji: "mo" }
      ],
      y_row: [
        { char: "や", romaji: "ya" },
        { char: "ゆ", romaji: "yu" },
        { char: "よ", romaji: "yo" }
      ],
      r_row: [
        { char: "ら", romaji: "ra" },
        { char: "り", romaji: "ri" },
        { char: "る", romaji: "ru" },
        { char: "れ", romaji: "re" },
        { char: "ろ", romaji: "ro" }
      ],
      w_row: [
        { char: "わ", romaji: "wa" },
        { char: "を", romaji: "wo" },
        { char: "ん", romaji: "n/m" }
      ]
    };

    const exerciseData = {
      type: "flashcard",
      title: "Hiragana Mixer - Jeu de placement des Hiragana",
      description: "Replacez tous les caractères hiragana à leur position correcte dans le tableau - Glissez-déposez les caractères depuis la liste de droite",
      difficulty: 2,
      source: "official",
      language: "japanese",
      tags: ["alphabet", "hiragana", "japanese", "game", "drag-drop", "mixer"],
      content: JSON.parse(JSON.stringify(hiraganaData)),
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
        toast.error(`Erreur: ${error.message || "Erreur lors de la création de l'exercice"}`);
        setIsInserting(false);
        return;
      }

      console.log('✅ Exercice Hiragana Mixer créé:', data);
      toast.success("Exercice Hiragana Mixer créé avec succès !");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) {
      console.error('Erreur:', err);
      toast.error("Erreur lors de la création");
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-foreground">
            🎮 Insérer l'exercice Hiragana Mixer
          </h1>
          <p className="text-muted-foreground">
            Cet exercice est un jeu interactif où l'utilisateur doit replacer tous les hiragana à leur position correcte par glisser-déposer
          </p>

          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <span className="font-semibold">Jeu de placement (Mixer)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Caractères:</span>
              <span className="font-semibold">46 hiragana de base</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Difficulté:</span>
              <span className="font-semibold">Intermédiaire</span>
            </div>
          </div>

          <Button
            onClick={insertHiraganaMixer}
            disabled={isInserting}
            size="lg"
            className="w-full"
          >
            {isInserting ? "Insertion en cours..." : "✅ Insérer l'exercice dans la base de données"}
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/catalog")}
            className="w-full"
          >
            Retour au catalogue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsertHiraganaMixer;
