import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle32Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle32Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "字|ji", right: "character, letter", id: "1-1" },
        { left: "七|nana", right: "seven", id: "1-2" },
        { left: "お釣り|otsuri", right: "change (money)", id: "1-3" },
        { left: "名字|myouji", right: "surname", id: "1-4" }
      ],
      [
        { left: "おじ|oji", right: "uncle", id: "2-1" },
        { left: "おば|oba", right: "aunt", id: "2-2" },
        { left: "祖父|sofu", right: "grandfather", id: "2-3" },
        { left: "祖母|sobo", right: "grandmother", id: "2-4" }
      ],
      [
        { left: "大事|daiji", right: "importance", id: "3-1" },
        { left: "見方|mikata", right: "view, perspective", id: "3-2" },
        { left: "鳥|tori", right: "bird, poultry", id: "3-3" },
        { left: "犬|inu", right: "dog", id: "3-4" }
      ],
      [
        { left: "返事|henji", right: "reply, answer", id: "4-1" },
        { left: "また|mata", right: "again, also, or", id: "4-2" },
        { left: "年間|nenkan", right: "period of year", id: "4-3" },
        { left: "青|ao", right: "blue, green", id: "4-4" }
      ],
      [
        { left: "赤|aka", right: "red color", id: "5-1" },
        { left: "信号|shingou", right: "signal, traffic light", id: "5-2" },
        { left: "円|en", right: "circle", id: "5-3" },
        { left: "非常に|hijouni", right: "very, extremely", id: "5-4" }
      ],
      [
        { left: "複雑|fukuzatsu", right: "complicated", id: "6-1" },
        { left: "平和|heiwa", right: "peace, harmony", id: "6-2" },
        { left: "回る|mawaru", right: "turn round", id: "6-3" },
        { left: "若者|wakamono", right: "young person", id: "6-4" }
      ],
      [
        { left: "雪|yuki", right: "snow, snowfall", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 32 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 32 Association créé:', data);
      toast.success("Exercice Bundle 32 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 32 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 32"
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
            onClick={insertBundle32Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 32 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle32Association;
