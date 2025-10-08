const fs = require('fs');
const path = require('path');

// Lire le fichier cu_tfl_1000_words.md
const thaiData = fs.readFileSync('cu_tfl_1000_words.md', 'utf8');

// Parser les données du fichier pour extraire les mots
function parseThaiWords(data) {
  const lines = data.split('\n');
  const words = [];
  let currentPage = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Détecter les pages
    if (line.startsWith('## Page') && line.includes('Words')) {
      const match = line.match(/## Page (\d+) - Words (\d+)-(\d+)/);
      if (match) {
        currentPage = parseInt(match[1]);
      }
      continue;
    }
    
    // Parser les lignes de tableau
    if (line.startsWith('|') && line.split('|').length >= 5) {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 5 && parts[1] && parts[1].match(/^\d+$/)) {
        const no = parseInt(parts[1]);
        const thai = parts[2];
        const romanization = parts[3];
        const english = parts[4];
        
        if (thai && romanization && english && !english.startsWith('---')) {
          words.push({
            no,
            thai,
            romanization,
            english,
            page: currentPage
          });
        }
      }
    }
  }
  
  return words;
}

// Créer le contenu pour un exercice Association
function createAssociationContent(bundleNumber, words) {
  const pairGroups = [];
  
  // Créer 6 pages de 4 paires
  for (let page = 0; page < 6; page++) {
    const pagePairs = [];
    for (let i = 0; i < 4; i++) {
      const wordIndex = page * 4 + i;
      if (wordIndex < words.length) {
        const word = words[wordIndex];
        pagePairs.push({
          left: `${word.thai}|${word.romanization}`,
          right: word.english,
          id: `${page + 1}-${i + 1}`
        });
      }
    }
    if (pagePairs.length > 0) {
      pairGroups.push(pagePairs);
    }
  }
  
  // Ajouter la dernière page avec les mots restants
  const remainingWords = words.slice(24);
  if (remainingWords.length > 0) {
    const lastPage = remainingWords.map((word, index) => ({
      left: `${word.thai}|${word.romanization}`,
      right: word.english,
      id: `7-${index + 1}`
    }));
    pairGroups.push(lastPage);
  }
  
  return pairGroups;
}

// Créer le contenu pour un exercice Flashcard
function createFlashcardContent(words) {
  return words.map((word, index) => ({
    front: word.english,
    back: `${word.thai}|${word.romanization}`,
    category: "vocabulary",
    id: `${index + 1}`
  }));
}

// Créer un fichier d'exercice Association
function createAssociationFile(bundleNumber, words) {
  const pairGroups = createAssociationContent(bundleNumber, words);
  const startWord = words[0].no;
  const endWord = words[words.length - 1].no;
  
  return `import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import Navigation from "../components/Navigation";

const InsertThaBundle${bundleNumber}Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertThaBundle${bundleNumber}Association = async () => {
    setIsInserting(true);

    const pairGroups = ${JSON.stringify(pairGroups, null, 6)};

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle ${bundleNumber} Association",
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
        toast.success("Bundle ${bundleNumber} Association inséré avec succès !");
      }
    } catch (err) {
      toast.error("Erreur inattendue");
      console.error(err);
    } finally {
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Insérer THA LIST 1000 - Bundle ${bundleNumber} Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots ${startWord}-${endWord} (${words.length} mots)
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Button
              onClick={insertThaBundle${bundleNumber}Association}
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

export default InsertThaBundle${bundleNumber}Association;`;
}

// Créer un fichier d'exercice Flashcard
function createFlashcardFile(bundleNumber, words) {
  const cards = createFlashcardContent(words);
  const startWord = words[0].no;
  const endWord = words[words.length - 1].no;
  
  return `import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import Navigation from "../components/Navigation";

const InsertThaBundle${bundleNumber}Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertThaBundle${bundleNumber}Flashcard = async () => {
    setIsInserting(true);

    const bundle${bundleNumber}Cards = ${JSON.stringify(cards, null, 6)};

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle ${bundleNumber} Flashcards",
      difficulty: 1,
      source: "official",
      language: "thai",
      tags: ["vocabulary", "thai", "beginner", "CU-TFL"],
      content: { cards: bundle${bundleNumber}Cards, shuffleSides: true },
      author_id: "demo",
      is_published: true
    };

    try {
      const { error } = await supabase.from("exercises").insert(exerciseData);

      if (error) {
        toast.error("Erreur lors de l'insertion");
        console.error(error);
      } else {
        toast.success("Bundle ${bundleNumber} Flashcards inséré avec succès !");
      }
    } catch (err) {
      toast.error("Erreur inattendue");
      console.error(err);
    } finally {
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Insérer THA LIST 1000 - Bundle ${bundleNumber} Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots ${startWord}-${endWord} (${words.length} mots)
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Button
              onClick={insertThaBundle${bundleNumber}Flashcard}
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

export default InsertThaBundle${bundleNumber}Flashcard;`;
}

// Fonction principale
function main() {
  console.log("Parsing Thai vocabulary data...");
  const words = parseThaiWords(thaiData);
  console.log(`Found ${words.length} words`);
  
  // Créer les bundles (25 mots par bundle)
  const bundles = [];
  for (let i = 0; i < 40; i++) {
    const startWord = i * 25;
    const endWord = Math.min((i + 1) * 25, words.length);
    const bundleWords = words.slice(startWord, endWord);
    bundles.push({
      number: i + 1,
      words: bundleWords,
      startWord: startWord + 1,
      endWord: endWord
    });
  }
  
  console.log(`Creating ${bundles.length} bundles...`);
  
  // Créer les répertoires si nécessaire
  const pagesDir = path.join(__dirname, 'src', 'pages');
  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
  }
  
  // Générer tous les fichiers
  bundles.forEach(bundle => {
    // Fichier Association
    const associationPath = path.join(pagesDir, `InsertThaBundle${bundle.number}Association.tsx`);
    fs.writeFileSync(associationPath, createAssociationFile(bundle.number, bundle.words));
    console.log(`Created: InsertThaBundle${bundle.number}Association.tsx`);
    
    // Fichier Flashcard
    const flashcardPath = path.join(pagesDir, `InsertThaBundle${bundle.number}Flashcard.tsx`);
    fs.writeFileSync(flashcardPath, createFlashcardFile(bundle.number, bundle.words));
    console.log(`Created: InsertThaBundle${bundle.number}Flashcard.tsx`);
  });
  
  // Générer les imports pour App.tsx
  console.log("\nGenerating imports for App.tsx...");
  let imports = "// Thai exercises imports\n";
  let routes = "";
  
  bundles.forEach(bundle => {
    imports += `import InsertThaBundle${bundle.number}Association from "./pages/InsertThaBundle${bundle.number}Association";\n`;
    imports += `import InsertThaBundle${bundle.number}Flashcard from "./pages/InsertThaBundle${bundle.number}Flashcard";\n`;
    
    routes += `              <Route path="/insert-tha-bundle${bundle.number}-association" element={<InsertThaBundle${bundle.number}Association />} />\n`;
    routes += `              <Route path="/insert-tha-bundle${bundle.number}-flashcard" element={<InsertThaBundle${bundle.number}Flashcard />} />\n`;
  });
  
  console.log("\n=== IMPORTS TO ADD TO App.tsx ===");
  console.log(imports);
  
  console.log("\n=== ROUTES TO ADD TO App.tsx ===");
  console.log(routes);
  
  // Générer la liste des URLs
  console.log("\n=== EXERCISE URLs ===");
  bundles.forEach(bundle => {
    console.log(`Bundle ${bundle.number} (mots ${bundle.startWord}-${bundle.endWord}):`);
    console.log(`- http://localhost:8081/insert-tha-bundle${bundle.number}-association`);
    console.log(`- http://localhost:8081/insert-tha-bundle${bundle.number}-flashcard`);
    console.log("");
  });
  
  console.log("✅ All Thai exercise files created successfully!");
}

main();
