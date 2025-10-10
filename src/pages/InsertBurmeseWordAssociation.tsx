import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseWordAssociation = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertWordAssociation = async () => {
    setIsInserting(true);

    // 30 common Burmese words organized into groups of 4
    const pairGroups = [
      // Group 1: Basic Greetings
      [
        { left: "မင်္ဂလာဘာ", right: "mingala ba | Hello / Bonjour", id: "1-1" },
        { left: "ကျေးဇူးတင်ပါတယ်", right: "kyay-zu tin-ba-deh | Thank you / Merci", id: "1-2" },
        { left: "နေကောင်းလား", right: "nay kaung: la: | How are you? / Comment allez-vous?", id: "1-3" },
        { left: "ကောင်းပါတယ်", right: "kaung:-ba-deh | I'm fine / Je vais bien", id: "1-4" }
      ],

      // Group 2: Polite Expressions
      [
        { left: "တောင်းပန်ပါတယ်", right: "taung-ban-ba-deh | Sorry / Pardon / Désolé", id: "2-1" },
        { left: "ခွင့်ပြုပါ", right: "khwin-pyu-ba | Excuse me / Excusez-moi", id: "2-2" },
        { left: "ကြိုဆိုပါတယ်", right: "kyaw-hso-ba-deh | Welcome / Bienvenue", id: "2-3" },
        { left: "သွားခွာတော့မယ်", right: "thwa:-khwa-taw-meh | Goodbye (I'm leaving) / Au revoir", id: "2-4" }
      ],

      // Group 3: Food & Drink
      [
        { left: "ထမင်း", right: "hta-min: | Rice / Riz", id: "3-1" },
        { left: "ရေ", right: "yay | Water / Eau", id: "3-2" },
        { left: "လဖက်ရည်", right: "la-phet-yay | Tea / Thé", id: "3-3" },
        { left: "စားသောက်ဆိုင်", right: "sa:-thauk-hsain | Restaurant / Restaurant", id: "3-4" }
      ],

      // Group 4: Family Members
      [
        { left: "အမေ", right: "a-may | Mother / Mère", id: "4-1" },
        { left: "အဖေ", right: "a-phay | Father / Père", id: "4-2" },
        { left: "မိတ်ဆွေ", right: "mei'-hswè | Friend / Ami(e)", id: "4-3" },
        { left: "ကလေး", right: "ka-lay: | Child / Enfant", id: "4-4" }
      ],

      // Group 5: Places
      [
        { left: "အိမ်", right: "ein | House / Maison", id: "5-1" },
        { left: "မြို့", right: "myo. | City / Ville", id: "5-2" },
        { left: "ကျောင်း", right: "kyaung: | School / École", id: "5-3" },
        { left: "ဈေး", right: "zay: | Market / Marché", id: "5-4" }
      ],

      // Group 6: Basic Verbs
      [
        { left: "သွား", right: "thwa: | Go / Aller", id: "6-1" },
        { left: "လာ", right: "la | Come / Venir", id: "6-2" },
        { left: "စား", right: "sa: | Eat / Manger", id: "6-3" },
        { left: "သောက်", right: "thauk | Drink / Boire", id: "6-4" }
      ],

      // Group 7: Common Actions
      [
        { left: "ဖတ်", right: "phat | Read / Lire", id: "7-1" },
        { left: "ရေး", right: "yay: | Write / Écrire", id: "7-2" },
        { left: "ပြော", right: "pyaw | Speak / Parler", id: "7-3" },
        { left: "နားလည်", right: "na:-leh | Understand / Comprendre", id: "7-4" }
      ],

      // Group 8: Numbers 1-4
      [
        { left: "တစ်", right: "tit | One / Un", id: "8-1" },
        { left: "နှစ်", right: "hnit | Two / Deux", id: "8-2" },
        { left: "သုံး", right: "thoun: | Three / Trois", id: "8-3" },
        { left: "လေး", right: "lay: | Four / Quatre", id: "8-4" }
      ],

      // Group 9: Numbers 5-8
      [
        { left: "ငါး", right: "nga: | Five / Cinq", id: "9-1" },
        { left: "ခြောက်", right: "chauk | Six / Six", id: "9-2" },
        { left: "ခုနှစ်", right: "khu-nit | Seven / Sept", id: "9-3" },
        { left: "ရှစ်", right: "shit | Eight / Huit", id: "9-4" }
      ],

      // Group 10: Time Words
      [
        { left: "ယနေ့", right: "ya-neh | Today / Aujourd'hui", id: "10-1" },
        { left: "မနက်ဖြန်", right: "ma-net-hpyan | Tomorrow / Demain", id: "10-2" },
        { left: "နေ့", right: "neh | Day / Jour", id: "10-3" },
        { left: "ညနေ", right: "nya-nay | Evening / Soir", id: "10-4" }
      ],

      // Group 11: Colors
      [
        { left: "အနီ", right: "a-ni | Red / Rouge", id: "11-1" },
        { left: "အဖြူ", right: "a-phyu | White / Blanc", id: "11-2" },
        { left: "အနက်", right: "a-net | Black / Noir", id: "11-3" },
        { left: "အစိမ်း", right: "a-sein: | Green / Vert", id: "11-4" }
      ],

      // Group 12: Adjectives (Size & Quality)
      [
        { left: "ကြီး", right: "kyi: | Big / Grand", id: "12-1" },
        { left: "သေး", right: "thay: | Small / Petit", id: "12-2" },
        { left: "ကောင်း", right: "kaung: | Good / Bon", id: "12-3" },
        { left: "လှ", right: "hla. | Beautiful / Beau", id: "12-4" }
      ],

      // Group 13: Weather & Temperature
      [
        { left: "နွေး", right: "nway: | Warm / Chaud", id: "13-1" },
        { left: "အေး", right: "ay: | Cool/Cold / Froid", id: "13-2" },
        { left: "မိုး", right: "mo: | Rain / Pluie", id: "13-3" },
        { left: "နေ", right: "nay | Sun / Soleil", id: "13-4" }
      ],

      // Group 14: Body Parts
      [
        { left: "လက်", right: "let | Hand / Main", id: "14-1" },
        { left: "ခြေ", right: "chay | Foot / Pied", id: "14-2" },
        { left: "နား", right: "na: | Ear / Oreille", id: "14-3" },
        { left: "မျက်လုံး", right: "myet-loun: | Eye / Œil", id: "14-4" }
      ],

      // Group 15: Question Words & Pronouns
      [
        { left: "ဘယ်", right: "beh | Which/What / Quel", id: "15-1" },
        { left: "ဘာ", right: "ba | What / Quoi", id: "15-2" },
        { left: "ဘယ်သူ", right: "beh-thu | Who / Qui", id: "15-3" },
        { left: "ဘယ်မှာ", right: "beh-hma | Where / Où", id: "15-4" }
      ]
    ];

    const exerciseData = {
      type: "association",
      title: "Burmese Word Association - Association de Mots Birmans",
      description: "Match 60 essential Burmese words with their romanization and translations. Organized into 15 thematic groups: greetings, family, food, places, verbs, numbers, colors, and more!",
      difficulty: 2,
      source: "official",
      language: "birman",
      tags: ["association", "words", "vocabulary", "burmese", "birman", "beginner", "reading"],
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
        console.error('Erreur lors de l\'insertion:', error);
        toast.error(`Erreur: ${error.message || "Erreur lors de la création de l'exercice"}`);
        setIsInserting(false);
        return;
      }

      console.log('✅ Word Association créée:', data);
      toast.success("Burmese Word Association créée avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🔗 Burmese Word Association</h1>
          <p className="text-muted-foreground mb-6">
            Associez 60 mots birmans essentiels avec leur romanisation et traduction
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            15 groupes thématiques • Salutations • Famille • Nourriture • Lieux • Verbes • Nombres • Couleurs
          </p>
          <Button
            size="lg"
            onClick={insertWordAssociation}
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

export default InsertBurmeseWordAssociation;
