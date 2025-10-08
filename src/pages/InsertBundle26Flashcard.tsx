import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle26Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle26 = async () => {
    setIsInserting(true);

    const bundle26Cards = [
      { front: "pupil, student", back: "生徒|seito", category: "vocabulary", id: "1" },
      { front: "high school", back: "高校|koukou", category: "vocabulary", id: "2" },
      { front: "older, senior", back: "年上|toshiue", category: "vocabulary", id: "3" },
      { front: "graduation", back: "卒業|sotsugyou", category: "vocabulary", id: "4" },
      { front: "movement, exercise", back: "運動|undou", category: "vocabulary", id: "5" },
      { front: "athlete, player", back: "選手|senshu", category: "vocabulary", id: "6" },
      { front: "movie", back: "映画|eiga", category: "vocabulary", id: "7" },
      { front: "English", back: "英語|eigo", category: "vocabulary", id: "8" },
      { front: "letter", back: "手紙|tegami", category: "vocabulary", id: "9" },
      { front: "animal", back: "動物|doubutsu", category: "vocabulary", id: "10" },
      { front: "sound, noise", back: "音|oto", category: "vocabulary", id: "11" },
      { front: "overseas, abroad", back: "海外|kaigai", category: "vocabulary", id: "12" },
      { front: "foreigner", back: "外国人|gaikokujin", category: "vocabulary", id: "13" },
      { front: "return to country", back: "帰国|kikoku", category: "vocabulary", id: "14" },
      { front: "they", back: "彼ら|karera", category: "vocabulary", id: "15" },
      { front: "machine", back: "機械|kikai", category: "vocabulary", id: "16" },
      { front: "basics", back: "基本|kihon", category: "vocabulary", id: "17" },
      { front: "this time", back: "今度|kondo", category: "vocabulary", id: "18" },
      { front: "last", back: "最後|saigo", category: "vocabulary", id: "19" },
      { front: "first, outset", back: "最初|saisho", category: "vocabulary", id: "20" },
      { front: "preparation", back: "準備|junbi", category: "vocabulary", id: "21" },
      { front: "advance", back: "進む|susumu", category: "vocabulary", id: "22" },
      { front: "directly", back: "直接|chokusetsu", category: "vocabulary", id: "23" },
      { front: "specially", back: "特に|tokuni", category: "vocabulary", id: "24" },
      { front: "reach, received", back: "届く|todoku", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 26 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle26Cards,
        shuffleSides: true
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 26 Flashcards créé:', data);
      toast.success("Exercice Bundle 26 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 26 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 26"
            avec 25 mots de base (niveau N5).
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Flashcards</li>
              <li>• Nombre de cartes : 25</li>
              <li>• Langue : Japonais 🇯🇵</li>
              <li>• Niveau : Débutant (N5)</li>
              <li>• Mélange recto/verso : Activé</li>
              <li>• Format : Anglais → Japonais (kanji + romanji)</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBundle26}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 26 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle26Flashcard;
