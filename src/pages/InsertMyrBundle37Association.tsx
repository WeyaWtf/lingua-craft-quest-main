import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle37Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle37Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "သြဇာ|aw-za", right: "influence", id: "1-1" },
        { left: "အကျိုးသက်ရောက်မှု|a-kyo-theq-yauq-hmu", right: "impact", id: "1-2" },
        { left: "အကြောင်းရင်း|a-kyaung-yin", right: "cause", id: "1-3" },
        { left: "အကြောင်းပြချက်|a-kyaung-pya-cheq", right: "reason", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ဆင်ခြေပြောဆို|hsin-chay-pyaw-hso", right: "excuse", id: "2-1" },
        { left: "ရှင်းပြချက်|shin-pya-cheq", right: "explanation", id: "2-2" },
        { left: "နမူနာ|na-mu-na", right: "example", id: "2-3" },
        { left: "အခြေအနေ|a-chay-a-nay", right: "case, situation", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "အခြေအနေ|a-chay-a-nay", right: "situation", id: "3-1" },
        { left: "အဖြစ်အပျက်|a-phyiq-a-pyeq", right: "event", id: "3-2" },
        { left: "ဇာတ်လမ်း|zaq-lun", right: "story", id: "3-3" },
        { left: "သမိုင်း|tha-main", right: "history", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "မူလအစ|mu-la-a-sa", right: "origin", id: "4-1" },
        { left: "အစ|a-sa", right: "beginning", id: "4-2" },
        { left: "အဆုံး|a-zone", right: "end", id: "4-3" },
        { left: "အကြား|a-kya", right: "between", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "အတွင်း|a-twin", right: "inside", id: "5-1" },
        { left: "အပြင်|a-pyin", right: "outside", id: "5-2" },
        { left: "ရှေ့မှောက်|shay-hmauq", right: "in front", id: "5-3" },
        { left: "နောက်ကွယ်|nauq-kweh", right: "behind", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "အထက်|a-hteq", right: "above", id: "6-1" },
        { left: "အောက်|auq", right: "below", id: "6-2" },
        { left: "ရှေ့သို့|shay-tho", right: "ahead", id: "6-3" },
        { left: "နောက်သို့|nauq-tho", right: "backward", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "ဘယ်ဘက်|beh-beq", right: "left side", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 37 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 37 Association created:', data);
      toast.success("Exercise Bundle 37 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 37 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 37"
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
            onClick={insertBundle37Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 37 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle37Association;
