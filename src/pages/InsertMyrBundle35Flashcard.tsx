import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle35Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle35 = async () => {
    setIsInserting(true);

    const bundle35Cards = [
      { front: "sincere", back: "စစ်မှန်|siq-hman", category: "vocabulary", id: "1" },
      { front: "compassion", back: "ကရုဏာ|ka-yu-na", category: "vocabulary", id: "2" },
      { front: "kindness", back: "ကြင်နာ|kyin-na", category: "vocabulary", id: "3" },
      { front: "patience", back: "စိတ်ရှည်|seiq-sheh", category: "vocabulary", id: "4" },
      { front: "effort", back: "ကြိုးစား|kyo-za", category: "vocabulary", id: "5" },
      { front: "intention", back: "ရည်ရွယ်|yeh-yweh", category: "vocabulary", id: "6" },
      { front: "determination", back: "စိတ်ပိုင်းဖြတ်|seiq-pain-phyaq", category: "vocabulary", id: "7" },
      { front: "enthusiasm", back: "စိတ်အားထက်သန်|seiq-a-hteq-than", category: "vocabulary", id: "8" },
      { front: "interest", back: "စိတ်ဝင်စား|seiq-win-za", category: "vocabulary", id: "9" },
      { front: "concern", back: "စိုးရိမ်မှု|so-yein-hmu", category: "vocabulary", id: "10" },
      { front: "attention", back: "သတိပြု|tha-ti-pyu", category: "vocabulary", id: "11" },
      { front: "caution", back: "သတိထား|tha-ti-hta", category: "vocabulary", id: "12" },
      { front: "safety", back: "လုံခြုံရေး|loun-khoun-ye", category: "vocabulary", id: "13" },
      { front: "convenience", back: "အဆင်ပြေ|a-hsin-pyay", category: "vocabulary", id: "14" },
      { front: "comfort", back: "သက်တောင့်သက်သာ|theq-taung-theq-tha", category: "vocabulary", id: "15" },
      { front: "cleanliness", back: "သန့်ရှင်း|than-shin", category: "vocabulary", id: "16" },
      { front: "orderliness", back: "စည်းကမ်း|si-kan", category: "vocabulary", id: "17" },
      { front: "responsibility", back: "တာဝန်ယူ|ta-wun-yu", category: "vocabulary", id: "18" },
      { front: "justice", back: "တရား|ta-ya", category: "vocabulary", id: "19" },
      { front: "equality", back: "တန်းတူ|tan-tu", category: "vocabulary", id: "20" },
      { front: "difference", back: "ကွာခြားချက်|kwa-cha-cheq", category: "vocabulary", id: "21" },
      { front: "diversity", back: "မတူကွဲပြား|ma-tu-kweh-pya", category: "vocabulary", id: "22" },
      { front: "similarity", back: "တူညီမှု|tu-nyi-hmu", category: "vocabulary", id: "23" },
      { front: "unique", back: "ထူးခြား|htu-cha", category: "vocabulary", id: "24" },
      { front: "special", back: "အထူး|a-htu", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 35 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle35Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 35 Flashcards created:', data);
      toast.success("Exercise Bundle 35 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 35 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 35"
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
            onClick={insertBundle35}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 35 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle35Flashcard;
