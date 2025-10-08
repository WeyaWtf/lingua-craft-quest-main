import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle1Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle1Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "ကျွန်တော်|kya-naw", right: "I, me (male)", id: "1-1" },
        { left: "ကျွန်မ|kya-ma", right: "I, me (female)", id: "1-2" },
        { left: "ခင်ဗျား|khin-bya", right: "you (polite)", id: "1-3" },
        { left: "နင်|nin", right: "you (informal)", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "သူ|thu", right: "he, she", id: "2-1" },
        { left: "သူတို့|thu-do", right: "they", id: "2-2" },
        { left: "ကျွန်တော်တို့|kya-naw-do", right: "we (male)", id: "2-3" },
        { left: "ကျွန်မတို့|kya-ma-do", right: "we (female)", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "ဒီ|di", right: "this", id: "3-1" },
        { left: "ဟို|ho", right: "that", id: "3-2" },
        { left: "မှာ|hma", right: "at, in", id: "3-3" },
        { left: "နဲ့|neh", right: "with, and", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "နှင့်|hnin", right: "and (formal)", id: "4-1" },
        { left: "သို့မဟုတ်|tho-ma-hote", right: "or", id: "4-2" },
        { left: "ဒါပေမယ့်|da-be-meh", right: "but", id: "4-3" },
        { left: "သွား|thwa", right: "go", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "လာ|la", right: "come", id: "5-1" },
        { left: "နေ|ne", right: "stay, live", id: "5-2" },
        { left: "ရှိ|shi", right: "have, exist", id: "5-3" },
        { left: "ဖြစ်|phyit", right: "be, become", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "လုပ်|lote", right: "do, make", id: "6-1" },
        { left: "တတ်|tat", right: "can, able to", id: "6-2" },
        { left: "ပေး|pe", right: "give", id: "6-3" },
        { left: "ယူ|yu", right: "take", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "ပြော|pyaw", right: "speak, say", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 1 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 1 Association created:', data);
      toast.success("Exercise Bundle 1 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 1 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 1"
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
            onClick={insertBundle1Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 1 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle1Association;
