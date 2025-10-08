import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle13Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle13Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "ရပ်|yat", right: "stop", id: "1-1" },
        { left: "ဆက်|hseq", right: "continue", id: "1-2" },
        { left: "စောင့်|saung", right: "wait", id: "1-3" },
        { left: "အမြန်|a-myan", right: "hurry", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "နောက်ကျ|nauq-kya", right: "late", id: "2-1" },
        { left: "မီး|mi", right: "in time", id: "2-2" },
        { left: "လွတ်|lwuq", right: "miss", id: "2-3" },
        { left: "မေ့|may", right: "forget", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "မှတ်|hmaq", right: "remember", id: "3-1" },
        { left: "တွေး|twe", right: "think", id: "3-2" },
        { left: "အိပ်မက်|eiq-meq", right: "dream", id: "3-3" },
        { left: "စိတ်လှုပ်ရှား|seiq-hlouq-sha", right: "excited", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ကြောက်|kyauq", right: "afraid", id: "4-1" },
        { left: "စိုးရိမ်|so-yein", right: "worry", id: "4-2" },
        { left: "ဒေါသ|daw-tha", right: "anger", id: "4-3" },
        { left: "ဝမ်း|wun", right: "sad", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ပျော်|pyaw", right: "happy", id: "5-1" },
        { left: "ပျော်ရွှင်|pyaw-shwin", right: "joyful", id: "5-2" },
        { left: "ငြီးငွေ့|nyi-ngway", right: "bored", id: "5-3" },
        { left: "ပင်ပန်း|pin-pan", right: "tired", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "အိပ်ချင်|eiq-chin", right: "sleepy", id: "6-1" },
        { left: "ဆာ|hsa", right: "hungry", id: "6-2" },
        { left: "ဝ|wa", right: "full (stomach)", id: "6-3" },
        { left: "ရေငတ်|ye-ngeq", right: "thirsty", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "နာ|na", right: "sick, hurt", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 13 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 13 Association created:', data);
      toast.success("Exercise Bundle 13 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 13 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 13"
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
            onClick={insertBundle13Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 13 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle13Association;
