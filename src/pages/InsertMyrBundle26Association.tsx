import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle26Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle26Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "ဘာသာ|ba-tha", right: "religion", id: "1-1" },
        { left: "ဗုဒ္ဓဘာသာ|bouq-da-ba-tha", right: "Buddhism", id: "1-2" },
        { left: "ခရစ်ယာန်|kha-yiq-yan", right: "Christian", id: "1-3" },
        { left: "အစ္စလာမ်|iq-sa-lan", right: "Islam", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ဘုန်းကြီး|boun-kyi", right: "monk", id: "2-1" },
        { left: "ဘုရားကျောင်း|phu-ya-kyaung", right: "church", id: "2-2" },
        { left: "ဘော်ဇာ|baw-za", right: "mosque", id: "2-3" },
        { left: "ကုသိုလ်|ku-thain", right: "merit", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "အပြစ်|a-pyiq", right: "sin", id: "3-1" },
        { left: "ဆုတောင်း|hsu-taung", right: "pray", id: "3-2" },
        { left: "ရှိခိုး|shi-kho", right: "worship", id: "3-3" },
        { left: "ပူဇော်|pu-zaw", right: "offer", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "သီလ|thi-la", right: "precepts", id: "4-1" },
        { left: "ဒါန|da-na", right: "donation", id: "4-2" },
        { left: "ကံ|kan", right: "karma", id: "4-3" },
        { left: "ဘဝ|ba-wa", right: "life", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ယဉ်ကျေးမှု|yin-kye-hmu", right: "culture", id: "5-1" },
        { left: "ထုံးစံ|htoun-zan", right: "tradition", id: "5-2" },
        { left: "ပွဲတော်|bweh-taw", right: "festival", id: "5-3" },
        { left: "သင်္ကြန်|thin-gyan", right: "Thingyan (Water Festival)", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "တန်ဆောင်မုန်း|tan-saung-moun", right: "Tazaungdaing", id: "6-1" },
        { left: "နှစ်သစ်ကူး|hniq-thiq-ku", right: "New Year", id: "6-2" },
        { left: "မွေးနေ့|mwe-nay", right: "birthday", id: "6-3" },
        { left: "မင်္ဂလာဆောင်|min-ga-la-saung", right: "wedding", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "ဈာပနကိစ္စ|za-pa-na-keiq-sa", right: "funeral", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 26 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 26 Association created:', data);
      toast.success("Exercise Bundle 26 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 26 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 26"
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
            onClick={insertBundle26Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 26 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle26Association;
