import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle13Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle13Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "易しい|yasashii", right: "easy, simple", id: "1-1" },
        { left: "お兄さん|oniisan", right: "older brother", id: "1-2" },
        { left: "大きい|ooki", right: "big", id: "1-3" },
        { left: "小さい|chiisai", right: "small", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "辛い|karai", right: "spicy, hot", id: "2-1" },
        { left: "八|hachi", right: "eight", id: "2-2" },
        { left: "あそこ|asoko", right: "over there", id: "2-3" },
        { left: "来る|kuru", right: "come", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "前|mae", right: "front, before", id: "3-1" },
        { left: "五日|itsuka", right: "five days, fifth", id: "3-2" },
        { left: "いっぱい|ippai", right: "full", id: "3-3" },
        { left: "九|kyu", right: "nine", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "酸っぱい|suppai", right: "sour", id: "4-1" },
        { left: "違う|chigau", right: "differ, be wrong", id: "4-2" },
        { left: "細い|hosoi", right: "thin, slender", id: "4-3" },
        { left: "三つ|mittsu", right: "three (things)", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "八日|youka", right: "eight days", id: "5-1" },
        { left: "高校生|koukousei", right: "high school student", id: "5-2" },
        { left: "上手|jouzu", right: "good, skilled", id: "5-3" },
        { left: "強い|tsuyoi", right: "strong", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "七|nana", right: "seven", id: "6-1" },
        { left: "二十日|hatsuka", right: "20 days, 20th", id: "6-2" },
        { left: "左|hidari", right: "left", id: "6-3" },
        { left: "二日|futsuka", right: "two days, second", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "四つ|yottsu", right: "four (things)", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 13 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 13 Association créé:', data);
      toast.success("Exercice Bundle 13 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 13 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 13"
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
            onClick={insertBundle13Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 13 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle13Association;
