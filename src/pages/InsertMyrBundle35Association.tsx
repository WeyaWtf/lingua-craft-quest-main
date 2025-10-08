import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle35Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle35Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "စစ်မှန်|siq-hman", right: "sincere", id: "1-1" },
        { left: "ကရုဏာ|ka-yu-na", right: "compassion", id: "1-2" },
        { left: "ကြင်နာ|kyin-na", right: "kindness", id: "1-3" },
        { left: "စိတ်ရှည်|seiq-sheh", right: "patience", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ကြိုးစား|kyo-za", right: "effort", id: "2-1" },
        { left: "ရည်ရွယ်|yeh-yweh", right: "intention", id: "2-2" },
        { left: "စိတ်ပိုင်းဖြတ်|seiq-pain-phyaq", right: "determination", id: "2-3" },
        { left: "စိတ်အားထက်သန်|seiq-a-hteq-than", right: "enthusiasm", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "စိတ်ဝင်စား|seiq-win-za", right: "interest", id: "3-1" },
        { left: "စိုးရိမ်မှု|so-yein-hmu", right: "concern", id: "3-2" },
        { left: "သတိပြု|tha-ti-pyu", right: "attention", id: "3-3" },
        { left: "သတိထား|tha-ti-hta", right: "caution", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "လုံခြုံရေး|loun-khoun-ye", right: "safety", id: "4-1" },
        { left: "အဆင်ပြေ|a-hsin-pyay", right: "convenience", id: "4-2" },
        { left: "သက်တောင့်သက်သာ|theq-taung-theq-tha", right: "comfort", id: "4-3" },
        { left: "သန့်ရှင်း|than-shin", right: "cleanliness", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "စည်းကမ်း|si-kan", right: "orderliness", id: "5-1" },
        { left: "တာဝန်ယူ|ta-wun-yu", right: "responsibility", id: "5-2" },
        { left: "တရား|ta-ya", right: "justice", id: "5-3" },
        { left: "တန်းတူ|tan-tu", right: "equality", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "ကွာခြားချက်|kwa-cha-cheq", right: "difference", id: "6-1" },
        { left: "မတူကွဲပြား|ma-tu-kweh-pya", right: "diversity", id: "6-2" },
        { left: "တူညီမှု|tu-nyi-hmu", right: "similarity", id: "6-3" },
        { left: "ထူးခြား|htu-cha", right: "unique", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "အထူး|a-htu", right: "special", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 35 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 35 Association created:', data);
      toast.success("Exercise Bundle 35 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 35 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 35"
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
            onClick={insertBundle35Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 35 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle35Association;
