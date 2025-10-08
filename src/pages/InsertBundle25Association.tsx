import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle25Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle25Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "なるほど|naruhodo", right: "I see, really", id: "1-1" },
        { left: "つまり|tsumari", right: "in short", id: "1-2" },
        { left: "そのまま|sonomama", right: "as it is", id: "1-3" },
        { left: "はっきり|hakkiri", right: "clearly", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "大変|taihen", right: "awful, hard", id: "2-1" },
        { left: "簡単|kantan", right: "simple, easy", id: "2-2" },
        { left: "似ている|niteiru", right: "look like", id: "2-3" },
        { left: "驚く|odoroku", right: "be surprised", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "嫌|iya", right: "dislike", id: "3-1" },
        { left: "喧嘩|kenka", right: "fight, argument", id: "3-2" },
        { left: "遅れる|okureru", right: "be late", id: "3-3" },
        { left: "にんじん|ninjin", right: "carrot", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "ジャガイモ|jagaimo", right: "potato", id: "4-1" },
        { left: "ナス|nasu", right: "eggplant", id: "4-2" },
        { left: "やかん|yakan", right: "kettle", id: "4-3" },
        { left: "話し合う|hanashiau", right: "discuss", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "残す|nokosu", right: "leave, leave undone", id: "5-1" },
        { left: "ごちそうする|gochisousuru", right: "treat, host", id: "5-2" },
        { left: "合う|au", right: "fit, match", id: "5-3" },
        { left: "当たる|ataru", right: "hit, strike", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "集まる|atsumaru", right: "gather", id: "6-1" },
        { left: "場所|basho", right: "place, space", id: "6-2" },
        { left: "海|umi", right: "sea, ocean", id: "6-3" },
        { left: "少年|shounen", right: "boy (7-18 years)", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "孫|mago", right: "grandchild", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 25 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 25 Association créé:', data);
      toast.success("Exercice Bundle 25 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 25 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 25"
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
            onClick={insertBundle25Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 25 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle25Association;
