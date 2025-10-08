import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle11Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle11Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "ကလောင်|ka-laung", right: "pen", id: "1-1" },
        { left: "ခဲတံ|kheh-dan", right: "pencil", id: "1-2" },
        { left: "စာရွက်|sa-yweq", right: "paper", id: "1-3" },
        { left: "စာအုပ်|sa-ouq", right: "notebook", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ဖျက်ရာ|phyeq-ya", right: "eraser", id: "2-1" },
        { left: "စည်း|si", right: "ruler", id: "2-2" },
        { left: "ကတ်ကြေး|kaq-kye", right: "scissors", id: "2-3" },
        { left: "ကော်|kaw", right: "glue", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "တိပ်|teiq", right: "tape", id: "3-1" },
        { left: "ပုံ|poun", right: "picture", id: "3-2" },
        { left: "ဓာတ်ပုံ|daq-poun", right: "photo", id: "3-3" },
        { left: "မြေပုံ|myay-poun", right: "map", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ပြက္ခဒိန်|pyaq-kha-dein", right: "calendar", id: "4-1" },
        { left: "လက်ဆောင်|leq-saung", right: "gift", id: "4-2" },
        { left: "ကစားစရာ|ka-za-sa-ya", right: "toy", id: "4-3" },
        { left: "ဂိမ်း|gein", right: "game", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "အားကစား|a-za", right: "sport", id: "5-1" },
        { left: "ဘောလုံး|baw-loun", right: "football", id: "5-2" },
        { left: "ခြင်းတောင်း|chin-daung", right: "basketball", id: "5-3" },
        { left: "ဘော်လီဘော|baw-li-baw", right: "volleyball", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "ကစားခြင်း|ka-za-chin", right: "badminton", id: "6-1" },
        { left: "တင်းနစ်|tin-niq", right: "tennis", id: "6-2" },
        { left: "ရေကူး|ye-ku", right: "swim", id: "6-3" },
        { left: "ပြေး|pye", right: "run", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "ခုန်|khoun", right: "jump", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 11 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 11 Association created:', data);
      toast.success("Exercise Bundle 11 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 11 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 11"
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
            onClick={insertBundle11Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 11 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle11Association;
