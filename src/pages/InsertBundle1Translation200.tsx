import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle1Translation200 = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle1Translation = async () => {
    setIsInserting(true);

    // 200 exercices de traduction basés sur le vocabulaire Bundle 1
    const translationExercises = [
      // 行く (iku) - go (8 exercises)
      { sourceText: "私は行く", targetText: "I go", hints: "watashi wa iku", notes: "Basic present tense form" },
      { sourceText: "学校に行く", targetText: "go to school", hints: "gakkō ni iku", notes: "に particle indicates direction" },
      { sourceText: "家に行く", targetText: "go home", hints: "ie ni iku", notes: "Common daily expression" },
      { sourceText: "今行く", targetText: "go now", hints: "ima iku", notes: "Immediate action" },
      { sourceText: "パークに行く", targetText: "go to the park", hints: "pāku ni iku", notes: "Katakana word for park" },
      { sourceText: "いつ行く？", targetText: "when do you go?", hints: "itsu iku?", notes: "Question word いつ" },
      { sourceText: "ホテルに行く", targetText: "go to the hotel", hints: "hoteru ni iku", notes: "Katakana loanword" },
      { sourceText: "レストランに行く", targetText: "go to the restaurant", hints: "resutoran ni iku", notes: "French loanword" },

      // 見る (miru) - see, look at (8 exercises)
      { sourceText: "私は見る", targetText: "I see", hints: "watashi wa miru", notes: "Basic verb form" },
      { sourceText: "テレビを見る", targetText: "watch TV", hints: "terebi o miru", notes: "を marks direct object" },
      { sourceText: "これを見る", targetText: "look at this", hints: "kore o miru", notes: "これ demonstrative pronoun" },
      { sourceText: "それを見る", targetText: "look at that", hints: "sore o miru", notes: "それ refers to something near listener" },
      { sourceText: "映画を見る", targetText: "watch a movie", hints: "eiga o miru", notes: "Common entertainment activity" },
      { sourceText: "今見る", targetText: "see now", hints: "ima miru", notes: "Immediate action" },
      { sourceText: "カメラで見る", targetText: "see with a camera", hints: "kamera de miru", notes: "で particle indicates means/method" },
      { sourceText: "いつ見る？", targetText: "when do you see?", hints: "itsu miru?", notes: "Question form" },

      // 多い (ooi) - a lot of, many (8 exercises)
      { sourceText: "人が多い", targetText: "there are many people", hints: "hito ga ooi", notes: "が particle marks subject" },
      { sourceText: "仕事が多い", targetText: "there is a lot of work", hints: "shigoto ga ooi", notes: "Common workplace expression" },
      { sourceText: "時間が多い", targetText: "there is a lot of time", hints: "jikan ga ooi", notes: "Time quantity" },
      { sourceText: "カフェが多い", targetText: "there are many cafes", hints: "kafe ga ooi", notes: "Urban environment description" },
      { sourceText: "バスが多い", targetText: "there are many buses", hints: "basu ga ooi", notes: "Transportation context" },
      { sourceText: "ホテルが多い", targetText: "there are many hotels", hints: "hoteru ga ooi", notes: "Tourism context" },
      { sourceText: "レストランが多い", targetText: "there are many restaurants", hints: "resutoran ga ooi", notes: "Dining options" },
      { sourceText: "チョコが多い", targetText: "there is a lot of chocolate", hints: "choko ga ooi", notes: "Food quantity" },

      // 家 (ie) - home, household (8 exercises)
      { sourceText: "これは家", targetText: "this is home", hints: "kore wa ie", notes: "これ + は = topic marker" },
      { sourceText: "私の家", targetText: "my home", hints: "watashi no ie", notes: "の shows possession" },
      { sourceText: "新しい家", targetText: "new home", hints: "atarashii ie", notes: "い-adjective + noun" },
      { sourceText: "家に行く", targetText: "go home", hints: "ie ni iku", notes: "Going to destination" },
      { sourceText: "家で仕事する", targetText: "work at home", hints: "ie de shigoto suru", notes: "で marks location of action" },
      { sourceText: "家を買う", targetText: "buy a home", hints: "ie o kau", notes: "Major purchase" },
      { sourceText: "家を作る", targetText: "make a home", hints: "ie o tsukuru", notes: "Construction or creating" },
      { sourceText: "家を見る", targetText: "see the home", hints: "ie o miru", notes: "House viewing" },

      // これ (kore) - this, this one (8 exercises)
      { sourceText: "これは何？", targetText: "what is this?", hints: "kore wa nani?", notes: "Basic question pattern" },
      { sourceText: "これを見る", targetText: "look at this", hints: "kore o miru", notes: "Directing attention" },
      { sourceText: "これを買う", targetText: "buy this", hints: "kore o kau", notes: "Shopping context" },
      { sourceText: "これを使う", targetText: "use this", hints: "kore o tsukau", notes: "Instruction or permission" },
      { sourceText: "これを持つ", targetText: "have this", hints: "kore o motsu", notes: "Possession" },
      { sourceText: "これを作る", targetText: "make this", hints: "kore o tsukuru", notes: "Creation or production" },
      { sourceText: "これを知る", targetText: "know this", hints: "kore o shiru", notes: "Knowledge or awareness" },
      { sourceText: "これは新しい", targetText: "this is new", hints: "kore wa atarashii", notes: "Predicate adjective" },

      // それ (sore) - that, that one (8 exercises)
      { sourceText: "それは何？", targetText: "what is that?", hints: "sore wa nani?", notes: "Near listener" },
      { sourceText: "それを見る", targetText: "look at that", hints: "sore o miru", notes: "Directing attention away" },
      { sourceText: "それを買う", targetText: "buy that", hints: "sore o kau", notes: "Shopping decision" },
      { sourceText: "それを使う", targetText: "use that", hints: "sore o tsukau", notes: "Selecting an option" },
      { sourceText: "それを持つ", targetText: "have that", hints: "sore o motsu", notes: "Possession of distant object" },
      { sourceText: "それを作る", targetText: "make that", hints: "sore o tsukuru", notes: "Creation instruction" },
      { sourceText: "それを知る", targetText: "know that", hints: "sore o shiru", notes: "Knowledge of fact" },
      { sourceText: "それは新しい", targetText: "that is new", hints: "sore wa atarashii", notes: "Description" },

      // 私 (watashi) - I (8 exercises)
      { sourceText: "私は行く", targetText: "I go", hints: "watashi wa iku", notes: "First person subject" },
      { sourceText: "私は見る", targetText: "I see", hints: "watashi wa miru", notes: "Visual perception" },
      { sourceText: "私は買う", targetText: "I buy", hints: "watashi wa kau", notes: "Purchase action" },
      { sourceText: "私は作る", targetText: "I make", hints: "watashi wa tsukuru", notes: "Creation" },
      { sourceText: "私は思う", targetText: "I think", hints: "watashi wa omou", notes: "Opinion or thought" },
      { sourceText: "私は持つ", targetText: "I have", hints: "watashi wa motsu", notes: "Possession" },
      { sourceText: "私は知る", targetText: "I know", hints: "watashi wa shiru", notes: "Knowledge" },
      { sourceText: "私は使う", targetText: "I use", hints: "watashi wa tsukau", notes: "Utilization" },

      // 仕事 (shigoto) - work, job (8 exercises)
      { sourceText: "私は仕事する", targetText: "I work", hints: "watashi wa shigoto suru", notes: "Compound verb" },
      { sourceText: "仕事に行く", targetText: "go to work", hints: "shigoto ni iku", notes: "Daily routine" },
      { sourceText: "仕事が多い", targetText: "there is a lot of work", hints: "shigoto ga ooi", notes: "Workload description" },
      { sourceText: "新しい仕事", targetText: "new job", hints: "atarashii shigoto", notes: "Career change" },
      { sourceText: "仕事を作る", targetText: "create work", hints: "shigoto o tsukuru", notes: "Job creation" },
      { sourceText: "仕事を持つ", targetText: "have a job", hints: "shigoto o motsu", notes: "Employment status" },
      { sourceText: "今仕事する", targetText: "work now", hints: "ima shigoto suru", notes: "Current activity" },
      { sourceText: "いつ仕事する？", targetText: "when do you work?", hints: "itsu shigoto suru?", notes: "Schedule question" },

      // いつ (itsu) - when (8 exercises)
      { sourceText: "いつ行く？", targetText: "when do you go?", hints: "itsu iku?", notes: "Time question" },
      { sourceText: "いつ見る？", targetText: "when do you see?", hints: "itsu miru?", notes: "Schedule inquiry" },
      { sourceText: "いつ買う？", targetText: "when do you buy?", hints: "itsu kau?", notes: "Purchase timing" },
      { sourceText: "いつ使う？", targetText: "when do you use?", hints: "itsu tsukau?", notes: "Usage timing" },
      { sourceText: "いつ作る？", targetText: "when do you make?", hints: "itsu tsukuru?", notes: "Creation timeline" },
      { sourceText: "いつ出る？", targetText: "when do you leave?", hints: "itsu deru?", notes: "Departure time" },
      { sourceText: "いつ仕事する？", targetText: "when do you work?", hints: "itsu shigoto suru?", notes: "Work schedule" },
      { sourceText: "いつなる？", targetText: "when does it become?", hints: "itsu naru?", notes: "Change timing" },

      // する (suru) - do, make (8 exercises)
      { sourceText: "私はする", targetText: "I do", hints: "watashi wa suru", notes: "General action" },
      { sourceText: "仕事する", targetText: "do work", hints: "shigoto suru", notes: "Compound verb" },
      { sourceText: "今する", targetText: "do now", hints: "ima suru", notes: "Immediate action" },
      { sourceText: "これをする", targetText: "do this", hints: "kore o suru", notes: "Specific task" },
      { sourceText: "それをする", targetText: "do that", hints: "sore o suru", notes: "Distant task" },
      { sourceText: "いつする？", targetText: "when do you do?", hints: "itsu suru?", notes: "Timing question" },
      { sourceText: "家でする", targetText: "do at home", hints: "ie de suru", notes: "Location of action" },
      { sourceText: "テストする", targetText: "do a test", hints: "tesuto suru", notes: "Examination" },

      // 出る (deru) - go out, leave (8 exercises)
      { sourceText: "私は出る", targetText: "I leave", hints: "watashi wa deru", notes: "Departure action" },
      { sourceText: "家を出る", targetText: "leave home", hints: "ie o deru", notes: "Exiting location" },
      { sourceText: "今出る", targetText: "leave now", hints: "ima deru", notes: "Immediate departure" },
      { sourceText: "いつ出る？", targetText: "when do you leave?", hints: "itsu deru?", notes: "Departure timing" },
      { sourceText: "ホテルを出る", targetText: "leave the hotel", hints: "hoteru o deru", notes: "Check-out" },
      { sourceText: "レストランを出る", targetText: "leave the restaurant", hints: "resutoran o deru", notes: "Exiting establishment" },
      { sourceText: "バスが出る", targetText: "the bus leaves", hints: "basu ga deru", notes: "Transportation departure" },
      { sourceText: "学校を出る", targetText: "leave school", hints: "gakkō o deru", notes: "School dismissal" },

      // 使う (tsukau) - use (8 exercises)
      { sourceText: "私は使う", targetText: "I use", hints: "watashi wa tsukau", notes: "Utilization action" },
      { sourceText: "これを使う", targetText: "use this", hints: "kore o tsukau", notes: "Object selection" },
      { sourceText: "それを使う", targetText: "use that", hints: "sore o tsukau", notes: "Distant object" },
      { sourceText: "カメラを使う", targetText: "use a camera", hints: "kamera o tsukau", notes: "Tool usage" },
      { sourceText: "今使う", targetText: "use now", hints: "ima tsukau", notes: "Immediate use" },
      { sourceText: "いつ使う？", targetText: "when do you use?", hints: "itsu tsukau?", notes: "Usage timing" },
      { sourceText: "コンピューターを使う", targetText: "use a computer", hints: "konpyūtā o tsukau", notes: "Technology usage" },
      { sourceText: "時間を使う", targetText: "use time", hints: "jikan o tsukau", notes: "Time management" },

      // 所 (tokoro) - place (8 exercises)
      { sourceText: "これは所", targetText: "this is a place", hints: "kore wa tokoro", notes: "Location identification" },
      { sourceText: "新しい所", targetText: "new place", hints: "atarashii tokoro", notes: "Unfamiliar location" },
      { sourceText: "同じ所", targetText: "same place", hints: "onaji tokoro", notes: "Familiar location" },
      { sourceText: "いい所", targetText: "good place", hints: "ii tokoro", notes: "Positive evaluation" },
      { sourceText: "所に行く", targetText: "go to a place", hints: "tokoro ni iku", notes: "Destination" },
      { sourceText: "所を見る", targetText: "see a place", hints: "tokoro o miru", notes: "Observation" },
      { sourceText: "所を知る", targetText: "know a place", hints: "tokoro o shiru", notes: "Familiarity" },
      { sourceText: "仕事の所", targetText: "work place", hints: "shigoto no tokoro", notes: "Workplace" },

      // 作る (tsukuru) - make, create (8 exercises)
      { sourceText: "私は作る", targetText: "I make", hints: "watashi wa tsukuru", notes: "Creation action" },
      { sourceText: "これを作る", targetText: "make this", hints: "kore o tsukuru", notes: "Specific creation" },
      { sourceText: "それを作る", targetText: "make that", hints: "sore o tsukuru", notes: "Distant object creation" },
      { sourceText: "家を作る", targetText: "make a home", hints: "ie o tsukuru", notes: "Construction" },
      { sourceText: "仕事を作る", targetText: "create work", hints: "shigoto o tsukuru", notes: "Job creation" },
      { sourceText: "今作る", targetText: "make now", hints: "ima tsukuru", notes: "Immediate creation" },
      { sourceText: "いつ作る？", targetText: "when do you make?", hints: "itsu tsukuru?", notes: "Creation timing" },
      { sourceText: "ケーキを作る", targetText: "make a cake", hints: "kēki o tsukuru", notes: "Cooking/baking" },

      // 思う (omou) - think (8 exercises)
      { sourceText: "私は思う", targetText: "I think", hints: "watashi wa omou", notes: "Opinion expression" },
      { sourceText: "今思う", targetText: "think now", hints: "ima omou", notes: "Current thought" },
      { sourceText: "同じと思う", targetText: "think it's the same", hints: "onaji to omou", notes: "と marks quotation" },
      { sourceText: "新しいと思う", targetText: "think it's new", hints: "atarashii to omou", notes: "Opinion about newness" },
      { sourceText: "いいと思う", targetText: "think it's good", hints: "ii to omou", notes: "Positive opinion" },
      { sourceText: "多いと思う", targetText: "think there are many", hints: "ooi to omou", notes: "Quantity opinion" },
      { sourceText: "知ると思う", targetText: "think I know", hints: "shiru to omou", notes: "Knowledge assumption" },
      { sourceText: "行くと思う", targetText: "think I will go", hints: "iku to omou", notes: "Future intention" },

      // 持つ (motsu) - have, possess (8 exercises)
      { sourceText: "私は持つ", targetText: "I have", hints: "watashi wa motsu", notes: "Possession" },
      { sourceText: "これを持つ", targetText: "have this", hints: "kore o motsu", notes: "Proximate possession" },
      { sourceText: "それを持つ", targetText: "have that", hints: "sore o motsu", notes: "Distant possession" },
      { sourceText: "カメラを持つ", targetText: "have a camera", hints: "kamera o motsu", notes: "Equipment ownership" },
      { sourceText: "時間を持つ", targetText: "have time", hints: "jikan o motsu", notes: "Availability" },
      { sourceText: "仕事を持つ", targetText: "have a job", hints: "shigoto o motsu", notes: "Employment" },
      { sourceText: "家を持つ", targetText: "have a home", hints: "ie o motsu", notes: "Home ownership" },
      { sourceText: "チケットを持つ", targetText: "have a ticket", hints: "chiketto o motsu", notes: "Ticket possession" },

      // 買う (kau) - buy (8 exercises)
      { sourceText: "私は買う", targetText: "I buy", hints: "watashi wa kau", notes: "Purchase action" },
      { sourceText: "これを買う", targetText: "buy this", hints: "kore o kau", notes: "Shopping decision" },
      { sourceText: "それを買う", targetText: "buy that", hints: "sore o kau", notes: "Alternative choice" },
      { sourceText: "家を買う", targetText: "buy a home", hints: "ie o kau", notes: "Major purchase" },
      { sourceText: "チョコを買う", targetText: "buy chocolate", hints: "choko o kau", notes: "Small purchase" },
      { sourceText: "今買う", targetText: "buy now", hints: "ima kau", notes: "Immediate purchase" },
      { sourceText: "いつ買う？", targetText: "when do you buy?", hints: "itsu kau?", notes: "Purchase timing" },
      { sourceText: "チケットを買う", targetText: "buy a ticket", hints: "chiketto o kau", notes: "Event/travel" },

      // 時間 (jikan) - time, hour (8 exercises)
      { sourceText: "時間がある", targetText: "there is time", hints: "jikan ga aru", notes: "Availability" },
      { sourceText: "時間が多い", targetText: "there is a lot of time", hints: "jikan ga ooi", notes: "Abundance" },
      { sourceText: "時間を使う", targetText: "use time", hints: "jikan o tsukau", notes: "Time management" },
      { sourceText: "時間を持つ", targetText: "have time", hints: "jikan o motsu", notes: "Availability for activity" },
      { sourceText: "今は時間", targetText: "now is the time", hints: "ima wa jikan", notes: "Right moment" },
      { sourceText: "同じ時間", targetText: "same time", hints: "onaji jikan", notes: "Simultaneous" },
      { sourceText: "いつの時間？", targetText: "what time?", hints: "itsu no jikan?", notes: "Time inquiry" },
      { sourceText: "仕事の時間", targetText: "work time", hints: "shigoto no jikan", notes: "Work hours" },

      // 知る (shiru) - know (8 exercises)
      { sourceText: "私は知る", targetText: "I know", hints: "watashi wa shiru", notes: "Knowledge" },
      { sourceText: "これを知る", targetText: "know this", hints: "kore o shiru", notes: "Specific knowledge" },
      { sourceText: "それを知る", targetText: "know that", hints: "sore o shiru", notes: "Fact awareness" },
      { sourceText: "所を知る", targetText: "know the place", hints: "tokoro o shiru", notes: "Familiarity with location" },
      { sourceText: "家を知る", targetText: "know the home", hints: "ie o shiru", notes: "Address knowledge" },
      { sourceText: "仕事を知る", targetText: "know the work", hints: "shigoto o shiru", notes: "Job understanding" },
      { sourceText: "人を知る", targetText: "know the person", hints: "hito o shiru", notes: "Acquaintance" },
      { sourceText: "いつ知る？", targetText: "when do you know?", hints: "itsu shiru?", notes: "Knowledge acquisition timing" },

      // 同じ (onaji) - same, identical (8 exercises)
      { sourceText: "同じ家", targetText: "same home", hints: "onaji ie", notes: "Identical residence" },
      { sourceText: "同じ所", targetText: "same place", hints: "onaji tokoro", notes: "Identical location" },
      { sourceText: "同じ時間", targetText: "same time", hints: "onaji jikan", notes: "Simultaneous" },
      { sourceText: "同じ仕事", targetText: "same job", hints: "onaji shigoto", notes: "Identical occupation" },
      { sourceText: "同じと思う", targetText: "think it's the same", hints: "onaji to omou", notes: "Opinion of similarity" },
      { sourceText: "同じ人", targetText: "same person", hints: "onaji hito", notes: "Identical individual" },
      { sourceText: "同じカメラ", targetText: "same camera", hints: "onaji kamera", notes: "Identical model" },
      { sourceText: "同じレストラン", targetText: "same restaurant", hints: "onaji resutoran", notes: "Familiar establishment" },

      // 今 (ima) - now (8 exercises)
      { sourceText: "今行く", targetText: "go now", hints: "ima iku", notes: "Immediate departure" },
      { sourceText: "今見る", targetText: "see now", hints: "ima miru", notes: "Immediate viewing" },
      { sourceText: "今買う", targetText: "buy now", hints: "ima kau", notes: "Immediate purchase" },
      { sourceText: "今する", targetText: "do now", hints: "ima suru", notes: "Immediate action" },
      { sourceText: "今作る", targetText: "make now", hints: "ima tsukuru", notes: "Immediate creation" },
      { sourceText: "今出る", targetText: "leave now", hints: "ima deru", notes: "Immediate departure" },
      { sourceText: "今使う", targetText: "use now", hints: "ima tsukau", notes: "Immediate use" },
      { sourceText: "今は時間", targetText: "now is the time", hints: "ima wa jikan", notes: "Right moment" },

      // 新しい (atarashii) - new (8 exercises)
      { sourceText: "新しい家", targetText: "new home", hints: "atarashii ie", notes: "Recent construction" },
      { sourceText: "新しい仕事", targetText: "new job", hints: "atarashii shigoto", notes: "Career change" },
      { sourceText: "新しい所", targetText: "new place", hints: "atarashii tokoro", notes: "Unfamiliar location" },
      { sourceText: "新しいカメラ", targetText: "new camera", hints: "atarashii kamera", notes: "Recent purchase" },
      { sourceText: "新しいと思う", targetText: "think it's new", hints: "atarashii to omou", notes: "Opinion about newness" },
      { sourceText: "これは新しい", targetText: "this is new", hints: "kore wa atarashii", notes: "Recent acquisition" },
      { sourceText: "それは新しい", targetText: "that is new", hints: "sore wa atarashii", notes: "Novel item" },
      { sourceText: "新しいホテル", targetText: "new hotel", hints: "atarashii hoteru", notes: "Recently opened" },

      // なる (naru) - become (8 exercises)
      { sourceText: "私はなる", targetText: "I become", hints: "watashi wa naru", notes: "State change" },
      { sourceText: "新しくなる", targetText: "become new", hints: "atarashiku naru", notes: "Renewal" },
      { sourceText: "同じになる", targetText: "become the same", hints: "onaji ni naru", notes: "Equalization" },
      { sourceText: "多くなる", targetText: "become many", hints: "ooku naru", notes: "Increase in quantity" },
      { sourceText: "いつなる？", targetText: "when does it become?", hints: "itsu naru?", notes: "Change timing" },
      { sourceText: "今なる", targetText: "become now", hints: "ima naru", notes: "Immediate change" },
      { sourceText: "先生になる", targetText: "become a teacher", hints: "sensei ni naru", notes: "Career goal" },
      { sourceText: "ドクターになる", targetText: "become a doctor", hints: "dokutā ni naru", notes: "Professional aspiration" },

      // まだ (mada) - (not) yet, still (8 exercises)
      { sourceText: "まだ行く", targetText: "still go", hints: "mada iku", notes: "Continuing action" },
      { sourceText: "まだ見る", targetText: "still see", hints: "mada miru", notes: "Ongoing viewing" },
      { sourceText: "まだ持つ", targetText: "still have", hints: "mada motsu", notes: "Continued possession" },
      { sourceText: "まだ使う", targetText: "still use", hints: "mada tsukau", notes: "Ongoing usage" },
      { sourceText: "まだ知る", targetText: "still know", hints: "mada shiru", notes: "Retained knowledge" },
      { sourceText: "まだ買う", targetText: "still buy", hints: "mada kau", notes: "Continued purchasing" },
      { sourceText: "まだ家", targetText: "still home", hints: "mada ie", notes: "Not yet departed" },
      { sourceText: "まだ仕事する", targetText: "still work", hints: "mada shigoto suru", notes: "Ongoing work" },

      // あと (ato) - after (8 exercises)
      { sourceText: "あとで行く", targetText: "go after", hints: "ato de iku", notes: "Future action" },
      { sourceText: "あとで見る", targetText: "see after", hints: "ato de miru", notes: "Delayed viewing" },
      { sourceText: "あとで買う", targetText: "buy after", hints: "ato de kau", notes: "Postponed purchase" },
      { sourceText: "あとで使う", targetText: "use after", hints: "ato de tsukau", notes: "Later usage" },
      { sourceText: "あとで作る", targetText: "make after", hints: "ato de tsukuru", notes: "Deferred creation" },
      { sourceText: "あとで出る", targetText: "leave after", hints: "ato de deru", notes: "Delayed departure" },
      { sourceText: "仕事のあと", targetText: "after work", hints: "shigoto no ato", notes: "Post-work time" },
      { sourceText: "これのあと", targetText: "after this", hints: "kore no ato", notes: "Subsequent action" }
    ];

    const exerciseData = {
      type: "translation",
      title: "Bundle 1 - Translation (200 exercises)",
      description: "Comprehensive Japanese to English translation practice covering all N5 core vocabulary from Bundle 1",
      difficulty: 1,
      source: "official",
      language: "japanese",
      tags: ["vocabulary", "japanese", "beginner", "N5", "JLPT", "translation", "comprehensive"],
      content: {
        exercises: translationExercises,
        shuffleExercises: true
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
        console.error('Erreur lors de l\'insertion:', error);
        toast.error("Erreur lors de la création de l'exercice");
        setIsInserting(false);
        return;
      }

      console.log('✅ Exercice Bundle 1 Translation 200 créé:', data);
      toast.success("Exercice Bundle 1 Translation (200 exercices) créé avec succès !");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) {
      console.error('Erreur:', err);
      toast.error("Erreur lors de la création");
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">🇯🇵 Bundle 1 - Translation (200 Exercises)</h1>
          <p className="text-muted-foreground mb-6">
            Exercice complet de traduction japonais → anglais avec 200 phrases couvrant tout le vocabulaire N5 du Bundle 1
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Traduction (Translation)</li>
              <li>• <strong>Nombre d'exercices : 200</strong></li>
              <li>• Langue : Japonais 🇯🇵 → Anglais</li>
              <li>• Niveau : Débutant (N5)</li>
              <li>• Format : Phrase japonaise → Traduction anglaise</li>
              <li>• Indices : Romanji (prononciation)</li>
              <li>• Notes : Explications grammaticales pour chaque phrase</li>
              <li>• Mélange automatique : Activé par défaut</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">📋 Vocabulaire couvert (25 mots × 8 exercices = 200) :</h3>
            <p className="text-sm">
              • <strong>Verbes :</strong> 行く, 見る, する, 出る, 使う, 作る, 思う, 持つ, 買う, 知る, なる<br/>
              • <strong>Noms :</strong> 家, 所, 仕事, 時間<br/>
              • <strong>Démonstratifs :</strong> これ, それ, 私<br/>
              • <strong>Adjectifs :</strong> 多い, 新しい, 同じ<br/>
              • <strong>Mots de temps :</strong> いつ, 今, まだ, あと
            </p>
          </div>

          <Button
            size="lg"
            onClick={insertBundle1Translation}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Bundle 1 - 200 Exercices"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue avec le mélange automatique activé
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBundle1Translation200;
