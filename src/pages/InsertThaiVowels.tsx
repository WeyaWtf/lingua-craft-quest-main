import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaiVowels = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertThaiVowels = async () => {
    setIsInserting(true);

    const vowelsData = {
      vowels_simple_row: [
        { char: "◌ะ", romaji: "a" },
        { char: "◌ั", romaji: "a" },
        { char: "◌า", romaji: "ā" },
        { char: "◌ำ", romaji: "am" },
        { char: "◌ิ", romaji: "i" },
        { char: "◌ี", romaji: "ī" },
        { char: "◌ึ", romaji: "ư" },
        { char: "◌ื", romaji: "ư̄" },
        { char: "◌ุ", romaji: "u" },
        { char: "◌ू", romaji: "ū" }
      ],
      vowels_complex_row: [
        { char: "เ◌", romaji: "e" },
        { char: "แ◌", romaji: "æ" },
        { char: "โ◌", romaji: "o" },
        { char: "ใ◌", romaji: "ai" },
        { char: "ไ◌", romaji: "ai" },
        { char: "เ◌า", romaji: "ao" },
        { char: "◌ัว", romaji: "ua" },
        { char: "เ◌ีย", romaji: "ia" },
        { char: "เ◌ือ", romaji: "ư̄a" }
      ],
      tone_marks_row: [
        { char: "◌่", romaji: "tone 1 (mai ek)" },
        { char: "◌้", romaji: "tone 2 (mai tho)" },
        { char: "◌๊", romaji: "tone 3 (mai tri)" },
        { char: "◌๋", romaji: "tone 4 (mai chattawa)" }
      ],
      special_marks_row: [
        { char: "◌์", romaji: "cancellation mark" },
        { char: "ๆ", romaji: "repetition" },
        { char: "ฯ", romaji: "abbreviation" },
        { char: "ฯลฯ", romaji: "et cetera" }
      ],
      numbers_row: [
        { char: "๐", romaji: "0" },
        { char: "๑", romaji: "1" },
        { char: "๒", romaji: "2" },
        { char: "๓", romaji: "3" },
        { char: "๔", romaji: "4" },
        { char: "๕", romaji: "5" },
        { char: "๖", romaji: "6" },
        { char: "๗", romaji: "7" },
        { char: "๘", romaji: "8" },
        { char: "๙", romaji: "9" }
      ]
    };

    const exerciseData = {
      type: "flashcard",
      title: "Thai Vowels & Diacritics - Voyelles et signes diacritiques thaïs",
      description: "Apprenez les voyelles simples et complexes, les marques tonales, les signes spéciaux et les chiffres thaïs - Cliquez sur chaque caractère pour révéler sa prononciation",
      difficulty: 1,
      source: "official",
      language: "thai",
      tags: ["vowels", "voyelles", "diacritics", "tones", "thai", "thaï", "numbers", "beginner"],
      content: { ...JSON.parse(JSON.stringify(vowelsData)), alphabetMode: true },
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

      console.log('✅ Exercice Thai Vowels & Diacritics créé:', data);
      toast.success("Exercice Thai Vowels & Diacritics créé avec succès !");
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
            🔤 Insérer l'exercice Thai Vowels & Diacritics
          </h1>
          <p className="text-muted-foreground">
            Cet exercice contient les voyelles, marques tonales et chiffres thaïs
          </p>

          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <span className="font-semibold">Voyelles & Diacritiques</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Contenu:</span>
              <span className="font-semibold">Voyelles, Tons, Marques, Chiffres</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Difficulté:</span>
              <span className="font-semibold">Débutant</span>
            </div>
          </div>

          <Button
            onClick={insertThaiVowels}
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

export default InsertThaiVowels;
