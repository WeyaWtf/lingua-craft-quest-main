import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle35Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle35Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "数学|suugaku", right: "mathematics", id: "1-1" },
        { left: "数字|suuji", right: "numeric characters", id: "1-2" },
        { left: "音楽|ongaku", right: "music", id: "1-3" },
        { left: "食事|shokuji", right: "meal", id: "1-4" }
      ],
      [
        { left: "壁|kabe", right: "wall, partition", id: "2-1" },
        { left: "信じる|shinjiru", right: "believe, trust", id: "2-2" },
        { left: "育てる|sodateru", right: "bring up, raise", id: "2-3" },
        { left: "倒れる|taoreru", right: "fall over", id: "2-4" }
      ],
      [
        { left: "落とす|otosu", right: "drop", id: "3-1" },
        { left: "代わる|kawaru", right: "substitute", id: "3-2" },
        { left: "タクシー|takushi-", right: "taxi", id: "3-3" },
        { left: "確か|tashika", right: "for sure", id: "3-4" }
      ],
      [
        { left: "立てる|tateru", right: "stand, set up", id: "4-1" },
        { left: "中学生|chuugakusei", right: "junior high student", id: "4-2" },
        { left: "売れる|ureru", right: "sell, in demand", id: "4-3" },
        { left: "着く|tsuku", right: "arrive at, reach", id: "4-4" }
      ],
      [
        { left: "決まる|kimaru", right: "be decided", id: "5-1" },
        { left: "飾る|kazaru", right: "decorate", id: "5-2" },
        { left: "殺す|korosu", right: "kill", id: "5-3" },
        { left: "下げる|sageru", right: "lower, turn down", id: "5-4" }
      ],
      [
        { left: "贈る|okuru", right: "offer, give", id: "6-1" },
        { left: "訪ねる|tazuneru", right: "visit, go to see", id: "6-2" },
        { left: "打つ|utsu", right: "hit, strike", id: "6-3" },
        { left: "相談|soudan", right: "consultation", id: "6-4" }
      ],
      [
        { left: "玄関|genkan", right: "entrance, door", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 35 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 35 Association créé:', data);
      toast.success("Exercice Bundle 35 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 35 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 35"
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
            onClick={insertBundle35Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 35 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle35Association;
