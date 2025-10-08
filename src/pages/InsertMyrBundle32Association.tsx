import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle32Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle32Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "လက်ခံယူ|leq-khan-yu", right: "accept", id: "1-1" },
        { left: "ငြင်းပယ်|nyin-peh", right: "refuse", id: "1-2" },
        { left: "ခွင့်ပြု|khwin-pyu", right: "approve", id: "1-3" },
        { left: "ပယ်ဖျက်|peh-phyeq", right: "cancel", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ရွှေ့ဆိုင်း|shway-hsain", right: "postpone", id: "2-1" },
        { left: "အတည်ပြု|a-teh-pyu", right: "confirm", id: "2-2" },
        { left: "ပြင်ဆင်|pyin-hsin", right: "correct", id: "2-3" },
        { left: "တိုးတက်စေ|to-teq-seh", right: "improve", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ပြုပြင်|pyu-pyin", right: "repair", id: "3-1" },
        { left: "ပြုစုစောင့်ရှောက်|pyu-zu-saung-shauq", right: "maintain", id: "3-2" },
        { left: "သန့်ရှင်းရေး|than-shin-ye", right: "cleaning", id: "3-3" },
        { left: "ဖွဲ့စည်း|phweh-si", right: "organize", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ပြင်ဆင်မှု|pyin-hsin-hmu", right: "preparation", id: "4-1" },
        { left: "စီစဉ်မှု|si-sin-hmu", right: "planning", id: "4-2" },
        { left: "ဆုံးဖြတ်ချက်|zone-phyaq-cheq", right: "decision", id: "4-3" },
        { left: "ရွေးချယ်မှု|ywe-cheh-hmu", right: "selection", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "စဉ်းစားသုံးသပ်|sin-za-thoun-thaq", right: "consideration", id: "5-1" },
        { left: "တွက်ချက်|tweq-cheq", right: "calculation", id: "5-2" },
        { left: "တိုင်းတာ|tain-ta", right: "measurement", id: "5-3" },
        { left: "ချိန်တွယ်|chein-tweh", right: "weigh", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "ရေတွက်|ye-tweq", right: "count", id: "6-1" },
        { left: "နှိုင်းယှဉ်|hnain-hyin", right: "compare", id: "6-2" },
        { left: "ခွဲခြမ်း|khweh-chyan", right: "analyze", id: "6-3" },
        { left: "လေ့လာ|leh-la", right: "observe", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "စမ်းသပ်|san-thaq", right: "experiment", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 32 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 32 Association created:', data);
      toast.success("Exercise Bundle 32 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 32 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 32"
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
            onClick={insertBundle32Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 32 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle32Association;
