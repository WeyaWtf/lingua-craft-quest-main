import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle31Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle31Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "နည်းပညာ|ni-pyin-nya", right: "technique", id: "1-1" },
        { left: "ကျွမ်းကျင်မှု|kyun-kyin-hmu", right: "skill", id: "1-2" },
        { left: "စွမ်းရည်|zun-yeh", right: "ability", id: "1-3" },
        { left: "အတွေ့အကြုံ|a-tway-a-kyoun", right: "experience", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "အသိပညာ|a-thi-pyin-nya", right: "knowledge", id: "2-1" },
        { left: "ဉာဏ်|nyan", right: "wisdom", id: "2-2" },
        { left: "နားလည်မှု|na-leh-hmu", right: "understanding", id: "2-3" },
        { left: "အတွေး|a-twe", right: "thought", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ထင်မြင်ချက်|htin-myin-cheq", right: "opinion", id: "3-1" },
        { left: "သဘောထား|tha-baw-hta", right: "attitude", id: "3-2" },
        { left: "ရှုထောင့်|shu-htaung", right: "perspective", id: "3-3" },
        { left: "ရည်ရွယ်ချက်|yeh-yweh-cheq", right: "purpose", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ပန်းတိုင်|pan-tain", right: "goal", id: "4-1" },
        { left: "အစီအစဉ်|a-si-a-sin", right: "plan", id: "4-2" },
        { left: "စီမံကိန်း|si-man-kein", right: "project", id: "4-3" },
        { left: "အလုပ်|a-loq", right: "work, task", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "လှုပ်ရှားမှု|hlouq-sha-hmu", right: "activity", id: "5-1" },
        { left: "အစည်းအဝေး|a-si-a-we", right: "meeting", id: "5-2" },
        { left: "ရက်ချိန်း|yeq-chein", right: "appointment", id: "5-3" },
        { left: "တွေ့ဆုံမေးမြန်း|tway-zone-me-myan", right: "interview", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "စကားဝိုင်း|za-ga-wain", right: "conversation", id: "6-1" },
        { left: "စကားပြော|za-ga-pyaw", right: "chat", id: "6-2" },
        { left: "ငြင်းခုံ|nyin-khoun", right: "debate", id: "6-3" },
        { left: "စစ်တန်းရေး|siq-tan-ye", right: "argue", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "သဘောတူ|tha-baw-tu", right: "agree", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 31 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 31 Association created:', data);
      toast.success("Exercise Bundle 31 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 31 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 31"
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
            onClick={insertBundle31Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 31 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle31Association;
