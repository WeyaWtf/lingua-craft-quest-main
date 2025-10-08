import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle10Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle10Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "始まる|hajimaru", right: "begin", id: "1-1" },
        { left: "ゲーム|ge-mu", right: "game", id: "1-2" },
        { left: "十|juu", right: "ten", id: "1-3" },
        { left: "天気|tenki", right: "weather", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "暑い|atsui", right: "hot (weather)", id: "2-1" },
        { left: "太い|futoi", right: "thick, fat", id: "2-2" },
        { left: "晩|ban", right: "evening, night", id: "2-3" },
        { left: "土曜日|doyoubi", right: "Saturday", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "痛い|itai", right: "sore, painful", id: "3-1" },
        { left: "お父さん|otousan", right: "father, dad", id: "3-2" },
        { left: "多分|tabun", right: "probably, perhaps", id: "3-3" },
        { left: "時計|tokei", right: "clock, watch", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "泊まる|tomaru", right: "stay overnight", id: "4-1" },
        { left: "どうして|doushite", right: "how come", id: "4-2" },
        { left: "掛ける|kakeru", right: "hang, put on", id: "4-3" },
        { left: "曲がる|magaru", right: "make a turn", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "お腹|onaka", right: "stomach, belly", id: "5-1" },
        { left: "ミーティング|mi-tingu", right: "meeting", id: "5-2" },
        { left: "嫌い|kirai", right: "dislike", id: "5-3" },
        { left: "金曜日|kinyoubi", right: "Friday", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "要る|iru", right: "need, require", id: "6-1" },
        { left: "無い|nai", right: "to not be", id: "6-2" },
        { left: "風邪|kaze", right: "cold (illness)", id: "6-3" },
        { left: "黄色い|kiiroi", right: "yellow", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "優しい|yasashii", right: "gentle, kind", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 10 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 10 Association créé:', data);
      toast.success("Exercice Bundle 10 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 10 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 10"
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
            onClick={insertBundle10Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 10 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle10Association;
