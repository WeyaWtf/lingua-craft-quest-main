import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle20Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle20Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "住所|juusho", right: "address", id: "1-1" },
        { left: "こちら|kochira", right: "here, this way", id: "1-2" },
        { left: "財布|saifu", right: "purse, wallet", id: "1-3" },
        { left: "パスポート|pasupo-to", right: "passport", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "椅子|isu", right: "chair", id: "2-1" },
        { left: "可愛い|kawaii", right: "cute, sweet", id: "2-2" },
        { left: "お祖父さん|ojiisan", right: "grandfather", id: "2-3" },
        { left: "切手|kitte", right: "postage stamp", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "涼しい|suzushii", right: "cool (temperature)", id: "3-1" },
        { left: "いくつ|ikutsu", right: "how many, how old", id: "3-2" },
        { left: "メニュー|menyu-", right: "menu", id: "3-3" },
        { left: "電気|denki", right: "electricity", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "勝つ|katsu", right: "win", id: "4-1" },
        { left: "負ける|makeru", right: "lose", id: "4-2" },
        { left: "建てる|tateru", right: "build, erect", id: "4-3" },
        { left: "日記|nikki", right: "diary", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "売り切れ|urikire", right: "sell out", id: "5-1" },
        { left: "お巡りさん|omawarisan", right: "police officer", id: "5-2" },
        { left: "目覚まし時計|mezamashitokei", right: "alarm clock", id: "5-3" },
        { left: "レシート|reshi-to", right: "receipt", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "ティッシュ|tisshu", right: "tissue", id: "6-1" },
        { left: "歯ブラシ|haburashi", right: "toothbrush", id: "6-2" },
        { left: "下りる|oriru", right: "go down", id: "6-3" },
        { left: "洗う|arau", right: "wash", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "パート|pa-to", right: "part-time", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 20 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 20 Association créé:', data);
      toast.success("Exercice Bundle 20 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 20 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 20"
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
            onClick={insertBundle20Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 20 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle20Association;
