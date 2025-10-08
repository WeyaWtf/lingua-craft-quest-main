import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle15Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle15Association = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
        { left: "弟|otouto", right: "younger brother", id: "1-1" },
        { left: "手|te", right: "hand", id: "1-2" },
        { left: "十日|tooka", right: "ten days, tenth", id: "1-3" },
        { left: "口|kuchi", right: "mouth", id: "1-4" }
      ],
      [
        { left: "夏|natsu", right: "summer", id: "2-1" },
        { left: "七つ|nanatsu", right: "seven (things)", id: "2-2" },
        { left: "時々|tokidoki", right: "sometimes", id: "2-3" },
        { left: "何|nani", right: "what", id: "2-4" }
      ],
      [
        { left: "人|hito", right: "person", id: "3-1" },
        { left: "一人|hitori", right: "one person", id: "3-2" },
        { left: "一日|tsuitachi", right: "first (of month)", id: "3-3" },
        { left: "九日|kokonoka", right: "nine days, ninth", id: "3-4" }
      ],
      [
        { left: "方|hou", right: "direction, side", id: "4-1" },
        { left: "他|hoka", right: "other", id: "4-2" },
        { left: "僕|boku", right: "I, me (male)", id: "4-3" },
        { left: "欲しい|hoshii", right: "want, desire", id: "4-4" }
      ],
      [
        { left: "万|man", right: "ten thousand", id: "5-1" },
        { left: "見える|mieru", right: "be visible", id: "5-2" },
        { left: "道|michi", right: "street, way", id: "5-3" },
        { left: "五つ|itsutsu", right: "five (things)", id: "5-4" }
      ],
      [
        { left: "目|me", right: "eye", id: "6-1" },
        { left: "八つ|yattsu", right: "eight (things)", id: "6-2" },
        { left: "止める|tomeru", right: "stop", id: "6-3" },
        { left: "四日|yokka", right: "four days", id: "6-4" }
      ],
      [
        { left: "夜|yoru", right: "night", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "JAP LIST 1000 - Bundle 15 Association",
      description: "Match Japanese vocabulary with English translations (N5 level)",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT", "association"],
      content: { pairGroups: pairGroups, shufflePairs: true },
      author_id: "demo",
      is_published: true
    };

    try {
      const { data, error } = await supabase.from('exercises').insert([exerciseData]).select().single();
      if (error) { console.error('Erreur:', error); toast.error("Erreur lors de la création"); setIsInserting(false); return; }
      console.log('✅ Bundle 15 Association créé:', data);
      toast.success("Bundle 15 Association créé avec succès !");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) { console.error('Erreur:', err); toast.error("Erreur"); setIsInserting(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle"><Navigation /><div className="container mx-auto px-4 py-16 max-w-2xl"><div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center"><h1 className="text-3xl font-bold mb-4">🇯🇵 JAP LIST 1000 - Bundle 15 Association</h1><Button size="lg" onClick={insertBundle15Association} disabled={isInserting} className="min-w-[200px]">{isInserting ? "Insertion..." : "Créer Bundle 15 Association"}</Button></div></div></div>
  );
};

export default InsertBundle15Association;
