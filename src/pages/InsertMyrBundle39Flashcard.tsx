import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle39Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle39 = async () => {
    setIsInserting(true);

    const bundle39Cards = [
      { front: "top, peak", back: "ထိပ်|hteiq", category: "vocabulary", id: "1" },
      { front: "base, foundation", back: "အခြေခံ|a-chay-khan", category: "vocabulary", id: "2" },
      { front: "structure", back: "ဖွဲ့စည်းပုံ|phweh-si-poun", category: "vocabulary", id: "3" },
      { front: "framework", back: "မူဘောင်|mu-baung", category: "vocabulary", id: "4" },
      { front: "shape", back: "ပုံသဏ္ဌာန်|poun-than-than", category: "vocabulary", id: "5" },
      { front: "form", back: "ပုံစံ|poun-zan", category: "vocabulary", id: "6" },
      { front: "pattern", back: "ပုံစံနမူနာ|poun-zan-na-mu-na", category: "vocabulary", id: "7" },
      { front: "model", back: "ပုံစံပြ|poun-zan-pya", category: "vocabulary", id: "8" },
      { front: "sample", back: "နမူနာပစ္စည်း|na-mu-na-paq-si", category: "vocabulary", id: "9" },
      { front: "type", back: "အမျိုးအစား|a-myo-a-za", category: "vocabulary", id: "10" },
      { front: "kind, species", back: "မျိုးစိတ်|myo-seiq", category: "vocabulary", id: "11" },
      { front: "category", back: "အမျိုးအစား|a-myo-a-za", category: "vocabulary", id: "12" },
      { front: "group", back: "အုပ်စု|ouq-zu", category: "vocabulary", id: "13" },
      { front: "group (organized)", back: "အဖွဲ့|a-phweh", category: "vocabulary", id: "14" },
      { front: "group, set", back: "စု|zu", category: "vocabulary", id: "15" },
      { front: "herd, flock", back: "သိုးအုပ်|tho-ouq", category: "vocabulary", id: "16" },
      { front: "team", back: "အသင်း|a-thin", category: "vocabulary", id: "17" },
      { front: "committee", back: "ကော်မတီ|kaw-ma-ti", category: "vocabulary", id: "18" },
      { front: "organization", back: "အဖွဲ့အစည်း|a-phweh-a-si", category: "vocabulary", id: "19" },
      { front: "association", back: "အသင်း|a-thin", category: "vocabulary", id: "20" },
      { front: "institution", back: "အဖွဲ့အစည်း|a-phweh-a-si", category: "vocabulary", id: "21" },
      { front: "foundation (organization)", back: "ရန်ပုံငွေ|yan-poun-ngway", category: "vocabulary", id: "22" },
      { front: "community", back: "အသိုင်းအဝိုင်း|a-thain-a-wain", category: "vocabulary", id: "23" },
      { front: "society", back: "လူ့အဖွဲ့အစည်း|lu-a-phweh-a-si", category: "vocabulary", id: "24" },
      { front: "world", back: "ကမ္ဘာ|kan-ba", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 39 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle39Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 39 Flashcards created:', data);
      toast.success("Exercise Bundle 39 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 39 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 39"
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
            onClick={insertBundle39}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 39 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle39Flashcard;
