import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle5Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle5Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "နှစ်|hniq", right: "year", id: "1-1" },
        { left: "လ|la", right: "month, moon", id: "1-2" },
        { left: "ပတ်|paq", right: "week", id: "1-3" },
        { left: "နာရီ|na-yi", right: "hour, clock", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "မိနစ်|mi-niq", right: "minute", id: "2-1" },
        { left: "စက္ကန့်|seq-kan", right: "second", id: "2-2" },
        { left: "အချိန်|a-chain", right: "time", id: "2-3" },
        { left: "အချိန်အခါ|a-chain-a-kha", right: "period", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "အရင်|a-yin", right: "before", id: "3-1" },
        { left: "နောက်|nauq", right: "after", id: "3-2" },
        { left: "အခု|a-khu", right: "now", id: "3-3" },
        { left: "ခဏ|kha-na", right: "moment", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ပြီး|pyi", right: "already, finished", id: "4-1" },
        { left: "သေး|the", right: "still, yet", id: "4-2" },
        { left: "အမြဲ|a-myeh", right: "always", id: "4-3" },
        { left: "မကြာခဏ|ma-kya-khan", right: "often", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "တစ်ခါတစ်ရံ|tiq-kha-tiq-yan", right: "sometimes", id: "5-1" },
        { left: "ဘယ်တော့မှ|beh-daw-ma", right: "never", id: "5-2" },
        { left: "အားလုံး|a-loun", right: "all, every", id: "5-3" },
        { left: "အချို့|a-cho", right: "some", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "များ|mya", right: "many", id: "6-1" },
        { left: "နည်း|ni", right: "few, little", id: "6-2" },
        { left: "အများကြီး|a-mya-kyi", right: "very much", id: "6-3" },
        { left: "အလုံအလောက်|a-loun-a-lauq", right: "enough", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "လွန်|lwun", right: "too much", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 5 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 5 Association created:', data);
      toast.success("Exercise Bundle 5 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 5 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 5"
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
            onClick={insertBundle5Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 5 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle5Association;
