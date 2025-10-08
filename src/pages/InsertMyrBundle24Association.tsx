import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle24Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle24Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "မှောင်|hmaung", right: "dark", id: "1-1" },
        { left: "တနင်္လာနေ့|ta-nin-la-nay", right: "Monday", id: "1-2" },
        { left: "အင်္ဂါနေ့|ein-ga-nay", right: "Tuesday", id: "1-3" },
        { left: "ဗုဒ္ဓဟူးနေ့|bouq-ta-hu-nay", right: "Wednesday", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ကြာသပတေးနေ့|kya-tha-pa-te-nay", right: "Thursday", id: "2-1" },
        { left: "သောကြာနေ့|thau-kya-nay", right: "Friday", id: "2-2" },
        { left: "စနေနေ့|sa-ne-nay", right: "Saturday", id: "2-3" },
        { left: "တနင်္ဂနွေနေ့|ta-nin-ga-nway-nay", right: "Sunday", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ဇန်နဝါရီ|zan-na-wa-yi", right: "January", id: "3-1" },
        { left: "ဖေဖော်ဝါရီ|hpay-hpaw-wa-yi", right: "February", id: "3-2" },
        { left: "မတ်|maq", right: "March", id: "3-3" },
        { left: "ဧပြီ|ay-pyi", right: "April", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "မေ|may", right: "May", id: "4-1" },
        { left: "ဇွန်|zun", right: "June", id: "4-2" },
        { left: "ဇူလိုင်|zu-lain", right: "July", id: "4-3" },
        { left: "သြဂုတ်|aw-gouq", right: "August", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "စက်တင်ဘာ|seq-tin-ba", right: "September", id: "5-1" },
        { left: "အောက်တိုဘာ|auq-to-ba", right: "October", id: "5-2" },
        { left: "နိုဝင်ဘာ|no-win-ba", right: "November", id: "5-3" },
        { left: "ဒီဇင်ဘာ|di-zin-ba", right: "December", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "နွေရာသီ|nway-ya-thi", right: "summer", id: "6-1" },
        { left: "မိုးရာသီ|mo-ya-thi", right: "rainy season", id: "6-2" },
        { left: "ဆောင်းရာသီ|saung-ya-thi", right: "winter", id: "6-3" },
        { left: "နိုင်ငံ|nain-ngan", right: "country", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "ပြည်နယ်|pyi-neh", right: "state", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 24 Association",
      description: "Match Burmese vocabulary with English translations (beginner level)",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        pairGroups: pairGroups,
        shufflePairs: true
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 24 Association created:', data);
      toast.success("Exercise Bundle 24 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 24 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 24"
            with 25 words organized in 7 pages.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Exercise details:</h3>
            <ul className="text-sm space-y-1">
              <li>• Type: Association (matching)</li>
              <li>• Total pairs: 25</li>
              <li>• Organization: 7 pages</li>
              <li>• Pages 1-6: 4 pairs each</li>
              <li>• Page 7: 1 pair</li>
              <li>• Language: Burmese</li>
              <li>• Level: Beginner</li>
              <li>• Format: Burmese (script + romanization) → English</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Structure:</h3>
            <p className="text-sm">
              • <strong>Left column:</strong> Burmese script (large) + romanization (gray small)<br/>
              • <strong>Right column:</strong> English translation<br/>
              • <strong>Gameplay:</strong> Click left then click corresponding right match
            </p>
          </div>

          <Button
            size="lg"
            onClick={insertBundle24Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 24 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle24Association;
