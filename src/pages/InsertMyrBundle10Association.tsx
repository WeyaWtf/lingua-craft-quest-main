import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle10Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle10Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "လက်ဖက်ရည်|leq-pheq-yeh", right: "tea", id: "1-1" },
        { left: "ကော်ဖီ|kaw-hpi", right: "coffee", id: "1-2" },
        { left: "ဘီယာ|bi-ya", right: "beer", id: "1-3" },
        { left: "အရက်|a-yeq", right: "liquor", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ရည်ရွက်|yei-yweq", right: "juice", id: "2-1" },
        { left: "အင်္ကျီ|ein-gyi", right: "shirt", id: "2-2" },
        { left: "ဘောင်းဘီ|baung-bi", right: "pants", id: "2-3" },
        { left: "အဝတ်အထည်|a-wuq-a-hteh", right: "clothes", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "လုံချည်|loun-gyi", right: "longyi (skirt)", id: "3-1" },
        { left: "ဖိနပ်|hpna", right: "shoes", id: "3-2" },
        { left: "ခြေအိတ်|chay-eiq", right: "socks", id: "3-3" },
        { left: "ဦးထုပ်|u-htouq", right: "hat", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "မျက်မှန်|myeq-hman", right: "glasses", id: "4-1" },
        { left: "နာရီ|na-yi", right: "watch, clock", id: "4-2" },
        { left: "အိတ်|eiq", right: "bag", id: "4-3" },
        { left: "ထီး|hti", right: "umbrella", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "သော့|thaw", right: "key", id: "5-1" },
        { left: "ဖုန်း|phoun", right: "phone", id: "5-2" },
        { left: "လက်ကိုင်ဖုန်း|leq-kain-phoun", right: "mobile phone", id: "5-3" },
        { left: "ကွန်ပျူတာ|kun-pyu-ta", right: "computer", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "တီဗွီ|ti-bwi", right: "TV", id: "6-1" },
        { left: "ရေဒီယို|ye-di-yo", right: "radio", id: "6-2" },
        { left: "စာအုပ်|sa-ouq", right: "book", id: "6-3" },
        { left: "သတင်းစာ|tha-din-za", right: "newspaper", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "မဂ္ဂဇင်း|meq-ga-zin", right: "magazine", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 10 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 10 Association created:', data);
      toast.success("Exercise Bundle 10 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 10 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 10"
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
            onClick={insertBundle10Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 10 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle10Association;
