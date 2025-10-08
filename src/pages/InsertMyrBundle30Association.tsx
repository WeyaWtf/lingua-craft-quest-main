import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle30Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle30Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "အကြောင်းကြား|a-kyaung-kya", right: "inform", id: "1-1" },
        { left: "အစီရင်ခံစာ|a-si-yin-khan-za", right: "report", id: "1-2" },
        { left: "သတင်း|tha-din", right: "news", id: "1-3" },
        { left: "အချက်အလက်|a-cheq-a-leq", right: "information", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ကိန်းဂဏန်း|kein-ga-nan", right: "statistics", id: "2-1" },
        { left: "နံပါတ်|nan-baq", right: "number", id: "2-2" },
        { left: "ပမာဏ|pa-ma-na", right: "amount", id: "2-3" },
        { left: "ရာခိုင်နှုန်း|ya-khain-hnoun", right: "percent", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "တက်လာ|teq-la", right: "increase", id: "3-1" },
        { left: "ကျဆင်း|kya-hsin", right: "decrease", id: "3-2" },
        { left: "တည်ငြိမ်|teh-nyein", right: "stable", id: "3-3" },
        { left: "ပြောင်းလဲ|pyaung-leh", right: "change", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ဖွံ့ဖြိုး|hpwun-phyo", right: "develop", id: "4-1" },
        { left: "တိုးတက်|to-teq", right: "progress", id: "4-2" },
        { left: "ခေတ်မီ|khiq-mi", right: "modern", id: "4-3" },
        { left: "ရှေးဟောင်း|shay-haung", right: "ancient", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ခေတ်ပြိုင်|khiq-pain", right: "contemporary", id: "5-1" },
        { left: "အနာဂတ်|a-na-gaq", right: "future", id: "5-2" },
        { left: "အတိတ်|a-tiq", right: "past", id: "5-3" },
        { left: "ပစ္စပ္ပန်|piq-sa-ban", right: "present", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "အချိန်ကာလ|a-chain-ka-la", right: "period", id: "6-1" },
        { left: "အဆင့်|a-hsin", right: "stage", id: "6-2" },
        { left: "အဆင့်ဆင့်|a-hsin-hsin", right: "step by step", id: "6-3" },
        { left: "လုပ်ငန်းစဉ်|loq-ngan-sin", right: "process", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "နည်းလမ်း|ni-lun", right: "method", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 30 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 30 Association created:', data);
      toast.success("Exercise Bundle 30 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 30 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 30"
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
            onClick={insertBundle30Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 30 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle30Association;
