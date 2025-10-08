import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle40Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle40Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "なかなか|nakanaka", right: "rather, pretty", id: "1-1" },
        { left: "励ます|hagemasu", right: "encourage", id: "1-2" },
        { left: "涙|namida", right: "tear", id: "1-3" },
        { left: "夢|yume", right: "dream", id: "1-4" }
      ],
      [
        { left: "職場|shokuba", right: "place of work", id: "2-1" },
        { left: "隣|tonari", right: "next to", id: "2-2" },
        { left: "マンション|manshon", right: "apartment", id: "2-3" },
        { left: "エレベーター|erebe-ta-", right: "elevator", id: "2-4" }
      ],
      [
        { left: "窓|mado", right: "window", id: "3-1" },
        { left: "押す|osu", right: "push, press down", id: "3-2" },
        { left: "入学|nyuugaku", right: "enter a school", id: "3-3" },
        { left: "戸|to", right: "door, sliding door", id: "3-4" }
      ],
      [
        { left: "通り|toori", right: "street, road", id: "4-1" },
        { left: "亡くなる|nakunaru", right: "die, pass away", id: "4-2" },
        { left: "夫婦|fuufu", right: "husband and wife", id: "4-3" },
        { left: "女性|josei", right: "woman, female", id: "4-4" }
      ],
      [
        { left: "森|mori", right: "forest", id: "5-1" },
        { left: "トラック|torakku", right: "truck", id: "5-2" },
        { left: "レコード|reko-do", right: "record", id: "5-3" },
        { left: "熱|netsu", right: "heat, fever", id: "5-4" }
      ],
      [
        { left: "ページ|pe-ji", right: "page", id: "6-1" },
        { left: "踊る|odoru", right: "dance", id: "6-2" },
        { left: "長さ|nagasa", right: "length", id: "6-3" },
        { left: "厚さ|atsusa", right: "thickness", id: "6-4" }
      ],
      [
        { left: "秘密|himitsu", right: "secret, privacy", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 40 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 40 Association créé:', data);
      toast.success("Exercice Bundle 40 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 40 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 40"
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
            onClick={insertBundle40Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 40 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle40Association;
