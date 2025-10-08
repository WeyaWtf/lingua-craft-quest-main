import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle28Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle28 = async () => {
    setIsInserting(true);

    const bundle28Cards = [
      { front: "salary", back: "လစာ|la-za", category: "vocabulary", id: "1" },
      { front: "bonus", back: "ဘောနပ်စ်|baw-naq", category: "vocabulary", id: "2" },
      { front: "goods", back: "ကုန်စည်|koun-si", category: "vocabulary", id: "3" },
      { front: "service", back: "ဝန်ဆောင်မှု|wun-saung-hmu", category: "vocabulary", id: "4" },
      { front: "customer", back: "ဖောက်သည်|phauq-theh", category: "vocabulary", id: "5" },
      { front: "employee", back: "အလုပ်သမား|a-loq-tha-ma", category: "vocabulary", id: "6" },
      { front: "manager", back: "မန်နေဂျာ|man-nay-ja", category: "vocabulary", id: "7" },
      { front: "owner", back: "ပိုင်ရှင်|pain-shin", category: "vocabulary", id: "8" },
      { front: "partner", back: "လုပ်ဖော်ကိုင်ဖက်|loq-phaw-kain-pheq", category: "vocabulary", id: "9" },
      { front: "contract", back: "စာချုပ်|sa-chouq", category: "vocabulary", id: "10" },
      { front: "agreement", back: "သဘောတူညီချက်|tha-baw-tu-nyi-cheq", category: "vocabulary", id: "11" },
      { front: "law", back: "ဥပဒေ|u-pa-day", category: "vocabulary", id: "12" },
      { front: "court", back: "တရားရုံး|ta-ya-youn", category: "vocabulary", id: "13" },
      { front: "lawyer", back: "ရှေ့နေ|shay-nay", category: "vocabulary", id: "14" },
      { front: "judge", back: "တရားသူကြီး|ta-ya-thu-kyi", category: "vocabulary", id: "15" },
      { front: "case", back: "အမှု|a-hmu", category: "vocabulary", id: "16" },
      { front: "crime", back: "ပြစ်မှု|pyiq-hmu", category: "vocabulary", id: "17" },
      { front: "innocent", back: "အပြစ်မဲ့|a-pyiq-meh", category: "vocabulary", id: "18" },
      { front: "guilty", back: "အပြစ်ရှိ|a-pyiq-shi", category: "vocabulary", id: "19" },
      { front: "arrest", back: "ဖမ်းဆီး|hpan-hsi", category: "vocabulary", id: "20" },
      { front: "imprison", back: "ချုပ်နှောင်|chouq-hnaung", category: "vocabulary", id: "21" },
      { front: "release", back: "လွှတ်|hlwuq", category: "vocabulary", id: "22" },
      { front: "punishment", back: "ပြစ်ဒဏ်|pyiq-dan", category: "vocabulary", id: "23" },
      { front: "fine", back: "ဒဏ်ငွေ|dan-ngway", category: "vocabulary", id: "24" },
      { front: "prison", back: "ထောင်|htaung", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 28 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle28Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 28 Flashcards created:', data);
      toast.success("Exercise Bundle 28 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 28 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 28"
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
            onClick={insertBundle28}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 28 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle28Flashcard;
