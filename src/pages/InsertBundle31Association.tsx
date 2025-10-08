import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle31Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle31Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "改札口|kaisatsuguchi", right: "ticket gate", id: "1-1" },
        { left: "晴れ|hare", right: "fine weather", id: "1-2" },
        { left: "バス停|basutei", right: "bus stop", id: "1-3" },
        { left: "曇り|kumori", right: "cloudy weather", id: "1-4" }
      ],
      [
        { left: "塩|shio", right: "salt", id: "2-1" },
        { left: "たくさん|takusan", right: "a lot", id: "2-2" },
        { left: "大嫌い|daikirai", right: "hate", id: "2-3" },
        { left: "中|naka", right: "inside, middle", id: "2-4" }
      ],
      [
        { left: "二階|nikai", right: "second floor", id: "3-1" },
        { left: "無くす|nakusu", right: "lose, get rid of", id: "3-2" },
        { left: "まあまあ|maamaa", right: "OK, not bad", id: "3-3" },
        { left: "黄色|kiiro", right: "yellow color", id: "3-4" }
      ],
      [
        { left: "ランチ|ranchi", right: "lunch", id: "4-1" },
        { left: "魚|sakana", right: "fish", id: "4-2" },
        { left: "味|aji", right: "taste, flavor", id: "4-3" },
        { left: "りんご|ringo", right: "apple", id: "4-4" }
      ],
      [
        { left: "みかん|mikan", right: "tangerine", id: "5-1" },
        { left: "皿|sara", right: "plate", id: "5-2" },
        { left: "コーヒー|ko-hi-", right: "coffee", id: "5-3" },
        { left: "コップ|koppu", right: "cup, glass", id: "5-4" }
      ],
      [
        { left: "二人|futari", right: "two persons", id: "6-1" },
        { left: "止む|yamu", right: "stop, cease", id: "6-2" },
        { left: "九|kyuu", right: "nine", id: "6-3" },
        { left: "昼間|hiruma", right: "daytime", id: "6-4" }
      ],
      [
        { left: "いつ頃|itsugoro", right: "about when", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 31 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 31 Association créé:', data);
      toast.success("Exercice Bundle 31 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 31 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 31"
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
            onClick={insertBundle31Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 31 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle31Association;
