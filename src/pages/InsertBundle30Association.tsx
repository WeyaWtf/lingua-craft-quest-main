import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle30Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle30Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "ホテル|hoteru", right: "hotel", id: "1-1" },
        { left: "パソコン|pasokon", right: "personal computer", id: "1-2" },
        { left: "うまい|umai", right: "good at", id: "1-3" },
        { left: "明るい|akarui", right: "bright, cheerful", id: "1-4" }
      ],
      [
        { left: "急ぐ|isogu", right: "hurry", id: "2-1" },
        { left: "歌|uta", right: "song", id: "2-2" },
        { left: "中学校|chuugakkou", right: "junior high school", id: "2-3" },
        { left: "テスト|tesuto", right: "test", id: "2-4" }
      ],
      [
        { left: "ポスト|posuto", right: "postbox, mailbox", id: "3-1" },
        { left: "ハンカチ|hankachi", right: "handkerchief", id: "3-2" },
        { left: "髪|kami", right: "hair, hairstyle", id: "3-3" },
        { left: "帽子|boushi", right: "hat, cap", id: "3-4" }
      ],
      [
        { left: "被る|kaburu", right: "wear, put on (head)", id: "4-1" },
        { left: "ブラウス|burausu", right: "blouse", id: "4-2" },
        { left: "週末|shuumatsu", right: "weekend", id: "4-3" },
        { left: "先週|senshuu", right: "last week", id: "4-4" }
      ],
      [
        { left: "再来週|saraishuu", right: "week after next", id: "5-1" },
        { left: "いつか|itsuka", right: "some time", id: "5-2" },
        { left: "宿題|shukudai", right: "homework", id: "5-3" },
        { left: "鍵|kagi", right: "key, lock", id: "5-4" }
      ],
      [
        { left: "傘|kasa", right: "umbrella, parasol", id: "6-1" },
        { left: "乗り換える|norikaeru", right: "change, transfer", id: "6-2" },
        { left: "向かう|mukau", right: "face, head toward", id: "6-3" },
        { left: "本屋|honya", right: "bookstore", id: "6-4" }
      ],
      [
        { left: "お茶|ocha", right: "tea", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 30 Association",
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 30 Association créé:', data);
      toast.success("Exercice Bundle 30 Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 30 Association</h1>
          <p className="text-muted-foreground mb-6">
            Créer l'exercice d'association pour le vocabulaire japonais "Bundle 30"
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
            onClick={insertBundle30Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 30 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle30Association;
