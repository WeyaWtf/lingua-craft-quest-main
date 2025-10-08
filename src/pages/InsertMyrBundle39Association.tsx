import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle39Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle39Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "ထိပ်|hteiq", right: "top, peak", id: "1-1" },
        { left: "အခြေခံ|a-chay-khan", right: "base, foundation", id: "1-2" },
        { left: "ဖွဲ့စည်းပုံ|phweh-si-poun", right: "structure", id: "1-3" },
        { left: "မူဘောင်|mu-baung", right: "framework", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ပုံသဏ္ဌာန်|poun-than-than", right: "shape", id: "2-1" },
        { left: "ပုံစံ|poun-zan", right: "form", id: "2-2" },
        { left: "ပုံစံနမူနာ|poun-zan-na-mu-na", right: "pattern", id: "2-3" },
        { left: "ပုံစံပြ|poun-zan-pya", right: "model", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "နမူနာပစ္စည်း|na-mu-na-paq-si", right: "sample", id: "3-1" },
        { left: "အမျိုးအစား|a-myo-a-za", right: "type", id: "3-2" },
        { left: "မျိုးစိတ်|myo-seiq", right: "kind, species", id: "3-3" },
        { left: "အမျိုးအစား|a-myo-a-za", right: "category", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "အုပ်စု|ouq-zu", right: "group", id: "4-1" },
        { left: "အဖွဲ့|a-phweh", right: "group (organized)", id: "4-2" },
        { left: "စု|zu", right: "group, set", id: "4-3" },
        { left: "သိုးအုပ်|tho-ouq", right: "herd, flock", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "အသင်း|a-thin", right: "team", id: "5-1" },
        { left: "ကော်မတီ|kaw-ma-ti", right: "committee", id: "5-2" },
        { left: "အဖွဲ့အစည်း|a-phweh-a-si", right: "organization", id: "5-3" },
        { left: "အသင်း|a-thin", right: "association", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "အဖွဲ့အစည်း|a-phweh-a-si", right: "institution", id: "6-1" },
        { left: "ရန်ပုံငွေ|yan-poun-ngway", right: "foundation (organization)", id: "6-2" },
        { left: "အသိုင်းအဝိုင်း|a-thain-a-wain", right: "community", id: "6-3" },
        { left: "လူ့အဖွဲ့အစည်း|lu-a-phweh-a-si", right: "society", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "ကမ္ဘာ|kan-ba", right: "world", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 39 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 39 Association created:', data);
      toast.success("Exercise Bundle 39 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 39 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 39"
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
            onClick={insertBundle39Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 39 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle39Association;
