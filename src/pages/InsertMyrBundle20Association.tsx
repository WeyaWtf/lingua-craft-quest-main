import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle20Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle20Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "နဲ့|neh", right: "with", id: "1-1" },
        { left: "နှင့်|hnin", right: "with (formal)", id: "1-2" },
        { left: "တူတူ|tu-tu", right: "together", id: "1-3" },
        { left: "ကိုယ့်ကိုယ်ကို|ko-ko-ko", right: "oneself", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "လား|la", right: "question particle", id: "2-1" },
        { left: "လေ|lay", right: "particle (emphasis)", id: "2-2" },
        { left: "များ|mya", right: "plural marker", id: "2-3" },
        { left: "မ|ma", right: "not", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "မဟုတ်|ma-houq", right: "no, not", id: "3-1" },
        { left: "ဟုတ်ကဲ့|houq-keh", right: "yes", id: "3-2" },
        { left: "ကဲ|keh", right: "okay", id: "3-3" },
        { left: "ဟုတ်ပြီ|houq-pyi", right: "yes, alright", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "မှန်|hman", right: "true, correct", id: "4-1" },
        { left: "မှန်ကန်|hman-kan", right: "accurate", id: "4-2" },
        { left: "တကယ်|ta-keh", right: "really", id: "4-3" },
        { left: "အမှန်|a-hman", right: "truth", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ဖြစ်နိုင်|phyiq-nain", right: "possible", id: "5-1" },
        { left: "ဖြစ်နိုင်ဖွယ်|phyiq-nain-phweh", right: "probably", id: "5-2" },
        { left: "ဖြစ်ရမည်|phyiq-ya-meh", right: "must", id: "5-3" },
        { left: "သင့်တော်|thin-taw", right: "should", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "လို|lo", right: "want", id: "6-1" },
        { left: "ကြိုက်|kyaiq", right: "like", id: "6-2" },
        { left: "ချစ်|chiq", right: "love", id: "6-3" },
        { left: "မုန်း|moun", right: "hate", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "ကြောက်|kyauq", right: "fear", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 20 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 20 Association created:', data);
      toast.success("Exercise Bundle 20 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 20 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 20"
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
            onClick={insertBundle20Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 20 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle20Association;
