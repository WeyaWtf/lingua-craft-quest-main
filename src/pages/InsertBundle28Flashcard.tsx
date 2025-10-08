import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle28Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle28 = async () => {
    setIsInserting(true);

    const bundle28Cards = [
      { front: "group", back: "グループ|guru-pu", category: "vocabulary", id: "1" },
      { front: "one's house", back: "自宅|jitaku", category: "vocabulary", id: "2" },
      { front: "home, family", back: "家庭|katei", category: "vocabulary", id: "3" },
      { front: "term, period", back: "期間|kikan", category: "vocabulary", id: "4" },
      { front: "year, school year", back: "年度|nendo", category: "vocabulary", id: "5" },
      { front: "experience", back: "経験|keiken", category: "vocabulary", id: "6" },
      { front: "safety, security", back: "安全|anzen", category: "vocabulary", id: "7" },
      { front: "danger, dangerous", back: "危険|kiken", category: "vocabulary", id: "8" },
      { front: "attention, care", back: "注意|chuui", category: "vocabulary", id: "9" },
      { front: "success", back: "成功|seikou", category: "vocabulary", id: "10" },
      { front: "endeavor, effort", back: "努力|doryoku", category: "vocabulary", id: "11" },
      { front: "explanation", back: "説明|setsumei", category: "vocabulary", id: "12" },
      { front: "earthquake", back: "地震|jishin", category: "vocabulary", id: "13" },
      { front: "surgical operation", back: "手術|shujutsu", category: "vocabulary", id: "14" },
      { front: "burn", back: "火傷|yakedo", category: "vocabulary", id: "15" },
      { front: "task, assignment", back: "課題|kadai", category: "vocabulary", id: "16" },
      { front: "young child, kid", back: "子|ko", category: "vocabulary", id: "17" },
      { front: "confirmation", back: "確認|kakunin", category: "vocabulary", id: "18" },
      { front: "reality", back: "実際|jissai", category: "vocabulary", id: "19" },
      { front: "international", back: "国際|kokusai", category: "vocabulary", id: "20" },
      { front: "conference", back: "会議|kaigi", category: "vocabulary", id: "21" },
      { front: "proposition", back: "提案|teian", category: "vocabulary", id: "22" },
      { front: "office", back: "事務所|jimusho", category: "vocabulary", id: "23" },
      { front: "professor", back: "教授|kyouju", category: "vocabulary", id: "24" },
      { front: "century", back: "世紀|seiki", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 28 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle28Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 28 Flashcards créé:', data);
      toast.success("Exercice Bundle 28 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 28 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 28"
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
            onClick={insertBundle28}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 28 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle28Flashcard;
