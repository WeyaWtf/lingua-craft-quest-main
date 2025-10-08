import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle21Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle21Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "မျှော်လင့်|hshaw-lin", right: "hope", id: "1-1" },
        { left: "ဆန္ဒ|san-da", right: "wish, desire", id: "1-2" },
        { left: "လိုအပ်|lo-aq", right: "need", id: "1-3" },
        { left: "လိုအပ်ချက်|lo-aq-cheq", right: "necessity", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "အရေးကြီး|a-ye-kyi", right: "important", id: "2-1" },
        { left: "အထူး|a-htu", right: "special", id: "2-2" },
        { left: "သာမန်|tha-man", right: "ordinary", id: "2-3" },
        { left: "ထူးဆန်း|htu-zan", right: "strange", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "စိတ်ဝင်စား|seiq-win-za", right: "interesting", id: "3-1" },
        { left: "ငြီးငွေ့စရာ|nyi-ngway-sa-ya", right: "boring", id: "3-2" },
        { left: "ကြောက်စရာ|kyauq-sa-ya", right: "scary", id: "3-3" },
        { left: "ချစ်စရာ|chiq-sa-ya", right: "cute, lovable", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ရွံရှာ|yun-sha", right: "ugly, disgusting", id: "4-1" },
        { left: "သနား|tha-na", right: "pity", id: "4-2" },
        { left: "ရှက်|sheq", right: "embarrassed", id: "4-3" },
        { left: "ဂုဏ်|goun", right: "proud", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "စိတ်ပျက်|seiq-pyeq", right: "disappointed", id: "5-1" },
        { left: "အံ့အားသင့်|an-a-thin", right: "surprised", id: "5-2" },
        { left: "နားမလည်|na-ma-leh", right: "misunderstand", id: "5-3" },
        { left: "ဝမ်းနည်း|wun-ni", right: "sad, sorry", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "ကြင်နာ|kyin-na", right: "kind, compassionate", id: "6-1" },
        { left: "ရက်စက်|yeq-seq", right: "cruel", id: "6-2" },
        { left: "게으르다|geh-u", right: "lazy", id: "6-3" },
        { left: "လုံ့လ|loun-la", right: "diligent", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "လိမ္မာ|lein-ma", right: "smart, clever", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 21 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 21 Association created:', data);
      toast.success("Exercise Bundle 21 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 21 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 21"
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
            onClick={insertBundle21Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 21 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle21Association;
