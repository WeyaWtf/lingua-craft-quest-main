import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle22Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle22Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "မိုက်|maiq", right: "foolish", id: "1-1" },
        { left: "တော်|taw", right: "good at, skilled", id: "1-2" },
        { left: "တိတ်ဆိတ်|teiq-heiq", right: "quiet", id: "1-3" },
        { left: "ဆူညံ|hsu-nyan", right: "loud, noisy", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "အန္တရာယ်|an-ta-ya", right: "dangerous", id: "2-1" },
        { left: "လုံခြုံ|loun-khoun", right: "safe", id: "2-2" },
        { left: "သတိထား|tha-ti-hta", right: "be careful", id: "2-3" },
        { left: "ချော|chaw", right: "slippery", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ခြောက်|chauq", right: "dry", id: "3-1" },
        { left: "စို|so", right: "wet", id: "3-2" },
        { left: "စိုစွတ်|so-zuq", right: "damp", id: "3-3" },
        { left: "ပူ|pu", right: "hot", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "အေး|e", right: "cold", id: "4-1" },
        { left: "မှော်|shaw", right: "cool", id: "4-2" },
        { left: "နွေးထွေး|nwe-htwe", right: "warm", id: "4-3" },
        { left: "လတ်ဆတ်|laq-hseq", right: "fresh", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ပုပ်|pouq", right: "rotten", id: "5-1" },
        { left: "မွှေး|hmwe", right: "fragrant", id: "5-2" },
        { left: "နံ|nan", right: "smelly", id: "5-3" },
        { left: "ချို|cho", right: "sweet", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "ငန်|ngan", right: "salty", id: "6-1" },
        { left: "စပ်|zaq", right: "spicy", id: "6-2" },
        { left: "ချဉ်|chin", right: "sour", id: "6-3" },
        { left: "ခါး|kha", right: "bitter", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "ပျော့|pyaw", right: "bland", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 22 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 22 Association created:', data);
      toast.success("Exercise Bundle 22 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 22 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 22"
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
            onClick={insertBundle22Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 22 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle22Association;
