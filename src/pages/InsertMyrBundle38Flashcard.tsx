import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle38Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle38 = async () => {
    setIsInserting(true);

    const bundle38Cards = [
      { front: "right side", back: "ညာဘက်|nya-beq", category: "vocabulary", id: "1" },
      { front: "center", back: "အလယ်ဗဟို|a-leh-ba-ho", category: "vocabulary", id: "2" },
      { front: "corner", back: "ထောင့်|htaung", category: "vocabulary", id: "3" },
      { front: "edge", back: "အစွန်း|a-sun", category: "vocabulary", id: "4" },
      { front: "tip", back: "အဖျား|a-phya", category: "vocabulary", id: "5" },
      { front: "base", back: "အောက်ခြေ|auq-chay", category: "vocabulary", id: "6" },
      { front: "part", back: "အစိတ်အပိုင်း|a-seiq-a-pain", category: "vocabulary", id: "7" },
      { front: "piece", back: "တစ်ခု|tiq-khu", category: "vocabulary", id: "8" },
      { front: "lump", back: "တစ်ခဲ|tiq-kheh", category: "vocabulary", id: "9" },
      { front: "grain", back: "တစ်လုံး|tiq-loun", category: "vocabulary", id: "10" },
      { front: "drop", back: "တစ်စက်|tiq-seq", category: "vocabulary", id: "11" },
      { front: "line", back: "မျဉ်း|myin", category: "vocabulary", id: "12" },
      { front: "sheet", back: "တစ်ချပ်|tiq-chaq", category: "vocabulary", id: "13" },
      { front: "piece (cloth)", back: "တစ်ကွင်း|tiq-kwin", category: "vocabulary", id: "14" },
      { front: "ball, round object", back: "လုံး|loun", category: "vocabulary", id: "15" },
      { front: "fruit", back: "အသီး|a-thi", category: "vocabulary", id: "16" },
      { front: "peel, shell", back: "အခွံ|a-khwan", category: "vocabulary", id: "17" },
      { front: "seed", back: "အစေ့|a-seh", category: "vocabulary", id: "18" },
      { front: "root", back: "အမြစ်|a-myiq", category: "vocabulary", id: "19" },
      { front: "trunk", back: "ပင်စည်|pin-si", category: "vocabulary", id: "20" },
      { front: "branch", back: "အကိုင်း|a-kain", category: "vocabulary", id: "21" },
      { front: "bloom", back: "ပွင့်|pwin", category: "vocabulary", id: "22" },
      { front: "petal", back: "ပြားလွှာ|pya-hlwa", category: "vocabulary", id: "23" },
      { front: "leaf", back: "အရွက်|a-yweq", category: "vocabulary", id: "24" },
      { front: "thorn", back: "ဆူး|hsu", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 38 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle38Cards,
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
        console.error('Error inserting:', error);
        toast.error("Error creating exercise");
        setIsInserting(false);
        return;
      }

      console.log('✅ Exercise MYR LIST 1000 - Bundle 38 Flashcards created:', data);
      toast.success("Exercise Bundle 38 Flashcards created successfully!");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) {
      console.error('Error:', err);
      toast.error("Error creating exercise");
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 38 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 38"
            with 25 basic words.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Exercise details:</h3>
            <ul className="text-sm space-y-1">
              <li>• Type: Flashcards</li>
              <li>• Number of cards: 25</li>
              <li>• Language: Burmese</li>
              <li>• Level: Beginner</li>
              <li>• Shuffle front/back: Enabled</li>
              <li>• Format: English → Burmese (script + romanization)</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBundle38}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 38 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle38Flashcard;
