import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle34Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle34Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "切れる|kireru", right: "cut well, sharp", id: "1-1" },
        { left: "正しい|tadashii", right: "correct", id: "1-2" },
        { left: "苦しい|kurushii", right: "painful", id: "1-3" },
        { left: "細かい|komakai", right: "minute, fine", id: "1-4" }
      ],
      [
        { left: "静か|shizuka", right: "quiet, tranquil", id: "2-1" },
        { left: "健康|kenkou", right: "health", id: "2-2" },
        { left: "ゴルフ|gorufu", right: "golf", id: "2-3" },
        { left: "コース|ko-su", right: "course, route", id: "2-4" }
      ],
      [
        { left: "頼む|tanomu", right: "order, ask for", id: "3-1" },
        { left: "困る|komaru", right: "be in trouble", id: "3-2" },
        { left: "ずっと|zutto", right: "all the time", id: "3-3" },
        { left: "例えば|tatoeba", right: "for example", id: "3-4" }
      ],
      [
        { left: "つもり|tsumori", right: "intention", id: "4-1" },
        { left: "しばらく|shibaraku", right: "a little while", id: "4-2" },
        { left: "紹介|shoukai", right: "introduction", id: "4-3" },
        { left: "小学校|shougakkou", right: "elementary school", id: "4-4" }
      ],
      [
        { left: "公園|kouen", right: "park", id: "5-1" },
        { left: "中学|chuugaku", right: "junior high", id: "5-2" },
        { left: "成績|seiseki", right: "results, grade", id: "5-3" },
        { left: "教科書|kyoukasho", right: "textbook", id: "5-4" }
      ],
      [
        { left: "席|seki", right: "seat, one's place", id: "6-1" },
        { left: "教室|kyoushitsu", right: "classroom, class", id: "6-2" },
        { left: "教師|kyoushi", right: "teacher", id: "6-3" },
        { left: "試験|shiken", right: "exam", id: "6-4" }
      ],
      [
        { left: "合格|goukaku", right: "pass examination", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 34 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 34 Association créé:', data);
      toast.success("Exercice Bundle 34 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 34 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 34"
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
            onClick={insertBundle34Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 34 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle34Association;
