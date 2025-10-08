import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle21Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle21 = async () => {
    setIsInserting(true);

    const bundle21Cards = [
      { front: "hope", back: "မျှော်လင့်|hshaw-lin", category: "vocabulary", id: "1" },
      { front: "wish, desire", back: "ဆန္ဒ|san-da", category: "vocabulary", id: "2" },
      { front: "need", back: "လိုအပ်|lo-aq", category: "vocabulary", id: "3" },
      { front: "necessity", back: "လိုအပ်ချက်|lo-aq-cheq", category: "vocabulary", id: "4" },
      { front: "important", back: "အရေးကြီး|a-ye-kyi", category: "vocabulary", id: "5" },
      { front: "special", back: "အထူး|a-htu", category: "vocabulary", id: "6" },
      { front: "ordinary", back: "သာမန်|tha-man", category: "vocabulary", id: "7" },
      { front: "strange", back: "ထူးဆန်း|htu-zan", category: "vocabulary", id: "8" },
      { front: "interesting", back: "စိတ်ဝင်စား|seiq-win-za", category: "vocabulary", id: "9" },
      { front: "boring", back: "ငြီးငွေ့စရာ|nyi-ngway-sa-ya", category: "vocabulary", id: "10" },
      { front: "scary", back: "ကြောက်စရာ|kyauq-sa-ya", category: "vocabulary", id: "11" },
      { front: "cute, lovable", back: "ချစ်စရာ|chiq-sa-ya", category: "vocabulary", id: "12" },
      { front: "ugly, disgusting", back: "ရွံရှာ|yun-sha", category: "vocabulary", id: "13" },
      { front: "pity", back: "သနား|tha-na", category: "vocabulary", id: "14" },
      { front: "embarrassed", back: "ရှက်|sheq", category: "vocabulary", id: "15" },
      { front: "proud", back: "ဂုဏ်|goun", category: "vocabulary", id: "16" },
      { front: "disappointed", back: "စိတ်ပျက်|seiq-pyeq", category: "vocabulary", id: "17" },
      { front: "surprised", back: "အံ့အားသင့်|an-a-thin", category: "vocabulary", id: "18" },
      { front: "misunderstand", back: "နားမလည်|na-ma-leh", category: "vocabulary", id: "19" },
      { front: "sad, sorry", back: "ဝမ်းနည်း|wun-ni", category: "vocabulary", id: "20" },
      { front: "kind, compassionate", back: "ကြင်နာ|kyin-na", category: "vocabulary", id: "21" },
      { front: "cruel", back: "ရက်စက်|yeq-seq", category: "vocabulary", id: "22" },
      { front: "lazy", back: "게으르다|geh-u", category: "vocabulary", id: "23" },
      { front: "diligent", back: "လုံ့လ|loun-la", category: "vocabulary", id: "24" },
      { front: "smart, clever", back: "လိမ္မာ|lein-ma", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 21 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle21Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 21 Flashcards created:', data);
      toast.success("Exercise Bundle 21 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 21 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 21"
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
            onClick={insertBundle21}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 21 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle21Flashcard;
