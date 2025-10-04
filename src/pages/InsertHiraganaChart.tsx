import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertHiraganaChart = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertHiraganaChart = async () => {
    setIsInserting(true);

    const hiraganaData = {
      vowels: [
        { char: "ア", romaji: "a" },
        { char: "イ", romaji: "i" },
        { char: "ウ", romaji: "u" },
        { char: "エ", romaji: "e" },
        { char: "オ", romaji: "o" }
      ],
      k_row: [
        { char: "カ", romaji: "ka" },
        { char: "キ", romaji: "ki" },
        { char: "ク", romaji: "ku" },
        { char: "ケ", romaji: "ke" },
        { char: "コ", romaji: "ko" }
      ],
      s_row: [
        { char: "サ", romaji: "sa" },
        { char: "シ", romaji: "shi" },
        { char: "ス", romaji: "su" },
        { char: "セ", romaji: "se" },
        { char: "ソ", romaji: "so" }
      ],
      t_row: [
        { char: "タ", romaji: "ta" },
        { char: "チ", romaji: "chi" },
        { char: "ツ", romaji: "tsu" },
        { char: "テ", romaji: "te" },
        { char: "ト", romaji: "to" }
      ],
      n_row: [
        { char: "ナ", romaji: "na" },
        { char: "ニ", romaji: "ni" },
        { char: "ヌ", romaji: "nu" },
        { char: "ネ", romaji: "ne" },
        { char: "ノ", romaji: "no" }
      ],
      h_row: [
        { char: "ハ", romaji: "ha" },
        { char: "ヒ", romaji: "hi" },
        { char: "フ", romaji: "fu" },
        { char: "ヘ", romaji: "he" },
        { char: "ホ", romaji: "ho" }
      ],
      m_row: [
        { char: "マ", romaji: "ma" },
        { char: "ミ", romaji: "mi" },
        { char: "ム", romaji: "mu" },
        { char: "メ", romaji: "me" },
        { char: "モ", romaji: "mo" }
      ],
      y_row: [
        { char: "ヤ", romaji: "ya" },
        { char: "ユ", romaji: "yu" },
        { char: "ヨ", romaji: "yo" }
      ],
      r_row: [
        { char: "ラ", romaji: "ra" },
        { char: "リ", romaji: "ri" },
        { char: "ル", romaji: "ru" },
        { char: "レ", romaji: "re" },
        { char: "ロ", romaji: "ro" }
      ],
      w_row: [
        { char: "ワ", romaji: "wa" },
        { char: "ヲ", romaji: "wo" },
        { char: "ン", romaji: "n/m" }
      ]
    };

    const exerciseData = {
      type: "flashcard",
      title: "Katakana Chart - Tableau des Katakana",
      description: "Apprenez l'alphabet katakana japonais - Cliquez sur chaque caractère pour révéler sa prononciation",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["alphabet", "katakana", "japanese", "beginner", "reading"],
      content: { ...JSON.parse(JSON.stringify(hiraganaData)), alphabetMode: true },
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

      console.log('✅ Exercice Katakana Chart créé:', data);
      toast.success("Exercice Katakana Chart créé avec succès !");
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
            🔤 Insérer l'exercice Katakana Chart
          </h1>
          <p className="text-muted-foreground">
            Cet exercice contient l'alphabet katakana complet avec toutes les lignes (a, ka, sa, ta, na, ha, ma, ya, ra, wa)
          </p>

          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <span className="font-semibold">Alphabet (Katakana)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Caractères:</span>
              <span className="font-semibold">46 katakana de base</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Difficulté:</span>
              <span className="font-semibold">Débutant</span>
            </div>
          </div>

          <Button
            onClick={insertHiraganaChart}
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

export default InsertHiraganaChart;
