const fs = require('fs');
const path = require('path');

// Read and parse the Burmese vocabulary markdown file
const vocabFilePath = path.join(__dirname, 'burmese_vocab_1000.md');
const vocabContent = fs.readFileSync(vocabFilePath, 'utf8');

// Parse the markdown file to extract all words
function parseVocabFile(content) {
  const pages = [];
  const pageRegex = /## Page (\d+) - Words (\d+)-(\d+)\s+([\s\S]*?)(?=##|$)/g;

  let match;
  while ((match = pageRegex.exec(content)) !== null) {
    const pageNum = parseInt(match[1]);
    const tableContent = match[4];

    // Extract words from table
    const words = [];
    const lineRegex = /\| (\d+) \| ([^\|]+) \| ([^\|]+) \| ([^\|]+) \|/g;

    let wordMatch;
    while ((wordMatch = lineRegex.exec(tableContent)) !== null) {
      words.push({
        number: parseInt(wordMatch[1]),
        burmese: wordMatch[2].trim(),
        roman: wordMatch[3].trim(),
        english: wordMatch[4].trim()
      });
    }

    if (words.length > 0) {
      pages.push(words);
    }
  }

  return pages;
}

// Generate Association exercise file
function generateAssociationFile(bundleNum, words) {
  // Organize 25 words into 7 pages (6 pages of 4 + 1 page of 1)
  let pairGroupsCode = '[\n';

  for (let page = 0; page < 6; page++) {
    pairGroupsCode += `      // Page ${page + 1} - 4 pairs\n      [\n`;
    for (let j = 0; j < 4; j++) {
      const wordIndex = page * 4 + j;
      if (wordIndex < words.length) {
        const word = words[wordIndex];
        const comma = j < 3 ? ',' : '';
        pairGroupsCode += `        { left: "${word.burmese}|${word.roman}", right: "${word.english}", id: "${page + 1}-${j + 1}" }${comma}\n`;
      }
    }
    pairGroupsCode += '      ],\n';
  }

  // Last page with 1 word
  pairGroupsCode += '      // Page 7 - 1 pair\n      [\n';
  if (words.length > 24) {
    const word = words[24];
    pairGroupsCode += `        { left: "${word.burmese}|${word.roman}", right: "${word.english}", id: "7-1" }\n`;
  }
  pairGroupsCode += '      ]\n    ]';

  return `import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle${bundleNum}Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle${bundleNum}Association = async () => {
    setIsInserting(true);

    // 25 words organized in 7 pages (6 pages of 4 + 1 page of 1)
    const pairGroups = ${pairGroupsCode};

    const exerciseData = {
      type: "association",
      title: "MYR LIST 1000 - Bundle ${bundleNum} Association",
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle ${bundleNum} Association created:', data);
      toast.success("Exercise Bundle ${bundleNum} Association created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle ${bundleNum} Association</h1>
          <p className="text-muted-foreground mb-6">
            Create association exercise for Burmese vocabulary "Bundle ${bundleNum}"
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

export default InsertMyrBundle${bundleNum}Association;
`;
}

// Generate Flashcard exercise file
function generateFlashcardFile(bundleNum, words) {
  let cardsCode = '[\n';

  words.forEach((word, index) => {
    const comma = index < words.length - 1 ? ',' : '';
    cardsCode += `      { front: "${word.english}", back: "${word.burmese}|${word.roman}", category: "vocabulary", id: "${index + 1}" }${comma}\n`;
  });

  cardsCode += '    ]';

  return `import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle${bundleNum}Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle${bundleNum} = async () => {
    setIsInserting(true);

    const bundle${bundleNum}Cards = ${cardsCode};

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle ${bundleNum} Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
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
        console.error('Error inserting:', error);
        toast.error("Error creating exercise");
        setIsInserting(false);
        return;
      }

      console.log('✅ Exercise MYR LIST 1000 - Bundle ${bundleNum} Flashcards created:', data);
      toast.success("Exercise Bundle ${bundleNum} Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle ${bundleNum} Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle ${bundleNum}"
            with 25 basic words.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Exercise details:</h3>
            <ul className="text-sm space-y-1">
              <li>• Type: Flashcards</li>
              <li>• Number of cards: 25</li>
              <li>• Language: Burmese</li>
              <li>• Level: Beginner</li>
              <li>• Shuffle front/back: Enabled</li>
              <li>• Format: English → Burmese (script + romanization)</li>
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

export default InsertMyrBundle${bundleNum}Flashcard;
`;
}

// Main execution
console.log('Parsing Burmese vocabulary file...');
const pages = parseVocabFile(vocabContent);
console.log(`Found ${pages.length} pages with vocabulary`);

const outputDir = path.join(__dirname, 'src', 'pages');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let filesCreated = 0;

// Generate all 80 files (40 bundles × 2 types)
for (let i = 0; i < Math.min(pages.length, 40); i++) {
  const bundleNum = i + 1;
  const words = pages[i];

  if (words.length === 0) {
    console.log(`Warning: Bundle ${bundleNum} has no words, skipping...`);
    continue;
  }

  // Generate Association file
  const assocContent = generateAssociationFile(bundleNum, words);
  const assocFilename = path.join(outputDir, `InsertMyrBundle${bundleNum}Association.tsx`);
  fs.writeFileSync(assocFilename, assocContent, 'utf8');
  console.log(`✓ Created: InsertMyrBundle${bundleNum}Association.tsx`);
  filesCreated++;

  // Generate Flashcard file
  const flashContent = generateFlashcardFile(bundleNum, words);
  const flashFilename = path.join(outputDir, `InsertMyrBundle${bundleNum}Flashcard.tsx`);
  fs.writeFileSync(flashFilename, flashContent, 'utf8');
  console.log(`✓ Created: InsertMyrBundle${bundleNum}Flashcard.tsx`);
  filesCreated++;
}

console.log(`\n========================================`);
console.log(`✅ Successfully created ${filesCreated} files!`);
console.log(`   - ${filesCreated / 2} Association exercises`);
console.log(`   - ${filesCreated / 2} Flashcard exercises`);
console.log(`========================================\n`);

// Generate URL list for output
console.log('URL List for all bundles:\n');
for (let i = 1; i <= Math.min(pages.length, 40); i++) {
  const startWord = (i - 1) * 25 + 1;
  const endWord = i * 25;
  console.log(`Bundle ${i} (mots ${startWord}-${endWord}):`);
  console.log(`- http://localhost:8081/insert-myr-bundle${i}-association`);
  console.log(`- http://localhost:8081/insert-myr-bundle${i}-flashcard`);
  console.log('');
}
