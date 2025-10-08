import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle22Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle22Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "眼鏡|megane", right: "glasses", id: "1-1" },
        { left: "鞄|kaban", right: "bag, handbag", id: "1-2" },
        { left: "あっち|acchi", right: "over there", id: "1-3" },
        { left: "大人しい|otonashii", right: "gentle, quiet", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "下手|heta", right: "not good at", id: "2-1" },
        { left: "厳しい|kibishii", right: "strict, severe", id: "2-2" },
        { left: "一人で|hitoride", right: "by oneself, alone", id: "2-3" },
        { left: "答え|kotae", right: "answer, solution", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "この頃|konogoro", right: "these days", id: "3-1" },
        { left: "残念|zannen", right: "regretful", id: "3-2" },
        { left: "仕舞う|shimau", right: "put away", id: "3-3" },
        { left: "心配|shinpai", right: "anxiety, worry", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "外|soto", right: "outside", id: "4-1" },
        { left: "大切|taisetsu", right: "important", id: "4-2" },
        { left: "ちょうど|choudo", right: "just, exactly", id: "4-3" },
        { left: "助ける|tasukeru", right: "help, save", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "勤める|tsutomeru", right: "hold a job", id: "5-1" },
        { left: "連れていく|tsureteiku", right: "take along", id: "5-2" },
        { left: "丈夫|joubu", right: "healthy, sturdy", id: "5-3" },
        { left: "賑やか|nigiyaka", right: "lively, exciting", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "眠い|nemui", right: "sleepy", id: "6-1" },
        { left: "山|yama", right: "mountain", id: "6-2" },
        { left: "橋|hashi", right: "bridge", id: "6-3" },
        { left: "止まる|tomaru", right: "come to a stop", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "降る|furu", right: "fall, come down", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 22 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 22 Association créé:', data);
      toast.success("Exercice Bundle 22 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 22 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 22"
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
            onClick={insertBundle22Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 22 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle22Association;
