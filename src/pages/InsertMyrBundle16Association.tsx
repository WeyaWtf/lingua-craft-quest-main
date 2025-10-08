import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle16Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle16Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "ဖြတ်သန်း|phyaq-than", right: "pass through", id: "1-1" },
        { left: "ပတ်ပတ်လည်|paq-paq-leh", right: "around", id: "1-2" },
        { left: "ရောက်|yauq", right: "arrive", id: "1-3" },
        { left: "ပို့|po", right: "send", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "လက်ခံ|leq-khan", right: "receive", id: "2-1" },
        { left: "ခွဲ|khweh", right: "divide", id: "2-2" },
        { left: "ပေါင်း|paung", right: "combine", id: "2-3" },
        { left: "ခွဲခြား|khweh-cha", right: "separate", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ရောစပ်|yaw-zaq", right: "mix", id: "3-1" },
        { left: "တိုး|to", right: "increase", id: "3-2" },
        { left: "လျှော့|hlshaw", right: "decrease, reduce", id: "3-3" },
        { left: "လို|lo", right: "need, want", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ပိုလျှံ|po-hlyan", right: "excess", id: "4-1" },
        { left: "လောက်|lauq", right: "enough", id: "4-2" },
        { left: "တူ|tu", right: "equal, same", id: "4-3" },
        { left: "တူညီ|tu-nyi", right: "identical", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "မတူ|ma-tu", right: "different", id: "5-1" },
        { left: "တူရာ|tu-ya", right: "similar", id: "5-2" },
        { left: "ပိုများ|po-mya", right: "more", id: "5-3" },
        { left: "အများဆုံး|a-mya-zone", right: "most", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "ပိုနည်း|po-ni", right: "less", id: "6-1" },
        { left: "အနည်းဆုံး|a-ni-zone", right: "least", id: "6-2" },
        { left: "ထက်|hteq", right: "than", id: "6-3" },
        { left: "ထက်ပိုကောင်း|hteq-po-kaung", right: "better", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "အကောင်းဆုံး|a-kaung-zone", right: "best", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 16 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 16 Association created:', data);
      toast.success("Exercise Bundle 16 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 16 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 16"
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
            onClick={insertBundle16Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 16 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle16Association;
