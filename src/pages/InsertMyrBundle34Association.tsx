import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle34Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle34Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "အပိုင်း|a-pain", right: "part, section", id: "1-1" },
        { left: "အခန်း|a-khan", right: "chapter", id: "1-2" },
        { left: "စာမျက်နှာ|sa-myeq-hna", right: "page", id: "1-3" },
        { left: "လိုင်း|lain", right: "line", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "စာသား|sa-tha", right: "text", id: "2-1" },
        { left: "သတင်းအချက်အလက်|tha-din-a-cheq-a-leq", right: "news information", id: "2-2" },
        { left: "ရင်းမြစ်|yin-myiq", right: "source", id: "2-3" },
        { left: "ကိုးကား|ko-ka", right: "reference", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ယုံကြည်စိတ်ချရ|youn-kyi-seiq-cha-ya", right: "reliable", id: "3-1" },
        { left: "တိကျ|ti-kya", right: "accurate", id: "3-2" },
        { left: "မှန်ကန်|hman-kan", right: "correct", id: "3-3" },
        { left: "အမှား|a-hma", right: "mistake", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "အမှားအယွင်း|a-hma-a-ywin", right: "error", id: "4-1" },
        { left: "အနာအဆာ|a-na-a-hsa", right: "defect", id: "4-2" },
        { left: "ပြဿနာ|pyin-tha-na", right: "problem", id: "4-3" },
        { left: "အတားအဆီး|a-ta-a-hsi", right: "obstacle", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ပြဿနာဖြေရှင်းခြင်း|pyin-tha-na-phye-shin-chin", right: "problem-solving", id: "5-1" },
        { left: "အဖြေ|a-phyay", right: "solution", id: "5-2" },
        { left: "အဖြေ|a-phyay", right: "answer", id: "5-3" },
        { left: "မေးခွန်း|me-khun", right: "question", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "သံသယ|than-theh", right: "doubt", id: "6-1" },
        { left: "ယုံကြည်ချက်|youn-kyi-cheq", right: "belief", id: "6-2" },
        { left: "ယုံကြည်မှု|youn-kyi-hmu", right: "confidence", id: "6-3" },
        { left: "ယုံကြည်စိတ်ချ|youn-kyi-seiq-cha", right: "trust", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "ရိုးသား|yo-tha", right: "honest", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 34 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 34 Association created:', data);
      toast.success("Exercise Bundle 34 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 34 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 34"
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
            onClick={insertBundle34Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 34 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle34Association;
