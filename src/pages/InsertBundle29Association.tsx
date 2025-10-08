import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle29Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle29Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "あちこち|achikochi", right: "all over", id: "1-1" },
        { left: "そちら|sochira", right: "there (polite)", id: "1-2" },
        { left: "あちら|achira", right: "over there", id: "1-3" },
        { left: "もし|moshi", right: "if, in case of", id: "1-4" }
      ],
      [
        { left: "うるさい|urusai", right: "noisy, annoying", id: "2-1" },
        { left: "固い|katai", right: "stiff, tight", id: "2-2" },
        { left: "深い|fukai", right: "deep, profound", id: "2-3" },
        { left: "面白い|omoshiroi", right: "interesting", id: "2-4" }
      ],
      [
        { left: "全く|mattaku", right: "entirely, truly", id: "3-1" },
        { left: "半分|hanbun", right: "half", id: "3-2" },
        { left: "普通|futsuu", right: "normal, regular", id: "3-3" },
        { left: "分|bun", right: "amount, share", id: "3-4" }
      ],
      [
        { left: "文化|bunka", right: "culture", id: "4-1" },
        { left: "毎日|mainichi", right: "every day", id: "4-2" },
        { left: "気を付ける|kiwotsukeru", right: "be careful", id: "4-3" },
        { left: "守る|mamoru", right: "protect, observe", id: "4-4" }
      ],
      [
        { left: "もちろん|mochiron", right: "of course", id: "5-1" },
        { left: "やはり|yahari", right: "as expected", id: "5-2" },
        { left: "いくら|ikura", right: "how much (money)", id: "5-3" },
        { left: "よろしく|yoroshiku", right: "one's regards", id: "5-4" }
      ],
      [
        { left: "どなた|donata", right: "who (polite)", id: "6-1" },
        { left: "許す|yurusu", right: "permit, forgive", id: "6-2" },
        { left: "分ける|wakeru", right: "divide, share", id: "6-3" },
        { left: "自然|shizen", right: "nature", id: "6-4" }
      ],
      [
        { left: "アパート|apa-to", right: "apartment, flat", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 29 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 29 Association créé:', data);
      toast.success("Exercice Bundle 29 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 29 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 29"
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
            onClick={insertBundle29Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 29 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle29Association;
