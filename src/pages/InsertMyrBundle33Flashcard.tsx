import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle33Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle33 = async () => {
    setIsInserting(true);

    const bundle33Cards = [
      { front: "research", back: "သုတေသန|thu-tay-tha-na", category: "vocabulary", id: "1" },
      { front: "education", back: "ပညာရေး|pyin-nya-ye", category: "vocabulary", id: "2" },
      { front: "learning", back: "သင်ယူမှု|thin-yu-hmu", category: "vocabulary", id: "3" },
      { front: "training", back: "လေ့ကျင့်မှု|leh-kyin-hmu", category: "vocabulary", id: "4" },
      { front: "teaching", back: "သင်ကြားမှု|thin-kya-hmu", category: "vocabulary", id: "5" },
      { front: "explanation", back: "ရှင်းလင်းချက်|shin-lin-cheq", category: "vocabulary", id: "6" },
      { front: "introduction", back: "မိတ်ဆက်|meiq-hseq", category: "vocabulary", id: "7" },
      { front: "performance", back: "ဖျော်ဖြေမှု|phyaw-phyay-hmu", category: "vocabulary", id: "8" },
      { front: "presentation", back: "တင်ပြချက်|tin-pya-cheq", category: "vocabulary", id: "9" },
      { front: "demonstration", back: "သရုပ်ပြ|tha-youq-pya", category: "vocabulary", id: "10" },
      { front: "lecture", back: "ပို့ချချက်|po-cheh-cheq", category: "vocabulary", id: "11" },
      { front: "discuss", back: "ဆွေးနွေး|hswe-nwe", category: "vocabulary", id: "12" },
      { front: "seminar", back: "ဆွေးနွေးပွဲ|hswe-nwe-bweh", category: "vocabulary", id: "13" },
      { front: "conference", back: "ညီလာခံ|nyi-la-khan", category: "vocabulary", id: "14" },
      { front: "compete", back: "ယှဉ်ပြိုင်|hyin-pain", category: "vocabulary", id: "15" },
      { front: "sports competition", back: "အားကစားပြိုင်ပွဲ|a-za-pyain-bweh", category: "vocabulary", id: "16" },
      { front: "concert", back: "ဂီတဖျော်ဖြေပွဲ|gi-ta-phyaw-phyay-bweh", category: "vocabulary", id: "17" },
      { front: "play, drama", back: "ပြဇာတ်|pya-zaq", category: "vocabulary", id: "18" },
      { front: "movie", back: "ရုပ်ရှင်|youq-shin", category: "vocabulary", id: "19" },
      { front: "drama series", back: "ဇာတ်လမ်းတွဲ|zaq-lun-tweh", category: "vocabulary", id: "20" },
      { front: "program", back: "အစီအစဉ်|a-si-a-sin", category: "vocabulary", id: "21" },
      { front: "channel", back: "လိုင်း|lain", category: "vocabulary", id: "22" },
      { front: "content", back: "အကြောင်းအရာ|a-kyaung-a-ya", category: "vocabulary", id: "23" },
      { front: "topic, title", back: "ခေါင်းစဉ်|khaung-sin", category: "vocabulary", id: "24" },
      { front: "subject matter", back: "အကြောင်းအရာ|a-kyaung-a-ya", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 33 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle33Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 33 Flashcards created:', data);
      toast.success("Exercise Bundle 33 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 33 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 33"
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
            onClick={insertBundle33}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 33 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle33Flashcard;
