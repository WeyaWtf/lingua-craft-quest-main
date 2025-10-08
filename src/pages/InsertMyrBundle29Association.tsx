import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle29Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle29Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = [
      // Page 1 - 4 pairs
      [
        { left: "ရာဇဝတ်မှု|ya-za-waq-hmu", right: "crime", id: "1-1" },
        { left: "သူခိုး|thu-kho", right: "thief", id: "1-2" },
        { left: "လူသတ်သမား|lu-thaq-tha-ma", right: "murderer", id: "1-3" },
        { left: "သားကောင်|tha-kaung", right: "victim", id: "1-4" }
      ],
      // Page 2 - 4 pairs
      [
        { left: "သက်သေ|theq-thay", right: "witness", id: "2-1" },
        { left: "အထောက်အထား|a-htauq-a-hta", right: "evidence", id: "2-2" },
        { left: "စုံစမ်း|zoun-zan", right: "investigate", id: "2-3" },
        { left: "အုပ်ချုပ်|ouq-chouq", right: "govern", id: "2-4" }
      ],
      // Page 3 - 4 pairs
      [
        { left: "အစိုးရ|a-so-ya", right: "government", id: "3-1" },
        { left: "ဝန်ကြီးချုပ်|wun-kyi-chouq", right: "prime minister", id: "3-2" },
        { left: "ဝန်ကြီး|wun-kyi", right: "minister", id: "3-3" },
        { left: "အဖွဲ့ဝင်|a-phweh-win", right: "member", id: "3-4" }
      ],
      // Page 4 - 4 pairs
      [
        { left: "ပါတီ|pa-ti", right: "political party", id: "4-1" },
        { left: "နိုင်ငံရေး|nain-ngan-ye", right: "politics", id: "4-2" },
        { left: "ရွေးကောက်ပွဲ|ywe-gauq-bweh", right: "election", id: "4-3" },
        { left: "ဒီမိုကရေစီ|di-mo-ka-ye-zi", right: "democracy", id: "4-4" }
      ],
      // Page 5 - 4 pairs
      [
        { left: "လွတ်လပ်ခွင့်|lwuq-laq-khwin", right: "freedom", id: "5-1" },
        { left: "အခွင့်အရေး|a-khwin-a-ye", right: "rights", id: "5-2" },
        { left: "တာဝန်|ta-wun", right: "duty", id: "5-3" },
        { left: "စည်းမျဉ်း|si-myin", right: "regulations", id: "5-4" }
      ],
      // Page 6 - 4 pairs
      [
        { left: "စည်းကမ်း|si-kan", right: "rules", id: "6-1" },
        { left: "လိုက်နာ|laiq-na", right: "follow, obey", id: "6-2" },
        { left: "ဖောက်ဖျက်|phauq-phyeq", right: "violate", id: "6-3" },
        { left: "လေးစား|le-za", right: "respect", id: "6-4" }
      ],
      // Page 7 - 1 pair
      [
        { left: "ကြေညာ|kye-nya", right: "announce", id: "7-1" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle 29 Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 29 Association created:', data);
      toast.success("Exercise Bundle 29 Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 29 Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle 29"
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
            onClick={insertBundle29Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 29 Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle29Association;
