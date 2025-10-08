import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle21Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle21Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "氏名|shimei", right: "full name", id: "1-1" },
        { left: "今夜|konya", right: "tonight", id: "1-2" },
        { left: "夜中|yonaka", right: "midnight", id: "1-3" },
        { left: "来週|raishuu", right: "next week", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "誰か|dareka", right: "someone", id: "2-1" },
        { left: "何|nan", right: "what", id: "2-2" },
        { left: "今朝|kesa", right: "this morning", id: "2-3" },
        { left: "寿司|sushi", right: "sushi", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "履く|haku", right: "put on (shoes)", id: "3-1" },
        { left: "おじさん|ojisan", right: "uncle", id: "3-2" },
        { left: "おばさん|obasan", right: "aunt", id: "3-3" },
        { left: "お祖母さん|obaasan", right: "grandmother", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "いとこ|itoko", right: "cousin", id: "4-1" },
        { left: "辞書|jisho", right: "dictionary", id: "4-2" },
        { left: "朝ご飯|asagohan", right: "breakfast", id: "4-3" },
        { left: "白|shiro", right: "white", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "どっち|docchi", right: "which (casual)", id: "5-1" },
        { left: "そっち|socchi", right: "there (casual)", id: "5-2" },
        { left: "明日|ashita", right: "tomorrow", id: "5-3" },
        { left: "明後日|myougonichi", right: "day after tomorrow", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "一昨日|ototoi", right: "day before yesterday", id: "6-1" },
        { left: "庭|niwa", right: "garden, yard", id: "6-2" },
        { left: "左側|hidarigawa", right: "left side", id: "6-3" },
        { left: "右側|migigawa", right: "right side", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "指|yubi", right: "finger, toe", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 21 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 21 Association créé:', data);
      toast.success("Exercice Bundle 21 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 21 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 21"
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
            onClick={insertBundle21Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 21 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle21Association;
