import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle5Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle5Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "美しい|utsukushii", right: "beautiful", id: "1-1" },
        { left: "いつも|itsumo", right: "always", id: "1-2" },
        { left: "足|ashi", right: "leg, foot", id: "1-3" },
        { left: "起こす|okosu", right: "wake (someone) up", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "見せる|miseru", right: "show", id: "2-1" },
        { left: "娘|musume", right: "daughter, girl", id: "2-2" },
        { left: "楽しむ|tanoshimu", right: "enjoy", id: "2-3" },
        { left: "色|iro", right: "color", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "みんな|minna", right: "everybody", id: "3-1" },
        { left: "取る|toru", right: "take, get", id: "3-2" },
        { left: "勉強|benkyou", right: "study", id: "3-3" },
        { left: "できる|dekiru", right: "can do, be good at", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "短い|mijikai", right: "short, brief", id: "4-1" },
        { left: "落ちる|ochiru", right: "fall, come down", id: "4-2" },
        { left: "息子|musuko", right: "son", id: "4-3" },
        { left: "白い|shiroi", right: "white, blank", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "飛行機|hikouki", right: "airplane", id: "5-1" },
        { left: "病気|byouki", right: "illness", id: "5-2" },
        { left: "冬|fuyu", right: "winter", id: "5-3" },
        { left: "年|toshi", right: "year, age", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "重い|omoi", right: "heavy", id: "6-1" },
        { left: "胸|mune", right: "chest, breast", id: "6-2" },
        { left: "払う|harau", right: "pay", id: "6-3" },
        { left: "軽い|karui", right: "light (weight)", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "見つける|mitsukeru", right: "find", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 5 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 5 Association créé:', data);
      toast.success("Exercice Bundle 5 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 5 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 5"
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
            onClick={insertBundle5Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 5 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle5Association;
