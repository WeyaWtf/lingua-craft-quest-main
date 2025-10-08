import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle33Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle33 = async () => {
    setIsInserting(true);

    const bundle33Cards = [
      { front: "sweet, delicious", back: "うまい|umai", category: "vocabulary", id: "1" },
      { front: "recollect, recall", back: "思い出す|omoidasu", category: "vocabulary", id: "2" },
      { front: "hear, be heard", back: "聞こえる|kikoeru", category: "vocabulary", id: "3" },
      { front: "borrow", back: "借りる|kariru", category: "vocabulary", id: "4" },
      { front: "return, repay", back: "返す|kaesu", category: "vocabulary", id: "5" },
      { front: "receive, get", back: "受け取る|uketoru", category: "vocabulary", id: "6" },
      { front: "discard, abandon", back: "捨てる|suteru", category: "vocabulary", id: "7" },
      { front: "together, same", back: "一緒|issho", category: "vocabulary", id: "8" },
      { front: "play, amusement", back: "遊び|asobi", category: "vocabulary", id: "9" },
      { front: "move, transfer", back: "移す|utsusu", category: "vocabulary", id: "10" },
      { front: "size, dimension", back: "大きさ|ookisa", category: "vocabulary", id: "11" },
      { front: "thought, idea", back: "考え|kangae", category: "vocabulary", id: "12" },
      { front: "airport", back: "空港|kuukou", category: "vocabulary", id: "13" },
      { front: "departure", back: "出発|shuppatsu", category: "vocabulary", id: "14" },
      { front: "map, atlas", back: "地図|chizu", category: "vocabulary", id: "15" },
      { front: "drive", back: "運転|unten", category: "vocabulary", id: "16" },
      { front: "get off, land", back: "降りる|oriru", category: "vocabulary", id: "17" },
      { front: "gas", back: "ガス|gasu", category: "vocabulary", id: "18" },
      { front: "always", back: "必ず|kanarazu", category: "vocabulary", id: "19" },
      { front: "camera", back: "カメラ|kamera", category: "vocabulary", id: "20" },
      { front: "go to and from", back: "通う|kayou", category: "vocabulary", id: "21" },
      { front: "suddenly", back: "急に|kyuuni", category: "vocabulary", id: "22" },
      { front: "office worker", back: "サラリーマン|sarari-man", category: "vocabulary", id: "23" },
      { front: "salary, pay", back: "給料|kyuuryou", category: "vocabulary", id: "24" },
      { front: "piece of music", back: "曲|kyoku", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 33 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle33Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 33 Flashcards créé:', data);
      toast.success("Exercice Bundle 33 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 33 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 33"
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
            onClick={insertBundle33}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 33 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle33Flashcard;
