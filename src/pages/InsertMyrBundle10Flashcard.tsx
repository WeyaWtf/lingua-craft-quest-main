import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle10Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle10 = async () => {
    setIsInserting(true);

    const bundle10Cards = [
      { front: "tea", back: "လက်ဖက်ရည်|leq-pheq-yeh", category: "vocabulary", id: "1" },
      { front: "coffee", back: "ကော်ဖီ|kaw-hpi", category: "vocabulary", id: "2" },
      { front: "beer", back: "ဘီယာ|bi-ya", category: "vocabulary", id: "3" },
      { front: "liquor", back: "အရက်|a-yeq", category: "vocabulary", id: "4" },
      { front: "juice", back: "ရည်ရွက်|yei-yweq", category: "vocabulary", id: "5" },
      { front: "shirt", back: "အင်္ကျီ|ein-gyi", category: "vocabulary", id: "6" },
      { front: "pants", back: "ဘောင်းဘီ|baung-bi", category: "vocabulary", id: "7" },
      { front: "clothes", back: "အဝတ်အထည်|a-wuq-a-hteh", category: "vocabulary", id: "8" },
      { front: "longyi (skirt)", back: "လုံချည်|loun-gyi", category: "vocabulary", id: "9" },
      { front: "shoes", back: "ဖိနပ်|hpna", category: "vocabulary", id: "10" },
      { front: "socks", back: "ခြေအိတ်|chay-eiq", category: "vocabulary", id: "11" },
      { front: "hat", back: "ဦးထုပ်|u-htouq", category: "vocabulary", id: "12" },
      { front: "glasses", back: "မျက်မှန်|myeq-hman", category: "vocabulary", id: "13" },
      { front: "watch, clock", back: "နာရီ|na-yi", category: "vocabulary", id: "14" },
      { front: "bag", back: "အိတ်|eiq", category: "vocabulary", id: "15" },
      { front: "umbrella", back: "ထီး|hti", category: "vocabulary", id: "16" },
      { front: "key", back: "သော့|thaw", category: "vocabulary", id: "17" },
      { front: "phone", back: "ဖုန်း|phoun", category: "vocabulary", id: "18" },
      { front: "mobile phone", back: "လက်ကိုင်ဖုန်း|leq-kain-phoun", category: "vocabulary", id: "19" },
      { front: "computer", back: "ကွန်ပျူတာ|kun-pyu-ta", category: "vocabulary", id: "20" },
      { front: "TV", back: "တီဗွီ|ti-bwi", category: "vocabulary", id: "21" },
      { front: "radio", back: "ရေဒီယို|ye-di-yo", category: "vocabulary", id: "22" },
      { front: "book", back: "စာအုပ်|sa-ouq", category: "vocabulary", id: "23" },
      { front: "newspaper", back: "သတင်းစာ|tha-din-za", category: "vocabulary", id: "24" },
      { front: "magazine", back: "မဂ္ဂဇင်း|meq-ga-zin", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 10 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle10Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 10 Flashcards created:', data);
      toast.success("Exercise Bundle 10 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 10 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 10"
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
            onClick={insertBundle10}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 10 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle10Flashcard;
