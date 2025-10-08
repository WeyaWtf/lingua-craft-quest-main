import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle19Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle19Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "ဆေးရုံ|hse-youn", right: "hospital", id: "1-1" },
        { left: "ဆေးခန်း|hse-khan", right: "clinic", id: "1-2" },
        { left: "ကျောင်း|kyaung", right: "school", id: "1-3" },
        { left: "တက္ကသိုလ်|teq-ka-tho", right: "university", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "စာကြည့်တိုက်|sa-kyi-taiq", right: "library", id: "2-1" },
        { left: "ဘုရား|phu-ya", right: "pagoda", id: "2-2" },
        { left: "ဘုန်းကြီးကျောင်း|boun-kyi-kyaung", right: "monastery", id: "2-3" },
        { left: "ဘုရားကျောင်း|phu-ya-kyaung", right: "temple", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ဘော်ဇာ|baw-za", right: "mosque", id: "3-1" },
        { left: "လေဆိပ်|lay-seiq", right: "airport", id: "3-2" },
        { left: "ရထားဘူတာ|ya-hta-bu-ta", right: "train station", id: "3-3" },
        { left: "ဘတ်စ်ကားမှတ်တိုင်|bat-sa-ka-hmaq-tain", right: "bus stop", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ဆိပ်ကမ်း|seiq-kan", right: "port, pier", id: "4-1" },
        { left: "နေရာ|ne-ya", right: "place", id: "4-2" },
        { left: "ဒီမှာ|di-hma", right: "here", id: "4-3" },
        { left: "ဟိုမှာ|ho-hma", right: "there", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ဘယ်မှာ|beh-hma", right: "where", id: "5-1" },
        { left: "ဘယ်|beh", right: "which", id: "5-2" },
        { left: "ဘာ|ba", right: "what", id: "5-3" },
        { left: "ဘယ်သူ|beh-thu", right: "who", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "ဘာကြောင့်|ba-kyaung", right: "why", id: "6-1" },
        { left: "ဘယ်လို|beh-lo", right: "how", id: "6-2" },
        { left: "ဘယ်တုန်းက|beh-toun-ga", right: "when", id: "6-3" },
        { left: "ဘယ်လောက်|beh-lauq", right: "how much, how many", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "လည်း|leh", right: "also, too", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 19 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 19 Association created:', data);
      toast.success("Exercise Bundle 19 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 19 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 19"
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
            onClick={insertBundle19Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 19 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle19Association;
