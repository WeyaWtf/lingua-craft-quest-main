import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle7Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle7Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "弱い|yowai", right: "weak", id: "1-1" },
        { left: "耳|mimi", right: "ear", id: "1-2" },
        { left: "座る|suwaru", right: "sit, sit down", id: "1-3" },
        { left: "右|migi", right: "right", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "浴びる|abiru", right: "take (a shower)", id: "2-1" },
        { left: "肩|kata", right: "shoulder", id: "2-2" },
        { left: "寝る|neru", right: "sleep, lie down", id: "2-3" },
        { left: "消す|kesu", right: "switch off", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "元気|genki", right: "healthy, energetic", id: "3-1" },
        { left: "全部|zenbu", right: "all, whole", id: "3-2" },
        { left: "去年|kyonen", right: "last year", id: "3-3" },
        { left: "引く|hiku", right: "draw, pull", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "図書館|toshokan", right: "library", id: "4-1" },
        { left: "上げる|ageru", right: "raise, lift", id: "4-2" },
        { left: "緑|midori", right: "green", id: "4-3" },
        { left: "腕|ude", right: "arm", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "ドア|doa", right: "door", id: "5-1" },
        { left: "女の子|onna no ko", right: "little girl", id: "5-2" },
        { left: "男の子|otoko no ko", right: "boy", id: "5-3" },
        { left: "私たち|watashitachi", right: "we", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "近く|chikaku", right: "near, close to", id: "6-1" },
        { left: "やる|yaru", right: "do, give", id: "6-2" },
        { left: "かなり|kanari", right: "fairly, rather", id: "6-3" },
        { left: "国|kuni", right: "country", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "起こる|okoru", right: "happen", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 7 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 7 Association créé:', data);
      toast.success("Exercice Bundle 7 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 7 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 7"
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
            onClick={insertBundle7Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 7 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle7Association;
