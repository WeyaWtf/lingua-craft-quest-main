import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle28Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle28Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "လစာ|la-za", right: "salary", id: "1-1" },
        { left: "ဘောနပ်စ်|baw-naq", right: "bonus", id: "1-2" },
        { left: "ကုန်စည်|koun-si", right: "goods", id: "1-3" },
        { left: "ဝန်ဆောင်မှု|wun-saung-hmu", right: "service", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "ဖောက်သည်|phauq-theh", right: "customer", id: "2-1" },
        { left: "အလုပ်သမား|a-loq-tha-ma", right: "employee", id: "2-2" },
        { left: "မန်နေဂျာ|man-nay-ja", right: "manager", id: "2-3" },
        { left: "ပိုင်ရှင်|pain-shin", right: "owner", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "လုပ်ဖော်ကိုင်ဖက်|loq-phaw-kain-pheq", right: "partner", id: "3-1" },
        { left: "စာချုပ်|sa-chouq", right: "contract", id: "3-2" },
        { left: "သဘောတူညီချက်|tha-baw-tu-nyi-cheq", right: "agreement", id: "3-3" },
        { left: "ဥပဒေ|u-pa-day", right: "law", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "တရားရုံး|ta-ya-youn", right: "court", id: "4-1" },
        { left: "ရှေ့နေ|shay-nay", right: "lawyer", id: "4-2" },
        { left: "တရားသူကြီး|ta-ya-thu-kyi", right: "judge", id: "4-3" },
        { left: "အမှု|a-hmu", right: "case", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "ပြစ်မှု|pyiq-hmu", right: "crime", id: "5-1" },
        { left: "အပြစ်မဲ့|a-pyiq-meh", right: "innocent", id: "5-2" },
        { left: "အပြစ်ရှိ|a-pyiq-shi", right: "guilty", id: "5-3" },
        { left: "ဖမ်းဆီး|hpan-hsi", right: "arrest", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "ချုပ်နှောင်|chouq-hnaung", right: "imprison", id: "6-1" },
        { left: "လွှတ်|hlwuq", right: "release", id: "6-2" },
        { left: "ပြစ်ဒဏ်|pyiq-dan", right: "punishment", id: "6-3" },
        { left: "ဒဏ်ငွေ|dan-ngway", right: "fine", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "ထောင်|htaung", right: "prison", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 28 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 28 Association created:', data);
      toast.success("Exercise Bundle 28 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 28 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 28"
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
            onClick={insertBundle28Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 28 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle28Association;
