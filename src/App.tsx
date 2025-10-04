import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExerciseProvider } from "./contexts/ExerciseContext";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Exercises from "./pages/Exercises";
import Creator from "./pages/Creator";
import Player from "./pages/Player";
import Community from "./pages/Community";
import InsertBunble from "./pages/InsertBunble";
import InsertBundle1Association from "./pages/InsertBundle1Association";
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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/creator" element={<Creator />} />
            <Route path="/creator/:id" element={<Creator />} />
            <Route path="/player/exercise/:id" element={<Player />} />
            <Route path="/community" element={<Community />} />
            <Route path="/insert-bunble" element={<InsertBunble />} />
            <Route path="/insert-bundle1-association" element={<InsertBundle1Association />} />
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
    </ExerciseProvider>
  </QueryClientProvider>
);

export default App;
