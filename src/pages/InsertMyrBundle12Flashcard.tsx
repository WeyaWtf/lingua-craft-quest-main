import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle12Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle12 = async () => {
    setIsInserting(true);

    const bundle12Cards = [
      { front: "dance", back: "က|ka", category: "vocabulary", id: "1" },
      { front: "sing", back: "သီချင်းဆို|thi-chin-hso", category: "vocabulary", id: "2" },
      { front: "music", back: "တေးဂီတ|te-gi-ta", category: "vocabulary", id: "3" },
      { front: "piano", back: "စန္ဒယား|san-da-ya", category: "vocabulary", id: "4" },
      { front: "guitar", back: "ဂစ်တာ|giq-ta", category: "vocabulary", id: "5" },
      { front: "drum", back: "စည်|si", category: "vocabulary", id: "6" },
      { front: "song", back: "သီချင်း|thi-chin", category: "vocabulary", id: "7" },
      { front: "language", back: "ဘာသာစကား|ba-tha-za-ga", category: "vocabulary", id: "8" },
      { front: "Burmese language", back: "မြန်မာစာ|myan-ma-sa", category: "vocabulary", id: "9" },
      { front: "English language", back: "အင်္ဂလိပ်စာ|ein-ga-leiq-sa", category: "vocabulary", id: "10" },
      { front: "word", back: "စကားလုံး|za-ga-loun", category: "vocabulary", id: "11" },
      { front: "sentence", back: "စာကြောင်း|sa-kyaung", category: "vocabulary", id: "12" },
      { front: "meaning", back: "အဓိပ္ပာယ်|a-di-pay", category: "vocabulary", id: "13" },
      { front: "translate", back: "ဘာသာပြန်|ba-tha-pyan", category: "vocabulary", id: "14" },
      { front: "explain", back: "ရှင်းပြ|shin-pya", category: "vocabulary", id: "15" },
      { front: "learn, study", back: "သင်|thin", category: "vocabulary", id: "16" },
      { front: "teach", back: "သင်ကြား|thin-kya", category: "vocabulary", id: "17" },
      { front: "homework", back: "အိမ်စာလုပ်|ein-sa-loq", category: "vocabulary", id: "18" },
      { front: "exam", back: "စာမေး|sa-me", category: "vocabulary", id: "19" },
      { front: "score, mark", back: "အမှတ်|a-hmaq", category: "vocabulary", id: "20" },
      { front: "grade, level", back: "အဆင့်|a-hsin", category: "vocabulary", id: "21" },
      { front: "pass, succeed", back: "အောင်မြင်|aung-myin", category: "vocabulary", id: "22" },
      { front: "fail", back: "ကျ|kya", category: "vocabulary", id: "23" },
      { front: "finish, complete", back: "ပြီးဆုံး|pyi-zone", category: "vocabulary", id: "24" },
      { front: "start, begin", back: "စတင်|sa-tin", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 12 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle12Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 12 Flashcards created:', data);
      toast.success("Exercise Bundle 12 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 12 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 12"
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
            onClick={insertBundle12}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 12 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle12Flashcard;
