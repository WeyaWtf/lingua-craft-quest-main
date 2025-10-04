import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle1Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle1Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "行く|iku", right: "go", id: "1-1" },
        { left: "見る|miru", right: "see, look at", id: "1-2" },
        { left: "多い|ooi", right: "a lot of, many", id: "1-3" },
        { left: "家|ie", right: "home, household", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "これ|kore", right: "this, this one", id: "2-1" },
        { left: "それ|sore", right: "that, that one", id: "2-2" },
        { left: "私|watashi", right: "I", id: "2-3" },
        { left: "仕事|shigoto", right: "work, job", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "いつ|itsu", right: "when", id: "3-1" },
        { left: "する|suru", right: "do, make", id: "3-2" },
        { left: "出る|deru", right: "go out, leave", id: "3-3" },
        { left: "使う|tsukau", right: "use, make use of", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "所|tokoro", right: "place", id: "4-1" },
        { left: "作る|tsukuru", right: "make, create", id: "4-2" },
        { left: "思う|omou", right: "think", id: "4-3" },
        { left: "持つ|motsu", right: "have, possess", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "買う|kau", right: "buy", id: "5-1" },
        { left: "時間|jikan", right: "time, hour", id: "5-2" },
        { left: "知る|shiru", right: "know", id: "5-3" },
        { left: "同じ|onaji", right: "same, identical", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "今|ima", right: "now", id: "6-1" },
        { left: "新しい|atarashii", right: "new", id: "6-2" },
        { left: "なる|naru", right: "become", id: "6-3" },
        { left: "まだ|mada", right: "(not) yet, still", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "あと|ato", right: "after", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "Bundle 1 - Association",
      description: "Match Japanese vocabulary with English translations (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT", "association"],
      content: {
        pairGroups: pairGroups
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

      console.log('✅ Exercice Bundle 1 Association créé:', data);
      toast.success("Exercice Bundle 1 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer Bundle 1 - Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 1"
            avec 25 mots organisés en 7 pages.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Association (matching)</li>
              <li>• Nombre total de paires : 25</li>
              <li>• Organisation : 7 pages</li>
              <li>• Pages 1-6 : 4 paires chacune</li>
              <li>• Page 7 : 1 paire</li>
              <li>• Langue : Japonais 🇯🇵</li>
              <li>• Niveau : Débutant (N5)</li>
              <li>• Format : Japonais (kanji + romanji) → Anglais</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">📋 Structure :</h3>
            <p className="text-sm">
              • <strong>Colonne gauche :</strong> Kanji japonais (grand) + romanji (gris petit)<br/>
              • <strong>Colonne droite :</strong> Traduction anglaise<br/>
              • <strong>Gameplay :</strong> Cliquer sur la gauche puis sur la correspondance à droite
            </p>
          </div>

          <Button
            size="lg"
            onClick={insertBundle1Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 1 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle1Association;
