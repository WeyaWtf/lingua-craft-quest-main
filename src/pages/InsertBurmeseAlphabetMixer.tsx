import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseAlphabetMixer = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseAlphabetMixer = async () => {
    setIsInserting(true);

    const burmeseData = {
      k_row: [
        { char: "က", romaji: "k" },
        { char: "ခ", romaji: "hk" },
        { char: "ဂ", romaji: "g" },
        { char: "ဃ", romaji: "gh" },
        { char: "င", romaji: "ng" }
      ],
      s_row: [
        { char: "စ", romaji: "c" },
        { char: "ဆ", romaji: "hc" },
        { char: "ဇ", romaji: "j" },
        { char: "ဈ", romaji: "jh" },
        { char: "ည", romaji: "ny" }
      ],
      t_row: [
        { char: "ဋ", romaji: "t" },
        { char: "ဌ", romaji: "ht" },
        { char: "ဍ", romaji: "d" },
        { char: "ဎ", romaji: "dh" },
        { char: "ဏ", romaji: "n" }
      ],
      t2_row: [
        { char: "တ", romaji: "t" },
        { char: "ထ", romaji: "ht" },
        { char: "ဒ", romaji: "d" },
        { char: "ဓ", romaji: "dh" },
        { char: "န", romaji: "n" }
      ],
      p_row: [
        { char: "ပ", romaji: "p" },
        { char: "ဖ", romaji: "hp" },
        { char: "ဗ", romaji: "b" },
        { char: "ဘ", romaji: "bh" },
        { char: "မ", romaji: "m" }
      ],
      y_row: [
        { char: "ယ", romaji: "y" },
        { char: "ရ", romaji: "r" },
        { char: "လ", romaji: "l" },
        { char: "ဝ", romaji: "w" },
        { char: "သ", romaji: "s" }
      ],
      h_row: [
        { char: "ဟ", romaji: "h" },
        { char: "ဠ", romaji: "l" },
        { char: "အ", romaji: "a" }
      ]
    };

    const exerciseData = {
      type: "flashcard",
      title: "Burmese Alphabet Mixer - Jeu de placement de l'alphabet birman",
      description: "Replacez tous les caractères birmans à leur position correcte dans le tableau - Glissez-déposez les caractères depuis la liste de droite",
      difficulty: 2,
      source: "official",
      language: "burmese",
      tags: ["alphabet", "burmese", "myanmar", "game", "drag-drop", "mixer"],
      content: JSON.parse(JSON.stringify(burmeseData)),
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

      console.log('✅ Exercice Burmese Alphabet Mixer créé:', data);
      toast.success("Exercice Burmese Alphabet Mixer créé avec succès !");
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
            🎮 Insérer l'exercice Burmese Alphabet Mixer
          </h1>
          <p className="text-muted-foreground">
            Cet exercice est un jeu interactif où l'utilisateur doit replacer tous les caractères de l'alphabet birman à leur position correcte par glisser-déposer
          </p>

          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <span className="font-semibold">Jeu de placement (Mixer)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Caractères:</span>
              <span className="font-semibold">33 consonnes birmanes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Difficulté:</span>
              <span className="font-semibold">Intermédiaire</span>
            </div>
          </div>

          <Button
            onClick={insertBurmeseAlphabetMixer}
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

export default InsertBurmeseAlphabetMixer;
