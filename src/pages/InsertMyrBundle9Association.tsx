import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle9Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle9Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "အရောင်|a-yaung", right: "color", id: "1-1" },
        { left: "အဖြူ|a-phyu", right: "white", id: "1-2" },
        { left: "အမည်း|a-myi", right: "black", id: "1-3" },
        { left: "အနီ|a-ni", right: "red", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "အစိမ်း|a-sein", right: "green", id: "2-1" },
        { left: "အပြာ|a-pya", right: "blue", id: "2-2" },
        { left: "အဝါ|a-wa", right: "yellow", id: "2-3" },
        { left: "လိမ္မော်ရောင်|lein-maw-yaung", right: "orange", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ခရမ်းရောင်|kha-yan-yaung", right: "purple", id: "3-1" },
        { left: "ပန်းရောင်|pan-yaung", right: "pink", id: "3-2" },
        { left: "ညိုရောင်|nyo-yaung", right: "brown", id: "3-3" },
        { left: "မီးခိုးရောင်|mi-kho-yaung", right: "gray", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "အစားအသောက်|a-sa-a-thauq", right: "food", id: "4-1" },
        { left: "ထမင်း|hta-min", right: "rice (cooked)", id: "4-2" },
        { left: "ဆန်|hsan", right: "rice (uncooked)", id: "4-3" },
        { left: "အချိုပွဲ|a-cho-bweh", right: "dessert", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "သစ်သီး|thiq-thi", right: "fruit", id: "5-1" },
        { left: "ဟင်းသီးဟင်းရွက်|hin-thi-hin-yweq", right: "vegetables", id: "5-2" },
        { left: "အသား|a-tha", right: "meat", id: "5-3" },
        { left: "ဝက်သား|weq-tha", right: "pork", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "ကြက်သား|kyeq-tha", right: "chicken", id: "6-1" },
        { left: "ငါး|nga", right: "fish", id: "6-2" },
        { left: "ပုစွန်|pu-zun", right: "shrimp", id: "6-3" },
        { left: "ကြက်ဥ|kyeq-u", right: "egg", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "နို့|no", right: "milk", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 9 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 9 Association created:', data);
      toast.success("Exercise Bundle 9 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 9 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 9"
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
            onClick={insertBundle9Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 9 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle9Association;
