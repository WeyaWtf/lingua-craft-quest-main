import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle32Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle32 = async () => {
    setIsInserting(true);

    const bundle32Cards = [
      { front: "accept", back: "လက်ခံယူ|leq-khan-yu", category: "vocabulary", id: "1" },
      { front: "refuse", back: "ငြင်းပယ်|nyin-peh", category: "vocabulary", id: "2" },
      { front: "approve", back: "ခွင့်ပြု|khwin-pyu", category: "vocabulary", id: "3" },
      { front: "cancel", back: "ပယ်ဖျက်|peh-phyeq", category: "vocabulary", id: "4" },
      { front: "postpone", back: "ရွှေ့ဆိုင်း|shway-hsain", category: "vocabulary", id: "5" },
      { front: "confirm", back: "အတည်ပြု|a-teh-pyu", category: "vocabulary", id: "6" },
      { front: "correct", back: "ပြင်ဆင်|pyin-hsin", category: "vocabulary", id: "7" },
      { front: "improve", back: "တိုးတက်စေ|to-teq-seh", category: "vocabulary", id: "8" },
      { front: "repair", back: "ပြုပြင်|pyu-pyin", category: "vocabulary", id: "9" },
      { front: "maintain", back: "ပြုစုစောင့်ရှောက်|pyu-zu-saung-shauq", category: "vocabulary", id: "10" },
      { front: "cleaning", back: "သန့်ရှင်းရေး|than-shin-ye", category: "vocabulary", id: "11" },
      { front: "organize", back: "ဖွဲ့စည်း|phweh-si", category: "vocabulary", id: "12" },
      { front: "preparation", back: "ပြင်ဆင်မှု|pyin-hsin-hmu", category: "vocabulary", id: "13" },
      { front: "planning", back: "စီစဉ်မှု|si-sin-hmu", category: "vocabulary", id: "14" },
      { front: "decision", back: "ဆုံးဖြတ်ချက်|zone-phyaq-cheq", category: "vocabulary", id: "15" },
      { front: "selection", back: "ရွေးချယ်မှု|ywe-cheh-hmu", category: "vocabulary", id: "16" },
      { front: "consideration", back: "စဉ်းစားသုံးသပ်|sin-za-thoun-thaq", category: "vocabulary", id: "17" },
      { front: "calculation", back: "တွက်ချက်|tweq-cheq", category: "vocabulary", id: "18" },
      { front: "measurement", back: "တိုင်းတာ|tain-ta", category: "vocabulary", id: "19" },
      { front: "weigh", back: "ချိန်တွယ်|chein-tweh", category: "vocabulary", id: "20" },
      { front: "count", back: "ရေတွက်|ye-tweq", category: "vocabulary", id: "21" },
      { front: "compare", back: "နှိုင်းယှဉ်|hnain-hyin", category: "vocabulary", id: "22" },
      { front: "analyze", back: "ခွဲခြမ်း|khweh-chyan", category: "vocabulary", id: "23" },
      { front: "observe", back: "လေ့လာ|leh-la", category: "vocabulary", id: "24" },
      { front: "experiment", back: "စမ်းသပ်|san-thaq", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 32 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle32Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 32 Flashcards created:', data);
      toast.success("Exercise Bundle 32 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 32 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 32"
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
            onClick={insertBundle32}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 32 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle32Flashcard;
