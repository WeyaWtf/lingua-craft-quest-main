import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseSimpleSentences = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertSimpleSentences = async () => {
    setIsInserting(true);

    // 20 simple Burmese sentences with full breakdown
    const sentences = [
      // Basic Statements (5)
      {
        id: "s1",
        burmese: "ကျွန်တော် ထမင်း စား နေတယ်",
        breakdown: [
          { syllable: "ကျွန်တော်", romaji: "kyun-daw", meaning: "I (male speaker)", category: "pronoun" },
          { syllable: "ထမင်း", romaji: "hta-min:", meaning: "rice / meal", category: "noun" },
          { syllable: "စား", romaji: "sa:", meaning: "eat", category: "verb" },
          { syllable: "နေတယ်", romaji: "nay-deh", meaning: "[present continuous marker]", category: "particle" }
        ],
        translation: "I am eating rice / Je mange du riz",
        notes: "Basic present continuous sentence with Subject-Object-Verb-Marker pattern"
      },
      {
        id: "s2",
        burmese: "ဒါ စာအုပ် ပါ",
        breakdown: [
          { syllable: "ဒါ", romaji: "da", meaning: "this", category: "pronoun" },
          { syllable: "စာ", romaji: "sa", meaning: "letter / book", category: "noun" },
          { syllable: "အုပ်", romaji: "ote", meaning: "[classifier for books]", category: "classifier" },
          { syllable: "ပါ", romaji: "ba", meaning: "[affirmative particle]", category: "particle" }
        ],
        translation: "This is a book / C'est un livre",
        notes: "Simple 'this is' statement with classifier"
      },
      {
        id: "s3",
        burmese: "သူ ဆရာ ဖြစ် တယ်",
        breakdown: [
          { syllable: "သူ", romaji: "thu", meaning: "he / she", category: "pronoun" },
          { syllable: "ဆရာ", romaji: "hsaya", meaning: "teacher", category: "noun" },
          { syllable: "ဖြစ်", romaji: "hpyit", meaning: "to be / become", category: "verb" },
          { syllable: "တယ်", romaji: "teh", meaning: "[affirmative marker]", category: "particle" }
        ],
        translation: "He/She is a teacher / Il/Elle est professeur(e)",
        notes: "Identity statement using ဖြစ် (to be)"
      },
      {
        id: "s4",
        burmese: "ရေ အေး တယ်",
        breakdown: [
          { syllable: "ရေ", romaji: "yay", meaning: "water", category: "noun" },
          { syllable: "အေး", romaji: "ay:", meaning: "cold / cool", category: "adjective" },
          { syllable: "တယ်", romaji: "teh", meaning: "[affirmative marker]", category: "particle" }
        ],
        translation: "The water is cold / L'eau est froide",
        notes: "Simple adjective statement (Noun + Adjective + Particle)"
      },
      {
        id: "s5",
        burmese: "မိုး ရွာ နေတယ်",
        breakdown: [
          { syllable: "မိုး", romaji: "mo:", meaning: "rain", category: "noun" },
          { syllable: "ရွာ", romaji: "ywa", meaning: "to fall (rain)", category: "verb" },
          { syllable: "နေတယ်", romaji: "nay-deh", meaning: "[present continuous]", category: "particle" }
        ],
        translation: "It is raining / Il pleut",
        notes: "Weather expression with continuous aspect"
      },

      // Questions (5)
      {
        id: "s6",
        burmese: "မင်္ဂလာပါ ဗျာ",
        breakdown: [
          { syllable: "မင်္ဂလာ", romaji: "mingala", meaning: "blessing / greeting", category: "noun" },
          { syllable: "ပါ", romaji: "ba", meaning: "[polite particle]", category: "particle" },
          { syllable: "ဗျာ", romaji: "bya", meaning: "[male polite marker]", category: "particle" }
        ],
        translation: "Hello (formal, to male) / Bonjour (formel)",
        notes: "Formal greeting using polite particles"
      },
      {
        id: "s7",
        burmese: "နေကောင်း လား",
        breakdown: [
          { syllable: "နေ", romaji: "nay", meaning: "to stay / live", category: "verb" },
          { syllable: "ကောင်း", romaji: "kaung:", meaning: "good / well", category: "adjective" },
          { syllable: "လား", romaji: "la:", meaning: "[question marker]", category: "particle" }
        ],
        translation: "How are you? (lit: Are you well?) / Comment allez-vous?",
        notes: "Common greeting question with question marker လား"
      },
      {
        id: "s8",
        burmese: "သင် နာမည် ဘယ်လို ခေါ် လဲ",
        breakdown: [
          { syllable: "သင်", romaji: "thin", meaning: "you", category: "pronoun" },
          { syllable: "နာမည်", romaji: "na-meh", meaning: "name", category: "noun" },
          { syllable: "ဘယ်လို", romaji: "beh-lo", meaning: "what / how", category: "question" },
          { syllable: "ခေါ်", romaji: "khaw", meaning: "to call", category: "verb" },
          { syllable: "လဲ", romaji: "leh", meaning: "[question marker]", category: "particle" }
        ],
        translation: "What is your name? / Comment vous appelez-vous?",
        notes: "Question with interrogative word ဘယ်လို (what/how)"
      },
      {
        id: "s9",
        burmese: "ဒါ ဘယ် လောက် လဲ",
        breakdown: [
          { syllable: "ဒါ", romaji: "da", meaning: "this", category: "pronoun" },
          { syllable: "ဘယ်", romaji: "beh", meaning: "which / what", category: "question" },
          { syllable: "လောက်", romaji: "lauk", meaning: "price / amount", category: "noun" },
          { syllable: "လဲ", romaji: "leh", meaning: "[question marker]", category: "particle" }
        ],
        translation: "How much is this? / Combien ça coûte?",
        notes: "Price question using ဘယ်လောက် (how much)"
      },
      {
        id: "s10",
        burmese: "ဘယ် မှာ လဲ",
        breakdown: [
          { syllable: "ဘယ်", romaji: "beh", meaning: "which / where", category: "question" },
          { syllable: "မှာ", romaji: "hma", meaning: "[location marker]", category: "particle" },
          { syllable: "လဲ", romaji: "leh", meaning: "[question marker]", category: "particle" }
        ],
        translation: "Where is it? / Où est-ce?",
        notes: "Location question with မှာ (at/in) + လဲ (question)"
      },

      // Negations (3)
      {
        id: "s11",
        burmese: "ကျွန်တော် မသိ ဘူး",
        breakdown: [
          { syllable: "ကျွန်တော်", romaji: "kyun-daw", meaning: "I (male)", category: "pronoun" },
          { syllable: "မ", romaji: "ma.", meaning: "[negation marker]", category: "particle" },
          { syllable: "သိ", romaji: "thi.", meaning: "to know", category: "verb" },
          { syllable: "ဘူး", romaji: "bu:", meaning: "[negative marker]", category: "particle" }
        ],
        translation: "I don't know / Je ne sais pas",
        notes: "Negation pattern: မ + verb + ဘူး"
      },
      {
        id: "s12",
        burmese: "မငို နဲ့",
        breakdown: [
          { syllable: "မ", romaji: "ma.", meaning: "[negative imperative]", category: "particle" },
          { syllable: "ငို", romaji: "ngo", meaning: "to cry", category: "verb" },
          { syllable: "နဲ့", romaji: "neh", meaning: "[prohibitive marker]", category: "particle" }
        ],
        translation: "Don't cry / Ne pleure pas",
        notes: "Negative command using မ + verb + နဲ့"
      },
      {
        id: "s13",
        burmese: "ကောင်း မ ဖြစ် ဘူး",
        breakdown: [
          { syllable: "ကောင်း", romaji: "kaung:", meaning: "good", category: "adjective" },
          { syllable: "မ", romaji: "ma.", meaning: "[negation]", category: "particle" },
          { syllable: "ဖြစ်", romaji: "hpyit", meaning: "to be", category: "verb" },
          { syllable: "ဘူး", romaji: "bu:", meaning: "[negative marker]", category: "particle" }
        ],
        translation: "It's not good / Ce n'est pas bon",
        notes: "Negative adjective statement"
      },

      // Actions & Commands (4)
      {
        id: "s14",
        burmese: "စာ ဖတ် ပါ",
        breakdown: [
          { syllable: "စာ", romaji: "sa", meaning: "book / letter", category: "noun" },
          { syllable: "ဖတ်", romaji: "phat", meaning: "to read", category: "verb" },
          { syllable: "ပါ", romaji: "ba", meaning: "[polite imperative]", category: "particle" }
        ],
        translation: "Please read (the book) / Veuillez lire",
        notes: "Polite command with ပါ"
      },
      {
        id: "s15",
        burmese: "ကျောင်း သွား မယ်",
        breakdown: [
          { syllable: "ကျောင်း", romaji: "kyaung:", meaning: "school", category: "noun" },
          { syllable: "သွား", romaji: "thwa:", meaning: "to go", category: "verb" },
          { syllable: "မယ်", romaji: "meh", meaning: "[future marker]", category: "particle" }
        ],
        translation: "I will go to school / J'irai à l'école",
        notes: "Future tense with မယ်"
      },
      {
        id: "s16",
        burmese: "ထ ပါ",
        breakdown: [
          { syllable: "ထ", romaji: "hta.", meaning: "to get up / stand", category: "verb" },
          { syllable: "ပါ", romaji: "ba", meaning: "[imperative]", category: "particle" }
        ],
        translation: "Stand up / Get up / Levez-vous",
        notes: "Simple command"
      },
      {
        id: "s17",
        burmese: "အိမ် ပြန် ပါ ပြီ",
        breakdown: [
          { syllable: "အိမ်", romaji: "ein", meaning: "home / house", category: "noun" },
          { syllable: "ပြန်", romaji: "pyan", meaning: "to return", category: "verb" },
          { syllable: "ပါ", romaji: "ba", meaning: "[polite particle]", category: "particle" },
          { syllable: "ပြီ", romaji: "pyi", meaning: "[completed action]", category: "particle" }
        ],
        translation: "I have returned home / Je suis rentré(e) à la maison",
        notes: "Completed action with ပြီ (already/completed)"
      },

      // Descriptions & Preferences (3)
      {
        id: "s18",
        burmese: "လဖက်ရည် ကို ကြိုက် တယ်",
        breakdown: [
          { syllable: "လဖက်ရည်", romaji: "la-phet-yay", meaning: "tea", category: "noun" },
          { syllable: "ကို", romaji: "kui", meaning: "[object marker]", category: "particle" },
          { syllable: "ကြိုက်", romaji: "kyaik", meaning: "to like", category: "verb" },
          { syllable: "တယ်", romaji: "teh", meaning: "[affirmative]", category: "particle" }
        ],
        translation: "I like tea / J'aime le thé",
        notes: "Preference statement with object marker ကို"
      },
      {
        id: "s19",
        burmese: "ဒီ အိမ် ကြီး လိုက် တာ",
        breakdown: [
          { syllable: "ဒီ", romaji: "di", meaning: "this", category: "pronoun" },
          { syllable: "အိမ်", romaji: "ein", meaning: "house", category: "noun" },
          { syllable: "ကြီး", romaji: "kyi:", meaning: "big", category: "adjective" },
          { syllable: "လိုက်", romaji: "laik", meaning: "[exclamative particle]", category: "particle" },
          { syllable: "တာ", romaji: "ta", meaning: "[nominalizer]", category: "particle" }
        ],
        translation: "This house is so big! / Cette maison est si grande!",
        notes: "Exclamation with လိုက်တာ for emphasis"
      },
      {
        id: "s20",
        burmese: "ရာသီဥတု အေး တယ်",
        breakdown: [
          { syllable: "ရာသီဥတု", romaji: "yathi-otu", meaning: "weather / season", category: "noun" },
          { syllable: "အေး", romaji: "ay:", meaning: "cold / cool", category: "adjective" },
          { syllable: "တယ်", romaji: "teh", meaning: "[affirmative]", category: "particle" }
        ],
        translation: "The weather is cold / Le temps est froid",
        notes: "Simple weather description"
      }
    ];

    // Convert to translation format (sourceText, targetText, hints)
    const translationExercises = sentences.map(s => {
      const breakdownText = s.breakdown.map(b => `${b.syllable} (${b.romaji}: ${b.meaning})`).join(' • ');
      return {
        sourceText: s.burmese,
        targetText: s.translation,
        hints: `${breakdownText}\n\n📝 ${s.notes}`
      };
    });

    const exerciseData = {
      type: "translation",
      title: "Burmese Simple Sentences - Phrases Simples Birmanes",
      description: "Learn to read and understand 20 basic Burmese sentences with complete syllable-by-syllable breakdown. Each sentence includes romanization, word-by-word meanings, grammatical categories, and detailed notes about sentence structure.",
      difficulty: 2,
      source: "official",
      language: "birman",
      tags: ["sentences", "reading", "translation", "burmese", "birman", "beginner", "grammar", "breakdown"],
      content: {
        exercises: translationExercises
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

      console.log('✅ Simple Sentences créées:', data);
      toast.success("Burmese Simple Sentences créées avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">📝 Burmese Simple Sentences</h1>
          <p className="text-muted-foreground mb-6">
            20 phrases birmanes simples avec décomposition syllabique complète
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Affirmations • Questions • Négations • Commandes • Descriptions
          </p>
          <Button
            size="lg"
            onClick={insertSimpleSentences}
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

export default InsertBurmeseSimpleSentences;
