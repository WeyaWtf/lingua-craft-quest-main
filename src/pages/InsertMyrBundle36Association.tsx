import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle36Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle36Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "လှပမှု|hla-pa-hmu", right: "beauty", id: "1-1" },
        { left: "စွဲမက်ဖွယ်|zweh-meq-phweh", right: "attractive", id: "1-2" },
        { left: "ဖျော်ဖြေရေး|phyaw-phyay-ye", right: "entertainment", id: "1-3" },
        { left: "ပျော်ရွှင်မှု|pyaw-shwin-hmu", right: "enjoyment", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ကျန်းမာချမ်းသာ|kyan-ma-chan-tha", right: "well-being", id: "2-1" },
        { left: "ချမ်းသာကြွယ်ဝ|chan-tha-kywe-wa", right: "prosperity", id: "2-2" },
        { left: "စည်းစိမ်|si-seim", right: "wealth", id: "2-3" },
        { left: "ဆင်းရဲ|hsin-yay", right: "poverty", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ခက်ခဲ|kheq-kheh", right: "difficulty", id: "3-1" },
        { left: "ဒုက္ခ|douk-kha", right: "suffering", id: "3-2" },
        { left: "နာကျင်|na-kyin", right: "pain", id: "3-3" },
        { left: "အန္တရာယ်|an-ta-ya", right: "danger", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "စွန့်စား|zun-za", right: "risk", id: "4-1" },
        { left: "ဖြစ်နိုင်ခြေ|phyiq-nain-chay", right: "possibility", id: "4-2" },
        { left: "အခွင့်အလမ်း|a-khwin-a-lun", right: "opportunity", id: "4-3" },
        { left: "ကံကောင်းမှု|kan-kaung-hmu", right: "luck", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ကံကြမ္မာ|kan-kyan-ma", right: "fate", id: "5-1" },
        { left: "နာမ|na-ma", right: "destiny", id: "5-2" },
        { left: "အနာဂတ်|a-na-gaq", right: "future", id: "5-3" },
        { left: "မျှော်လင့်ချက်|hshaw-lin-cheq", right: "hope", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "အိပ်မက်|eiq-meq", right: "dream", id: "6-1" },
        { left: "ပန်းတိုင်|pan-tain", right: "target", id: "6-2" },
        { left: "ဦးတည်ချက်|u-teh-cheq", right: "destination", id: "6-3" },
        { left: "ရလဒ်|ya-laq", right: "result", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "အကျိုးဆက်|a-kyo-hseq", right: "consequence", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 36 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 36 Association created:', data);
      toast.success("Exercise Bundle 36 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 36 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 36"
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
            onClick={insertBundle36Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 36 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle36Association;
