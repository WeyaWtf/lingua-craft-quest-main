import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle27Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle27Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "なぜ|naze", right: "why", id: "1-1" },
        { left: "並ぶ|narabu", right: "line up", id: "1-2" },
        { left: "運ぶ|hakobu", right: "carry, transport", id: "1-3" },
        { left: "直す|naosu", right: "repair, fix", id: "1-4" }
      ],
      [
        { left: "反対|hantai", right: "oppose, object", id: "2-1" },
        { left: "場合|baai", right: "situation, case", id: "2-2" },
        { left: "詳しい|kuwashii", right: "detailed", id: "2-3" },
        { left: "いたずら|itazura", right: "mischief, prank", id: "2-4" }
      ],
      [
        { left: "お祝い|oiwai", right: "celebrate", id: "3-1" },
        { left: "くし|kushi", right: "comb", id: "3-2" },
        { left: "こぼれる|koboreru", right: "spill, overflow", id: "3-3" },
        { left: "伝える|tsutaeru", right: "convey, transmit", id: "3-4" }
      ],
      [
        { left: "膝|hiza", right: "knee", id: "4-1" },
        { left: "肘|hiji", right: "elbow", id: "4-2" },
        { left: "枕|makura", right: "pillow", id: "4-3" },
        { left: "建物|tatemono", right: "building", id: "4-4" }
      ],
      [
        { left: "道路|douro", right: "road", id: "5-1" },
        { left: "四つ角|yotsukado", right: "intersection", id: "5-2" },
        { left: "曲がり角|magarikado", right: "corner", id: "5-3" },
        { left: "警察|keisatsu", right: "police", id: "5-4" }
      ],
      [
        { left: "空気|kuuki", right: "air, atmosphere", id: "6-1" },
        { left: "スポーツ|supo-tsu", right: "sport", id: "6-2" },
        { left: "チャンス|chansu", right: "chance", id: "6-3" },
        { left: "クリーニング|kuri-ningu", right: "dry cleaning", id: "6-4" }
      ],
      [
        { left: "サービス|sa-bisu", right: "service", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 27 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 27 Association créé:', data);
      toast.success("Exercice Bundle 27 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 27 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 27"
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
            onClick={insertBundle27Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 27 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle27Association;
