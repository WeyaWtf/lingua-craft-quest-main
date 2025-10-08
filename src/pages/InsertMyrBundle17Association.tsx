import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle17Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle17Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "တစ်|tiq", right: "one", id: "1-1" },
        { left: "နှစ်|hniq", right: "two", id: "1-2" },
        { left: "သုံး|thoun", right: "three", id: "1-3" },
        { left: "လေး|le", right: "four", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ငါး|nga", right: "five", id: "2-1" },
        { left: "ခြောက်|chauq", right: "six", id: "2-2" },
        { left: "ခုနစ်|khu-niq", right: "seven", id: "2-3" },
        { left: "ရှစ်|shiq", right: "eight", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ကိုး|ko", right: "nine", id: "3-1" },
        { left: "ဆယ်|hse", right: "ten", id: "3-2" },
        { left: "ဆယ့်တစ်|hse-tiq", right: "eleven", id: "3-3" },
        { left: "ဆယ့်နှစ်|hse-hniq", right: "twelve", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "နှစ်ဆယ်|hniq-hse", right: "twenty", id: "4-1" },
        { left: "သုံးဆယ်|thoun-hse", right: "thirty", id: "4-2" },
        { left: "လေးဆယ်|le-hse", right: "forty", id: "4-3" },
        { left: "ငါးဆယ်|nga-hse", right: "fifty", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ခြောက်ဆယ်|chauq-hse", right: "sixty", id: "5-1" },
        { left: "ခုနစ်ဆယ်|khu-niq-hse", right: "seventy", id: "5-2" },
        { left: "ရှစ်ဆယ်|shiq-hse", right: "eighty", id: "5-3" },
        { left: "ကိုးဆယ်|ko-hse", right: "ninety", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "တစ်ရာ|tiq-ya", right: "one hundred", id: "6-1" },
        { left: "တစ်ထောင်|tiq-htaung", right: "one thousand", id: "6-2" },
        { left: "တစ်သောင်း|tiq-thaung", right: "ten thousand", id: "6-3" },
        { left: "တစ်သိန်း|tiq-thein", right: "one hundred thousand", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "တစ်သန်း|tiq-than", right: "one million", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 17 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 17 Association created:', data);
      toast.success("Exercise Bundle 17 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 17 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 17"
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
            onClick={insertBundle17Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 17 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle17Association;
