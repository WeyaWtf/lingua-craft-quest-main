import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle36Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle36 = async () => {
    setIsInserting(true);

    const bundle36Cards = [
      { front: "beauty", back: "လှပမှု|hla-pa-hmu", category: "vocabulary", id: "1" },
      { front: "attractive", back: "စွဲမက်ဖွယ်|zweh-meq-phweh", category: "vocabulary", id: "2" },
      { front: "entertainment", back: "ဖျော်ဖြေရေး|phyaw-phyay-ye", category: "vocabulary", id: "3" },
      { front: "enjoyment", back: "ပျော်ရွှင်မှု|pyaw-shwin-hmu", category: "vocabulary", id: "4" },
      { front: "well-being", back: "ကျန်းမာချမ်းသာ|kyan-ma-chan-tha", category: "vocabulary", id: "5" },
      { front: "prosperity", back: "ချမ်းသာကြွယ်ဝ|chan-tha-kywe-wa", category: "vocabulary", id: "6" },
      { front: "wealth", back: "စည်းစိမ်|si-seim", category: "vocabulary", id: "7" },
      { front: "poverty", back: "ဆင်းရဲ|hsin-yay", category: "vocabulary", id: "8" },
      { front: "difficulty", back: "ခက်ခဲ|kheq-kheh", category: "vocabulary", id: "9" },
      { front: "suffering", back: "ဒုက္ခ|douk-kha", category: "vocabulary", id: "10" },
      { front: "pain", back: "နာကျင်|na-kyin", category: "vocabulary", id: "11" },
      { front: "danger", back: "အန္တရာယ်|an-ta-ya", category: "vocabulary", id: "12" },
      { front: "risk", back: "စွန့်စား|zun-za", category: "vocabulary", id: "13" },
      { front: "possibility", back: "ဖြစ်နိုင်ခြေ|phyiq-nain-chay", category: "vocabulary", id: "14" },
      { front: "opportunity", back: "အခွင့်အလမ်း|a-khwin-a-lun", category: "vocabulary", id: "15" },
      { front: "luck", back: "ကံကောင်းမှု|kan-kaung-hmu", category: "vocabulary", id: "16" },
      { front: "fate", back: "ကံကြမ္မာ|kan-kyan-ma", category: "vocabulary", id: "17" },
      { front: "destiny", back: "နာမ|na-ma", category: "vocabulary", id: "18" },
      { front: "future", back: "အနာဂတ်|a-na-gaq", category: "vocabulary", id: "19" },
      { front: "hope", back: "မျှော်လင့်ချက်|hshaw-lin-cheq", category: "vocabulary", id: "20" },
      { front: "dream", back: "အိပ်မက်|eiq-meq", category: "vocabulary", id: "21" },
      { front: "target", back: "ပန်းတိုင်|pan-tain", category: "vocabulary", id: "22" },
      { front: "destination", back: "ဦးတည်ချက်|u-teh-cheq", category: "vocabulary", id: "23" },
      { front: "result", back: "ရလဒ်|ya-laq", category: "vocabulary", id: "24" },
      { front: "consequence", back: "အကျိုးဆက်|a-kyo-hseq", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 36 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle36Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 36 Flashcards created:', data);
      toast.success("Exercise Bundle 36 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 36 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 36"
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
            onClick={insertBundle36}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 36 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle36Flashcard;
