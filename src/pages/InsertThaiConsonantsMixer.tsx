import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaiConsonantsMixer = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertThaiConsonantsMixer = async () => {
    setIsInserting(true);

    const consonantsData = {
      high_class_row: [
        { char: "ข", romaji: "kh" },
        { char: "ฃ", romaji: "kh" },
        { char: "ฉ", romaji: "ch" },
        { char: "ฐ", romaji: "th" },
        { char: "ถ", romaji: "th" },
        { char: "ผ", romaji: "ph" },
        { char: "ฝ", romaji: "f" },
        { char: "ศ", romaji: "s" },
        { char: "ษ", romaji: "s" },
        { char: "ส", romaji: "s" },
        { char: "ห", romaji: "h" }
      ],
      middle_class_row: [
        { char: "ก", romaji: "k" },
        { char: "จ", romaji: "ch" },
        { char: "ฎ", romaji: "d" },
        { char: "ฏ", romaji: "t" },
        { char: "ด", romaji: "d" },
        { char: "ต", romaji: "t" },
        { char: "บ", romaji: "b" },
        { char: "ป", romaji: "p" },
        { char: "อ", romaji: "ʔ" }
      ],
      low_class_row: [
        { char: "ค", romaji: "kh" },
        { char: "ฅ", romaji: "kh" },
        { char: "ฆ", romaji: "kh" },
        { char: "ง", romaji: "ng" },
        { char: "ช", romaji: "ch" },
        { char: "ซ", romaji: "s" },
        { char: "ฌ", romaji: "ch" },
        { char: "ญ", romaji: "y" },
        { char: "ฑ", romaji: "th" },
        { char: "ฒ", romaji: "th" },
        { char: "ณ", romaji: "n" },
        { char: "ท", romaji: "th" },
        { char: "ธ", romaji: "th" },
        { char: "น", romaji: "n" },
        { char: "พ", romaji: "ph" },
        { char: "ฟ", romaji: "f" },
        { char: "ภ", romaji: "ph" },
        { char: "ม", romaji: "m" },
        { char: "ย", romaji: "y" },
        { char: "ร", romaji: "r" },
        { char: "ล", romaji: "l" },
        { char: "ว", romaji: "w" },
        { char: "ฬ", romaji: "l" },
        { char: "ฮ", romaji: "h" }
      ]
    };

    const exerciseData = {
      type: "flashcard",
      title: "Thai Consonants Mixer - Jeu de placement des consonnes thaïes",
      description: "Replacez les 44 consonnes thaïes dans leur classe respective - Glissez-déposez les caractères depuis la liste de droite",
      difficulty: 2,
      source: "official",
      language: "thai",
      tags: ["consonants", "thai", "game", "drag-drop", "mixer", "classes"],
      content: JSON.parse(JSON.stringify(consonantsData)),
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

      console.log('✅ Exercice Thai Consonants Mixer créé:', data);
      toast.success("Exercice Thai Consonants Mixer créé avec succès !");
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
            🎮 Insérer l'exercice Thai Consonants Mixer
          </h1>
          <p className="text-muted-foreground">
            Cet exercice est un jeu interactif où l'utilisateur doit replacer les 44 consonnes thaïes dans leurs classes respectives par glisser-déposer
          </p>

          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <span className="font-semibold">Jeu de placement (Mixer)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Caractères:</span>
              <span className="font-semibold">44 consonnes thaïes (3 classes)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Difficulté:</span>
              <span className="font-semibold">Intermédiaire</span>
            </div>
          </div>

          <Button
            onClick={insertThaiConsonantsMixer}
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

export default InsertThaiConsonantsMixer;
