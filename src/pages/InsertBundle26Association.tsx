import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle26Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle26Association = async () => {
    setIsInserting(true);

    // 25 mots organisés en 7 pages (6 pages de 4 + 1 page de 1)
    const pairGroups = [
      // Page 1 - 4 paires
      [
        { left: "生徒|seito", right: "pupil, student", id: "1-1" },
        { left: "高校|koukou", right: "high school", id: "1-2" },
        { left: "年上|toshiue", right: "older, senior", id: "1-3" },
        { left: "卒業|sotsugyou", right: "graduation", id: "1-4" }
      ],
      // Page 2 - 4 paires
      [
        { left: "運動|undou", right: "movement, exercise", id: "2-1" },
        { left: "選手|senshu", right: "athlete, player", id: "2-2" },
        { left: "映画|eiga", right: "movie", id: "2-3" },
        { left: "英語|eigo", right: "English", id: "2-4" }
      ],
      // Page 3 - 4 paires
      [
        { left: "手紙|tegami", right: "letter", id: "3-1" },
        { left: "動物|doubutsu", right: "animal", id: "3-2" },
        { left: "音|oto", right: "sound, noise", id: "3-3" },
        { left: "海外|kaigai", right: "overseas, abroad", id: "3-4" }
      ],
      // Page 4 - 4 paires
      [
        { left: "外国人|gaikokujin", right: "foreigner", id: "4-1" },
        { left: "帰国|kikoku", right: "return to country", id: "4-2" },
        { left: "彼ら|karera", right: "they", id: "4-3" },
        { left: "機械|kikai", right: "machine", id: "4-4" }
      ],
      // Page 5 - 4 paires
      [
        { left: "基本|kihon", right: "basics", id: "5-1" },
        { left: "今度|kondo", right: "this time", id: "5-2" },
        { left: "最後|saigo", right: "last", id: "5-3" },
        { left: "最初|saisho", right: "first, outset", id: "5-4" }
      ],
      // Page 6 - 4 paires
      [
        { left: "準備|junbi", right: "preparation", id: "6-1" },
        { left: "進む|susumu", right: "advance", id: "6-2" },
        { left: "直接|chokusetsu", right: "directly", id: "6-3" },
        { left: "特に|tokuni", right: "specially", id: "6-4" }
      ],
      // Page 7 - 1 paire (le mot restant)
      [
        { left: "届く|todoku", right: "reach, received", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 26 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 26 Association créé:', data);
      toast.success("Exercice Bundle 26 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 26 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 26"
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
            onClick={insertBundle26Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 26 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle26Association;
