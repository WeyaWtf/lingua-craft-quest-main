import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle14Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle14Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "နေကောင်း|ne-kaung", right: "well, healthy", id: "1-1" },
        { left: "ကျန်းမာ|kyan-ma", right: "healthy", id: "1-2" },
        { left: "အားနည်း|a-ni", right: "weak", id: "1-3" },
        { left: "ကျန်းမာရေး|kyan-ma-ye", right: "health", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "သေ|thay", right: "die", id: "2-1" },
        { left: "မွေး|mwe", right: "born", id: "2-2" },
        { left: "အသက်|a-theq", right: "age, life", id: "2-3" },
        { left: "လူငယ်|lu-ngeh", right: "young person", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "လူကြီး|lu-kyi", right: "old person", id: "3-1" },
        { left: "အိမ်ထောင်ကျ|ein-htaung-kya", right: "marry", id: "3-2" },
        { left: "ကွာရှင်း|kwa-shin", right: "divorce", id: "3-3" },
        { left: "ကိုယ်ဝန်|ko-wun", right: "pregnant", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "မွေးဖွား|mwe-phwa", right: "give birth", id: "4-1" },
        { left: "ကျွေး|kywé", right: "feed", id: "4-2" },
        { left: "ပြုစု|pyu-zu", right: "take care of", id: "4-3" },
        { left: "ကူညီ|ku-nyi", right: "help", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "တောင်း|taung", right: "ask for, request", id: "5-1" },
        { left: "ကျေးဇူး|kye-zu", right: "thank you", id: "5-2" },
        { left: "တောင်းပန်|taung-pan", right: "apologize", id: "5-3" },
        { left: "ဝမ်းသာ|wun-tha", right: "pleased, glad", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "လက်ခံ|leq-khan", right: "receive, accept", id: "6-1" },
        { left: "နှုတ်ဆက်|hnoq-hseq", right: "say goodbye", id: "6-2" },
        { left: "တွေ့|tway", right: "meet", id: "6-3" },
        { left: "ရှာ|sha", right: "look for, search", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "တွေ့|tway", right: "find", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 14 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 14 Association created:', data);
      toast.success("Exercise Bundle 14 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 14 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 14"
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
            onClick={insertBundle14Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 14 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle14Association;
