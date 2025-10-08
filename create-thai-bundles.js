const fs = require('fs');
const path = require('path');

// Read the Thai words file
const thaiWordsFile = fs.readFileSync('cu_tfl_1000_words.md', 'utf8');
const lines = thaiWordsFile.split('\n');

// Extract words from the file
function extractWords(startLine, endLine) {
  const words = [];
  for (let i = startLine; i <= endLine; i++) {
    const line = lines[i];
    if (line && line.includes('|') && !line.startsWith('|--') && !line.startsWith('| No.')) {
      const parts = line.split('|').map(p => p.trim()).filter(p => p);
      if (parts.length >= 4 && !isNaN(parseInt(parts[0]))) {
        words.push({
          no: parts[0],
          thai: parts[1],
          roman: parts[2],
          english: parts[3]
        });
      }
    }
  }
  return words;
}

// Page 1 starts at line 553
const pageStarts = [
  553,  // Page 1: Words 1-25
  587,  // Page 2: Words 26-50
  619,  // Page 3: Words 51-75
  651,  // Page 4: Words 76-100
  683,  // Page 5: Words 101-125
  715,  // Page 6: Words 126-150
  747,  // Page 7: Words 151-175
  779,  // Page 8: Words 176-200
  811,  // Page 9: Words 201-225
  843,  // Page 10: Words 226-250
  875,  // Page 11: Words 251-275
  907,  // Page 12: Words 276-300
  939,  // Page 13: Words 301-325
  971,  // Page 14: Words 326-350
  1003, // Page 15: Words 351-375
  1035, // Page 16: Words 376-400
  1067, // Page 17: Words 401-425
  1099, // Page 18: Words 426-450
  1131, // Page 19: Words 451-475
  1163, // Page 20: Words 476-500
  1195, // Page 21: Words 501-525
  1227, // Page 22: Words 526-550
  1259, // Page 23: Words 551-575
  1291, // Page 24: Words 576-600
  1,    // Page 25: Words 601-625
  37,   // Page 26: Words 626-650
  69,   // Page 27: Words 651-675
  101,  // Page 28: Words 676-700
  133,  // Page 29: Words 701-725
  165,  // Page 30: Words 726-750
  197,  // Page 31: Words 751-775
  229,  // Page 32: Words 776-800
  261,  // Page 33: Words 801-825
  293,  // Page 34: Words 826-850
  325,  // Page 35: Words 851-875
  357,  // Page 36: Words 876-900
  389,  // Page 37: Words 901-925
  421,  // Page 38: Words 926-950
  453,  // Page 39: Words 951-975
  485   // Page 40: Words 976-1000
];

// Create Association file template
function createAssociationFile(bundleNum, words) {
  const pairGroups = [];
  let pageNum = 1;

  for (let i = 0; i < words.length; i += 4) {
    const pairs = [];
    const end = Math.min(i + 4, words.length);

    for (let j = i; j < end; j++) {
      const word = words[j];
      pairs.push({
        left: `${word.thai}|${word.roman}`,
        right: word.english,
        id: `${pageNum}-${j - i + 1}`
      });
    }

    pairGroups.push(pairs);
    pageNum++;
  }

  const pairGroupsStr = JSON.stringify(pairGroups, null, 6)
    .replace(/"left":/g, 'left:')
    .replace(/"right":/g, 'right:')
    .replace(/"id":/g, 'id:')
    .replace(/\[(\s+)\{/g, '[\n        {')
    .replace(/\},(\s+)\{/g, '},\n        {')
    .replace(/\}(\s+)\]/g, '}\n      ]');

  return `import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle${bundleNum}Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle${bundleNum}Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = ${pairGroupsStr};

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle ${bundleNum} Association",
      description: "Match Thai vocabulary with English translations (Beginner level)",
      difficulty: 1,
      source: "official",
      language: "thai",
      tags: ["vocabulary", "thai", "beginner"],
      content: {
        pairGroups: pairGroups
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
        console.error('Error during insertion:', error);
        toast.error("Error creating exercise");
        setIsInserting(false);
        return;
      }

      console.log('✅ THA LIST 1000 - Bundle ${bundleNum} Association created:', data);
      toast.success("Bundle ${bundleNum} Association created successfully!");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) {
      console.error('Error:', err);
      toast.error("Error during creation");
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">🇹🇭 Insert THA LIST 1000 - Bundle ${bundleNum} Association</h1>
          <p className="text-muted-foreground mb-6">
            Create the association exercise for Thai vocabulary "Bundle ${bundleNum}"
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
              <li>• Language: Thai 🇹🇭</li>
              <li>• Level: Beginner</li>
              <li>• Format: Thai (script + romanization) → English</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBundle${bundleNum}Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle ${bundleNum} Association"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertThaBundle${bundleNum}Association;
`;
}

// Create Flashcard file template
function createFlashcardFile(bundleNum, words) {
  const cards = words.map((word, idx) => ({
    front: word.english,
    back: `${word.thai}|${word.roman}`,
    category: "vocabulary",
    id: `${idx + 1}`
  }));

  const cardsStr = JSON.stringify(cards, null, 6)
    .replace(/"front":/g, 'front:')
    .replace(/"back":/g, 'back:')
    .replace(/"category":/g, 'category:')
    .replace(/"id":/g, 'id:')
    .replace(/\{(\s+)front:/g, '{ front:');

  return `import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle${bundleNum}Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle${bundleNum} = async () => {
    setIsInserting(true);

    const bundle${bundleNum}Cards = ${cardsStr};

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle ${bundleNum} Flashcards",
      description: "Thai vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "thai",
      tags: ["vocabulary", "thai", "beginner"],
      content: {
        cards: bundle${bundleNum}Cards,
        shuffleSides: true
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
        console.error('Error during insertion:', error);
        toast.error("Error creating exercise");
        setIsInserting(false);
        return;
      }

      console.log('✅ THA LIST 1000 - Bundle ${bundleNum} Flashcards created:', data);
      toast.success("Bundle ${bundleNum} Flashcards created successfully!");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) {
      console.error('Error:', err);
      toast.error("Error during creation");
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">🇹🇭 Insert THA LIST 1000 - Bundle ${bundleNum} Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert the Thai vocabulary exercise "Bundle ${bundleNum}"
            with 25 basic words.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Exercise details:</h3>
            <ul className="text-sm space-y-1">
              <li>• Type: Flashcards</li>
              <li>• Number of cards: 25</li>
              <li>• Language: Thai 🇹🇭</li>
              <li>• Level: Beginner</li>
              <li>• Shuffle sides: Enabled</li>
              <li>• Format: English → Thai (script + romanization)</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBundle${bundleNum}}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle ${bundleNum} Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertThaBundle${bundleNum}Flashcard;
`;
}

// Generate all files
for (let bundleNum = 1; bundleNum <= 40; bundleNum++) {
  const startLine = pageStarts[bundleNum - 1];
  const endLine = startLine + 30; // Enough lines to capture all 25 words

  const words = extractWords(startLine, endLine);

  if (words.length !== 25) {
    console.log(`Warning: Bundle ${bundleNum} has ${words.length} words instead of 25`);
  }

  // Create Association file
  const assocContent = createAssociationFile(bundleNum, words);
  const assocPath = path.join('src', 'pages', `InsertThaBundle${bundleNum}Association.tsx`);
  fs.writeFileSync(assocPath, assocContent);
  console.log(`✅ Created ${assocPath}`);

  // Create Flashcard file
  const flashContent = createFlashcardFile(bundleNum, words);
  const flashPath = path.join('src', 'pages', `InsertThaBundle${bundleNum}Flashcard.tsx`);
  fs.writeFileSync(flashPath, flashContent);
  console.log(`✅ Created ${flashPath}`);
}

console.log('\n🎉 All 80 Thai bundle files created successfully!');
