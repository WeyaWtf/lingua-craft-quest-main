import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle23Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle23Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "အရသာရှိ|a-ya-tha-shi", right: "delicious", id: "1-1" },
        { left: "အရသာမရှိ|a-ya-tha-ma-shi", right: "tasteless", id: "1-2" },
        { left: "တင်း|tin", right: "tight", id: "1-3" },
        { left: "လျော့|lshaw", right: "loose", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "မာ|ma", right: "hard", id: "2-1" },
        { left: "ပျော့|pyaw", right: "soft", id: "2-2" },
        { left: "နူး|nu", right: "soft (texture)", id: "2-3" },
        { left: "ကြွပ်|kyuq", right: "crispy", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ကပ်|kaq", right: "sticky", id: "3-1" },
        { left: "သေသေချာချာ|thay-thay-cha-cha", right: "detailed", id: "3-2" },
        { left: "ကြမ်း|kyan", right: "rough", id: "3-3" },
        { left: "မညီမမျှ|ma-nyi-ma-myah", right: "uneven", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ချော|chaw", right: "smooth", id: "4-1" },
        { left: "တောက်|tauq", right: "shiny", id: "4-2" },
        { left: "မိုက်|maiq", right: "dull", id: "4-3" },
        { left: "အံ|an", right: "opaque", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ကြည်|kyi", right: "clear", id: "5-1" },
        { left: "တိမ်|tein", right: "cloudy, turbid", id: "5-2" },
        { left: "လေး|le", right: "heavy", id: "5-3" },
        { left: "ပေါ့|paw", right: "light (weight)", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "နက်|neq", right: "deep", id: "6-1" },
        { left: "တိမ်|tein", right: "shallow", id: "6-2" },
        { left: "ကျယ်|kye", right: "wide", id: "6-3" },
        { left: "ကျဉ်း|kyin", right: "narrow", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "တောက်|tauq", right: "bright", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 23 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 23 Association created:', data);
      toast.success("Exercise Bundle 23 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 23 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 23"
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
            onClick={insertBundle23Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 23 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle23Association;
