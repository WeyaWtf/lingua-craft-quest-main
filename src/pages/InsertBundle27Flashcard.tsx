import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle27Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle27 = async () => {
    setIsInserting(true);

    const bundle27Cards = [
      { front: "why", back: "なぜ|naze", category: "vocabulary", id: "1" },
      { front: "line up", back: "並ぶ|narabu", category: "vocabulary", id: "2" },
      { front: "carry, transport", back: "運ぶ|hakobu", category: "vocabulary", id: "3" },
      { front: "repair, fix", back: "直す|naosu", category: "vocabulary", id: "4" },
      { front: "oppose, object", back: "反対|hantai", category: "vocabulary", id: "5" },
      { front: "situation, case", back: "場合|baai", category: "vocabulary", id: "6" },
      { front: "detailed", back: "詳しい|kuwashii", category: "vocabulary", id: "7" },
      { front: "mischief, prank", back: "いたずら|itazura", category: "vocabulary", id: "8" },
      { front: "celebrate", back: "お祝い|oiwai", category: "vocabulary", id: "9" },
      { front: "comb", back: "くし|kushi", category: "vocabulary", id: "10" },
      { front: "spill, overflow", back: "こぼれる|koboreru", category: "vocabulary", id: "11" },
      { front: "convey, transmit", back: "伝える|tsutaeru", category: "vocabulary", id: "12" },
      { front: "knee", back: "膝|hiza", category: "vocabulary", id: "13" },
      { front: "elbow", back: "肘|hiji", category: "vocabulary", id: "14" },
      { front: "pillow", back: "枕|makura", category: "vocabulary", id: "15" },
      { front: "building", back: "建物|tatemono", category: "vocabulary", id: "16" },
      { front: "road", back: "道路|douro", category: "vocabulary", id: "17" },
      { front: "intersection", back: "四つ角|yotsukado", category: "vocabulary", id: "18" },
      { front: "corner", back: "曲がり角|magarikado", category: "vocabulary", id: "19" },
      { front: "police", back: "警察|keisatsu", category: "vocabulary", id: "20" },
      { front: "air, atmosphere", back: "空気|kuuki", category: "vocabulary", id: "21" },
      { front: "sport", back: "スポーツ|supo-tsu", category: "vocabulary", id: "22" },
      { front: "chance", back: "チャンス|chansu", category: "vocabulary", id: "23" },
      { front: "dry cleaning", back: "クリーニング|kuri-ningu", category: "vocabulary", id: "24" },
      { front: "service", back: "サービス|sa-bisu", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 27 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle27Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 27 Flashcards créé:', data);
      toast.success("Exercice Bundle 27 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 27 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 27"
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
            onClick={insertBundle27}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 27 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle27Flashcard;
