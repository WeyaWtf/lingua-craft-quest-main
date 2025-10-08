import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle14Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle14Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "暖かい|atatakai", right: "warm", id: "1-1" },
        { left: "ある|aru", right: "exist, there is", id: "1-2" },
        { left: "いい|ii", right: "good", id: "1-3" },
        { left: "上|ue", right: "up, above", id: "1-4" }
      ],
      [
        { left: "駅|eki", right: "train station", id: "2-1" },
        { left: "美味しい|oishii", right: "tasty", id: "2-2" },
        { left: "昨日|kinou", right: "yesterday", id: "2-3" },
        { left: "綺麗|kirei", right: "pretty, clean", id: "2-4" }
      ],
      [
        { left: "五|go", right: "five", id: "3-1" },
        { left: "九つ|kokonotsu", right: "nine (things)", id: "3-2" },
        { left: "お願い|onegai", right: "favor", id: "3-3" },
        { left: "答える|kotaeru", right: "give an answer", id: "3-4" }
      ],
      [
        { left: "先|saki", right: "ahead, first", id: "4-1" },
        { left: "寒い|samui", right: "cold (air)", id: "4-2" },
        { left: "四|shi", right: "four", id: "4-3" },
        { left: "三日|mikka", right: "three days", id: "4-4" }
      ],
      [
        { left: "下|shita", right: "under, below", id: "5-1" },
        { left: "大丈夫|daijoubu", right: "all right, OK", id: "5-2" },
        { left: "大人|otona", right: "adult", id: "5-3" },
        { left: "出す|dasu", right: "take out", id: "5-4" }
      ],
      [
        { left: "父|chichi", right: "father", id: "6-1" },
        { left: "母|haha", right: "mother", id: "6-2" },
        { left: "月|tsuki", right: "moon", id: "6-3" },
        { left: "妹|imouto", right: "younger sister", id: "6-4" }
      ],
      [
        { left: "冷たい|tsumetai", right: "cold (touch)", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 14 Association",
      description: "Match Japanese vocabulary with English translations (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT", "association"],
      content: { pairGroups: pairGroups, shufflePairs: true },
      author_id: "demo",
      is_published: true
    };

    try {
      const { data, error } = await supabase.from('exercises').insert([exerciseData]).select().single();
      if (error) {
        console.error('Erreur lors de l\'insertion:', error);
        toast.error("Erreur lors de la création de l'exercice");
        setIsInserting(false);
        return;
      }
      console.log('✅ Exercice JAP LIST 1000 - Bundle 14 Association créé:', data);
      toast.success("Exercice Bundle 14 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 14 Association</h1>
          <p className="text-muted-foreground mb-6">Créer l'exercice d'association pour le vocabulaire japonais "Bundle 14" avec 25 mots organisés en 7 pages.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Association (matching)</li>
              <li>• Nombre total de paires : 25</li>
              <li>• Organisation : 7 pages</li>
              <li>• Langue : Japonais 🇯🇵</li>
              <li>• Niveau : Débutant (N5)</li>
            </ul>
          </div>
          <Button size="lg" onClick={insertBundle14Association} disabled={isInserting} className="min-w-[200px]">
            {isInserting ? "Insertion en cours..." : "Créer Bundle 14 Association"}
          </Button>
          <p className="text-xs text-muted-foreground mt-4">Une fois créé, l'exercice sera disponible dans le catalogue</p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle14Association;
