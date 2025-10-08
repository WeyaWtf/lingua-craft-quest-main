import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle29Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle29 = async () => {
    setIsInserting(true);

    const bundle29Cards = [
      { front: "crime", back: "ရာဇဝတ်မှု|ya-za-waq-hmu", category: "vocabulary", id: "1" },
      { front: "thief", back: "သူခိုး|thu-kho", category: "vocabulary", id: "2" },
      { front: "murderer", back: "လူသတ်သမား|lu-thaq-tha-ma", category: "vocabulary", id: "3" },
      { front: "victim", back: "သားကောင်|tha-kaung", category: "vocabulary", id: "4" },
      { front: "witness", back: "သက်သေ|theq-thay", category: "vocabulary", id: "5" },
      { front: "evidence", back: "အထောက်အထား|a-htauq-a-hta", category: "vocabulary", id: "6" },
      { front: "investigate", back: "စုံစမ်း|zoun-zan", category: "vocabulary", id: "7" },
      { front: "govern", back: "အုပ်ချုပ်|ouq-chouq", category: "vocabulary", id: "8" },
      { front: "government", back: "အစိုးရ|a-so-ya", category: "vocabulary", id: "9" },
      { front: "prime minister", back: "ဝန်ကြီးချုပ်|wun-kyi-chouq", category: "vocabulary", id: "10" },
      { front: "minister", back: "ဝန်ကြီး|wun-kyi", category: "vocabulary", id: "11" },
      { front: "member", back: "အဖွဲ့ဝင်|a-phweh-win", category: "vocabulary", id: "12" },
      { front: "political party", back: "ပါတီ|pa-ti", category: "vocabulary", id: "13" },
      { front: "politics", back: "နိုင်ငံရေး|nain-ngan-ye", category: "vocabulary", id: "14" },
      { front: "election", back: "ရွေးကောက်ပွဲ|ywe-gauq-bweh", category: "vocabulary", id: "15" },
      { front: "democracy", back: "ဒီမိုကရေစီ|di-mo-ka-ye-zi", category: "vocabulary", id: "16" },
      { front: "freedom", back: "လွတ်လပ်ခွင့်|lwuq-laq-khwin", category: "vocabulary", id: "17" },
      { front: "rights", back: "အခွင့်အရေး|a-khwin-a-ye", category: "vocabulary", id: "18" },
      { front: "duty", back: "တာဝန်|ta-wun", category: "vocabulary", id: "19" },
      { front: "regulations", back: "စည်းမျဉ်း|si-myin", category: "vocabulary", id: "20" },
      { front: "rules", back: "စည်းကမ်း|si-kan", category: "vocabulary", id: "21" },
      { front: "follow, obey", back: "လိုက်နာ|laiq-na", category: "vocabulary", id: "22" },
      { front: "violate", back: "ဖောက်ဖျက်|phauq-phyeq", category: "vocabulary", id: "23" },
      { front: "respect", back: "လေးစား|le-za", category: "vocabulary", id: "24" },
      { front: "announce", back: "ကြေညာ|kye-nya", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 29 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle29Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 29 Flashcards created:', data);
      toast.success("Exercise Bundle 29 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 29 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 29"
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
            onClick={insertBundle29}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 29 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle29Flashcard;
