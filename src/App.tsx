import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExerciseProvider } from "./contexts/ExerciseContext";
import { LearningPathProvider } from "./contexts/LearningPathContext";
import { TopicProvider } from "./contexts/TopicContext";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import LearningPaths from "./pages/LearningPaths";
import LearningPathPlayer from "./pages/LearningPathPlayer";
import Exercises from "./pages/Exercises";
import Creator from "./pages/Creator";
import ExerciseCreator from "./pages/ExerciseCreator";
import ExerciseList from "./pages/ExerciseList";
import PathCreator from "./pages/PathCreator";
import PathList from "./pages/PathList";
import TopicCreator from "./pages/TopicCreator";
import TopicList from "./pages/TopicList";
import TopicEditor from "./pages/TopicEditor";
import TopicViewer from "./pages/TopicViewer";
import Player from "./pages/Player";
import Community from "./pages/Community";
import InsertBunble from "./pages/InsertBunble";
import InsertBundle2Flashcard from "./pages/InsertBundle2Flashcard";
import InsertBundle3Flashcard from "./pages/InsertBundle3Flashcard";
import InsertBundle4Flashcard from "./pages/InsertBundle4Flashcard";
import InsertBundle5Flashcard from "./pages/InsertBundle5Flashcard";
import InsertBundle6Flashcard from "./pages/InsertBundle6Flashcard";
import InsertBundle1Association from "./pages/InsertBundle1Association";
import InsertBundle2Association from "./pages/InsertBundle2Association";
import InsertBundle3Association from "./pages/InsertBundle3Association";
import InsertBundle4Association from "./pages/InsertBundle4Association";
import InsertBundle5Association from "./pages/InsertBundle5Association";
import InsertBundle6Association from "./pages/InsertBundle6Association";
import InsertBundle1Translation from "./pages/InsertBundle1Translation";
import InsertBundle1Translation200 from "./pages/InsertBundle1Translation200";
import InsertHiraganaChart from "./pages/InsertHiraganaChart";
import InsertHiraganaChartReal from "./pages/InsertHiraganaChartReal";
import InsertBurmeseChart from "./pages/InsertBurmeseChart";
import InsertBurmeseDiacritics from "./pages/InsertBurmeseDiacritics";
import InsertBurmeseVowels from "./pages/InsertBurmeseVowels";
import InsertThaiConsonants from "./pages/InsertThaiConsonants";
import InsertThaiVowels from "./pages/InsertThaiVowels";
import InsertKatakanaMixer from "./pages/InsertKatakanaMixer";
import InsertHiraganaMixer from "./pages/InsertHiraganaMixer";
import InsertBurmeseAlphabetMixer from "./pages/InsertBurmeseAlphabetMixer";
import InsertThaiConsonantsMixer from "./pages/InsertThaiConsonantsMixer";
import InsertHangeulChart from "./pages/InsertHangeulChart";
import InsertHangeulMixer from "./pages/InsertHangeulMixer";
import InsertHangeulFlashcards from "./pages/InsertHangeulFlashcards";
import InsertHiraganaFlashcards from "./pages/InsertHiraganaFlashcards";
import InsertKatakanaFlashcards from "./pages/InsertKatakanaFlashcards";
import InsertThaiFlashcards from "./pages/InsertThaiFlashcards";
import InsertBurmeseFlashcards from "./pages/InsertBurmeseFlashcards";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ExerciseProvider>
      <LearningPathProvider>
        <TopicProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/learning-paths" element={<LearningPaths />} />
              <Route path="/learning-path/:id" element={<LearningPathPlayer />} />
              <Route path="/exercises" element={<Exercises />} />
            <Route path="/creator" element={<Creator />} />
            <Route path="/creator/exercise" element={<ExerciseCreator />} />
            <Route path="/creator/exercise/:id" element={<ExerciseCreator />} />
            <Route path="/creator/exercise-list" element={<ExerciseList />} />
            <Route path="/creator/path" element={<PathCreator />} />
            <Route path="/creator/path-list" element={<PathList />} />
            <Route path="/creator/topic" element={<TopicCreator />} />
            <Route path="/creator/topic-list" element={<TopicList />} />
            <Route path="/creator/topic/:id" element={<TopicEditor />} />
            <Route path="/topic/:id" element={<TopicViewer />} />
            <Route path="/player/exercise/:id" element={<Player />} />
            <Route path="/community" element={<Community />} />
            <Route path="/insert-bunble" element={<InsertBunble />} />
            <Route path="/insert-bundle2-flashcard" element={<InsertBundle2Flashcard />} />
            <Route path="/insert-bundle3-flashcard" element={<InsertBundle3Flashcard />} />
            <Route path="/insert-bundle4-flashcard" element={<InsertBundle4Flashcard />} />
            <Route path="/insert-bundle5-flashcard" element={<InsertBundle5Flashcard />} />
            <Route path="/insert-bundle6-flashcard" element={<InsertBundle6Flashcard />} />
            <Route path="/insert-bundle1-association" element={<InsertBundle1Association />} />
            <Route path="/insert-bundle2-association" element={<InsertBundle2Association />} />
            <Route path="/insert-bundle3-association" element={<InsertBundle3Association />} />
            <Route path="/insert-bundle4-association" element={<InsertBundle4Association />} />
            <Route path="/insert-bundle5-association" element={<InsertBundle5Association />} />
            <Route path="/insert-bundle6-association" element={<InsertBundle6Association />} />
            <Route path="/insert-bundle1-translation" element={<InsertBundle1Translation />} />
            <Route path="/insert-bundle1-translation-200" element={<InsertBundle1Translation200 />} />
            <Route path="/insert-katakana-chart" element={<InsertHiraganaChart />} />
            <Route path="/insert-hiragana-chart" element={<InsertHiraganaChartReal />} />
            <Route path="/insert-burmese-chart" element={<InsertBurmeseChart />} />
            <Route path="/insert-burmese-diacritics" element={<InsertBurmeseDiacritics />} />
            <Route path="/insert-burmese-vowels" element={<InsertBurmeseVowels />} />
            <Route path="/insert-thai-consonants" element={<InsertThaiConsonants />} />
            <Route path="/insert-thai-vowels" element={<InsertThaiVowels />} />
            <Route path="/insert-katakana-mixer" element={<InsertKatakanaMixer />} />
            <Route path="/insert-hiragana-mixer" element={<InsertHiraganaMixer />} />
            <Route path="/insert-burmese-alphabet-mixer" element={<InsertBurmeseAlphabetMixer />} />
            <Route path="/insert-thai-consonants-mixer" element={<InsertThaiConsonantsMixer />} />
            <Route path="/insert-hangeul-chart" element={<InsertHangeulChart />} />
            <Route path="/insert-hangeul-mixer" element={<InsertHangeulMixer />} />
            <Route path="/insert-hangeul-flashcards" element={<InsertHangeulFlashcards />} />
            <Route path="/insert-hiragana-flashcards" element={<InsertHiraganaFlashcards />} />
            <Route path="/insert-katakana-flashcards" element={<InsertKatakanaFlashcards />} />
            <Route path="/insert-thai-flashcards" element={<InsertThaiFlashcards />} />
            <Route path="/insert-burmese-flashcards" element={<InsertBurmeseFlashcards />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
        </TopicProvider>
      </LearningPathProvider>
    </ExerciseProvider>
  </QueryClientProvider>
);

export default App;
