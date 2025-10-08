import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle40Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle40 = async () => {
    setIsInserting(true);

    const bundle40Cards = [
      { front: "universe", back: "စကြာဝဠာ|sa-kya-wa-la", category: "vocabulary", id: "1" },
      { front: "nature", back: "သဘာဝ|tha-ba-wa", category: "vocabulary", id: "2" },
      { front: "environment", back: "ပတ်ဝန်းကျင်|paq-wun-kyin", category: "vocabulary", id: "3" },
      { front: "atmosphere", back: "လေထု|lay-htu", category: "vocabulary", id: "4" },
      { front: "pollution", back: "ညစ်ညမ်း|nyi-nyan", category: "vocabulary", id: "5" },
      { front: "garbage", back: "အမှိုက်|a-hmaiq", category: "vocabulary", id: "6" },
      { front: "energy", back: "စွမ်းအင်|zun-ein", category: "vocabulary", id: "7" },
      { front: "electricity", back: "လျှပ်စစ်|hlaq-siq", category: "vocabulary", id: "8" },
      { front: "oil", back: "ဆီ|hsi", category: "vocabulary", id: "9" },
      { front: "gas", back: "ဓာတ်ငွေ့|daq-ngweh", category: "vocabulary", id: "10" },
      { front: "coal", back: "ကျောက်မီးသွေး|kyauq-mi-thwe", category: "vocabulary", id: "11" },
      { front: "sunlight", back: "နေရောင်ခြည်|ne-yaung-cheh", category: "vocabulary", id: "12" },
      { front: "wind power", back: "လေအား|lay-a", category: "vocabulary", id: "13" },
      { front: "water power", back: "ရေအား|ye-a", category: "vocabulary", id: "14" },
      { front: "natural resources", back: "သဘာဝအရင်းအမြစ်|tha-ba-wa-a-yin-a-myiq", category: "vocabulary", id: "15" },
      { front: "environmental protection", back: "ပတ်ဝန်းကျင်ထိန်းသိမ်း|paq-wun-kyin-htein-thein", category: "vocabulary", id: "16" },
      { front: "climate", back: "ရာသီဥတု|ya-thi-u-tu", category: "vocabulary", id: "17" },
      { front: "climate change", back: "ရာသီဥတုပြောင်းလဲ|ya-thi-u-tu-pyaung-leh", category: "vocabulary", id: "18" },
      { front: "deforestation", back: "သစ်တောပြုန်းတီး|thiq-taw-pyoun-ti", category: "vocabulary", id: "19" },
      { front: "biodiversity", back: "ဇီဝမျိုးစုံ|zi-wa-myo-zoun", category: "vocabulary", id: "20" },
      { front: "water scarcity", back: "ရေရှားပါးမှု|ye-sha-pa-hmu", category: "vocabulary", id: "21" },
      { front: "energy conservation", back: "စွမ်းအင်ချွေတာမှု|zun-ein-chway-ta-hmu", category: "vocabulary", id: "22" },
      { front: "recycle", back: "ပြန်လည်အသုံးချ|pyan-leh-a-thoun-cha", category: "vocabulary", id: "23" },
      { front: "sustainable", back: "ရေရှည်တည်တံ့|ye-sheh-teh-tan", category: "vocabulary", id: "24" },
      { front: "future generations", back: "အနာဂတ်မျိုးဆက်|a-na-gaq-myo-hseq", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 40 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle40Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 40 Flashcards created:', data);
      toast.success("Exercise Bundle 40 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 40 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 40"
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
            onClick={insertBundle40}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 40 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle40Flashcard;
