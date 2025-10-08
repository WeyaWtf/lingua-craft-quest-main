import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle24Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle24 = async () => {
    setIsInserting(true);

    const bundle24Cards = [
      { front: "dark", back: "မှောင်|hmaung", category: "vocabulary", id: "1" },
      { front: "Monday", back: "တနင်္လာနေ့|ta-nin-la-nay", category: "vocabulary", id: "2" },
      { front: "Tuesday", back: "အင်္ဂါနေ့|ein-ga-nay", category: "vocabulary", id: "3" },
      { front: "Wednesday", back: "ဗုဒ္ဓဟူးနေ့|bouq-ta-hu-nay", category: "vocabulary", id: "4" },
      { front: "Thursday", back: "ကြာသပတေးနေ့|kya-tha-pa-te-nay", category: "vocabulary", id: "5" },
      { front: "Friday", back: "သောကြာနေ့|thau-kya-nay", category: "vocabulary", id: "6" },
      { front: "Saturday", back: "စနေနေ့|sa-ne-nay", category: "vocabulary", id: "7" },
      { front: "Sunday", back: "တနင်္ဂနွေနေ့|ta-nin-ga-nway-nay", category: "vocabulary", id: "8" },
      { front: "January", back: "ဇန်နဝါရီ|zan-na-wa-yi", category: "vocabulary", id: "9" },
      { front: "February", back: "ဖေဖော်ဝါရီ|hpay-hpaw-wa-yi", category: "vocabulary", id: "10" },
      { front: "March", back: "မတ်|maq", category: "vocabulary", id: "11" },
      { front: "April", back: "ဧပြီ|ay-pyi", category: "vocabulary", id: "12" },
      { front: "May", back: "မေ|may", category: "vocabulary", id: "13" },
      { front: "June", back: "ဇွန်|zun", category: "vocabulary", id: "14" },
      { front: "July", back: "ဇူလိုင်|zu-lain", category: "vocabulary", id: "15" },
      { front: "August", back: "သြဂုတ်|aw-gouq", category: "vocabulary", id: "16" },
      { front: "September", back: "စက်တင်ဘာ|seq-tin-ba", category: "vocabulary", id: "17" },
      { front: "October", back: "အောက်တိုဘာ|auq-to-ba", category: "vocabulary", id: "18" },
      { front: "November", back: "နိုဝင်ဘာ|no-win-ba", category: "vocabulary", id: "19" },
      { front: "December", back: "ဒီဇင်ဘာ|di-zin-ba", category: "vocabulary", id: "20" },
      { front: "summer", back: "နွေရာသီ|nway-ya-thi", category: "vocabulary", id: "21" },
      { front: "rainy season", back: "မိုးရာသီ|mo-ya-thi", category: "vocabulary", id: "22" },
      { front: "winter", back: "ဆောင်းရာသီ|saung-ya-thi", category: "vocabulary", id: "23" },
      { front: "country", back: "နိုင်ငံ|nain-ngan", category: "vocabulary", id: "24" },
      { front: "state", back: "ပြည်နယ်|pyi-neh", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 24 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle24Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 24 Flashcards created:', data);
      toast.success("Exercise Bundle 24 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 24 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 24"
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
            onClick={insertBundle24}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 24 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle24Flashcard;
