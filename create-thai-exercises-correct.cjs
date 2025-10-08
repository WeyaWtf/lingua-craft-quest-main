const fs = require('fs');
const path = require('path');

// Read the Thai vocabulary file
const thaiData = fs.readFileSync('cu_tfl_1000_words.md', 'utf-8');

// Parse the file to extract words
function parseThaiVocab() {
  const words = [];
  const lines = thaiData.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Match lines like: | 1 | ฉัน | chǎn | I, me |
    const match = line.match(/^\|\s*(\d+)\s*\|\s*([^\|]+)\s*\|\s*([^\|]+)\s*\|\s*([^\|]+)\s*\|$/);
    if (match) {
      const [, num, thai, roman, english] = match;
      words.push({
        num: parseInt(num),
        thai: thai.trim(),
        roman: roman.trim(),
        english: english.trim()
      });
    }
  }
  
  return words;
}

const allWords = parseThaiVocab();
console.log(`Parsed ${allWords.length} Thai words`);

// Generate exercises for each bundle
for (let bundleNum = 1; bundleNum <= 40; bundleNum++) {
  const startIdx = (bundleNum - 1) * 25;
  const endIdx = startIdx + 25;
  const bundleWords = allWords.slice(startIdx, endIdx);
  
  if (bundleWords.length === 0) break;
  
  console.log(`Creating Bundle ${bundleNum} (words ${startIdx + 1}-${endIdx})`);
  
  // Create Association exercise
  createAssociationExercise(bundleNum, bundleWords, startIdx + 1, endIdx);
  
  // Create Flashcard exercise
  createFlashcardExercise(bundleNum, bundleWords, startIdx + 1, endIdx);
}

console.log('\n✅ All Thai exercises recreated with correct data!');

function createAssociationExercise(bundleNum, words, start, end) {
  // Create 7 pages: 6 pages of 4 pairs + 1 page of 1 pair
  const pairGroups = [];
  
  for (let i = 0; i < 6; i++) {
    const pageStart = i * 4;
    const pagePairs = [];
    for (let j = 0; j < 4 && pageStart + j < words.length; j++) {
      const word = words[pageStart + j];
      pagePairs.push({
        left: `${word.thai}|${word.roman}`,
        right: word.english,
        id: `${i + 1}-${j + 1}`
      });
    }
    if (pagePairs.length > 0) pairGroups.push(pagePairs);
  }
  
  // Last page with remaining word
  if (words.length === 25) {
    const lastWord = words[24];
    pairGroups.push([{
      left: `${lastWord.thai}|${lastWord.roman}`,
      right: lastWord.english,
      id: "7-1"
    }]);
  }
  
  const content = `import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle${bundleNum}Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = ${JSON.stringify(pairGroups, null, 6)};

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle ${bundleNum} Association",
      difficulty: 1,
      source: "official",
      language: "thai",
      tags: ["vocabulary", "thai", "beginner", "CU-TFL"],
      content: { pairGroups },
      author_id: "demo",
      is_published: true
    };

    try {
      const { error } = await supabase.from("exercises").insert(exerciseData);

      if (error) {
        toast.error("Erreur lors de l'insertion");
        console.error(error);
      } else {
        toast.success("Bundle ${bundleNum} Association inséré avec succès !");
        setTimeout(() => navigate("/catalog"), 1500);
      }
    } catch (err) {
      toast.error("Erreur inattendue");
      console.error(err);
    } finally {
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Insérer Bundle ${bundleNum} Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots ${start}-${end} (25 mots)
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Button
              onClick={insertExercise}
              disabled={isInserting}
              className="w-full"
              size="lg"
            >
              {isInserting ? "Insertion en cours..." : "Insérer l'exercice"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertThaBundle${bundleNum}Association;
`;

  fs.writeFileSync(
    path.join('src', 'pages', `InsertThaBundle${bundleNum}Association.tsx`),
    content
  );
  console.log(`Created: InsertThaBundle${bundleNum}Association.tsx`);
}

function createFlashcardExercise(bundleNum, words, start, end) {
  const cards = words.map((word, idx) => ({
    front: word.english,
    back: `${word.thai}|${word.roman}`,
    category: "vocabulary",
    id: `${idx + 1}`
  }));
  
  const content = `import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle${bundleNum}Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = ${JSON.stringify(cards, null, 6)};

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle ${bundleNum} Flashcards",
      difficulty: 1,
      source: "official",
      language: "thai",
      tags: ["vocabulary", "thai", "beginner", "CU-TFL"],
      content: { cards, shuffleSides: true },
      author_id: "demo",
      is_published: true
    };

    try {
      const { error } = await supabase.from("exercises").insert(exerciseData);

      if (error) {
        toast.error("Erreur lors de l'insertion");
        console.error(error);
      } else {
        toast.success("Bundle ${bundleNum} Flashcards inséré avec succès !");
        setTimeout(() => navigate("/catalog"), 1500);
      }
    } catch (err) {
      toast.error("Erreur inattendue");
      console.error(err);
    } finally {
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Insérer Bundle ${bundleNum} Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots ${start}-${end} (25 flashcards)
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Button
              onClick={insertExercise}
              disabled={isInserting}
              className="w-full"
              size="lg"
            >
              {isInserting ? "Insertion en cours..." : "Insérer l'exercice"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertThaBundle${bundleNum}Flashcard;
`;

  fs.writeFileSync(
    path.join('src', 'pages', `InsertThaBundle${bundleNum}Flashcard.tsx`),
    content
  );
  console.log(`Created: InsertThaBundle${bundleNum}Flashcard.tsx`);
}
