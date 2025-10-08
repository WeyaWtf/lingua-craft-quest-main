import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle27Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle27Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "အခမ်းအနား|a-khan-a-na", right: "ceremony", id: "1-1" },
        { left: "လက်ဆောင်|leq-saung", right: "gift", id: "1-2" },
        { left: "ကတ်|kaq", right: "card", id: "1-3" },
        { left: "ပန်း|pan", right: "flower", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ဖယောင်းတိုင်|hpyaung-tain", right: "candle", id: "2-1" },
        { left: "နံ့သာပေါင်း|nan-tha-paung", right: "incense", id: "2-2" },
        { left: "ပန်းကုံး|pan-koun", right: "garland", id: "2-3" },
        { left: "ကိတ်မုန့်|keiq-moun", right: "cake", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ကောင်းချီး|kaung-chi", right: "blessing", id: "3-1" },
        { left: "ကံကောင်း|kan-kaung", right: "good luck", id: "3-2" },
        { left: "ကျန်းမာရေး|kyan-ma-ye", right: "health", id: "3-3" },
        { left: "ပျော်ရွှင်မှု|pyaw-shwin-hmu", right: "happiness", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ချစ်ခြင်းမေတ္တာ|chiq-chin-meq-ta", right: "love", id: "4-1" },
        { left: "အောင်မြင်မှု|aung-myin-hmu", right: "success", id: "4-2" },
        { left: "စီးပွားရေး|zi-bwa-ye", right: "economy", id: "4-3" },
        { left: "စီးပွား|zi-bwa", right: "business", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ကူးသန်းရောင်း|ku-than-yaung", right: "trade", id: "5-1" },
        { left: "စတော့|sa-taw", right: "stock market", id: "5-2" },
        { left: "ရင်းနှီး|yin-hni", right: "invest", id: "5-3" },
        { left: "အမြတ်|a-myaq", right: "profit", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "အရှုံး|a-shoun", right: "loss", id: "6-1" },
        { left: "အတိုး|a-to", right: "interest", id: "6-2" },
        { left: "အခွန်|a-khun", right: "tax", id: "6-3" },
        { left: "ဝင်ငွေ|win-ngway", right: "income", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "အသုံးစရိတ်|a-thoun-za-yeiq", right: "expense", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 27 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 27 Association created:', data);
      toast.success("Exercise Bundle 27 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 27 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 27"
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
            onClick={insertBundle27Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 27 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle27Association;
