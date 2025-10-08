import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle30Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle30 = async () => {
    setIsInserting(true);

    const bundle30Cards = [
      { front: "hotel", back: "ホテル|hoteru", category: "vocabulary", id: "1" },
      { front: "personal computer", back: "パソコン|pasokon", category: "vocabulary", id: "2" },
      { front: "good at", back: "うまい|umai", category: "vocabulary", id: "3" },
      { front: "bright, cheerful", back: "明るい|akarui", category: "vocabulary", id: "4" },
      { front: "hurry", back: "急ぐ|isogu", category: "vocabulary", id: "5" },
      { front: "song", back: "歌|uta", category: "vocabulary", id: "6" },
      { front: "junior high school", back: "中学校|chuugakkou", category: "vocabulary", id: "7" },
      { front: "test", back: "テスト|tesuto", category: "vocabulary", id: "8" },
      { front: "postbox, mailbox", back: "ポスト|posuto", category: "vocabulary", id: "9" },
      { front: "handkerchief", back: "ハンカチ|hankachi", category: "vocabulary", id: "10" },
      { front: "hair, hairstyle", back: "髪|kami", category: "vocabulary", id: "11" },
      { front: "hat, cap", back: "帽子|boushi", category: "vocabulary", id: "12" },
      { front: "wear, put on (head)", back: "被る|kaburu", category: "vocabulary", id: "13" },
      { front: "blouse", back: "ブラウス|burausu", category: "vocabulary", id: "14" },
      { front: "weekend", back: "週末|shuumatsu", category: "vocabulary", id: "15" },
      { front: "last week", back: "先週|senshuu", category: "vocabulary", id: "16" },
      { front: "week after next", back: "再来週|saraishuu", category: "vocabulary", id: "17" },
      { front: "some time", back: "いつか|itsuka", category: "vocabulary", id: "18" },
      { front: "homework", back: "宿題|shukudai", category: "vocabulary", id: "19" },
      { front: "key, lock", back: "鍵|kagi", category: "vocabulary", id: "20" },
      { front: "umbrella, parasol", back: "傘|kasa", category: "vocabulary", id: "21" },
      { front: "change, transfer", back: "乗り換える|norikaeru", category: "vocabulary", id: "22" },
      { front: "face, head toward", back: "向かう|mukau", category: "vocabulary", id: "23" },
      { front: "bookstore", back: "本屋|honya", category: "vocabulary", id: "24" },
      { front: "tea", back: "お茶|ocha", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 30 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle30Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 30 Flashcards créé:', data);
      toast.success("Exercice Bundle 30 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 30 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 30"
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
            onClick={insertBundle30}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 30 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle30Flashcard;
