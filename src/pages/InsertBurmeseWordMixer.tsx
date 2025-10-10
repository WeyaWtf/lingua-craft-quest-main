import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseWordMixer = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertWordMixer = async () => {
    setIsInserting(true);

    // 25 common Burmese words broken down into syllables for reconstruction
    const wordMixerExercises = [
      // Greetings (5)
      {
        id: "w1",
        reference: "Hello / Bonjour",
        blocks: [
          { id: "w1-b1", text: "မင်္ဂ", category: "syllable", correctPosition: 0 },
          { id: "w1-b2", text: "လာ", category: "syllable", correctPosition: 1 },
          { id: "w1-b3", text: "ဘာ", category: "syllable", correctPosition: 2 }
        ],
        correctOrder: ["w1-b1", "w1-b2", "w1-b3"],
        translation: "Hello / Bonjour",
        hints: "Traditional Burmese greeting - mingala ba",
        notes: "မင်္ဂလာဘာ (mingala ba) is the standard greeting in Burmese"
      },
      {
        id: "w2",
        reference: "Thank you / Merci",
        blocks: [
          { id: "w2-b1", text: "ကျေး", category: "syllable", correctPosition: 0 },
          { id: "w2-b2", text: "ဇူး", category: "syllable", correctPosition: 1 },
          { id: "w2-b3", text: "တင်", category: "syllable", correctPosition: 2 },
          { id: "w2-b4", text: "ပါ", category: "syllable", correctPosition: 3 },
          { id: "w2-b5", text: "တယ်", category: "syllable", correctPosition: 4 }
        ],
        correctOrder: ["w2-b1", "w2-b2", "w2-b3", "w2-b4", "w2-b5"],
        translation: "Thank you (polite)",
        hints: "kyay-zu tin-ba-deh - 5 syllables",
        notes: "ကျေးဇူးတင်ပါတယ် is the polite form of 'thank you'"
      },
      {
        id: "w3",
        reference: "How are you? / Comment allez-vous?",
        blocks: [
          { id: "w3-b1", text: "နေ", category: "syllable", correctPosition: 0 },
          { id: "w3-b2", text: "ကောင်း", category: "syllable", correctPosition: 1 },
          { id: "w3-b3", text: "လား", category: "syllable", correctPosition: 2 }
        ],
        correctOrder: ["w3-b1", "w3-b2", "w3-b3"],
        translation: "How are you? (lit: are you well?)",
        hints: "nay kaung: la: - starts with 'stay/live'",
        notes: "နေကောင်းလား is the common way to ask 'how are you?'"
      },
      {
        id: "w4",
        reference: "Goodbye / Au revoir",
        blocks: [
          { id: "w4-b1", text: "သွား", category: "syllable", correctPosition: 0 },
          { id: "w4-b2", text: "ခွာ", category: "syllable", correctPosition: 1 },
          { id: "w4-b3", text: "တော့", category: "syllable", correctPosition: 2 },
          { id: "w4-b4", text: "မယ်", category: "syllable", correctPosition: 3 }
        ],
        correctOrder: ["w4-b1", "w4-b2", "w4-b3", "w4-b4"],
        translation: "I'm leaving / Goodbye",
        hints: "thwa: khwa taw meh - means 'will depart'",
        notes: "သွားခွာတော့မယ် literally means 'will go and depart'"
      },
      {
        id: "w5",
        reference: "Welcome / Bienvenue",
        blocks: [
          { id: "w5-b1", text: "ကြို", category: "syllable", correctPosition: 0 },
          { id: "w5-b2", text: "ဆို", category: "syllable", correctPosition: 1 },
          { id: "w5-b3", text: "ပါ", category: "syllable", correctPosition: 2 },
          { id: "w5-b4", text: "တယ်", category: "syllable", correctPosition: 3 }
        ],
        correctOrder: ["w5-b1", "w5-b2", "w5-b3", "w5-b4"],
        translation: "Welcome",
        hints: "kyaw-hso-ba-deh",
        notes: "ကြိုဆိုပါတယ် is used to welcome guests"
      },

      // Food & Drink (5)
      {
        id: "w6",
        reference: "Rice / Riz",
        blocks: [
          { id: "w6-b1", text: "ထ", category: "syllable", correctPosition: 0 },
          { id: "w6-b2", text: "မင်း", category: "syllable", correctPosition: 1 }
        ],
        correctOrder: ["w6-b1", "w6-b2"],
        translation: "Cooked rice / meal",
        hints: "hta-min: - 2 syllables",
        notes: "ထမင်း refers to cooked rice or a meal"
      },
      {
        id: "w7",
        reference: "Water / Eau",
        blocks: [
          { id: "w7-b1", text: "ရေ", category: "syllable", correctPosition: 0 }
        ],
        correctOrder: ["w7-b1"],
        translation: "Water",
        hints: "yay - single syllable",
        notes: "ရေ is the most basic and essential word for water"
      },
      {
        id: "w8",
        reference: "Tea / Thé",
        blocks: [
          { id: "w8-b1", text: "လ", category: "syllable", correctPosition: 0 },
          { id: "w8-b2", text: "ဖက်", category: "syllable", correctPosition: 1 },
          { id: "w8-b3", text: "ရည်", category: "syllable", correctPosition: 2 }
        ],
        correctOrder: ["w8-b1", "w8-b2", "w8-b3"],
        translation: "Tea",
        hints: "la-phet-yay - 3 syllables",
        notes: "လဖက်ရည် literally means 'tea leaf water'"
      },
      {
        id: "w9",
        reference: "Delicious / Délicieux",
        blocks: [
          { id: "w9-b1", text: "အ", category: "syllable", correctPosition: 0 },
          { id: "w9-b2", text: "ရ", category: "syllable", correctPosition: 1 },
          { id: "w9-b3", text: "သာ", category: "syllable", correctPosition: 2 }
        ],
        correctOrder: ["w9-b1", "w9-b2", "w9-b3"],
        translation: "Delicious / tasty",
        hints: "a-ya-tha - 3 syllables",
        notes: "အရသာ means 'tasty' or 'delicious'"
      },
      {
        id: "w10",
        reference: "Restaurant / Restaurant",
        blocks: [
          { id: "w10-b1", text: "စား", category: "syllable", correctPosition: 0 },
          { id: "w10-b2", text: "သောက်", category: "syllable", correctPosition: 1 },
          { id: "w10-b3", text: "ဆိုင်", category: "syllable", correctPosition: 2 }
        ],
        correctOrder: ["w10-b1", "w10-b2", "w10-b3"],
        translation: "Restaurant / food shop",
        hints: "sa:-thauk-hsain - eat-drink-shop",
        notes: "စားသောက်ဆိုင် literally means 'eat-drink shop'"
      },

      // Family & People (5)
      {
        id: "w11",
        reference: "Mother / Mère",
        blocks: [
          { id: "w11-b1", text: "အ", category: "syllable", correctPosition: 0 },
          { id: "w11-b2", text: "မေ", category: "syllable", correctPosition: 1 }
        ],
        correctOrder: ["w11-b1", "w11-b2"],
        translation: "Mother",
        hints: "a-may - 2 syllables",
        notes: "အမေ is the affectionate term for mother"
      },
      {
        id: "w12",
        reference: "Father / Père",
        blocks: [
          { id: "w12-b1", text: "အ", category: "syllable", correctPosition: 0 },
          { id: "w12-b2", text: "ဖေ", category: "syllable", correctPosition: 1 }
        ],
        correctOrder: ["w12-b1", "w12-b2"],
        translation: "Father",
        hints: "a-phay - 2 syllables",
        notes: "အဖေ is the affectionate term for father"
      },
      {
        id: "w13",
        reference: "Friend / Ami(e)",
        blocks: [
          { id: "w13-b1", text: "မိတ်", category: "syllable", correctPosition: 0 },
          { id: "w13-b2", text: "ဆွေ", category: "syllable", correctPosition: 1 }
        ],
        correctOrder: ["w13-b1", "w13-b2"],
        translation: "Friend",
        hints: "mei'-hswè - 2 syllables",
        notes: "မိတ်ဆွေ is the word for friend or companion"
      },
      {
        id: "w14",
        reference: "Teacher / Professeur",
        blocks: [
          { id: "w14-b1", text: "ဆ", category: "syllable", correctPosition: 0 },
          { id: "w14-b2", text: "ရာ", category: "syllable", correctPosition: 1 }
        ],
        correctOrder: ["w14-b1", "w14-b2"],
        translation: "Teacher",
        hints: "hsaya - 2 syllables",
        notes: "ဆရာ is used for male teachers or respected teachers"
      },
      {
        id: "w15",
        reference: "Student / Étudiant",
        blocks: [
          { id: "w15-b1", text: "ကျောင်း", category: "syllable", correctPosition: 0 },
          { id: "w15-b2", text: "သား", category: "syllable", correctPosition: 1 }
        ],
        correctOrder: ["w15-b1", "w15-b2"],
        translation: "Student (lit: school child)",
        hints: "kyaung:-tha: - 2 syllables",
        notes: "ကျောင်းသား literally means 'school child'"
      },

      // Places (5)
      {
        id: "w16",
        reference: "House / Maison",
        blocks: [
          { id: "w16-b1", text: "အိမ်", category: "syllable", correctPosition: 0 }
        ],
        correctOrder: ["w16-b1"],
        translation: "House / home",
        hints: "ein - single syllable",
        notes: "အိမ် is the basic word for house or home"
      },
      {
        id: "w17",
        reference: "City / Ville",
        blocks: [
          { id: "w17-b1", text: "မြို့", category: "syllable", correctPosition: 0 }
        ],
        correctOrder: ["w17-b1"],
        translation: "City / town",
        hints: "myo. - single syllable",
        notes: "မြို့ refers to any city or town"
      },
      {
        id: "w18",
        reference: "School / École",
        blocks: [
          { id: "w18-b1", text: "ကျောင်း", category: "syllable", correctPosition: 0 }
        ],
        correctOrder: ["w18-b1"],
        translation: "School / monastery",
        hints: "kyaung: - single syllable",
        notes: "ကျောင်း can mean school or Buddhist monastery"
      },
      {
        id: "w19",
        reference: "Market / Marché",
        blocks: [
          { id: "w19-b1", text: "ဈေး", category: "syllable", correctPosition: 0 }
        ],
        correctOrder: ["w19-b1"],
        translation: "Market / shop",
        hints: "zay: - single syllable",
        notes: "ဈေး refers to a market or shopping area"
      },
      {
        id: "w20",
        reference: "Hospital / Hôpital",
        blocks: [
          { id: "w20-b1", text: "ဆေး", category: "syllable", correctPosition: 0 },
          { id: "w20-b2", text: "ရုံ", category: "syllable", correctPosition: 1 }
        ],
        correctOrder: ["w20-b1", "w20-b2"],
        translation: "Hospital (lit: medicine building)",
        hints: "hsay:-yon - 2 syllables",
        notes: "ဆေးရုံ literally means 'medicine building'"
      },

      // Common Verbs & Actions (5)
      {
        id: "w21",
        reference: "To read / Lire",
        blocks: [
          { id: "w21-b1", text: "ဖတ်", category: "syllable", correctPosition: 0 }
        ],
        correctOrder: ["w21-b1"],
        translation: "To read",
        hints: "phat - single syllable",
        notes: "ဖတ် is the verb 'to read'"
      },
      {
        id: "w22",
        reference: "To write / Écrire",
        blocks: [
          { id: "w22-b1", text: "ရေး", category: "syllable", correctPosition: 0 }
        ],
        correctOrder: ["w22-b1"],
        translation: "To write",
        hints: "yay: - single syllable",
        notes: "ရေး is the verb 'to write'"
      },
      {
        id: "w23",
        reference: "To speak / Parler",
        blocks: [
          { id: "w23-b1", text: "ပြော", category: "syllable", correctPosition: 0 }
        ],
        correctOrder: ["w23-b1"],
        translation: "To speak / to say",
        hints: "pyaw - single syllable",
        notes: "ပြော means 'to speak' or 'to say'"
      },
      {
        id: "w24",
        reference: "To understand / Comprendre",
        blocks: [
          { id: "w24-b1", text: "နား", category: "syllable", correctPosition: 0 },
          { id: "w24-b2", text: "လည်", category: "syllable", correctPosition: 1 }
        ],
        correctOrder: ["w24-b1", "w24-b2"],
        translation: "To understand (lit: ear turns)",
        hints: "na:-leh - 2 syllables",
        notes: "နားလည် literally means 'ear turns' = understand"
      },
      {
        id: "w25",
        reference: "To love / Aimer",
        blocks: [
          { id: "w25-b1", text: "ချစ်", category: "syllable", correctPosition: 0 }
        ],
        correctOrder: ["w25-b1"],
        translation: "To love",
        hints: "chit - single syllable",
        notes: "ချစ် is the verb 'to love'"
      }
    ];

    const exerciseData = {
      type: "sentence-mixer",
      title: "Burmese Word Mixer - Assemblage de Mots Birmans",
      description: "Learn to read Burmese words by reconstructing them from syllables. 25 essential words covering greetings, food, family, places, and common verbs. Drag and drop syllables to form complete words!",
      difficulty: 2,
      source: "official",
      language: "birman",
      tags: ["words", "syllables", "reconstruction", "burmese", "birman", "mixer", "beginner", "vocabulary"],
      content: {
        exercises: wordMixerExercises,
        difficulty: "easy",
        showCategories: true,
        shuffleExercises: false,
        generalNotes: "Practice assembling Burmese syllables into complete words. Each word is broken down into its component syllables. Arrange them in the correct order to form the word!"
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

      console.log('✅ Word Mixer créé:', data);
      toast.success("Burmese Word Mixer créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🧩 Burmese Word Mixer</h1>
          <p className="text-muted-foreground mb-6">
            Apprenez à lire des mots birmans entiers en assemblant leurs syllabes
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            25 mots essentiels : Salutations • Nourriture • Famille • Lieux • Verbes
          </p>
          <Button
            size="lg"
            onClick={insertWordMixer}
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

export default InsertBurmeseWordMixer;
