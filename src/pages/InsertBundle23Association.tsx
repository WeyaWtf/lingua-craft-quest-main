import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle23Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle23Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "本当|hontou", right: "reality, genuine", id: "1-1" },
        { left: "町|machi", right: "town, city", id: "1-2" },
        { left: "お菓子|okashi", right: "sweets, snacks", id: "1-3" },
        { left: "緩い|yurui", right: "slack, loose", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "良い|yoi", right: "good (formal)", id: "2-1" },
        { left: "ようこそ|youkoso", right: "welcome", id: "2-2" },
        { left: "お土産|omiyage", right: "souvenir", id: "2-3" },
        { left: "両親|ryoushin", right: "parents", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "ウェーター|we-ta-", right: "waiter", id: "3-1" },
        { left: "ウェートレス|we-toresu", right: "waitress", id: "3-2" },
        { left: "絶対に|zettaini", right: "absolutely", id: "3-3" },
        { left: "ごちそう|gochisou", right: "feast, treat", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "フォーク|fo-ku", right: "fork", id: "4-1" },
        { left: "スプーン|supu-n", right: "spoon", id: "4-2" },
        { left: "瓶|bin", right: "bottle", id: "4-3" },
        { left: "つく|tsuku", right: "be on, switched on", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "醤油|shouyu", right: "soy sauce", id: "5-1" },
        { left: "茶碗|chawan", right: "rice bowl", id: "5-2" },
        { left: "決める|kimeru", right: "decide", id: "5-3" },
        { left: "感じる|kanjiru", right: "feel, sense", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "生きる|ikiru", right: "live (one's life)", id: "6-1" },
        { left: "動かす|ugokasu", right: "move (something)", id: "6-2" },
        { left: "壊れる|kowareru", right: "break, break down", id: "6-3" },
        { left: "復習|fukushuu", right: "review", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "眉|mayu", right: "eyebrow", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 23 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 23 Association créé:', data);
      toast.success("Exercice Bundle 23 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 23 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 23"
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
            onClick={insertBundle23Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 23 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle23Association;
