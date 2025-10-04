import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle1Translation = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle1Translation = async () => {
    setIsInserting(true);

    // 25 exercices de traduction basés sur le vocabulaire Bundle 1
    const translationExercises = [
      // 行く (iku) - go
      { sourceText: "私は行く", targetText: "I go", hints: "watashi wa iku" },
      { sourceText: "学校に行く", targetText: "go to school", hints: "gakkō ni iku" },
      { sourceText: "家に行く", targetText: "go home", hints: "ie ni iku" },
      { sourceText: "今行く", targetText: "go now", hints: "ima iku" },
      { sourceText: "いつ行く？", targetText: "when do you go?", hints: "itsu iku?" },

      // 見る (miru) - see, look at
      { sourceText: "私は見る", targetText: "I see", hints: "watashi wa miru" },
      { sourceText: "テレビを見る", targetText: "watch TV", hints: "terebi o miru" },
      { sourceText: "これを見る", targetText: "look at this", hints: "kore o miru" },
      { sourceText: "映画を見る", targetText: "watch a movie", hints: "eiga o miru" },

      // 多い (ooi) - a lot of, many
      { sourceText: "人が多い", targetText: "there are many people", hints: "hito ga ooi" },
      { sourceText: "仕事が多い", targetText: "there is a lot of work", hints: "shigoto ga ooi" },

      // 家 (ie) - home, household
      { sourceText: "これは家", targetText: "this is home", hints: "kore wa ie" },
      { sourceText: "私の家", targetText: "my home", hints: "watashi no ie" },
      { sourceText: "新しい家", targetText: "new home", hints: "atarashii ie" },

      // これ (kore) - this, this one
      { sourceText: "これは何？", targetText: "what is this?", hints: "kore wa nani?" },
      { sourceText: "これを買う", targetText: "buy this", hints: "kore o kau" },

      // それ (sore) - that, that one
      { sourceText: "それは何？", targetText: "what is that?", hints: "sore wa nani?" },
      { sourceText: "それを見る", targetText: "look at that", hints: "sore o miru" },

      // 私 (watashi) - I
      { sourceText: "私は買う", targetText: "I buy", hints: "watashi wa kau" },
      { sourceText: "私は作る", targetText: "I make", hints: "watashi wa tsukuru" },

      // 仕事 (shigoto) - work, job
      { sourceText: "私は仕事する", targetText: "I work", hints: "watashi wa shigoto suru" },
      { sourceText: "仕事に行く", targetText: "go to work", hints: "shigoto ni iku" },

      // いつ (itsu) - when
      { sourceText: "いつ買う？", targetText: "when do you buy?", hints: "itsu kau?" },

      // する (suru) - do, make
      { sourceText: "私はする", targetText: "I do", hints: "watashi wa suru" },
      { sourceText: "仕事する", targetText: "do work", hints: "shigoto suru" }
    ];

    const exerciseData = {
      type: "translation",
      title: "Bundle 1 - Translation",
      description: "Translate Japanese sentences to English (N5 level vocabulary)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT", "translation"],
      content: {
        exercises: translationExercises
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

      console.log('✅ Exercice Bundle 1 Translation créé:', data);
      toast.success("Exercice Bundle 1 Translation créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer Bundle 1 - Translation</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice de traduction pour le vocabulaire japonais "Bundle 1"
            avec 25 phrases à traduire du japonais vers l'anglais.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Traduction (Translation)</li>
              <li>• Nombre d'exercices : 25</li>
              <li>• Langue : Japonais 🇯🇵 → Anglais</li>
              <li>• Niveau : Débutant (N5)</li>
              <li>• Format : Phrase japonaise → Traduction anglaise</li>
              <li>• Indices : Romanji (prononciation)</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">📋 Vocabulaire couvert :</h3>
            <p className="text-sm">
              • Verbes : 行く (iku), 見る (miru), する (suru), 買う (kau), 作る (tsukuru)<br/>
              • Noms : 家 (ie), 仕事 (shigoto)<br/>
              • Démonstratifs : これ (kore), それ (sore)<br/>
              • Adjectifs : 多い (ooi), 新しい (atarashii)<br/>
              • Mots de question : いつ (itsu)
            </p>
          </div>

          <Button
            size="lg"
            onClick={insertBundle1Translation}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 1 Translation"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle1Translation;
