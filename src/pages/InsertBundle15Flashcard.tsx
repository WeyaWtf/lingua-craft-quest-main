import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle15Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle15 = async () => {
    setIsInserting(true);
    const bundle15Cards = [
      { front: "younger brother", back: "弟|otouto", category: "vocabulary", id: "1" },
      { front: "hand", back: "手|te", category: "vocabulary", id: "2" },
      { front: "ten days, tenth", back: "十日|tooka", category: "vocabulary", id: "3" },
      { front: "mouth", back: "口|kuchi", category: "vocabulary", id: "4" },
      { front: "summer", back: "夏|natsu", category: "vocabulary", id: "5" },
      { front: "seven (things)", back: "七つ|nanatsu", category: "vocabulary", id: "6" },
      { front: "sometimes", back: "時々|tokidoki", category: "vocabulary", id: "7" },
      { front: "what", back: "何|nani", category: "vocabulary", id: "8" },
      { front: "person", back: "人|hito", category: "vocabulary", id: "9" },
      { front: "one person", back: "一人|hitori", category: "vocabulary", id: "10" },
      { front: "first (of month)", back: "一日|tsuitachi", category: "vocabulary", id: "11" },
      { front: "nine days, ninth", back: "九日|kokonoka", category: "vocabulary", id: "12" },
      { front: "direction, side", back: "方|hou", category: "vocabulary", id: "13" },
      { front: "other", back: "他|hoka", category: "vocabulary", id: "14" },
      { front: "I, me (male)", back: "僕|boku", category: "vocabulary", id: "15" },
      { front: "want, desire", back: "欲しい|hoshii", category: "vocabulary", id: "16" },
      { front: "ten thousand", back: "万|man", category: "vocabulary", id: "17" },
      { front: "be visible", back: "見える|mieru", category: "vocabulary", id: "18" },
      { front: "street, way", back: "道|michi", category: "vocabulary", id: "19" },
      { front: "five (things)", back: "五つ|itsutsu", category: "vocabulary", id: "20" },
      { front: "eye", back: "目|me", category: "vocabulary", id: "21" },
      { front: "eight (things)", back: "八つ|yattsu", category: "vocabulary", id: "22" },
      { front: "stop", back: "止める|tomeru", category: "vocabulary", id: "23" },
      { front: "four days", back: "四日|yokka", category: "vocabulary", id: "24" },
      { front: "night", back: "夜|yoru", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "JAP LIST 1000 - Bundle 15 Flashcards",
      description: "Japanese vocabulary - Basic words for beginners (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT"],
      content: { cards: bundle15Cards, shuffleSides: true },
      author_id: "demo",
      is_published: true
    };

    try {
      const { data, error } = await supabase.from('exercises').insert([exerciseData]).select().single();
      if (error) { console.error('Erreur:', error); toast.error("Erreur"); setIsInserting(false); return; }
      console.log('✅ Bundle 15 Flashcards créé:', data);
      toast.success("Bundle 15 Flashcards créé !");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) { console.error('Erreur:', err); toast.error("Erreur"); setIsInserting(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle"><Navigation /><div className="container mx-auto px-4 py-16 max-w-2xl"><div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center"><h1 className="text-3xl font-bold mb-4">🇯🇵 JAP LIST 1000 - Bundle 15 Flashcards</h1><Button size="lg" onClick={insertBundle15} disabled={isInserting} className="min-w-[200px]">{isInserting ? "Insertion..." : "Créer Bundle 15 Flashcards"}</Button></div></div></div>
  );
};

export default InsertBundle15Flashcard;
