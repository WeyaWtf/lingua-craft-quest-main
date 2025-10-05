import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle5Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle5 = async () => {
    setIsInserting(true);

    const bundle5Cards = [
      { front: "beautiful", back: "美しい|utsukushii", category: "vocabulary", id: "1" },
      { front: "always", back: "いつも|itsumo", category: "vocabulary", id: "2" },
      { front: "leg, foot", back: "足|ashi", category: "vocabulary", id: "3" },
      { front: "wake (someone) up", back: "起こす|okosu", category: "vocabulary", id: "4" },
      { front: "show", back: "見せる|miseru", category: "vocabulary", id: "5" },
      { front: "daughter, girl", back: "娘|musume", category: "vocabulary", id: "6" },
      { front: "enjoy", back: "楽しむ|tanoshimu", category: "vocabulary", id: "7" },
      { front: "color", back: "色|iro", category: "vocabulary", id: "8" },
      { front: "everybody", back: "みんな|minna", category: "vocabulary", id: "9" },
      { front: "take, get", back: "取る|toru", category: "vocabulary", id: "10" },
      { front: "study", back: "勉強|benkyou", category: "vocabulary", id: "11" },
      { front: "can do, be good at", back: "できる|dekiru", category: "vocabulary", id: "12" },
      { front: "short, brief", back: "短い|mijikai", category: "vocabulary", id: "13" },
      { front: "fall, come down", back: "落ちる|ochiru", category: "vocabulary", id: "14" },
      { front: "son", back: "息子|musuko", category: "vocabulary", id: "15" },
      { front: "white, blank", back: "白い|shiroi", category: "vocabulary", id: "16" },
      { front: "airplane", back: "飛行機|hikouki", category: "vocabulary", id: "17" },
      { front: "illness", back: "病気|byouki", category: "vocabulary", id: "18" },
      { front: "winter", back: "冬|fuyu", category: "vocabulary", id: "19" },
      { front: "year, age", back: "年|toshi", category: "vocabulary", id: "20" },
      { front: "heavy", back: "重い|omoi", category: "vocabulary", id: "21" },
      { front: "chest, breast", back: "胸|mune", category: "vocabulary", id: "22" },
      { front: "pay", back: "払う|harau", category: "vocabulary", id: "23" },
      { front: "light (weight)", back: "軽い|karui", category: "vocabulary", id: "24" },
      { front: "find", back: "見つける|mitsukeru", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 5 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle5Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 5 Flashcards créé:', data);
      toast.success("Exercice Bundle 5 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 5 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 5"
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
            onClick={insertBundle5}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 5 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle5Flashcard;
