import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle9Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle9 = async () => {
    setIsInserting(true);

    const bundle9Cards = [
      { front: "color", back: "အရောင်|a-yaung", category: "vocabulary", id: "1" },
      { front: "white", back: "အဖြူ|a-phyu", category: "vocabulary", id: "2" },
      { front: "black", back: "အမည်း|a-myi", category: "vocabulary", id: "3" },
      { front: "red", back: "အနီ|a-ni", category: "vocabulary", id: "4" },
      { front: "green", back: "အစိမ်း|a-sein", category: "vocabulary", id: "5" },
      { front: "blue", back: "အပြာ|a-pya", category: "vocabulary", id: "6" },
      { front: "yellow", back: "အဝါ|a-wa", category: "vocabulary", id: "7" },
      { front: "orange", back: "လိမ္မော်ရောင်|lein-maw-yaung", category: "vocabulary", id: "8" },
      { front: "purple", back: "ခရမ်းရောင်|kha-yan-yaung", category: "vocabulary", id: "9" },
      { front: "pink", back: "ပန်းရောင်|pan-yaung", category: "vocabulary", id: "10" },
      { front: "brown", back: "ညိုရောင်|nyo-yaung", category: "vocabulary", id: "11" },
      { front: "gray", back: "မီးခိုးရောင်|mi-kho-yaung", category: "vocabulary", id: "12" },
      { front: "food", back: "အစားအသောက်|a-sa-a-thauq", category: "vocabulary", id: "13" },
      { front: "rice (cooked)", back: "ထမင်း|hta-min", category: "vocabulary", id: "14" },
      { front: "rice (uncooked)", back: "ဆန်|hsan", category: "vocabulary", id: "15" },
      { front: "dessert", back: "အချိုပွဲ|a-cho-bweh", category: "vocabulary", id: "16" },
      { front: "fruit", back: "သစ်သီး|thiq-thi", category: "vocabulary", id: "17" },
      { front: "vegetables", back: "ဟင်းသီးဟင်းရွက်|hin-thi-hin-yweq", category: "vocabulary", id: "18" },
      { front: "meat", back: "အသား|a-tha", category: "vocabulary", id: "19" },
      { front: "pork", back: "ဝက်သား|weq-tha", category: "vocabulary", id: "20" },
      { front: "chicken", back: "ကြက်သား|kyeq-tha", category: "vocabulary", id: "21" },
      { front: "fish", back: "ငါး|nga", category: "vocabulary", id: "22" },
      { front: "shrimp", back: "ပုစွန်|pu-zun", category: "vocabulary", id: "23" },
      { front: "egg", back: "ကြက်ဥ|kyeq-u", category: "vocabulary", id: "24" },
      { front: "milk", back: "နို့|no", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 9 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle9Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 9 Flashcards created:', data);
      toast.success("Exercise Bundle 9 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 9 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 9"
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
            onClick={insertBundle9}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 9 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle9Flashcard;
