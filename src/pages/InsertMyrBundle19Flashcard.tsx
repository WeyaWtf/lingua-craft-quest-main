import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle19Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle19 = async () => {
    setIsInserting(true);

    const bundle19Cards = [
      { front: "hospital", back: "ဆေးရုံ|hse-youn", category: "vocabulary", id: "1" },
      { front: "clinic", back: "ဆေးခန်း|hse-khan", category: "vocabulary", id: "2" },
      { front: "school", back: "ကျောင်း|kyaung", category: "vocabulary", id: "3" },
      { front: "university", back: "တက္ကသိုလ်|teq-ka-tho", category: "vocabulary", id: "4" },
      { front: "library", back: "စာကြည့်တိုက်|sa-kyi-taiq", category: "vocabulary", id: "5" },
      { front: "pagoda", back: "ဘုရား|phu-ya", category: "vocabulary", id: "6" },
      { front: "monastery", back: "ဘုန်းကြီးကျောင်း|boun-kyi-kyaung", category: "vocabulary", id: "7" },
      { front: "temple", back: "ဘုရားကျောင်း|phu-ya-kyaung", category: "vocabulary", id: "8" },
      { front: "mosque", back: "ဘော်ဇာ|baw-za", category: "vocabulary", id: "9" },
      { front: "airport", back: "လေဆိပ်|lay-seiq", category: "vocabulary", id: "10" },
      { front: "train station", back: "ရထားဘူတာ|ya-hta-bu-ta", category: "vocabulary", id: "11" },
      { front: "bus stop", back: "ဘတ်စ်ကားမှတ်တိုင်|bat-sa-ka-hmaq-tain", category: "vocabulary", id: "12" },
      { front: "port, pier", back: "ဆိပ်ကမ်း|seiq-kan", category: "vocabulary", id: "13" },
      { front: "place", back: "နေရာ|ne-ya", category: "vocabulary", id: "14" },
      { front: "here", back: "ဒီမှာ|di-hma", category: "vocabulary", id: "15" },
      { front: "there", back: "ဟိုမှာ|ho-hma", category: "vocabulary", id: "16" },
      { front: "where", back: "ဘယ်မှာ|beh-hma", category: "vocabulary", id: "17" },
      { front: "which", back: "ဘယ်|beh", category: "vocabulary", id: "18" },
      { front: "what", back: "ဘာ|ba", category: "vocabulary", id: "19" },
      { front: "who", back: "ဘယ်သူ|beh-thu", category: "vocabulary", id: "20" },
      { front: "why", back: "ဘာကြောင့်|ba-kyaung", category: "vocabulary", id: "21" },
      { front: "how", back: "ဘယ်လို|beh-lo", category: "vocabulary", id: "22" },
      { front: "when", back: "ဘယ်တုန်းက|beh-toun-ga", category: "vocabulary", id: "23" },
      { front: "how much, how many", back: "ဘယ်လောက်|beh-lauq", category: "vocabulary", id: "24" },
      { front: "also, too", back: "လည်း|leh", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 19 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle19Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 19 Flashcards created:', data);
      toast.success("Exercise Bundle 19 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 19 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 19"
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
            onClick={insertBundle19}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 19 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle19Flashcard;
