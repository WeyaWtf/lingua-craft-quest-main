import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExerciseProvider } from "./contexts/ExerciseContext";
import { LearningPathProvider } from "./contexts/LearningPathContext";
import { TopicProvider } from "./contexts/TopicContext";
import { UserProgressProvider } from "./contexts/UserProgressContext";
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
import PathEditor from "./pages/PathEditor";
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
import InsertBundle7Flashcard from "./pages/InsertBundle7Flashcard";
import InsertBundle7Association from "./pages/InsertBundle7Association";
import InsertBundle8Flashcard from "./pages/InsertBundle8Flashcard";
import InsertBundle8Association from "./pages/InsertBundle8Association";
import InsertBundle9Flashcard from "./pages/InsertBundle9Flashcard";
import InsertBundle9Association from "./pages/InsertBundle9Association";
import InsertBundle10Flashcard from "./pages/InsertBundle10Flashcard";
import InsertBundle10Association from "./pages/InsertBundle10Association";
import InsertBundle11Flashcard from "./pages/InsertBundle11Flashcard";
import InsertBundle11Association from "./pages/InsertBundle11Association";
import InsertBundle12Flashcard from "./pages/InsertBundle12Flashcard";
import InsertBundle12Association from "./pages/InsertBundle12Association";
import InsertBundle13Flashcard from "./pages/InsertBundle13Flashcard";
import InsertBundle13Association from "./pages/InsertBundle13Association";
import InsertBundle14Flashcard from "./pages/InsertBundle14Flashcard";
import InsertBundle14Association from "./pages/InsertBundle14Association";
import InsertBundle15Flashcard from "./pages/InsertBundle15Flashcard";
import InsertBundle15Association from "./pages/InsertBundle15Association";
import InsertBundle16Flashcard from "./pages/InsertBundle16Flashcard";
import InsertBundle16Association from "./pages/InsertBundle16Association";
import InsertBundle17Flashcard from "./pages/InsertBundle17Flashcard";
import InsertBundle17Association from "./pages/InsertBundle17Association";
import InsertBundle18Flashcard from "./pages/InsertBundle18Flashcard";
import InsertBundle18Association from "./pages/InsertBundle18Association";
import InsertBundle19Flashcard from "./pages/InsertBundle19Flashcard";
import InsertBundle19Association from "./pages/InsertBundle19Association";
import InsertBundle20Flashcard from "./pages/InsertBundle20Flashcard";
import InsertBundle20Association from "./pages/InsertBundle20Association";
import InsertBundle21Flashcard from "./pages/InsertBundle21Flashcard";
import InsertBundle21Association from "./pages/InsertBundle21Association";
import InsertBundle22Flashcard from "./pages/InsertBundle22Flashcard";
import InsertBundle22Association from "./pages/InsertBundle22Association";
import InsertBundle23Flashcard from "./pages/InsertBundle23Flashcard";
import InsertBundle23Association from "./pages/InsertBundle23Association";
import InsertBundle24Flashcard from "./pages/InsertBundle24Flashcard";
import InsertBundle24Association from "./pages/InsertBundle24Association";
import InsertBundle25Flashcard from "./pages/InsertBundle25Flashcard";
import InsertBundle25Association from "./pages/InsertBundle25Association";
import InsertBundle26Flashcard from "./pages/InsertBundle26Flashcard";
import InsertBundle26Association from "./pages/InsertBundle26Association";
import InsertBundle27Flashcard from "./pages/InsertBundle27Flashcard";
import InsertBundle27Association from "./pages/InsertBundle27Association";
import InsertBundle28Flashcard from "./pages/InsertBundle28Flashcard";
import InsertBundle28Association from "./pages/InsertBundle28Association";
import InsertBundle29Flashcard from "./pages/InsertBundle29Flashcard";
import InsertBundle29Association from "./pages/InsertBundle29Association";
import InsertBundle30Flashcard from "./pages/InsertBundle30Flashcard";
import InsertBundle30Association from "./pages/InsertBundle30Association";
import InsertBundle31Flashcard from "./pages/InsertBundle31Flashcard";
import InsertBundle31Association from "./pages/InsertBundle31Association";
import InsertBundle32Flashcard from "./pages/InsertBundle32Flashcard";
import InsertBundle32Association from "./pages/InsertBundle32Association";
import InsertBundle33Flashcard from "./pages/InsertBundle33Flashcard";
import InsertBundle33Association from "./pages/InsertBundle33Association";
import InsertBundle34Flashcard from "./pages/InsertBundle34Flashcard";
import InsertBundle34Association from "./pages/InsertBundle34Association";
import InsertBundle35Flashcard from "./pages/InsertBundle35Flashcard";
import InsertBundle35Association from "./pages/InsertBundle35Association";
import InsertBundle36Flashcard from "./pages/InsertBundle36Flashcard";
import InsertBundle36Association from "./pages/InsertBundle36Association";
import InsertBundle37Flashcard from "./pages/InsertBundle37Flashcard";
import InsertBundle37Association from "./pages/InsertBundle37Association";
import InsertBundle38Flashcard from "./pages/InsertBundle38Flashcard";
import InsertBundle38Association from "./pages/InsertBundle38Association";
import InsertBundle39Flashcard from "./pages/InsertBundle39Flashcard";
import InsertBundle39Association from "./pages/InsertBundle39Association";
import InsertBundle40Flashcard from "./pages/InsertBundle40Flashcard";
import InsertBundle40Association from "./pages/InsertBundle40Association";
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
import DebugPath from "./pages/DebugPath";
import MigratePath from "./pages/MigratePath";
import CreateJapList1000 from "./pages/CreateJapList1000";
import InsertThaiFlashcards from "./pages/InsertThaiFlashcards";
import InsertBurmeseFlashcards from "./pages/InsertBurmeseFlashcards";
import InsertMyrBundle1Association from "./pages/InsertMyrBundle1Association";
import InsertMyrBundle1Flashcard from "./pages/InsertMyrBundle1Flashcard";
import InsertMyrBundle2Association from "./pages/InsertMyrBundle2Association";
import InsertMyrBundle2Flashcard from "./pages/InsertMyrBundle2Flashcard";
import InsertMyrBundle3Association from "./pages/InsertMyrBundle3Association";
import InsertMyrBundle3Flashcard from "./pages/InsertMyrBundle3Flashcard";
import InsertMyrBundle4Association from "./pages/InsertMyrBundle4Association";
import InsertMyrBundle4Flashcard from "./pages/InsertMyrBundle4Flashcard";
import InsertMyrBundle5Association from "./pages/InsertMyrBundle5Association";
import InsertMyrBundle5Flashcard from "./pages/InsertMyrBundle5Flashcard";
import InsertMyrBundle6Association from "./pages/InsertMyrBundle6Association";
import InsertMyrBundle6Flashcard from "./pages/InsertMyrBundle6Flashcard";
import InsertMyrBundle7Association from "./pages/InsertMyrBundle7Association";
import InsertMyrBundle7Flashcard from "./pages/InsertMyrBundle7Flashcard";
import InsertMyrBundle8Association from "./pages/InsertMyrBundle8Association";
import InsertMyrBundle8Flashcard from "./pages/InsertMyrBundle8Flashcard";
import InsertMyrBundle9Association from "./pages/InsertMyrBundle9Association";
import InsertMyrBundle9Flashcard from "./pages/InsertMyrBundle9Flashcard";
import InsertMyrBundle10Association from "./pages/InsertMyrBundle10Association";
import InsertMyrBundle10Flashcard from "./pages/InsertMyrBundle10Flashcard";
import InsertMyrBundle11Association from "./pages/InsertMyrBundle11Association";
import InsertMyrBundle11Flashcard from "./pages/InsertMyrBundle11Flashcard";
import InsertMyrBundle12Association from "./pages/InsertMyrBundle12Association";
import InsertMyrBundle12Flashcard from "./pages/InsertMyrBundle12Flashcard";
import InsertMyrBundle13Association from "./pages/InsertMyrBundle13Association";
import InsertMyrBundle13Flashcard from "./pages/InsertMyrBundle13Flashcard";
import InsertMyrBundle14Association from "./pages/InsertMyrBundle14Association";
import InsertMyrBundle14Flashcard from "./pages/InsertMyrBundle14Flashcard";
import InsertMyrBundle15Association from "./pages/InsertMyrBundle15Association";
import InsertMyrBundle15Flashcard from "./pages/InsertMyrBundle15Flashcard";
import InsertMyrBundle16Association from "./pages/InsertMyrBundle16Association";
import InsertMyrBundle16Flashcard from "./pages/InsertMyrBundle16Flashcard";
import InsertMyrBundle17Association from "./pages/InsertMyrBundle17Association";
import InsertMyrBundle17Flashcard from "./pages/InsertMyrBundle17Flashcard";
import InsertMyrBundle18Association from "./pages/InsertMyrBundle18Association";
import InsertMyrBundle18Flashcard from "./pages/InsertMyrBundle18Flashcard";
import InsertMyrBundle19Association from "./pages/InsertMyrBundle19Association";
import InsertMyrBundle19Flashcard from "./pages/InsertMyrBundle19Flashcard";
import InsertMyrBundle20Association from "./pages/InsertMyrBundle20Association";
import InsertMyrBundle20Flashcard from "./pages/InsertMyrBundle20Flashcard";
import InsertMyrBundle21Association from "./pages/InsertMyrBundle21Association";
import InsertMyrBundle21Flashcard from "./pages/InsertMyrBundle21Flashcard";
import InsertMyrBundle22Association from "./pages/InsertMyrBundle22Association";
import InsertMyrBundle22Flashcard from "./pages/InsertMyrBundle22Flashcard";
import InsertMyrBundle23Association from "./pages/InsertMyrBundle23Association";
import InsertMyrBundle23Flashcard from "./pages/InsertMyrBundle23Flashcard";
import InsertMyrBundle24Association from "./pages/InsertMyrBundle24Association";
import InsertMyrBundle24Flashcard from "./pages/InsertMyrBundle24Flashcard";
import InsertMyrBundle25Association from "./pages/InsertMyrBundle25Association";
import InsertMyrBundle25Flashcard from "./pages/InsertMyrBundle25Flashcard";
import InsertMyrBundle26Association from "./pages/InsertMyrBundle26Association";
import InsertMyrBundle26Flashcard from "./pages/InsertMyrBundle26Flashcard";
import InsertMyrBundle27Association from "./pages/InsertMyrBundle27Association";
import InsertMyrBundle27Flashcard from "./pages/InsertMyrBundle27Flashcard";
import InsertMyrBundle28Association from "./pages/InsertMyrBundle28Association";
import InsertMyrBundle28Flashcard from "./pages/InsertMyrBundle28Flashcard";
import InsertMyrBundle29Association from "./pages/InsertMyrBundle29Association";
import InsertMyrBundle29Flashcard from "./pages/InsertMyrBundle29Flashcard";
import InsertMyrBundle30Association from "./pages/InsertMyrBundle30Association";
import InsertMyrBundle30Flashcard from "./pages/InsertMyrBundle30Flashcard";
import InsertMyrBundle31Association from "./pages/InsertMyrBundle31Association";
import InsertMyrBundle31Flashcard from "./pages/InsertMyrBundle31Flashcard";
import InsertMyrBundle32Association from "./pages/InsertMyrBundle32Association";
import InsertMyrBundle32Flashcard from "./pages/InsertMyrBundle32Flashcard";
import InsertMyrBundle33Association from "./pages/InsertMyrBundle33Association";
import InsertMyrBundle33Flashcard from "./pages/InsertMyrBundle33Flashcard";
import InsertMyrBundle34Association from "./pages/InsertMyrBundle34Association";
import InsertMyrBundle34Flashcard from "./pages/InsertMyrBundle34Flashcard";
import InsertMyrBundle35Association from "./pages/InsertMyrBundle35Association";
import InsertMyrBundle35Flashcard from "./pages/InsertMyrBundle35Flashcard";
import InsertMyrBundle36Association from "./pages/InsertMyrBundle36Association";
import InsertMyrBundle36Flashcard from "./pages/InsertMyrBundle36Flashcard";
import InsertMyrBundle37Association from "./pages/InsertMyrBundle37Association";
import InsertMyrBundle37Flashcard from "./pages/InsertMyrBundle37Flashcard";
import InsertMyrBundle38Association from "./pages/InsertMyrBundle38Association";
import InsertMyrBundle38Flashcard from "./pages/InsertMyrBundle38Flashcard";
import InsertMyrBundle39Association from "./pages/InsertMyrBundle39Association";
import InsertMyrBundle39Flashcard from "./pages/InsertMyrBundle39Flashcard";
import InsertMyrBundle40Association from "./pages/InsertMyrBundle40Association";
import InsertMyrBundle40Flashcard from "./pages/InsertMyrBundle40Flashcard";
import InsertThaBundle1Association from "./pages/InsertThaBundle1Association";
import InsertThaBundle1Flashcard from "./pages/InsertThaBundle1Flashcard";
import InsertThaBundle2Association from "./pages/InsertThaBundle2Association";
import InsertThaBundle2Flashcard from "./pages/InsertThaBundle2Flashcard";
import InsertThaBundle3Association from "./pages/InsertThaBundle3Association";
import InsertThaBundle3Flashcard from "./pages/InsertThaBundle3Flashcard";
import InsertThaBundle4Association from "./pages/InsertThaBundle4Association";
import InsertThaBundle4Flashcard from "./pages/InsertThaBundle4Flashcard";
import InsertThaBundle5Association from "./pages/InsertThaBundle5Association";
import InsertThaBundle5Flashcard from "./pages/InsertThaBundle5Flashcard";
import InsertThaBundle6Association from "./pages/InsertThaBundle6Association";
import InsertThaBundle6Flashcard from "./pages/InsertThaBundle6Flashcard";
import InsertThaBundle7Association from "./pages/InsertThaBundle7Association";
import InsertThaBundle7Flashcard from "./pages/InsertThaBundle7Flashcard";
import InsertThaBundle8Association from "./pages/InsertThaBundle8Association";
import InsertThaBundle8Flashcard from "./pages/InsertThaBundle8Flashcard";
import InsertThaBundle9Association from "./pages/InsertThaBundle9Association";
import InsertThaBundle9Flashcard from "./pages/InsertThaBundle9Flashcard";
import InsertThaBundle10Association from "./pages/InsertThaBundle10Association";
import InsertThaBundle10Flashcard from "./pages/InsertThaBundle10Flashcard";
import InsertThaBundle11Association from "./pages/InsertThaBundle11Association";
import InsertThaBundle11Flashcard from "./pages/InsertThaBundle11Flashcard";
import InsertThaBundle12Association from "./pages/InsertThaBundle12Association";
import InsertThaBundle12Flashcard from "./pages/InsertThaBundle12Flashcard";
import InsertThaBundle13Association from "./pages/InsertThaBundle13Association";
import InsertThaBundle13Flashcard from "./pages/InsertThaBundle13Flashcard";
import InsertThaBundle14Association from "./pages/InsertThaBundle14Association";
import InsertThaBundle14Flashcard from "./pages/InsertThaBundle14Flashcard";
import InsertThaBundle15Association from "./pages/InsertThaBundle15Association";
import InsertThaBundle15Flashcard from "./pages/InsertThaBundle15Flashcard";
import InsertThaBundle16Association from "./pages/InsertThaBundle16Association";
import InsertThaBundle16Flashcard from "./pages/InsertThaBundle16Flashcard";
import InsertThaBundle17Association from "./pages/InsertThaBundle17Association";
import InsertThaBundle17Flashcard from "./pages/InsertThaBundle17Flashcard";
import InsertThaBundle18Association from "./pages/InsertThaBundle18Association";
import InsertThaBundle18Flashcard from "./pages/InsertThaBundle18Flashcard";
import InsertThaBundle19Association from "./pages/InsertThaBundle19Association";
import InsertThaBundle19Flashcard from "./pages/InsertThaBundle19Flashcard";
import InsertThaBundle20Association from "./pages/InsertThaBundle20Association";
import InsertThaBundle20Flashcard from "./pages/InsertThaBundle20Flashcard";
import InsertThaBundle21Association from "./pages/InsertThaBundle21Association";
import InsertThaBundle21Flashcard from "./pages/InsertThaBundle21Flashcard";
import InsertThaBundle22Association from "./pages/InsertThaBundle22Association";
import InsertThaBundle22Flashcard from "./pages/InsertThaBundle22Flashcard";
import InsertThaBundle23Association from "./pages/InsertThaBundle23Association";
import InsertThaBundle23Flashcard from "./pages/InsertThaBundle23Flashcard";
import InsertThaBundle24Association from "./pages/InsertThaBundle24Association";
import InsertThaBundle24Flashcard from "./pages/InsertThaBundle24Flashcard";
import InsertThaBundle25Association from "./pages/InsertThaBundle25Association";
import InsertThaBundle25Flashcard from "./pages/InsertThaBundle25Flashcard";
import InsertThaBundle26Association from "./pages/InsertThaBundle26Association";
import InsertThaBundle26Flashcard from "./pages/InsertThaBundle26Flashcard";
import InsertThaBundle27Association from "./pages/InsertThaBundle27Association";
import InsertThaBundle27Flashcard from "./pages/InsertThaBundle27Flashcard";
import InsertThaBundle28Association from "./pages/InsertThaBundle28Association";
import InsertThaBundle28Flashcard from "./pages/InsertThaBundle28Flashcard";
import InsertThaBundle29Association from "./pages/InsertThaBundle29Association";
import InsertThaBundle29Flashcard from "./pages/InsertThaBundle29Flashcard";
import InsertThaBundle30Association from "./pages/InsertThaBundle30Association";
import InsertThaBundle30Flashcard from "./pages/InsertThaBundle30Flashcard";
import InsertThaBundle31Association from "./pages/InsertThaBundle31Association";
import InsertThaBundle31Flashcard from "./pages/InsertThaBundle31Flashcard";
import InsertThaBundle32Association from "./pages/InsertThaBundle32Association";
import InsertThaBundle32Flashcard from "./pages/InsertThaBundle32Flashcard";
import InsertThaBundle33Association from "./pages/InsertThaBundle33Association";
import InsertThaBundle33Flashcard from "./pages/InsertThaBundle33Flashcard";
import InsertThaBundle34Association from "./pages/InsertThaBundle34Association";
import InsertThaBundle34Flashcard from "./pages/InsertThaBundle34Flashcard";
import InsertThaBundle35Association from "./pages/InsertThaBundle35Association";
import InsertThaBundle35Flashcard from "./pages/InsertThaBundle35Flashcard";
import InsertThaBundle36Association from "./pages/InsertThaBundle36Association";
import InsertThaBundle36Flashcard from "./pages/InsertThaBundle36Flashcard";
import InsertThaBundle37Association from "./pages/InsertThaBundle37Association";
import InsertThaBundle37Flashcard from "./pages/InsertThaBundle37Flashcard";
import InsertThaBundle38Association from "./pages/InsertThaBundle38Association";
import InsertThaBundle38Flashcard from "./pages/InsertThaBundle38Flashcard";
import InsertThaBundle39Association from "./pages/InsertThaBundle39Association";
import InsertThaBundle39Flashcard from "./pages/InsertThaBundle39Flashcard";
import InsertThaBundle40Association from "./pages/InsertThaBundle40Association";
import InsertThaBundle40Flashcard from "./pages/InsertThaBundle40Flashcard";
import GamificationTest from "./pages/GamificationTest";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Assignments from "./pages/Assignments";
import MyLearning from "./pages/MyLearning";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProgressProvider>
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
            <Route path="/creator/path/:id/edit" element={<PathEditor />} />
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
            <Route path="/insert-bundle7-flashcard" element={<InsertBundle7Flashcard />} />
            <Route path="/insert-bundle7-association" element={<InsertBundle7Association />} />
            <Route path="/insert-bundle8-flashcard" element={<InsertBundle8Flashcard />} />
            <Route path="/insert-bundle8-association" element={<InsertBundle8Association />} />
            <Route path="/insert-bundle9-flashcard" element={<InsertBundle9Flashcard />} />
            <Route path="/insert-bundle9-association" element={<InsertBundle9Association />} />
            <Route path="/insert-bundle10-flashcard" element={<InsertBundle10Flashcard />} />
            <Route path="/insert-bundle10-association" element={<InsertBundle10Association />} />
            <Route path="/insert-bundle11-flashcard" element={<InsertBundle11Flashcard />} />
            <Route path="/insert-bundle11-association" element={<InsertBundle11Association />} />
            <Route path="/insert-bundle12-flashcard" element={<InsertBundle12Flashcard />} />
            <Route path="/insert-bundle12-association" element={<InsertBundle12Association />} />
            <Route path="/insert-bundle13-flashcard" element={<InsertBundle13Flashcard />} />
            <Route path="/insert-bundle13-association" element={<InsertBundle13Association />} />
            <Route path="/insert-bundle14-flashcard" element={<InsertBundle14Flashcard />} />
            <Route path="/insert-bundle14-association" element={<InsertBundle14Association />} />
            <Route path="/insert-bundle15-flashcard" element={<InsertBundle15Flashcard />} />
            <Route path="/insert-bundle15-association" element={<InsertBundle15Association />} />
            <Route path="/insert-bundle16-flashcard" element={<InsertBundle16Flashcard />} />
            <Route path="/insert-bundle16-association" element={<InsertBundle16Association />} />
            <Route path="/insert-bundle17-flashcard" element={<InsertBundle17Flashcard />} />
            <Route path="/insert-bundle17-association" element={<InsertBundle17Association />} />
            <Route path="/insert-bundle18-flashcard" element={<InsertBundle18Flashcard />} />
            <Route path="/insert-bundle18-association" element={<InsertBundle18Association />} />
            <Route path="/insert-bundle19-flashcard" element={<InsertBundle19Flashcard />} />
            <Route path="/insert-bundle19-association" element={<InsertBundle19Association />} />
            <Route path="/insert-bundle20-flashcard" element={<InsertBundle20Flashcard />} />
            <Route path="/insert-bundle20-association" element={<InsertBundle20Association />} />
            <Route path="/insert-bundle21-flashcard" element={<InsertBundle21Flashcard />} />
            <Route path="/insert-bundle21-association" element={<InsertBundle21Association />} />
            <Route path="/insert-bundle22-flashcard" element={<InsertBundle22Flashcard />} />
            <Route path="/insert-bundle22-association" element={<InsertBundle22Association />} />
            <Route path="/insert-bundle23-flashcard" element={<InsertBundle23Flashcard />} />
            <Route path="/insert-bundle23-association" element={<InsertBundle23Association />} />
            <Route path="/insert-bundle24-flashcard" element={<InsertBundle24Flashcard />} />
            <Route path="/insert-bundle24-association" element={<InsertBundle24Association />} />
            <Route path="/insert-bundle25-flashcard" element={<InsertBundle25Flashcard />} />
            <Route path="/insert-bundle25-association" element={<InsertBundle25Association />} />
            <Route path="/insert-bundle26-flashcard" element={<InsertBundle26Flashcard />} />
            <Route path="/insert-bundle26-association" element={<InsertBundle26Association />} />
            <Route path="/insert-bundle27-flashcard" element={<InsertBundle27Flashcard />} />
            <Route path="/insert-bundle27-association" element={<InsertBundle27Association />} />
            <Route path="/insert-bundle28-flashcard" element={<InsertBundle28Flashcard />} />
            <Route path="/insert-bundle28-association" element={<InsertBundle28Association />} />
            <Route path="/insert-bundle29-flashcard" element={<InsertBundle29Flashcard />} />
            <Route path="/insert-bundle29-association" element={<InsertBundle29Association />} />
            <Route path="/insert-bundle30-flashcard" element={<InsertBundle30Flashcard />} />
            <Route path="/insert-bundle30-association" element={<InsertBundle30Association />} />
            <Route path="/insert-bundle31-flashcard" element={<InsertBundle31Flashcard />} />
            <Route path="/insert-bundle31-association" element={<InsertBundle31Association />} />
            <Route path="/insert-bundle32-flashcard" element={<InsertBundle32Flashcard />} />
            <Route path="/insert-bundle32-association" element={<InsertBundle32Association />} />
            <Route path="/insert-bundle33-flashcard" element={<InsertBundle33Flashcard />} />
            <Route path="/insert-bundle33-association" element={<InsertBundle33Association />} />
            <Route path="/insert-bundle34-flashcard" element={<InsertBundle34Flashcard />} />
            <Route path="/insert-bundle34-association" element={<InsertBundle34Association />} />
            <Route path="/insert-bundle35-flashcard" element={<InsertBundle35Flashcard />} />
            <Route path="/insert-bundle35-association" element={<InsertBundle35Association />} />
            <Route path="/insert-bundle36-flashcard" element={<InsertBundle36Flashcard />} />
            <Route path="/insert-bundle36-association" element={<InsertBundle36Association />} />
            <Route path="/insert-bundle37-flashcard" element={<InsertBundle37Flashcard />} />
            <Route path="/insert-bundle37-association" element={<InsertBundle37Association />} />
            <Route path="/insert-bundle38-flashcard" element={<InsertBundle38Flashcard />} />
            <Route path="/insert-bundle38-association" element={<InsertBundle38Association />} />
            <Route path="/insert-bundle39-flashcard" element={<InsertBundle39Flashcard />} />
            <Route path="/insert-bundle39-association" element={<InsertBundle39Association />} />
            <Route path="/insert-bundle40-flashcard" element={<InsertBundle40Flashcard />} />
            <Route path="/insert-bundle40-association" element={<InsertBundle40Association />} />
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
            <Route path="/insert-myr-bundle1-association" element={<InsertMyrBundle1Association />} />
            <Route path="/insert-myr-bundle1-flashcard" element={<InsertMyrBundle1Flashcard />} />
            <Route path="/insert-myr-bundle2-association" element={<InsertMyrBundle2Association />} />
            <Route path="/insert-myr-bundle2-flashcard" element={<InsertMyrBundle2Flashcard />} />
            <Route path="/insert-myr-bundle3-association" element={<InsertMyrBundle3Association />} />
            <Route path="/insert-myr-bundle3-flashcard" element={<InsertMyrBundle3Flashcard />} />
            <Route path="/insert-myr-bundle4-association" element={<InsertMyrBundle4Association />} />
            <Route path="/insert-myr-bundle4-flashcard" element={<InsertMyrBundle4Flashcard />} />
            <Route path="/insert-myr-bundle5-association" element={<InsertMyrBundle5Association />} />
            <Route path="/insert-myr-bundle5-flashcard" element={<InsertMyrBundle5Flashcard />} />
            <Route path="/insert-myr-bundle6-association" element={<InsertMyrBundle6Association />} />
            <Route path="/insert-myr-bundle6-flashcard" element={<InsertMyrBundle6Flashcard />} />
            <Route path="/insert-myr-bundle7-association" element={<InsertMyrBundle7Association />} />
            <Route path="/insert-myr-bundle7-flashcard" element={<InsertMyrBundle7Flashcard />} />
            <Route path="/insert-myr-bundle8-association" element={<InsertMyrBundle8Association />} />
            <Route path="/insert-myr-bundle8-flashcard" element={<InsertMyrBundle8Flashcard />} />
            <Route path="/insert-myr-bundle9-association" element={<InsertMyrBundle9Association />} />
            <Route path="/insert-myr-bundle9-flashcard" element={<InsertMyrBundle9Flashcard />} />
            <Route path="/insert-myr-bundle10-association" element={<InsertMyrBundle10Association />} />
            <Route path="/insert-myr-bundle10-flashcard" element={<InsertMyrBundle10Flashcard />} />
            <Route path="/insert-myr-bundle11-association" element={<InsertMyrBundle11Association />} />
            <Route path="/insert-myr-bundle11-flashcard" element={<InsertMyrBundle11Flashcard />} />
            <Route path="/insert-myr-bundle12-association" element={<InsertMyrBundle12Association />} />
            <Route path="/insert-myr-bundle12-flashcard" element={<InsertMyrBundle12Flashcard />} />
            <Route path="/insert-myr-bundle13-association" element={<InsertMyrBundle13Association />} />
            <Route path="/insert-myr-bundle13-flashcard" element={<InsertMyrBundle13Flashcard />} />
            <Route path="/insert-myr-bundle14-association" element={<InsertMyrBundle14Association />} />
            <Route path="/insert-myr-bundle14-flashcard" element={<InsertMyrBundle14Flashcard />} />
            <Route path="/insert-myr-bundle15-association" element={<InsertMyrBundle15Association />} />
            <Route path="/insert-myr-bundle15-flashcard" element={<InsertMyrBundle15Flashcard />} />
            <Route path="/insert-myr-bundle16-association" element={<InsertMyrBundle16Association />} />
            <Route path="/insert-myr-bundle16-flashcard" element={<InsertMyrBundle16Flashcard />} />
            <Route path="/insert-myr-bundle17-association" element={<InsertMyrBundle17Association />} />
            <Route path="/insert-myr-bundle17-flashcard" element={<InsertMyrBundle17Flashcard />} />
            <Route path="/insert-myr-bundle18-association" element={<InsertMyrBundle18Association />} />
            <Route path="/insert-myr-bundle18-flashcard" element={<InsertMyrBundle18Flashcard />} />
            <Route path="/insert-myr-bundle19-association" element={<InsertMyrBundle19Association />} />
            <Route path="/insert-myr-bundle19-flashcard" element={<InsertMyrBundle19Flashcard />} />
            <Route path="/insert-myr-bundle20-association" element={<InsertMyrBundle20Association />} />
            <Route path="/insert-myr-bundle20-flashcard" element={<InsertMyrBundle20Flashcard />} />
            <Route path="/insert-myr-bundle21-association" element={<InsertMyrBundle21Association />} />
            <Route path="/insert-myr-bundle21-flashcard" element={<InsertMyrBundle21Flashcard />} />
            <Route path="/insert-myr-bundle22-association" element={<InsertMyrBundle22Association />} />
            <Route path="/insert-myr-bundle22-flashcard" element={<InsertMyrBundle22Flashcard />} />
            <Route path="/insert-myr-bundle23-association" element={<InsertMyrBundle23Association />} />
            <Route path="/insert-myr-bundle23-flashcard" element={<InsertMyrBundle23Flashcard />} />
            <Route path="/insert-myr-bundle24-association" element={<InsertMyrBundle24Association />} />
            <Route path="/insert-myr-bundle24-flashcard" element={<InsertMyrBundle24Flashcard />} />
            <Route path="/insert-myr-bundle25-association" element={<InsertMyrBundle25Association />} />
            <Route path="/insert-myr-bundle25-flashcard" element={<InsertMyrBundle25Flashcard />} />
            <Route path="/insert-myr-bundle26-association" element={<InsertMyrBundle26Association />} />
            <Route path="/insert-myr-bundle26-flashcard" element={<InsertMyrBundle26Flashcard />} />
            <Route path="/insert-myr-bundle27-association" element={<InsertMyrBundle27Association />} />
            <Route path="/insert-myr-bundle27-flashcard" element={<InsertMyrBundle27Flashcard />} />
            <Route path="/insert-myr-bundle28-association" element={<InsertMyrBundle28Association />} />
            <Route path="/insert-myr-bundle28-flashcard" element={<InsertMyrBundle28Flashcard />} />
            <Route path="/insert-myr-bundle29-association" element={<InsertMyrBundle29Association />} />
            <Route path="/insert-myr-bundle29-flashcard" element={<InsertMyrBundle29Flashcard />} />
            <Route path="/insert-myr-bundle30-association" element={<InsertMyrBundle30Association />} />
            <Route path="/insert-myr-bundle30-flashcard" element={<InsertMyrBundle30Flashcard />} />
            <Route path="/insert-myr-bundle31-association" element={<InsertMyrBundle31Association />} />
            <Route path="/insert-myr-bundle31-flashcard" element={<InsertMyrBundle31Flashcard />} />
            <Route path="/insert-myr-bundle32-association" element={<InsertMyrBundle32Association />} />
            <Route path="/insert-myr-bundle32-flashcard" element={<InsertMyrBundle32Flashcard />} />
            <Route path="/insert-myr-bundle33-association" element={<InsertMyrBundle33Association />} />
            <Route path="/insert-myr-bundle33-flashcard" element={<InsertMyrBundle33Flashcard />} />
            <Route path="/insert-myr-bundle34-association" element={<InsertMyrBundle34Association />} />
            <Route path="/insert-myr-bundle34-flashcard" element={<InsertMyrBundle34Flashcard />} />
            <Route path="/insert-myr-bundle35-association" element={<InsertMyrBundle35Association />} />
            <Route path="/insert-myr-bundle35-flashcard" element={<InsertMyrBundle35Flashcard />} />
            <Route path="/insert-myr-bundle36-association" element={<InsertMyrBundle36Association />} />
            <Route path="/insert-myr-bundle36-flashcard" element={<InsertMyrBundle36Flashcard />} />
            <Route path="/insert-myr-bundle37-association" element={<InsertMyrBundle37Association />} />
            <Route path="/insert-myr-bundle37-flashcard" element={<InsertMyrBundle37Flashcard />} />
            <Route path="/insert-myr-bundle38-association" element={<InsertMyrBundle38Association />} />
            <Route path="/insert-myr-bundle38-flashcard" element={<InsertMyrBundle38Flashcard />} />
            <Route path="/insert-myr-bundle39-association" element={<InsertMyrBundle39Association />} />
            <Route path="/insert-myr-bundle39-flashcard" element={<InsertMyrBundle39Flashcard />} />
            <Route path="/insert-myr-bundle40-association" element={<InsertMyrBundle40Association />} />
            <Route path="/insert-myr-bundle40-flashcard" element={<InsertMyrBundle40Flashcard />} />
            <Route path="/insert-tha-bundle1-association" element={<InsertThaBundle1Association />} />
            <Route path="/insert-tha-bundle1-flashcard" element={<InsertThaBundle1Flashcard />} />
            <Route path="/insert-tha-bundle2-association" element={<InsertThaBundle2Association />} />
            <Route path="/insert-tha-bundle2-flashcard" element={<InsertThaBundle2Flashcard />} />
            <Route path="/insert-tha-bundle3-association" element={<InsertThaBundle3Association />} />
            <Route path="/insert-tha-bundle3-flashcard" element={<InsertThaBundle3Flashcard />} />
            <Route path="/insert-tha-bundle4-association" element={<InsertThaBundle4Association />} />
            <Route path="/insert-tha-bundle4-flashcard" element={<InsertThaBundle4Flashcard />} />
            <Route path="/insert-tha-bundle5-association" element={<InsertThaBundle5Association />} />
            <Route path="/insert-tha-bundle5-flashcard" element={<InsertThaBundle5Flashcard />} />
            <Route path="/insert-tha-bundle6-association" element={<InsertThaBundle6Association />} />
            <Route path="/insert-tha-bundle6-flashcard" element={<InsertThaBundle6Flashcard />} />
            <Route path="/insert-tha-bundle7-association" element={<InsertThaBundle7Association />} />
            <Route path="/insert-tha-bundle7-flashcard" element={<InsertThaBundle7Flashcard />} />
            <Route path="/insert-tha-bundle8-association" element={<InsertThaBundle8Association />} />
            <Route path="/insert-tha-bundle8-flashcard" element={<InsertThaBundle8Flashcard />} />
            <Route path="/insert-tha-bundle9-association" element={<InsertThaBundle9Association />} />
            <Route path="/insert-tha-bundle9-flashcard" element={<InsertThaBundle9Flashcard />} />
            <Route path="/insert-tha-bundle10-association" element={<InsertThaBundle10Association />} />
            <Route path="/insert-tha-bundle10-flashcard" element={<InsertThaBundle10Flashcard />} />
            <Route path="/insert-tha-bundle11-association" element={<InsertThaBundle11Association />} />
            <Route path="/insert-tha-bundle11-flashcard" element={<InsertThaBundle11Flashcard />} />
            <Route path="/insert-tha-bundle12-association" element={<InsertThaBundle12Association />} />
            <Route path="/insert-tha-bundle12-flashcard" element={<InsertThaBundle12Flashcard />} />
            <Route path="/insert-tha-bundle13-association" element={<InsertThaBundle13Association />} />
            <Route path="/insert-tha-bundle13-flashcard" element={<InsertThaBundle13Flashcard />} />
            <Route path="/insert-tha-bundle14-association" element={<InsertThaBundle14Association />} />
            <Route path="/insert-tha-bundle14-flashcard" element={<InsertThaBundle14Flashcard />} />
            <Route path="/insert-tha-bundle15-association" element={<InsertThaBundle15Association />} />
            <Route path="/insert-tha-bundle15-flashcard" element={<InsertThaBundle15Flashcard />} />
            <Route path="/insert-tha-bundle16-association" element={<InsertThaBundle16Association />} />
            <Route path="/insert-tha-bundle16-flashcard" element={<InsertThaBundle16Flashcard />} />
            <Route path="/insert-tha-bundle17-association" element={<InsertThaBundle17Association />} />
            <Route path="/insert-tha-bundle17-flashcard" element={<InsertThaBundle17Flashcard />} />
            <Route path="/insert-tha-bundle18-association" element={<InsertThaBundle18Association />} />
            <Route path="/insert-tha-bundle18-flashcard" element={<InsertThaBundle18Flashcard />} />
            <Route path="/insert-tha-bundle19-association" element={<InsertThaBundle19Association />} />
            <Route path="/insert-tha-bundle19-flashcard" element={<InsertThaBundle19Flashcard />} />
            <Route path="/insert-tha-bundle20-association" element={<InsertThaBundle20Association />} />
            <Route path="/insert-tha-bundle20-flashcard" element={<InsertThaBundle20Flashcard />} />
            <Route path="/insert-tha-bundle21-association" element={<InsertThaBundle21Association />} />
            <Route path="/insert-tha-bundle21-flashcard" element={<InsertThaBundle21Flashcard />} />
            <Route path="/insert-tha-bundle22-association" element={<InsertThaBundle22Association />} />
            <Route path="/insert-tha-bundle22-flashcard" element={<InsertThaBundle22Flashcard />} />
            <Route path="/insert-tha-bundle23-association" element={<InsertThaBundle23Association />} />
            <Route path="/insert-tha-bundle23-flashcard" element={<InsertThaBundle23Flashcard />} />
            <Route path="/insert-tha-bundle24-association" element={<InsertThaBundle24Association />} />
            <Route path="/insert-tha-bundle24-flashcard" element={<InsertThaBundle24Flashcard />} />
            <Route path="/insert-tha-bundle25-association" element={<InsertThaBundle25Association />} />
            <Route path="/insert-tha-bundle25-flashcard" element={<InsertThaBundle25Flashcard />} />
            <Route path="/insert-tha-bundle26-association" element={<InsertThaBundle26Association />} />
            <Route path="/insert-tha-bundle26-flashcard" element={<InsertThaBundle26Flashcard />} />
            <Route path="/insert-tha-bundle27-association" element={<InsertThaBundle27Association />} />
            <Route path="/insert-tha-bundle27-flashcard" element={<InsertThaBundle27Flashcard />} />
            <Route path="/insert-tha-bundle28-association" element={<InsertThaBundle28Association />} />
            <Route path="/insert-tha-bundle28-flashcard" element={<InsertThaBundle28Flashcard />} />
            <Route path="/insert-tha-bundle29-association" element={<InsertThaBundle29Association />} />
            <Route path="/insert-tha-bundle29-flashcard" element={<InsertThaBundle29Flashcard />} />
            <Route path="/insert-tha-bundle30-association" element={<InsertThaBundle30Association />} />
            <Route path="/insert-tha-bundle30-flashcard" element={<InsertThaBundle30Flashcard />} />
            <Route path="/insert-tha-bundle31-association" element={<InsertThaBundle31Association />} />
            <Route path="/insert-tha-bundle31-flashcard" element={<InsertThaBundle31Flashcard />} />
            <Route path="/insert-tha-bundle32-association" element={<InsertThaBundle32Association />} />
            <Route path="/insert-tha-bundle32-flashcard" element={<InsertThaBundle32Flashcard />} />
            <Route path="/insert-tha-bundle33-association" element={<InsertThaBundle33Association />} />
            <Route path="/insert-tha-bundle33-flashcard" element={<InsertThaBundle33Flashcard />} />
            <Route path="/insert-tha-bundle34-association" element={<InsertThaBundle34Association />} />
            <Route path="/insert-tha-bundle34-flashcard" element={<InsertThaBundle34Flashcard />} />
            <Route path="/insert-tha-bundle35-association" element={<InsertThaBundle35Association />} />
            <Route path="/insert-tha-bundle35-flashcard" element={<InsertThaBundle35Flashcard />} />
            <Route path="/insert-tha-bundle36-association" element={<InsertThaBundle36Association />} />
            <Route path="/insert-tha-bundle36-flashcard" element={<InsertThaBundle36Flashcard />} />
            <Route path="/insert-tha-bundle37-association" element={<InsertThaBundle37Association />} />
            <Route path="/insert-tha-bundle37-flashcard" element={<InsertThaBundle37Flashcard />} />
            <Route path="/insert-tha-bundle38-association" element={<InsertThaBundle38Association />} />
            <Route path="/insert-tha-bundle38-flashcard" element={<InsertThaBundle38Flashcard />} />
            <Route path="/insert-tha-bundle39-association" element={<InsertThaBundle39Association />} />
            <Route path="/insert-tha-bundle39-flashcard" element={<InsertThaBundle39Flashcard />} />
            <Route path="/insert-tha-bundle40-association" element={<InsertThaBundle40Association />} />
            <Route path="/insert-tha-bundle40-flashcard" element={<InsertThaBundle40Flashcard />} />
            <Route path="/test-gamification" element={<GamificationTest />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/my-learning" element={<MyLearning />} />
            <Route path="/debug-path" element={<DebugPath />} />
            <Route path="/migrate-path" element={<MigratePath />} />
            <Route path="/create-jap-list-1000" element={<CreateJapList1000 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
          </TopicProvider>
        </LearningPathProvider>
      </ExerciseProvider>
    </UserProgressProvider>
  </QueryClientProvider>
);

export default App;
