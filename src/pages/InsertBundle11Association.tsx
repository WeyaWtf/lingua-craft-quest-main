import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle11Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle11Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "晴れる|hareru", right: "be sunny", id: "1-1" },
        { left: "汚い|kitanai", right: "dirty", id: "1-2" },
        { left: "茶色|chairo", right: "brown", id: "1-3" },
        { left: "空く|suku", right: "be empty", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "上る|noboru", right: "go up, climb", id: "2-1" },
        { left: "ご飯|gohan", right: "meal, rice", id: "2-2" },
        { left: "日|nichi", right: "counter for days", id: "2-3" },
        { left: "髪の毛|kaminoke", right: "hair", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "つける|tsukeru", right: "switch on", id: "3-1" },
        { left: "月曜日|getsuyoubi", right: "Monday", id: "3-2" },
        { left: "入る|hairu", right: "enter", id: "3-3" },
        { left: "カタカナ|katakana", right: "katakana", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "今週|konshuu", right: "this week", id: "4-1" },
        { left: "開く|hiraku", right: "open", id: "4-2" },
        { left: "水|mizu", right: "water", id: "4-3" },
        { left: "あれ|are", right: "that (over there)", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "二|ni", right: "two", id: "5-1" },
        { left: "締める|shimeru", right: "tighten, fasten", id: "5-2" },
        { left: "まずい|mazui", right: "bad (taste)", id: "5-3" },
        { left: "平仮名|hiragana", right: "hiragana", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "曇る|kumoru", right: "become cloudy", id: "6-1" },
        { left: "触る|sawaru", right: "touch, feel", id: "6-2" },
        { left: "駄目|dame", right: "no good", id: "6-3" },
        { left: "飲み物|nomimono", right: "beverage, drink", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "木曜日|mokuyoubi", right: "Thursday", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 11 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 11 Association créé:', data);
      toast.success("Exercice Bundle 11 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 11 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 11"
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
            onClick={insertBundle11Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 11 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle11Association;
