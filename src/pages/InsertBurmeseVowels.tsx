import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseVowels = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseVowels = async () => {
    setIsInserting(true);

    const vowelsData = {
      independent_row: [
        { char: "အ", romaji: "a" },
        { char: "ဣ", romaji: "i" },
        { char: "ဤ", romaji: "ī" },
        { char: "ဥ", romaji: "u" },
        { char: "ဦ", romaji: "ū" },
        { char: "ဩ", romaji: "o" },
        { char: "ဪ", romaji: "au" },
        { char: "ဧ", romaji: "e" }
      ],
      diacritics_row: [
        { char: "◌ာ", romaji: "-ā" },
        { char: "◌ိ", romaji: "-i" },
        { char: "◌ီ", romaji: "-ī" },
        { char: "◌ု", romaji: "-u" },
        { char: "◌ူ", romaji: "-ū" }
      ],
      diacritics2_row: [
        { char: "◌ေ", romaji: "e-" },
        { char: "◌ဲ", romaji: "-ai" },
        { char: "◌ော", romaji: "-o" },
        { char: "◌ော်", romaji: "-o" },
        { char: "◌ို", romaji: "-ui" }
      ],
      medials_row: [
        { char: "◌ွ", romaji: "-w" },
        { char: "◌ျ", romaji: "-y" },
        { char: "◌ြ", romaji: "r-" },
        { char: "◌ွှ", romaji: "-hw" }
      ],
      marks_row: [
        { char: "◌့", romaji: "dot" },
        { char: "◌း", romaji: ":" },
        { char: "◌်", romaji: "asat" },
        { char: "◌ံ", romaji: "ṁ" }
      ]
    };

    const exerciseData = {
      type: "flashcard",
      title: "Burmese Vowels & Marks - Voyelles et signes birmans",
      description: "Apprenez les voyelles indépendantes, les diacritiques vocaliques, les médiales et les signes spéciaux birmans",
      difficulty: 1,
      source: "official",
      language: "birman",
      tags: ["vowels", "diacritics", "marks", "burmese", "birman", "myanmar", "beginner"],
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

      console.log('✅ Exercice Burmese Vowels créé:', data);
      toast.success("Exercice Burmese Vowels créé avec succès !");
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
            🔤 Insérer l'exercice Burmese Vowels & Marks
          </h1>
          <p className="text-muted-foreground">
            Cet exercice contient les voyelles indépendantes, diacritiques vocaliques, médiales et signes spéciaux
          </p>

          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <span className="font-semibold">Voyelles et Signes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Contenu:</span>
              <span className="font-semibold">Voyelles indépendantes, diacritiques, médiales, signes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Difficulté:</span>
              <span className="font-semibold">Débutant</span>
            </div>
          </div>

          <Button
            onClick={insertBurmeseVowels}
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

export default InsertBurmeseVowels;
