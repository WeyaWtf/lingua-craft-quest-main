import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle8Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle8Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "လှေ|hleh", right: "boat", id: "1-1" },
        { left: "လမ်း|lun", right: "road, way", id: "1-2" },
        { left: "တံတား|tan-ta", right: "bridge", id: "1-3" },
        { left: "မြစ်|myiq", right: "river", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ပင်လယ်|pin-leh", right: "sea", id: "2-1" },
        { left: "တောင်|taung", right: "mountain", id: "2-2" },
        { left: "တောင်ကုန်း|taung-koun", right: "hill", id: "2-3" },
        { left: "တောရိုင်း|taw-yain", right: "forest", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "သစ်ပင်|thiq-pin", right: "tree", id: "3-1" },
        { left: "ပန်း|pan", right: "flower", id: "3-2" },
        { left: "အရွက်|a-yweq", right: "leaf", id: "3-3" },
        { left: "မြက်|myeq", right: "grass", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "မြေ|myay", right: "earth, soil", id: "4-1" },
        { left: "ကျောက်|kyauq", right: "stone", id: "4-2" },
        { left: "သဲ|theh", right: "sand", id: "4-3" },
        { left: "ရေ|ye", right: "water", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "မိုး|mo", right: "rain, sky", id: "5-1" },
        { left: "လေ|lay", right: "wind", id: "5-2" },
        { left: "တိမ်|tein", right: "cloud", id: "5-3" },
        { left: "နေ|ne", right: "sun", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "လ|la", right: "moon", id: "6-1" },
        { left: "ကြယ်|kye", right: "star", id: "6-2" },
        { left: "မိုး|mo", right: "sky", id: "6-3" },
        { left: "အလင်း|a-lin", right: "light", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "အရိပ်|a-yeiq", right: "shadow", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 8 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 8 Association created:', data);
      toast.success("Exercise Bundle 8 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 8 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 8"
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
            onClick={insertBundle8Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 8 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle8Association;
