import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseSyllableFlashcards = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertSyllableFlashcards = async () => {
    setIsInserting(true);

    // 60 most frequent Burmese syllables organized by category
    const syllableCards = [
      // Common particles & grammar markers
      { front: "က", back: "ka. (creaky) | object marker | IPA: [kạ]", category: "particles", id: "1" },
      { front: "ကို", back: "kui (low) | to, towards | IPA: [kò]", category: "particles", id: "2" },
      { front: "ကြ", back: "kya. (creaky) | medial -y- sound | IPA: [tɕa̰]", category: "particles", id: "3" },
      { front: "တယ်", back: "teh | verb ending (affirmative) | IPA: [tɛ̀]", category: "particles", id: "4" },
      { front: "လား", back: "la: (high) | question marker | IPA: [lá]", category: "particles", id: "5" },
      { front: "ပါ", back: "pa (low) | polite particle | IPA: [pà]", category: "particles", id: "6" },
      { front: "မ", back: "ma. (creaky) | negation marker | IPA: [mạ]", category: "particles", id: "7" },
      { front: "ဘူး", back: "bu: (high) | negative past marker | IPA: [bú]", category: "particles", id: "8" },
      { front: "နဲ့", back: "neh | with, and | IPA: [nɛ̰]", category: "particles", id: "9" },
      { front: "ရဲ့", back: "yeh | possessive marker | IPA: [jɛ̰]", category: "particles", id: "10" },

      // Common verb syllables
      { front: "သွား", back: "thwa: (high) | go | IPA: [θwá]", category: "verbs", id: "11" },
      { front: "လာ", back: "la (low) | come | IPA: [là]", category: "verbs", id: "12" },
      { front: "နေ", back: "nay (low) | stay, live | IPA: [nè]", category: "verbs", id: "13" },
      { front: "စား", back: "sa: (high) | eat | IPA: [sá]", category: "verbs", id: "14" },
      { front: "သောက်", back: "thauk (low) | drink | IPA: [θaʊʔ]", category: "verbs", id: "15" },
      { front: "ဖတ်", back: "phat (low) | read | IPA: [pʰaʔ]", category: "verbs", id: "16" },
      { front: "ရ", back: "ya. (creaky) | get, receive | IPA: [jạ]", category: "verbs", id: "17" },
      { front: "ပေး", back: "pay: (high) | give | IPA: [pé]", category: "verbs", id: "18" },
      { front: "လုပ်", back: "loat (low) | do, make | IPA: [loʊʔ]", category: "verbs", id: "19" },
      { front: "ကြည့်", back: "kyi. (creaky) | look, see | IPA: [tɕḭ]", category: "verbs", id: "20" },

      // Common noun syllables
      { front: "လူ", back: "lu (low) | person | IPA: [lù]", category: "nouns", id: "21" },
      { front: "အိမ်", back: "ein (low) | house | IPA: [ʔèɪɴ]", category: "nouns", id: "22" },
      { front: "ရေ", back: "yay (low) | water | IPA: [jè]", category: "nouns", id: "23" },
      { front: "စာ", back: "sa (low) | letter, book | IPA: [sà]", category: "nouns", id: "24" },
      { front: "မြို့", back: "myo. (creaky) | city, town | IPA: [mjo̰]", category: "nouns", id: "25" },
      { front: "နာ", back: "na (low) | ear | IPA: [nà]", category: "nouns", id: "26" },
      { front: "ကား", back: "ka: (high) | car | IPA: [ká]", category: "nouns", id: "27" },
      { front: "ထမင်း", back: "hta-min: (high) | rice, meal | IPA: [tʰəmín]", category: "nouns", id: "28" },
      { front: "ပိုက်", back: "paik (low) | money | IPA: [paɪʔ]", category: "nouns", id: "29" },
      { front: "ချစ်", back: "chit (low) | love | IPA: [tɕʰɪʔ]", category: "nouns", id: "30" },

      // Common adjectives/descriptors
      { front: "ကောင်း", back: "kaung: (high) | good | IPA: [káʊɴ]", category: "adjectives", id: "31" },
      { front: "လှ", back: "hla. (creaky) | beautiful | IPA: [l̥a̰]", category: "adjectives", id: "32" },
      { front: "ကြီး", back: "kyi: (high) | big | IPA: [tɕí]", category: "adjectives", id: "33" },
      { front: "သေး", back: "thay: (high) | small | IPA: [θé]", category: "adjectives", id: "34" },
      { front: "အဖြူ", back: "a-phyu (low) | white | IPA: [ʔəpʰjù]", category: "adjectives", id: "35" },
      { front: "အနီ", back: "a-ni (low) | red | IPA: [ʔənì]", category: "adjectives", id: "36" },
      { front: "မြန်", back: "myan (low) | fast | IPA: [mjàɴ]", category: "adjectives", id: "37" },
      { front: "နွေး", back: "nway: (high) | warm | IPA: [nwé]", category: "adjectives", id: "38" },
      { front: "အေး", back: "ay: (high) | cool, cold | IPA: [ʔé]", category: "adjectives", id: "39" },
      { front: "ချော", back: "chaw (low) | smooth, pretty | IPA: [tɕʰɔ̀]", category: "adjectives", id: "40" },

      // Pronouns & common words
      { front: "ကျွန်", back: "kyun (low) | I (formal/male) | IPA: [tɕùɴ]", category: "pronouns", id: "41" },
      { front: "တော်", back: "taw (low) | polite suffix | IPA: [tɔ̀]", category: "pronouns", id: "42" },
      { front: "မာ", back: "ma (low) | I (female) | IPA: [mà]", category: "pronouns", id: "43" },
      { front: "သင်", back: "thin (low) | you | IPA: [θɪ̀ɴ]", category: "pronouns", id: "44" },
      { front: "သူ", back: "thu (low) | he/she | IPA: [θù]", category: "pronouns", id: "45" },
      { front: "ဒါ", back: "da (low) | this | IPA: [dà]", category: "pronouns", id: "46" },
      { front: "ဟု", back: "ho. (creaky) | that | IPA: [hò]", category: "pronouns", id: "47" },
      { front: "ဘယ်", back: "beh (low) | which, what | IPA: [bɛ̀]", category: "pronouns", id: "48" },
      { front: "ဘာ", back: "ba (low) | what | IPA: [bà]", category: "pronouns", id: "49" },
      { front: "ဘယ်သူ", back: "beh-thu (low-low) | who | IPA: [bɛ̀θù]", category: "pronouns", id: "50" },

      // Numbers & time
      { front: "တစ်", back: "tit (low) | one | IPA: [tɪʔ]", category: "numbers", id: "51" },
      { front: "နှစ်", back: "hnit (low) | two | IPA: [n̥ɪʔ]", category: "numbers", id: "52" },
      { front: "သုံး", back: "thoun: (high) | three | IPA: [θóʊɴ]", category: "numbers", id: "53" },
      { front: "လေး", back: "lay: (high) | four | IPA: [lé]", category: "numbers", id: "54" },
      { front: "ငါး", back: "nga: (high) | five | IPA: [ŋá]", category: "numbers", id: "55" },
      { front: "ရက်", back: "yet (low) | day | IPA: [jɛʔ]", category: "time", id: "56" },
      { front: "လ", back: "la. (creaky) | month | IPA: [la̰]", category: "time", id: "57" },
      { front: "နှစ်", back: "hnit (low) | year | IPA: [n̥ɪʔ]", category: "time", id: "58" },
      { front: "နေ့", back: "neh | day (daytime) | IPA: [nɛ̰]", category: "time", id: "59" },
      { front: "ညနေ", back: "nya-nay (low-low) | evening | IPA: [ɲənè]", category: "time", id: "60" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "Burmese Frequent Syllables - Syllabes Birmanes Fréquentes",
      description: "Master the 60 most common Burmese syllables with romanization and IPA pronunciation. Organized by grammatical categories: particles, verbs, nouns, adjectives, pronouns, numbers, and time words.",
      difficulty: 2,
      source: "official",
      language: "birman",
      tags: ["syllables", "flashcards", "burmese", "birman", "frequent", "vocabulary", "intermediate"],
      content: {
        cards: syllableCards,
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
        console.error('Erreur lors de l\'insertion:', error);
        toast.error(`Erreur: ${error.message || "Erreur lors de la création de l'exercice"}`);
        setIsInserting(false);
        return;
      }

      console.log('✅ Syllable Flashcards créées:', data);
      toast.success("Burmese Syllable Flashcards créées avec succès !");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) {
      console.error('Erreur:', err);
      toast.error("Une erreur s'est produite");
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">🇲🇲 Burmese Syllable Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            60 syllabes birmanes les plus fréquentes organisées par catégories grammaticales
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Particules • Verbes • Noms • Adjectifs • Pronoms • Nombres • Temps
          </p>
          <Button
            size="lg"
            onClick={insertSyllableFlashcards}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "✅ Insérer l'exercice dans la base de données"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsertBurmeseSyllableFlashcards;
