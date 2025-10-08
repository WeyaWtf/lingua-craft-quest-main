import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle25Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle25Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "မြို့နယ်|myo-neh", right: "township", id: "1-1" },
        { left: "ရပ်ကွက်|yaq-kweq", right: "ward", id: "1-2" },
        { left: "ရွာ|ywa", right: "village", id: "1-3" },
        { left: "မြို့|myo", right: "town, city", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ကျေးလက်|kye-leq", right: "countryside", id: "2-1" },
        { left: "မြောက်|myauq", right: "north", id: "2-2" },
        { left: "တောင်|taung", right: "south", id: "2-3" },
        { left: "အရှေ့|a-shay", right: "east", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "အနောက်|a-nauq", right: "west", id: "3-1" },
        { left: "မြန်မာ|myan-ma", right: "Myanmar", id: "3-2" },
        { left: "ရန်ကုန်|yan-goun", right: "Yangon", id: "3-3" },
        { left: "မန္တလေး|man-da-le", right: "Mandalay", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "နေပြည်တော်|nay-pyi-daw", right: "Naypyidaw", id: "4-1" },
        { left: "ပုဂံ|pu-gan", right: "Bagan", id: "4-2" },
        { left: "အမေရိကန်|a-may-yi-kan", right: "America", id: "4-3" },
        { left: "အင်္ဂလန်|ein-ga-lan", right: "England", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "တရုတ်|ta-youq", right: "China", id: "5-1" },
        { left: "ဂျပန်|ja-pan", right: "Japan", id: "5-2" },
        { left: "ကိုရီးယား|ko-yi-ya", right: "Korea", id: "5-3" },
        { left: "ပြင်သစ်|pyin-thiq", right: "France", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "ဂျာမနီ|ja-ma-ni", right: "Germany", id: "6-1" },
        { left: "အီတလီ|i-ta-li", right: "Italy", id: "6-2" },
        { left: "ရုရှား|you-sha", right: "Russia", id: "6-3" },
        { left: "သြစတြေးလျှ|aw-za-tay-hlya", right: "Australia", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "ကနေဒါ|ka-nay-da", right: "Canada", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 25 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 25 Association created:', data);
      toast.success("Exercise Bundle 25 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 25 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 25"
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
            onClick={insertBundle25Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 25 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle25Association;
