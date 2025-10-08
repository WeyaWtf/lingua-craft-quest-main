import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseLevel2Grammar = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseLevel2Grammar = async () => {
    setIsInserting(true);

    // Les 100 phrases du bundle Niveau 2 - structure optimisée
    const allExercises = [];
    
    // Section A : Phrases Affirmatives avec Adjectifs (1-40) - Phrases simples S+V
    const section1Data = [
      ["ကျွန်တော်", "ကောင်းကောင်း", "စားတယ်", "Je mange bien"],
      ["မင်း", "အသစ်", "ဝယ်တယ်", "Tu achètes du nouveau"],
      ["သူ", "ကြီးကြီး", "လုပ်တယ်", "Il/Elle fait grand"],
      ["ကျွန်တော်", "ရှည်ရှည်", "စောင့်တယ်", "J'attends longtemps"],
      ["မင်း", "မြင့်မြင့်", "ခုန်တယ်", "Tu sautes haut"],
      ["သူ", "ထူထူ", "ရေးတယ်", "Il/Elle écrit épais"],
      ["ကျွန်တော်", "ပူပူ", "သောက်တယ်", "Je bois chaud"],
      ["မင်း", "အေးအေး", "နေတယ်", "Tu restes au frais"],
      ["သူ", "သန့်သန့်", "ဆေးတယ်", "Il/Elle lave proprement"],
      ["ကျွန်တော်", "လှလှ", "ဖတ်တယ်", "Je lis joliment"],
      ["မင်း", "မြန်မြန်", "ပြေးတယ်", "Tu cours vite"],
      ["သူ", "နှေးနှေး", "လာတယ်", "Il/Elle vient lentement"],
      ["ကျွန်တော်", "လွယ်လွယ်", "နားလည်တယ်", "Je comprends facilement"],
      ["မင်း", "နီးနီး", "နေတယ်", "Tu habites près"],
      ["သူ", "ဝေးဝေး", "သွားတယ်", "Il/Elle va loin"],
      ["ကျွန်တော်", "ရှေ့မှာ", "ထိုင်တယ်", "Je m'assieds devant"],
      ["မင်း", "နောက်မှာ", "ရပ်တယ်", "Tu te tiens derrière"],
      ["သူ", "ဘေးမှာ", "နေတယ်", "Il/Elle reste à côté"],
      ["ကျွန်တော်", "အပေါ်မှာ", "ကြည့်တယ်", "Je regarde en haut"],
      ["မင်း", "အောက်မှာ", "ထားတယ်", "Tu mets en bas"],
      ["သူ", "ဘယ်ဘက်", "လှည့်တယ်", "Il/Elle tourne à gauche"],
      ["ကျွန်တော်", "ညာဘက်", "သွားတယ်", "Je vais à droite"],
      ["မင်း", "အလယ်မှာ", "ရှိတယ်", "Tu es au milieu"],
      ["သူ", "နေ့ဘက်", "လုပ်တယ်", "Il/Elle travaille le jour"],
      ["ကျွန်တော်", "ည", "အိပ်တယ်", "Je dors la nuit"],
      ["မင်း", "မနက်", "လာတယ်", "Tu viens le matin"],
      ["သူ", "နေ့လည်", "စားတယ်", "Il/Elle mange l'après-midi"],
      ["ကျွန်တော်", "ညနေ", "ပြန်တယ်", "Je reviens le soir"],
      ["မင်း", "ဒီနေ့", "ရောက်တယ်", "Tu arrives aujourd'hui"],
      ["သူ", "မနက်ဖြန်", "သွားတယ်", "Il/Elle part demain"],
      ["ကျွန်တော်", "မနေ့က", "လာတယ်", "Je suis venu hier"],
      ["မင်း", "တစ်ခါ", "ကြည့်တယ်", "Tu regardes une fois"],
      ["သူ", "အချိန်မှာ", "ရောက်တယ်", "Il/Elle arrive à l'heure"],
      ["ကျွန်တော်", "ကောင်းကောင်း", "နားလည်တယ်", "Je comprends bien"],
      ["သူ", "အသစ်", "သင်တယ်", "Il/Elle apprend du nouveau"],
      ["ကျွန်တော်", "အဟောင်း", "ကြည့်တယ်", "Je regarde l'ancien"],
      ["မင်း", "ကြီးကြီး", "ဝယ်တယ်", "Tu achètes grand"],
      ["သူ", "သဃ္ဃာ", "ရှာတယ်", "Il/Elle cherche petit"],
      ["ကျွန်တော်", "ရှည်ရှည်", "စောင့်တယ်", "J'attends longtemps"],
      ["မင်း", "မကောင်းဘူး", "နားလည်ဘူး", "Tu ne comprends pas bien"]
    ];

    // Section B : Phrases avec ကို (Objet Direct) (41-70) - S+O+ကို+V
    const section2Data = [
      ["ကျွန်တော်", "စာအုပ်", "ကို", "ဖတ်တယ်", "Je lis un livre"],
      ["မင်း", "ရေ", "ကို", "သောက်တယ်", "Tu bois de l'eau"],
      ["သူ", "ထမင်း", "ကို", "စားတယ်", "Il/Elle mange du riz"],
      ["ကျွန်တော်", "ကား", "ကို", "ဝယ်တယ်", "J'achète une voiture"],
      ["မင်း", "အိမ်", "ကို", "သန့်ရှင်းတယ်", "Tu nettoies la maison"],
      ["သူ", "အလုပ်", "ကို", "လုပ်တယ်", "Il/Elle fait le travail"],
      ["ကျွန်တော်", "သူငယ်ချင်း", "ကို", "တွေ့တယ်", "Je rencontre un ami"],
      ["မင်း", "ဆရာ", "ကို", "မေးတယ်", "Tu demandes au professeur"],
      ["သူ", "ကလေး", "ကို", "ကြည့်တယ်", "Il/Elle regarde l'enfant"],
      ["ကျွန်တော်", "ဖုန်း", "ကို", "ယူတယ်", "Je prends le téléphone"],
      ["မင်း", "စာ", "ကို", "ရေးတယ်", "Tu écris une lettre"],
      ["သူ", "ဈေး", "ကို", "သွားတယ်", "Il/Elle va au marché"],
      ["ကျွန်တော်", "ပန်းသီး", "ကို", "ကောင်းကောင်း စားတယ်", "Je mange bien la pomme"],
      ["မင်း", "စာအုပ်", "ကို", "အသစ် ဝယ်တယ်", "Tu achètes un nouveau livre"],
      ["သူ", "အိမ်", "ကို", "ကြီးကြီး ဆောက်တယ်", "Il/Elle construit une grande maison"],
      ["ကျွန်တော်", "ကား", "ကို", "မြန်မြန် မောင်းတယ်", "Je conduis vite la voiture"],
      ["မင်း", "လမ်း", "ကို", "နှေးနှေး လမ်းတယ်", "Tu marches lentement sur la route"],
      ["သူ", "အလုပ်", "ကို", "လွယ်လွယ် လုပ်တယ်", "Il/Elle fait facilement le travail"],
      ["ကျွန်တော်", "အိမ်", "ကို", "နီးနီး ရှာတယ်", "Je cherche une maison près"],
      ["မင်း", "ကျောင်း", "ကို", "ဝေးဝေး သွားတယ်", "Tu vas loin à l'école"],
      ["သူ", "စားပွဲ", "ကို", "ရှေ့မှာ ထားတယ်", "Il/Elle met la table devant"],
      ["ကျွန်တော်", "စာအုပ်", "ကို", "အပေါ်မှာ ထားတယ်", "Je mets le livre en haut"],
      ["မင်း", "ကား", "ကို", "ဘယ်ဘက် ထားတယ်", "Tu mets la voiture à gauche"],
      ["သူ", "အိတ်", "ကို", "ညာဘက် ထားတယ်", "Il/Elle met le sac à droite"],
      ["ကျွန်တော်", "အလုပ်", "ကို", "နေ့ လုပ်တယ်", "Je fais le travail le jour"],
      ["မင်း", "စာ", "ကို", "ည ရေးတယ်", "Tu écris la lettre la nuit"],
      ["သူ", "ထမင်း", "ကို", "မနက် စားတယ်", "Il/Elle mange le riz le matin"],
      ["ကျွန်တော်", "ဆိုင်", "ကို", "နေ့လည် သွားတယ်", "Je vais au magasin l'après-midi"],
      ["မင်း", "သူငယ်ချင်း", "ကို", "ညနေ တွေ့တယ်", "Tu rencontres un ami le soir"],
      ["သူ", "အိမ်", "ကို", "ဒီနေ့ သန့်ရှင်းတယ်", "Il/Elle nettoie la maison aujourd'hui"]
    ];

    // Section C : Phrases Interrogatives & Négatives (71-100)
    const section3Data = [
      ["ကျွန်တော်", "စာအုပ်", "ကို", "ဖတ်လား", "Est-ce que je lis un livre ?"],
      ["မင်း", "ရေ", "ကို", "သောက်လား", "Est-ce que tu bois de l'eau ?"],
      ["သူ", "ထမင်း", "ကို", "စားလား", "Est-ce qu'il/elle mange du riz ?"],
      ["ကျွန်တော်", "ကား", "ကို", "မဝယ်ဘူး", "Je n'achète pas de voiture"],
      ["မင်း", "အိမ်", "ကို", "မသန့်ရှင်းဘူး", "Tu ne nettoies pas la maison"],
      ["သူ", "အလုပ်", "ကို", "မလုပ်ဘူး", "Il/Elle ne fait pas le travail"],
      ["ကျွန်တော်", "သူငယ်ချင်း", "ကို", "မတွေ့ဘူး", "Je ne rencontre pas d'ami"],
      ["မင်း", "ဆရာ", "ကို", "မမေးဘူး", "Tu ne demandes pas au professeur"],
      ["သူ", "ကလေး", "ကို", "မကြည့်ဘူး", "Il/Elle ne regarde pas l'enfant"],
      ["ကျွန်တော်", "ဖုန်း", "ကို", "မယူဘူး", "Je ne prends pas le téléphone"],
      ["မင်း", "စာ", "ကို", "ကောင်းကောင်း ရေးလား", "Écris-tu bien la lettre ?"],
      ["သူ", "အလုပ်", "ကို", "မြန်မြန် လုပ်လား", "Fait-il/elle vite le travail ?"],
      ["ကျွန်တော်", "ကား", "ကို", "နှေးနှေး မောင်းလား", "Est-ce que je conduis lentement ?"],
      ["မင်း", "အိမ်", "ကို", "လွယ်လွယ် ရှာလား", "Trouves-tu facilement la maison ?"],
      ["သူ", "ကျောင်း", "ကို", "နီးနီး နေလား", "Habite-t-il/elle près de l'école ?"],
      ["ကျွန်တော်", "စာအုပ်", "ကို", "အသစ် မဝယ်ဘူး", "Je n'achète pas de nouveau livre"],
      ["မင်း", "အိမ်", "ကို", "ကြီးကြီး မဆောက်ဘူး", "Tu ne construis pas de grande maison"],
      ["သူ", "ရေ", "ကို", "ပူပူ မသောက်ဘူး", "Il/Elle ne boit pas d'eau chaude"],
      ["ကျွန်တော်", "စာ", "ကို", "ည မရေးဘူး", "Je n'écris pas la lettre la nuit"],
      ["မင်း", "ထမင်း", "ကို", "မနက် မစားဘူး", "Tu ne manges pas de riz le matin"],
      ["သူ", "ဆိုင်", "ကို", "ဒီနေ့ မသွားဘူး", "Il/Elle ne va pas au magasin aujourd'hui"],
      ["ကျွန်တော်", "သူငယ်ချင်း", "ကို", "မနက်ဖြန် တွေ့လား", "Est-ce que je rencontre un ami demain ?"],
      ["မင်း", "အိမ်", "ကို", "မနေ့က သန့်ရှင်းလား", "As-tu nettoyé la maison hier ?"],
      ["သူ", "အလုပ်", "ကို", "တစ်ခါ လုပ်လား", "Fait-il/elle le travail une fois ?"],
      ["ကျွန်တော်", "စာအုပ်", "ကို", "အချိန်မှာ ဖတ်လား", "Est-ce que je lis le livre à l'heure ?"],
      ["မင်း", "ကား", "ကို", "ရှေ့မှာ ထားလား", "Mets-tu la voiture devant ?"],
      ["သူ", "အိတ်", "ကို", "အပေါ်မှာ ထားလား", "Met-il/elle le sac en haut ?"],
      ["ကျွန်တော်", "လမ်း", "ကို", "ဘယ်ဘက် လှည့်လား", "Est-ce que je tourne à gauche sur la route ?"],
      ["မင်း", "စားပွဲ", "ကို", "ညာဘက် ထားလား", "Mets-tu la table à droite ?"],
      ["သူ", "အိမ်", "ကို", "အလယ်မှာ ဆောက်လား", "Construit-il/elle la maison au milieu ?"]
    ];

    // Créer les exercices formatés
    let exId = 1;
    
    // Section 1 : Phrases avec adjectifs (S+Adj+V ou S+Adv+V)
    for (const [word1, word2, word3, translation] of section1Data) {
      allExercises.push({
        id: `ex-${exId}`,
        sentence: `${word1} ${word2} ${word3}`,
        elements: [
          { id: `word-0`, word: word1, category: "pronoun" as const, position: 0 },
          { id: `word-1`, word: word2, category: "adjective" as const, position: 1 },
          { id: `word-2`, word: word3, category: "verb" as const, position: 2 }
        ],
        translation,
        hints: "Structure: Sujet + Adverbe/Adjectif + Verbe"
      });
      exId++;
    }

    // Section 2 : Phrases avec ကို (S+O+ကို+V)
    for (const [word1, word2, word3, word4, translation] of section2Data) {
      allExercises.push({
        id: `ex-${exId}`,
        sentence: `${word1} ${word2} ${word3} ${word4}`,
        elements: [
          { id: `word-0`, word: word1, category: "pronoun" as const, position: 0 },
          { id: `word-1`, word: word2, category: "noun" as const, position: 1 },
          { id: `word-2`, word: word3, category: "particle" as const, position: 2 },
          { id: `word-3`, word: word4, category: "verb" as const, position: 3 }
        ],
        translation,
        hints: "Structure SOV + ကို: Sujet + Objet + ကို + Verbe"
      });
      exId++;
    }

    // Section 3 : Questions & Négations
    for (const [word1, word2, word3, word4, translation] of section3Data) {
      allExercises.push({
        id: `ex-${exId}`,
        sentence: `${word1} ${word2} ${word3} ${word4}`,
        elements: [
          { id: `word-0`, word: word1, category: "pronoun" as const, position: 0 },
          { id: `word-1`, word: word2, category: "noun" as const, position: 1 },
          { id: `word-2`, word: word3, category: "particle" as const, position: 2 },
          { id: `word-3`, word: word4, category: "verb" as const, position: 3 }
        ],
        translation,
        hints: "ကို (objet direct), မ (négation), လား (question)"
      });
      exId++;
    }

    const grammarContent = {
      exercises: allExercises,
      generalNotes: "Niveau 2 : Identifiez les pronoms, noms, adjectifs, particules (ကို, မ, ဘူး) et verbes. Structure birmane avec objet direct : Sujet + Objet + ကို + Verbe."
    };

    const exerciseData = {
      type: "grammar-identification",
      title: "Birman Niveau 2 - Identification Grammaticale",
      description: "Identifiez les catégories grammaticales de 100 phrases birmanes du niveau 2 avec objet direct (ကို) et négation (မ, ဘူး). Maîtrisez la structure S+O+ကို+V.",
      difficulty: 2,
      source: "official",
      language: "burmese",
      tags: ["grammaire", "birman", "niveau 2", "analyse", "structure", "SOV", "ကို", "identification"],
      content: grammarContent,
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

      console.log('✅ Exercice Birman Niveau 2 Identification Grammaticale créé:', data);
      toast.success("Exercice Identification Grammaticale créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇲🇲 Birman - Niveau 2 : Identification Grammaticale</h1>
          <p className="text-muted-foreground mb-6">
            Insérer l'exercice d'identification grammaticale avec 100 phrases complètes du niveau 2.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Identification Grammaticale + Traduction</li>
              <li>• Nombre de phrases : 100 (COMPLET)</li>
              <li>• Langue : Birman 🇲🇲</li>
              <li>• Niveau : 2 (Débutant)</li>
              <li>• Thème : Objet direct (ကို), Négation (မ, ဘူး), Adjectifs</li>
              <li>• Points : 2000 (20 points par phrase)</li>
              <li>• Catégories : Pronom, Nom, Adjectif, Particule, Verbe</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBurmeseLevel2Grammar}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Identification Grammaticale (100 phrases)"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBurmeseLevel2Grammar;
