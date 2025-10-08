import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle27Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle27 = async () => {
    setIsInserting(true);

    const bundle27Cards = [
      { front: "ceremony", back: "အခမ်းအနား|a-khan-a-na", category: "vocabulary", id: "1" },
      { front: "gift", back: "လက်ဆောင်|leq-saung", category: "vocabulary", id: "2" },
      { front: "card", back: "ကတ်|kaq", category: "vocabulary", id: "3" },
      { front: "flower", back: "ပန်း|pan", category: "vocabulary", id: "4" },
      { front: "candle", back: "ဖယောင်းတိုင်|hpyaung-tain", category: "vocabulary", id: "5" },
      { front: "incense", back: "နံ့သာပေါင်း|nan-tha-paung", category: "vocabulary", id: "6" },
      { front: "garland", back: "ပန်းကုံး|pan-koun", category: "vocabulary", id: "7" },
      { front: "cake", back: "ကိတ်မုန့်|keiq-moun", category: "vocabulary", id: "8" },
      { front: "blessing", back: "ကောင်းချီး|kaung-chi", category: "vocabulary", id: "9" },
      { front: "good luck", back: "ကံကောင်း|kan-kaung", category: "vocabulary", id: "10" },
      { front: "health", back: "ကျန်းမာရေး|kyan-ma-ye", category: "vocabulary", id: "11" },
      { front: "happiness", back: "ပျော်ရွှင်မှု|pyaw-shwin-hmu", category: "vocabulary", id: "12" },
      { front: "love", back: "ချစ်ခြင်းမေတ္တာ|chiq-chin-meq-ta", category: "vocabulary", id: "13" },
      { front: "success", back: "အောင်မြင်မှု|aung-myin-hmu", category: "vocabulary", id: "14" },
      { front: "economy", back: "စီးပွားရေး|zi-bwa-ye", category: "vocabulary", id: "15" },
      { front: "business", back: "စီးပွား|zi-bwa", category: "vocabulary", id: "16" },
      { front: "trade", back: "ကူးသန်းရောင်း|ku-than-yaung", category: "vocabulary", id: "17" },
      { front: "stock market", back: "စတော့|sa-taw", category: "vocabulary", id: "18" },
      { front: "invest", back: "ရင်းနှီး|yin-hni", category: "vocabulary", id: "19" },
      { front: "profit", back: "အမြတ်|a-myaq", category: "vocabulary", id: "20" },
      { front: "loss", back: "အရှုံး|a-shoun", category: "vocabulary", id: "21" },
      { front: "interest", back: "အတိုး|a-to", category: "vocabulary", id: "22" },
      { front: "tax", back: "အခွန်|a-khun", category: "vocabulary", id: "23" },
      { front: "income", back: "ဝင်ငွေ|win-ngway", category: "vocabulary", id: "24" },
      { front: "expense", back: "အသုံးစရိတ်|a-thoun-za-yeiq", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 27 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle27Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 27 Flashcards created:', data);
      toast.success("Exercise Bundle 27 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 27 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 27"
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
            onClick={insertBundle27}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 27 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle27Flashcard;
