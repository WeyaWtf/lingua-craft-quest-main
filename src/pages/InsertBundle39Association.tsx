import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle39Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle39Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "残る|nokoru", right: "remain", id: "1-1" },
        { left: "ビル|biru", right: "building", id: "1-2" },
        { left: "まとめる|matomeru", right: "gather together", id: "1-3" },
        { left: "流れる|nagareru", right: "flow, run", id: "1-4" }
      ],
      [
        { left: "セーター|se-ta-", right: "sweater", id: "2-1" },
        { left: "シャツ|shatsu", right: "shirt", id: "2-2" },
        { left: "洗濯|sentaku", right: "laundry, washing", id: "2-3" },
        { left: "間違える|machigaeru", right: "make a mistake", id: "2-4" }
      ],
      [
        { left: "アイスクリーム|aisukuri-mu", right: "ice cream", id: "3-1" },
        { left: "乾く|kawaku", right: "become dry", id: "3-2" },
        { left: "冷める|sameru", right: "cool off", id: "3-3" },
        { left: "色々|iroiro", right: "a variety of", id: "3-4" }
      ],
      [
        { left: "持って行く|motteiku", right: "take, bring", id: "4-1" },
        { left: "着替える|kigaeru", right: "change clothes", id: "4-2" },
        { left: "石鹸|sekken", right: "soap", id: "4-3" },
        { left: "野球|yakyuu", right: "baseball", id: "4-4" }
      ],
      [
        { left: "昼食|chyuushoku", right: "lunch", id: "5-1" },
        { left: "朝食|choushoku", right: "breakfast", id: "5-2" },
        { left: "眠る|nemuru", right: "sleep, lie idle", id: "5-3" },
        { left: "初め|hajime", right: "beginning", id: "5-4" }
      ],
      [
        { left: "火|hi", right: "fire, flame", id: "6-1" },
        { left: "西|nishi", right: "west, western", id: "6-2" },
        { left: "東|higashi", right: "east, eastern", id: "6-3" },
        { left: "南|minami", right: "south", id: "6-4" }
      ],
      [
        { left: "夕食|yuushoku", right: "supper, dinner", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 39 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 39 Association créé:', data);
      toast.success("Exercice Bundle 39 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 39 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 39"
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
            onClick={insertBundle39Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 39 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle39Association;
