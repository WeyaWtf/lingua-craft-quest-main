import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle37Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle37Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "何か|nanika", right: "something, some", id: "1-1" },
        { left: "向こう|mukou", right: "over there", id: "1-2" },
        { left: "真ん中|mannaka", right: "center, middle", id: "1-3" },
        { left: "遠く|tooku", right: "far away", id: "1-4" }
      ],
      [
        { left: "横|yoko", right: "side, width across", id: "2-1" },
        { left: "つまらない|tsumaranai", right: "boring, dull", id: "2-2" },
        { left: "素晴らしい|subarashii", right: "excellent", id: "2-3" },
        { left: "毎年|maitoshi", right: "every year", id: "2-4" }
      ],
      [
        { left: "来月|raigetsu", right: "next month", id: "3-1" },
        { left: "日時|nichiji", right: "date and time", id: "3-2" },
        { left: "夕方|yuugata", right: "early evening", id: "3-3" },
        { left: "通る|tooru", right: "pass, go through", id: "3-4" }
      ],
      [
        { left: "自動車|jidousha", right: "automobile", id: "4-1" },
        { left: "慣れる|nareru", right: "get used to", id: "4-2" },
        { left: "撮る|toru", right: "take (photograph)", id: "4-3" },
        { left: "やっと|yatto", right: "at last, finally", id: "4-4" }
      ],
      [
        { left: "どんどん|dondon", right: "knock, bang", id: "5-1" },
        { left: "並べる|naraberu", right: "line up, arrange", id: "5-2" },
        { left: "逃げる|nigeru", right: "escape, run away", id: "5-3" },
        { left: "渡す|watasu", right: "hand over, give", id: "5-4" }
      ],
      [
        { left: "値段|nedan", right: "price", id: "6-1" },
        { left: "両方|ryouhou", right: "both", id: "6-2" },
        { left: "約束|yakusoku", right: "promise, vow", id: "6-3" },
        { left: "一部|ichibu", right: "part", id: "6-4" }
      ],
      [
        { left: "ラジオ|rajio", right: "radio", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 37 Association",
      description: "Match Japanese vocabulary with English translations (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT", "association"],
      content: {
        pairGroups: pairGroups,
        shufflePairs: true
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 37 Association créé:', data);
      toast.success("Exercice Bundle 37 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 37 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 37"
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
            onClick={insertBundle37Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 37 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle37Association;
