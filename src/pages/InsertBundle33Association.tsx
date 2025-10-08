import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle33Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle33Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "うまい|umai", right: "sweet, delicious", id: "1-1" },
        { left: "思い出す|omoidasu", right: "recollect, recall", id: "1-2" },
        { left: "聞こえる|kikoeru", right: "hear, be heard", id: "1-3" },
        { left: "借りる|kariru", right: "borrow", id: "1-4" }
      ],
      [
        { left: "返す|kaesu", right: "return, repay", id: "2-1" },
        { left: "受け取る|uketoru", right: "receive, get", id: "2-2" },
        { left: "捨てる|suteru", right: "discard, abandon", id: "2-3" },
        { left: "一緒|issho", right: "together, same", id: "2-4" }
      ],
      [
        { left: "遊び|asobi", right: "play, amusement", id: "3-1" },
        { left: "移す|utsusu", right: "move, transfer", id: "3-2" },
        { left: "大きさ|ookisa", right: "size, dimension", id: "3-3" },
        { left: "考え|kangae", right: "thought, idea", id: "3-4" }
      ],
      [
        { left: "空港|kuukou", right: "airport", id: "4-1" },
        { left: "出発|shuppatsu", right: "departure", id: "4-2" },
        { left: "地図|chizu", right: "map, atlas", id: "4-3" },
        { left: "運転|unten", right: "drive", id: "4-4" }
      ],
      [
        { left: "降りる|oriru", right: "get off, land", id: "5-1" },
        { left: "ガス|gasu", right: "gas", id: "5-2" },
        { left: "必ず|kanarazu", right: "always", id: "5-3" },
        { left: "カメラ|kamera", right: "camera", id: "5-4" }
      ],
      [
        { left: "通う|kayou", right: "go to and from", id: "6-1" },
        { left: "急に|kyuuni", right: "suddenly", id: "6-2" },
        { left: "サラリーマン|sarari-man", right: "office worker", id: "6-3" },
        { left: "給料|kyuuryou", right: "salary, pay", id: "6-4" }
      ],
      [
        { left: "曲|kyoku", right: "piece of music", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 33 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 33 Association créé:', data);
      toast.success("Exercice Bundle 33 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 33 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 33"
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
            onClick={insertBundle33Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 33 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle33Association;
