import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle2Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle2Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "聞く|kiku", right: "hear, ask", id: "1-1" },
        { left: "言う|iu", right: "say, tell", id: "1-2" },
        { left: "少ない|sukunai", right: "few, little", id: "1-3" },
        { left: "高い|takai", right: "high, tall", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "子供|kodomo", right: "child", id: "2-1" },
        { left: "そう|sou", right: "so, that way", id: "2-2" },
        { left: "もう|mou", right: "already, yet", id: "2-3" },
        { left: "学生|gakusei", right: "student", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "熱い|atsui", right: "hot (to touch)", id: "3-1" },
        { left: "どうぞ|douzo", right: "please", id: "3-2" },
        { left: "午後|gogo", right: "afternoon, p.m.", id: "3-3" },
        { left: "長い|nagai", right: "long", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "本|hon", right: "book, volume", id: "4-1" },
        { left: "今年|kotoshi", right: "this year", id: "4-2" },
        { left: "よく|yoku", right: "often, well", id: "4-3" },
        { left: "彼女|kanojo", right: "she, girlfriend", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "どう|dou", right: "how, what", id: "5-1" },
        { left: "言葉|kotoba", right: "word, language", id: "5-2" },
        { left: "顔|kao", right: "face", id: "5-3" },
        { left: "終わる|owaru", right: "finish, end", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "一つ|hitotsu", right: "one (thing)", id: "6-1" },
        { left: "あげる|ageru", right: "give, offer", id: "6-2" },
        { left: "こう|kou", right: "like this, such", id: "6-3" },
        { left: "学校|gakkou", right: "school", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "くれる|kureru", right: "be given", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "Bundle 2 - Association",
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

      console.log('✅ Exercice Bundle 2 Association créé:', data);
      toast.success("Exercice Bundle 2 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer Bundle 2 - Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 2"
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
            onClick={insertBundle2Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 2 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle2Association;
