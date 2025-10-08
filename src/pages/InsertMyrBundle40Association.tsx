import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle40Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle40Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "စကြာဝဠာ|sa-kya-wa-la", right: "universe", id: "1-1" },
        { left: "သဘာဝ|tha-ba-wa", right: "nature", id: "1-2" },
        { left: "ပတ်ဝန်းကျင်|paq-wun-kyin", right: "environment", id: "1-3" },
        { left: "လေထု|lay-htu", right: "atmosphere", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ညစ်ညမ်း|nyi-nyan", right: "pollution", id: "2-1" },
        { left: "အမှိုက်|a-hmaiq", right: "garbage", id: "2-2" },
        { left: "စွမ်းအင်|zun-ein", right: "energy", id: "2-3" },
        { left: "လျှပ်စစ်|hlaq-siq", right: "electricity", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ဆီ|hsi", right: "oil", id: "3-1" },
        { left: "ဓာတ်ငွေ့|daq-ngweh", right: "gas", id: "3-2" },
        { left: "ကျောက်မီးသွေး|kyauq-mi-thwe", right: "coal", id: "3-3" },
        { left: "နေရောင်ခြည်|ne-yaung-cheh", right: "sunlight", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "လေအား|lay-a", right: "wind power", id: "4-1" },
        { left: "ရေအား|ye-a", right: "water power", id: "4-2" },
        { left: "သဘာဝအရင်းအမြစ်|tha-ba-wa-a-yin-a-myiq", right: "natural resources", id: "4-3" },
        { left: "ပတ်ဝန်းကျင်ထိန်းသိမ်း|paq-wun-kyin-htein-thein", right: "environmental protection", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ရာသီဥတု|ya-thi-u-tu", right: "climate", id: "5-1" },
        { left: "ရာသီဥတုပြောင်းလဲ|ya-thi-u-tu-pyaung-leh", right: "climate change", id: "5-2" },
        { left: "သစ်တောပြုန်းတီး|thiq-taw-pyoun-ti", right: "deforestation", id: "5-3" },
        { left: "ဇီဝမျိုးစုံ|zi-wa-myo-zoun", right: "biodiversity", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "ရေရှားပါးမှု|ye-sha-pa-hmu", right: "water scarcity", id: "6-1" },
        { left: "စွမ်းအင်ချွေတာမှု|zun-ein-chway-ta-hmu", right: "energy conservation", id: "6-2" },
        { left: "ပြန်လည်အသုံးချ|pyan-leh-a-thoun-cha", right: "recycle", id: "6-3" },
        { left: "ရေရှည်တည်တံ့|ye-sheh-teh-tan", right: "sustainable", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "အနာဂတ်မျိုးဆက်|a-na-gaq-myo-hseq", right: "future generations", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 40 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 40 Association created:', data);
      toast.success("Exercise Bundle 40 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 40 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 40"
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
            onClick={insertBundle40Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 40 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle40Association;
