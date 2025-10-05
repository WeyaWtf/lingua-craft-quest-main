import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle3Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle3 = async () => {
    setIsInserting(true);

    const bundle3Cards = [
      { front: "start (something)", back: "始める|hajimeru", category: "vocabulary", id: "1" },
      { front: "get up, wake up", back: "起きる|okiru", category: "vocabulary", id: "2" },
      { front: "spring", back: "春|haru", category: "vocabulary", id: "3" },
      { front: "morning, a.m.", back: "午前|gozen", category: "vocabulary", id: "4" },
      { front: "another, different", back: "別|betsu", category: "vocabulary", id: "5" },
      { front: "where", back: "どこ|doko", category: "vocabulary", id: "6" },
      { front: "room", back: "部屋|heya", category: "vocabulary", id: "7" },
      { front: "young", back: "若い|wakai", category: "vocabulary", id: "8" },
      { front: "car, automobile", back: "車|kuruma", category: "vocabulary", id: "9" },
      { front: "put, place", back: "置く|oku", category: "vocabulary", id: "10" },
      { front: "live, reside", back: "住む|sumu", category: "vocabulary", id: "11" },
      { front: "work", back: "働く|hataraku", category: "vocabulary", id: "12" },
      { front: "difficult", back: "難しい|muzukashii", category: "vocabulary", id: "13" },
      { front: "teacher", back: "先生|sensei", category: "vocabulary", id: "14" },
      { front: "stand, rise", back: "立つ|tatsu", category: "vocabulary", id: "15" },
      { front: "call, name", back: "呼ぶ|yobu", category: "vocabulary", id: "16" },
      { front: "university, college", back: "大学|daigaku", category: "vocabulary", id: "17" },
      { front: "cheap, inexpensive", back: "安い|yasui", category: "vocabulary", id: "18" },
      { front: "more", back: "もっと|motto", category: "vocabulary", id: "19" },
      { front: "go back home", back: "帰る|kaeru", category: "vocabulary", id: "20" },
      { front: "understand", back: "分かる|wakaru", category: "vocabulary", id: "21" },
      { front: "wide, big", back: "広い|hiroi", category: "vocabulary", id: "22" },
      { front: "number", back: "数|suu", category: "vocabulary", id: "23" },
      { front: "near, close", back: "近い|chikai", category: "vocabulary", id: "24" },
      { front: "there", back: "そこ|soko", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 3 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: {
        cards: bundle3Cards,
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

      console.log('✅ Exercice JAP LIST 1000 - Bundle 3 Flashcards créé:', data);
      toast.success("Exercice Bundle 3 Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Insérer JAP LIST 1000 - Bundle 3 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour insérer l'exercice de vocabulaire japonais "Bundle 3"
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
            onClick={insertBundle3}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 3 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle3Flashcard;
