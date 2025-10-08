import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle7Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle7Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "ဆရာဝန်|hsa-ya-wun", right: "doctor", id: "1-1" },
        { left: "သူနာပြု|thu-na-pyu", right: "nurse", id: "1-2" },
        { left: "ရဲ|yay", right: "police", id: "1-3" },
        { left: "တပ်မတော်|taq-ma-taw", right: "soldier", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "အလုပ်သမား|a-loq-tha-ma", right: "worker", id: "2-1" },
        { left: "သူဌေး|thu-hte", right: "boss", id: "2-2" },
        { left: "အိမ်|ein", right: "house, home", id: "2-3" },
        { left: "အခန်း|a-khan", right: "room", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "တံခါး|ta-ga", right: "door", id: "3-1" },
        { left: "ပြတင်းပေါက်|pya-tin-bauq", right: "window", id: "3-2" },
        { left: "စားပွဲ|sa-bweh", right: "table", id: "3-3" },
        { left: "ကုလားထိုင်|ku-la-htain", right: "chair", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ခုတင်|khu-tin", right: "bed", id: "4-1" },
        { left: "သေတ္တာ|thiq-ta", right: "cupboard", id: "4-2" },
        { left: "အိပ်ခန်း|eiq-khan", right: "bedroom", id: "4-3" },
        { left: "ရေချိုးခန်း|ye-cho-khan", right: "bathroom", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "မီးဖိုချောင်|mi-hpo-kyaung", right: "kitchen", id: "5-1" },
        { left: "ဥယျာဉ်|u-yan", right: "garden", id: "5-2" },
        { left: "ကား|ka", right: "car", id: "5-3" },
        { left: "ယာဉ်|yin", right: "vehicle", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "စက်ဘီး|seq-bi", right: "bicycle", id: "6-1" },
        { left: "မော်တော်ဆိုင်ကယ်|maw-taw-hsain-keh", right: "motorcycle", id: "6-2" },
        { left: "ဘတ်စ်ကား|bat-sa-ka", right: "bus", id: "6-3" },
        { left: "ရထား|ya-hta", right: "train", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "လေယာဉ်|lay-yin", right: "airplane", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 7 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 7 Association created:', data);
      toast.success("Exercise Bundle 7 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 7 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 7"
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
            onClick={insertBundle7Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 7 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle7Association;
