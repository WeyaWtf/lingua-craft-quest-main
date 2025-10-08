import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle17Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle17 = async () => {
    setIsInserting(true);

    const bundle17Cards = [
      { front: "one", back: "တစ်|tiq", category: "vocabulary", id: "1" },
      { front: "two", back: "နှစ်|hniq", category: "vocabulary", id: "2" },
      { front: "three", back: "သုံး|thoun", category: "vocabulary", id: "3" },
      { front: "four", back: "လေး|le", category: "vocabulary", id: "4" },
      { front: "five", back: "ငါး|nga", category: "vocabulary", id: "5" },
      { front: "six", back: "ခြောက်|chauq", category: "vocabulary", id: "6" },
      { front: "seven", back: "ခုနစ်|khu-niq", category: "vocabulary", id: "7" },
      { front: "eight", back: "ရှစ်|shiq", category: "vocabulary", id: "8" },
      { front: "nine", back: "ကိုး|ko", category: "vocabulary", id: "9" },
      { front: "ten", back: "ဆယ်|hse", category: "vocabulary", id: "10" },
      { front: "eleven", back: "ဆယ့်တစ်|hse-tiq", category: "vocabulary", id: "11" },
      { front: "twelve", back: "ဆယ့်နှစ်|hse-hniq", category: "vocabulary", id: "12" },
      { front: "twenty", back: "နှစ်ဆယ်|hniq-hse", category: "vocabulary", id: "13" },
      { front: "thirty", back: "သုံးဆယ်|thoun-hse", category: "vocabulary", id: "14" },
      { front: "forty", back: "လေးဆယ်|le-hse", category: "vocabulary", id: "15" },
      { front: "fifty", back: "ငါးဆယ်|nga-hse", category: "vocabulary", id: "16" },
      { front: "sixty", back: "ခြောက်ဆယ်|chauq-hse", category: "vocabulary", id: "17" },
      { front: "seventy", back: "ခုနစ်ဆယ်|khu-niq-hse", category: "vocabulary", id: "18" },
      { front: "eighty", back: "ရှစ်ဆယ်|shiq-hse", category: "vocabulary", id: "19" },
      { front: "ninety", back: "ကိုးဆယ်|ko-hse", category: "vocabulary", id: "20" },
      { front: "one hundred", back: "တစ်ရာ|tiq-ya", category: "vocabulary", id: "21" },
      { front: "one thousand", back: "တစ်ထောင်|tiq-htaung", category: "vocabulary", id: "22" },
      { front: "ten thousand", back: "တစ်သောင်း|tiq-thaung", category: "vocabulary", id: "23" },
      { front: "one hundred thousand", back: "တစ်သိန်း|tiq-thein", category: "vocabulary", id: "24" },
      { front: "one million", back: "တစ်သန်း|tiq-than", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 17 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle17Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 17 Flashcards created:', data);
      toast.success("Exercise Bundle 17 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 17 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 17"
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
            onClick={insertBundle17}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 17 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle17Flashcard;
