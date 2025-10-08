import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle29Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle29 = async () => {
    setIsInserting(true);

    const bundle29Cards = [
      { front: "all over", back: "あちこち|achikochi", category: "vocabulary", id: "1" },
      { front: "there (polite)", back: "そちら|sochira", category: "vocabulary", id: "2" },
      { front: "over there", back: "あちら|achira", category: "vocabulary", id: "3" },
      { front: "if, in case of", back: "もし|moshi", category: "vocabulary", id: "4" },
      { front: "noisy, annoying", back: "うるさい|urusai", category: "vocabulary", id: "5" },
      { front: "stiff, tight", back: "固い|katai", category: "vocabulary", id: "6" },
      { front: "deep, profound", back: "深い|fukai", category: "vocabulary", id: "7" },
      { front: "interesting", back: "面白い|omoshiroi", category: "vocabulary", id: "8" },
      { front: "entirely, truly", back: "全く|mattaku", category: "vocabulary", id: "9" },
      { front: "half", back: "半分|hanbun", category: "vocabulary", id: "10" },
      { front: "normal, regular", back: "普通|futsuu", category: "vocabulary", id: "11" },
      { front: "amount, share", back: "分|bun", category: "vocabulary", id: "12" },
      { front: "culture", back: "文化|bunka", category: "vocabulary", id: "13" },
      { front: "every day", back: "毎日|mainichi", category: "vocabulary", id: "14" },
      { front: "be careful", back: "気を付ける|kiwotsukeru", category: "vocabulary", id: "15" },
      { front: "protect, observe", back: "守る|mamoru", category: "vocabulary", id: "16" },
      { front: "of course", back: "もちろん|mochiron", category: "vocabulary", id: "17" },
      { front: "as expected", back: "やはり|yahari", category: "vocabulary", id: "18" },
      { front: "how much (money)", back: "いくら|ikura", category: "vocabulary", id: "19" },
      { front: "one's regards", back: "よろしく|yoroshiku", category: "vocabulary", id: "20" },
      { front: "who (polite)", back: "どなた|donata", category: "vocabulary", id: "21" },
      { front: "permit, forgive", back: "許す|yurusu", category: "vocabulary", id: "22" },
      { front: "divide, share", back: "分ける|wakeru", category: "vocabulary", id: "23" },
      { front: "nature", back: "自然|shizen", category: "vocabulary", id: "24" },
      { front: "apartment, flat", back: "アパート|apa-to", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 29 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle29Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 29 Flashcards créé:', data);
      toast.success("Exercice Bundle 29 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 29 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 29"
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
            onClick={insertBundle29}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 29 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle29Flashcard;
