import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle36Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle36Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "兄弟|kyoudai", right: "sibling", id: "1-1" },
        { left: "長男|chounan", right: "eldest son", id: "1-2" },
        { left: "高さ|takasa", right: "height", id: "1-3" },
        { left: "用|you", right: "things to do", id: "1-4" }
      ],
      [
        { left: "時代|jidai", right: "age, era", id: "2-1" },
        { left: "位置|ichi", right: "position, location", id: "2-2" },
        { left: "季節|kisetsu", right: "season", id: "2-3" },
        { left: "穴|ana", right: "hole", id: "2-4" }
      ],
      [
        { left: "裏|ura", right: "the back", id: "3-1" },
        { left: "島|shima", right: "island", id: "3-2" },
        { left: "海岸|kaigan", right: "seashore, coast", id: "3-3" },
        { left: "ガラス|garasu", right: "glass (material)", id: "3-4" }
      ],
      [
        { left: "自然|shizen", right: "natural", id: "4-1" },
        { left: "風|kaze", right: "wind", id: "4-2" },
        { left: "科学|kagaku", right: "science", id: "4-3" },
        { left: "太陽|taiyou", right: "sun", id: "4-4" }
      ],
      [
        { left: "台風|taifuu", right: "typhoon", id: "5-1" },
        { left: "北|kita", right: "north", id: "5-2" },
        { left: "馬|uma", right: "horse", id: "5-3" },
        { left: "牛肉|gyuuniku", right: "beef", id: "5-4" }
      ],
      [
        { left: "雑誌|zasshi", right: "magazine, journal", id: "6-1" },
        { left: "小説|shousetsu", right: "novel", id: "6-2" },
        { left: "大使館|taishikan", right: "embassy", id: "6-3" },
        { left: "故障|koshou", right: "malfunction", id: "6-4" }
      ],
      [
        { left: "温度|ondo", right: "temperature", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 36 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 36 Association créé:', data);
      toast.success("Exercice Bundle 36 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 36 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 36"
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
            onClick={insertBundle36Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 36 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle36Association;
