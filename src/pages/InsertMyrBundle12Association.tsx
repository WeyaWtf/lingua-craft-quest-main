import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle12Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle12Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "က|ka", right: "dance", id: "1-1" },
        { left: "သီချင်းဆို|thi-chin-hso", right: "sing", id: "1-2" },
        { left: "တေးဂီတ|te-gi-ta", right: "music", id: "1-3" },
        { left: "စန္ဒယား|san-da-ya", right: "piano", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ဂစ်တာ|giq-ta", right: "guitar", id: "2-1" },
        { left: "စည်|si", right: "drum", id: "2-2" },
        { left: "သီချင်း|thi-chin", right: "song", id: "2-3" },
        { left: "ဘာသာစကား|ba-tha-za-ga", right: "language", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "မြန်မာစာ|myan-ma-sa", right: "Burmese language", id: "3-1" },
        { left: "အင်္ဂလိပ်စာ|ein-ga-leiq-sa", right: "English language", id: "3-2" },
        { left: "စကားလုံး|za-ga-loun", right: "word", id: "3-3" },
        { left: "စာကြောင်း|sa-kyaung", right: "sentence", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "အဓိပ္ပာယ်|a-di-pay", right: "meaning", id: "4-1" },
        { left: "ဘာသာပြန်|ba-tha-pyan", right: "translate", id: "4-2" },
        { left: "ရှင်းပြ|shin-pya", right: "explain", id: "4-3" },
        { left: "သင်|thin", right: "learn, study", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "သင်ကြား|thin-kya", right: "teach", id: "5-1" },
        { left: "အိမ်စာလုပ်|ein-sa-loq", right: "homework", id: "5-2" },
        { left: "စာမေး|sa-me", right: "exam", id: "5-3" },
        { left: "အမှတ်|a-hmaq", right: "score, mark", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "အဆင့်|a-hsin", right: "grade, level", id: "6-1" },
        { left: "အောင်မြင်|aung-myin", right: "pass, succeed", id: "6-2" },
        { left: "ကျ|kya", right: "fail", id: "6-3" },
        { left: "ပြီးဆုံး|pyi-zone", right: "finish, complete", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "စတင်|sa-tin", right: "start, begin", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 12 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 12 Association created:', data);
      toast.success("Exercise Bundle 12 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 12 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 12"
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
            onClick={insertBundle12Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 12 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle12Association;
