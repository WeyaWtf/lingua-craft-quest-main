import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle28Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle28Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "グループ|guru-pu", right: "group", id: "1-1" },
        { left: "自宅|jitaku", right: "one's house", id: "1-2" },
        { left: "家庭|katei", right: "home, family", id: "1-3" },
        { left: "期間|kikan", right: "term, period", id: "1-4" }
      ],
      [
        { left: "年度|nendo", right: "year, school year", id: "2-1" },
        { left: "経験|keiken", right: "experience", id: "2-2" },
        { left: "安全|anzen", right: "safety, security", id: "2-3" },
        { left: "危険|kiken", right: "danger, dangerous", id: "2-4" }
      ],
      [
        { left: "注意|chuui", right: "attention, care", id: "3-1" },
        { left: "成功|seikou", right: "success", id: "3-2" },
        { left: "努力|doryoku", right: "endeavor, effort", id: "3-3" },
        { left: "説明|setsumei", right: "explanation", id: "3-4" }
      ],
      [
        { left: "地震|jishin", right: "earthquake", id: "4-1" },
        { left: "手術|shujutsu", right: "surgical operation", id: "4-2" },
        { left: "火傷|yakedo", right: "burn", id: "4-3" },
        { left: "課題|kadai", right: "task, assignment", id: "4-4" }
      ],
      [
        { left: "子|ko", right: "young child, kid", id: "5-1" },
        { left: "確認|kakunin", right: "confirmation", id: "5-2" },
        { left: "実際|jissai", right: "reality", id: "5-3" },
        { left: "国際|kokusai", right: "international", id: "5-4" }
      ],
      [
        { left: "会議|kaigi", right: "conference", id: "6-1" },
        { left: "提案|teian", right: "proposition", id: "6-2" },
        { left: "事務所|jimusho", right: "office", id: "6-3" },
        { left: "教授|kyouju", right: "professor", id: "6-4" }
      ],
      [
        { left: "世紀|seiki", right: "century", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 28 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 28 Association créé:', data);
      toast.success("Exercice Bundle 28 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 28 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 28"
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
            onClick={insertBundle28Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 28 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle28Association;
