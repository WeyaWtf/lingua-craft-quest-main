import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle30Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle30 = async () => {
    setIsInserting(true);

    const bundle30Cards = [
      { front: "inform", back: "အကြောင်းကြား|a-kyaung-kya", category: "vocabulary", id: "1" },
      { front: "report", back: "အစီရင်ခံစာ|a-si-yin-khan-za", category: "vocabulary", id: "2" },
      { front: "news", back: "သတင်း|tha-din", category: "vocabulary", id: "3" },
      { front: "information", back: "အချက်အလက်|a-cheq-a-leq", category: "vocabulary", id: "4" },
      { front: "statistics", back: "ကိန်းဂဏန်း|kein-ga-nan", category: "vocabulary", id: "5" },
      { front: "number", back: "နံပါတ်|nan-baq", category: "vocabulary", id: "6" },
      { front: "amount", back: "ပမာဏ|pa-ma-na", category: "vocabulary", id: "7" },
      { front: "percent", back: "ရာခိုင်နှုန်း|ya-khain-hnoun", category: "vocabulary", id: "8" },
      { front: "increase", back: "တက်လာ|teq-la", category: "vocabulary", id: "9" },
      { front: "decrease", back: "ကျဆင်း|kya-hsin", category: "vocabulary", id: "10" },
      { front: "stable", back: "တည်ငြိမ်|teh-nyein", category: "vocabulary", id: "11" },
      { front: "change", back: "ပြောင်းလဲ|pyaung-leh", category: "vocabulary", id: "12" },
      { front: "develop", back: "ဖွံ့ဖြိုး|hpwun-phyo", category: "vocabulary", id: "13" },
      { front: "progress", back: "တိုးတက်|to-teq", category: "vocabulary", id: "14" },
      { front: "modern", back: "ခေတ်မီ|khiq-mi", category: "vocabulary", id: "15" },
      { front: "ancient", back: "ရှေးဟောင်း|shay-haung", category: "vocabulary", id: "16" },
      { front: "contemporary", back: "ခေတ်ပြိုင်|khiq-pain", category: "vocabulary", id: "17" },
      { front: "future", back: "အနာဂတ်|a-na-gaq", category: "vocabulary", id: "18" },
      { front: "past", back: "အတိတ်|a-tiq", category: "vocabulary", id: "19" },
      { front: "present", back: "ပစ္စပ္ပန်|piq-sa-ban", category: "vocabulary", id: "20" },
      { front: "period", back: "အချိန်ကာလ|a-chain-ka-la", category: "vocabulary", id: "21" },
      { front: "stage", back: "အဆင့်|a-hsin", category: "vocabulary", id: "22" },
      { front: "step by step", back: "အဆင့်ဆင့်|a-hsin-hsin", category: "vocabulary", id: "23" },
      { front: "process", back: "လုပ်ငန်းစဉ်|loq-ngan-sin", category: "vocabulary", id: "24" },
      { front: "method", back: "နည်းလမ်း|ni-lun", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 30 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle30Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 30 Flashcards created:', data);
      toast.success("Exercise Bundle 30 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 30 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 30"
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
            onClick={insertBundle30}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 30 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle30Flashcard;
