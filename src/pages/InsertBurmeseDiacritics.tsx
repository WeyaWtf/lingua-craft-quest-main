import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseDiacritics = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseDiacritics = async () => {
    setIsInserting(true);

    const diacriticsData = {
      a_row: [
        { char: "◌ါ", romaji: "ā" },
        { char: "◌ာ", romaji: "a" },
        { char: "◌ံ", romaji: "ṁ" }
      ],
      i_row: [
        { char: "◌ိ", romaji: "i" },
        { char: "◌ီ", romaji: "ī" }
      ],
      e_row: [
        { char: "◌ေ", romaji: "e" }
      ],
      o_row: [
        { char: "◌ော", romaji: "o" },
        { char: "◌ော်", romaji: "ô" }
      ],
      ai_row: [
        { char: "◌ဲ", romaji: "ai" },
        { char: "◌ံ", romaji: "ṁ" }
      ],
      au_row: [
        { char: "◌ော", romaji: "au" },
        { char: "◌ေား", romaji: "au:" },
        { char: "◌ို", romaji: "o" }
      ]
    };

    const exerciseData = {
      type: "flashcard",
      title: "Burmese Diacritics - Signes diacritiques birmans (tons et voyelles)",
      description: "Apprenez les signes diacritiques birmans pour les tons et les voyelles - Cliquez sur chaque caractère pour révéler sa prononciation",
      difficulty: 1,
      source: "official",
      language: "birman",
      tags: ["diacritics", "tones", "vowels", "burmese", "birman", "myanmar", "beginner"],
      content: { ...JSON.parse(JSON.stringify(diacriticsData)), alphabetMode: true },
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

      console.log('✅ Exercice Burmese Diacritics créé:', data);
      toast.success("Exercice Burmese Diacritics créé avec succès !");
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
            🔤 Insérer l'exercice Burmese Diacritics
          </h1>
          <p className="text-muted-foreground">
            Cet exercice contient les signes diacritiques birmans : tons et voyelles
          </p>

          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <span className="font-semibold">Diacritiques (Tons et Voyelles)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Signes:</span>
              <span className="font-semibold">Signes diacritiques birmans</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Difficulté:</span>
              <span className="font-semibold">Débutant</span>
            </div>
          </div>

          <Button
            onClick={insertBurmeseDiacritics}
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

export default InsertBurmeseDiacritics;
