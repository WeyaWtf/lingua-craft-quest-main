import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle38Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle38Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "入院|nyuuin", right: "be hospitalized", id: "1-1" },
        { left: "ニュース|nyu-su", right: "news", id: "1-2" },
        { left: "旅行|ryokou", right: "travel, trip", id: "1-3" },
        { left: "用意|youi", right: "preparation", id: "1-4" }
      ],
      [
        { left: "伸びる|nobiru", right: "stretch, grow", id: "2-1" },
        { left: "パーティー|pa-ti-", right: "party", id: "2-2" },
        { left: "ビール|bi-ru", right: "beer", id: "2-3" },
        { left: "早く|hayaku", right: "early, soon", id: "2-4" }
      ],
      [
        { left: "番組|bangumi", right: "program", id: "3-1" },
        { left: "ビデオ|bideo", right: "video", id: "3-2" },
        { left: "増やす|fuyasu", right: "increase", id: "3-3" },
        { left: "振る|furu", right: "wave, shake", id: "3-4" }
      ],
      [
        { left: "迎える|mukaeru", right: "welcome, receive", id: "4-1" },
        { left: "無理|muri", right: "unreasonable", id: "4-2" },
        { left: "珍しい|mezurashii", right: "rare, scarce", id: "4-3" },
        { left: "有名|yuumei", right: "famous", id: "4-4" }
      ],
      [
        { left: "喜ぶ|yorokobu", right: "be happy", id: "5-1" },
        { left: "留学|ryuugaku", right: "study abroad", id: "5-2" },
        { left: "料理|ryouri", right: "cooking", id: "5-3" },
        { left: "野菜|yasai", right: "vegetable", id: "5-4" }
      ],
      [
        { left: "分かれる|wakareru", right: "be divided", id: "6-1" },
        { left: "特別|tokubetsu", right: "special", id: "6-2" },
        { left: "理由|riyuu", right: "reason, excuse", id: "6-3" },
        { left: "自由|jiyuu", right: "freedom", id: "6-4" }
      ],
      [
        { left: "方向|houkou", right: "direction, course", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 38 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 38 Association créé:', data);
      toast.success("Exercice Bundle 38 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 38 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 38"
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
            onClick={insertBundle38Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 38 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle38Association;
