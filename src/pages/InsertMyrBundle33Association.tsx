import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle33Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle33Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "သုတေသန|thu-tay-tha-na", right: "research", id: "1-1" },
        { left: "ပညာရေး|pyin-nya-ye", right: "education", id: "1-2" },
        { left: "သင်ယူမှု|thin-yu-hmu", right: "learning", id: "1-3" },
        { left: "လေ့ကျင့်မှု|leh-kyin-hmu", right: "training", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "သင်ကြားမှု|thin-kya-hmu", right: "teaching", id: "2-1" },
        { left: "ရှင်းလင်းချက်|shin-lin-cheq", right: "explanation", id: "2-2" },
        { left: "မိတ်ဆက်|meiq-hseq", right: "introduction", id: "2-3" },
        { left: "ဖျော်ဖြေမှု|phyaw-phyay-hmu", right: "performance", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "တင်ပြချက်|tin-pya-cheq", right: "presentation", id: "3-1" },
        { left: "သရုပ်ပြ|tha-youq-pya", right: "demonstration", id: "3-2" },
        { left: "ပို့ချချက်|po-cheh-cheq", right: "lecture", id: "3-3" },
        { left: "ဆွေးနွေး|hswe-nwe", right: "discuss", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ဆွေးနွေးပွဲ|hswe-nwe-bweh", right: "seminar", id: "4-1" },
        { left: "ညီလာခံ|nyi-la-khan", right: "conference", id: "4-2" },
        { left: "ယှဉ်ပြိုင်|hyin-pain", right: "compete", id: "4-3" },
        { left: "အားကစားပြိုင်ပွဲ|a-za-pyain-bweh", right: "sports competition", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ဂီတဖျော်ဖြေပွဲ|gi-ta-phyaw-phyay-bweh", right: "concert", id: "5-1" },
        { left: "ပြဇာတ်|pya-zaq", right: "play, drama", id: "5-2" },
        { left: "ရုပ်ရှင်|youq-shin", right: "movie", id: "5-3" },
        { left: "ဇာတ်လမ်းတွဲ|zaq-lun-tweh", right: "drama series", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "အစီအစဉ်|a-si-a-sin", right: "program", id: "6-1" },
        { left: "လိုင်း|lain", right: "channel", id: "6-2" },
        { left: "အကြောင်းအရာ|a-kyaung-a-ya", right: "content", id: "6-3" },
        { left: "ခေါင်းစဉ်|khaung-sin", right: "topic, title", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "အကြောင်းအရာ|a-kyaung-a-ya", right: "subject matter", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 33 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 33 Association created:', data);
      toast.success("Exercise Bundle 33 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 33 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 33"
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
            onClick={insertBundle33Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 33 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle33Association;
