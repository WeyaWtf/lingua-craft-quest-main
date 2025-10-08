import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle31Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle31 = async () => {
    setIsInserting(true);

    const bundle31Cards = [
      { front: "technique", back: "နည်းပညာ|ni-pyin-nya", category: "vocabulary", id: "1" },
      { front: "skill", back: "ကျွမ်းကျင်မှု|kyun-kyin-hmu", category: "vocabulary", id: "2" },
      { front: "ability", back: "စွမ်းရည်|zun-yeh", category: "vocabulary", id: "3" },
      { front: "experience", back: "အတွေ့အကြုံ|a-tway-a-kyoun", category: "vocabulary", id: "4" },
      { front: "knowledge", back: "အသိပညာ|a-thi-pyin-nya", category: "vocabulary", id: "5" },
      { front: "wisdom", back: "ဉာဏ်|nyan", category: "vocabulary", id: "6" },
      { front: "understanding", back: "နားလည်မှု|na-leh-hmu", category: "vocabulary", id: "7" },
      { front: "thought", back: "အတွေး|a-twe", category: "vocabulary", id: "8" },
      { front: "opinion", back: "ထင်မြင်ချက်|htin-myin-cheq", category: "vocabulary", id: "9" },
      { front: "attitude", back: "သဘောထား|tha-baw-hta", category: "vocabulary", id: "10" },
      { front: "perspective", back: "ရှုထောင့်|shu-htaung", category: "vocabulary", id: "11" },
      { front: "purpose", back: "ရည်ရွယ်ချက်|yeh-yweh-cheq", category: "vocabulary", id: "12" },
      { front: "goal", back: "ပန်းတိုင်|pan-tain", category: "vocabulary", id: "13" },
      { front: "plan", back: "အစီအစဉ်|a-si-a-sin", category: "vocabulary", id: "14" },
      { front: "project", back: "စီမံကိန်း|si-man-kein", category: "vocabulary", id: "15" },
      { front: "work, task", back: "အလုပ်|a-loq", category: "vocabulary", id: "16" },
      { front: "activity", back: "လှုပ်ရှားမှု|hlouq-sha-hmu", category: "vocabulary", id: "17" },
      { front: "meeting", back: "အစည်းအဝေး|a-si-a-we", category: "vocabulary", id: "18" },
      { front: "appointment", back: "ရက်ချိန်း|yeq-chein", category: "vocabulary", id: "19" },
      { front: "interview", back: "တွေ့ဆုံမေးမြန်း|tway-zone-me-myan", category: "vocabulary", id: "20" },
      { front: "conversation", back: "စကားဝိုင်း|za-ga-wain", category: "vocabulary", id: "21" },
      { front: "chat", back: "စကားပြော|za-ga-pyaw", category: "vocabulary", id: "22" },
      { front: "debate", back: "ငြင်းခုံ|nyin-khoun", category: "vocabulary", id: "23" },
      { front: "argue", back: "စစ်တန်းရေး|siq-tan-ye", category: "vocabulary", id: "24" },
      { front: "agree", back: "သဘောတူ|tha-baw-tu", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 31 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle31Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 31 Flashcards created:', data);
      toast.success("Exercise Bundle 31 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 31 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 31"
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
            onClick={insertBundle31}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 31 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle31Flashcard;
