import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseLevel2Mixer = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseLevel2Mixer = async () => {
    setIsInserting(true);

    // Les 100 phrases du bundle Niveau 2
    const sentences = [
      { burmese: "ကျွန်တော် ကောင်းကောင်း စားတယ်", french: "Je mange bien" },
      { burmese: "မင်း အသစ် ဝယ်တယ်", french: "Tu achètes du nouveau" },
      { burmese: "သူ ကြီးကြီး လုပ်တယ်", french: "Il/Elle fait grand" },
      { burmese: "ကျွန်တော် ရှည်ရှည် စောင့်တယ်", french: "J'attends longtemps" },
      { burmese: "မင်း မြင့်မြင့် ခုန်တယ်", french: "Tu sautes haut" },
      { burmese: "သူ ထူထူ ရေးတယ်", french: "Il/Elle écrit épais" },
      { burmese: "ကျွန်တော် ပူပူ သောက်တယ်", french: "Je bois chaud" },
      { burmese: "မင်း အေးအေး နေတယ်", french: "Tu restes au frais" },
      { burmese: "သူ သန့်သန့် ဆေးတယ်", french: "Il/Elle lave proprement" },
      { burmese: "ကျွန်တော် လှလှ ဖတ်တယ်", french: "Je lis joliment" },
      { burmese: "မင်း မြန်မြန် ပြေးတယ်", french: "Tu cours vite" },
      { burmese: "သူ နှေးနှေး လာတယ်", french: "Il/Elle vient lentement" },
      { burmese: "ကျွန်တော် လွယ်လွယ် နားလည်တယ်", french: "Je comprends facilement" },
      { burmese: "မင်း နီးနီး နေတယ်", french: "Tu habites près" },
      { burmese: "သူ ဝေးဝေး သွားတယ်", french: "Il/Elle va loin" },
      { burmese: "ကျွန်တော် ရှေ့မှာ ထိုင်တယ်", french: "Je m'assieds devant" },
      { burmese: "မင်း နောက်မှာ ရပ်တယ်", french: "Tu te tiens derrière" },
      { burmese: "သူ ဘေးမှာ နေတယ်", french: "Il/Elle reste à côté" },
      { burmese: "ကျွန်တော် အပေါ်မှာ ကြည့်တယ်", french: "Je regarde en haut" },
      { burmese: "မင်း အောက်မှာ ထားတယ်", french: "Tu mets en bas" },
      { burmese: "သူ ဘယ်ဘက် လှည့်တယ်", french: "Il/Elle tourne à gauche" },
      { burmese: "ကျွန်တော် ညာဘက် သွားတယ်", french: "Je vais à droite" },
      { burmese: "မင်း အလယ်မှာ ရှိတယ်", french: "Tu es au milieu" },
      { burmese: "သူ နေ့ဘက် လုပ်တယ်", french: "Il/Elle travaille le jour" },
      { burmese: "ကျွန်တော် ည အိပ်တယ်", french: "Je dors la nuit" },
      { burmese: "မင်း မနက် လာတယ်", french: "Tu viens le matin" },
      { burmese: "သူ နေ့လည် စားတယ်", french: "Il/Elle mange l'après-midi" },
      { burmese: "ကျွန်တော် ညနေ ပြန်တယ်", french: "Je reviens le soir" },
      { burmese: "မင်း ဒီနေ့ ရောက်တယ်", french: "Tu arrives aujourd'hui" },
      { burmese: "သူ မနက်ဖြန် သွားတယ်", french: "Il/Elle part demain" },
      { burmese: "ကျွန်တော် မနေ့က လာတယ်", french: "Je suis venu hier" },
      { burmese: "မင်း တစ်ခါ ကြည့်တယ်", french: "Tu regardes une fois" },
      { burmese: "သူ အချိန်မှာ ရောက်တယ်", french: "Il/Elle arrive à l'heure" },
      { burmese: "ကျွန်တော် ကောင်းကောင်း နားလည်တယ်", french: "Je comprends bien" },
      { burmese: "မင်း မကောင်းဘူး နားလည်ဘူး", french: "Tu ne comprends pas bien" },
      { burmese: "သူ အသစ် သင်တယ်", french: "Il/Elle apprend du nouveau" },
      { burmese: "ကျွန်တော် အဟောင်း ကြည့်တယ်", french: "Je regarde l'ancien" },
      { burmese: "မင်း ကြီးကြီး ဝယ်တယ်", french: "Tu achètes grand" },
      { burmese: "သူ သဃ္ဃာ ရှာတယ်", french: "Il/Elle cherche petit" },
      { burmese: "ကျွန်တော် ရှည်ရှည် စောင့်တယ်", french: "J'attends longtemps" },
      { burmese: "ကျွန်တော် စာအုပ်ကို ဖတ်တယ်", french: "Je lis un livre" },
      { burmese: "မင်း ရေကို သောက်တယ်", french: "Tu bois de l'eau" },
      { burmese: "သူ ထမင်းကို စားတယ်", french: "Il/Elle mange du riz" },
      { burmese: "ကျွန်တော် ကားကို ဝယ်တယ်", french: "J'achète une voiture" },
      { burmese: "မင်း အိမ်ကို သန့်ရှင်းတယ်", french: "Tu nettoies la maison" },
      { burmese: "သူ အလုပ်ကို လုပ်တယ်", french: "Il/Elle fait le travail" },
      { burmese: "ကျွန်တော် သူငယ်ချင်းကို တွေ့တယ်", french: "Je rencontre un ami" },
      { burmese: "မင်း ဆရာကို မေးတယ်", french: "Tu demandes au professeur" },
      { burmese: "သူ ကလေးကို ကြည့်တယ်", french: "Il/Elle regarde l'enfant" },
      { burmese: "ကျွန်တော် ဖုန်းကို ယူတယ်", french: "Je prends le téléphone" },
      { burmese: "မင်း စာကို ရေးတယ်", french: "Tu écris une lettre" },
      { burmese: "သူ ဈေးကို သွားတယ်", french: "Il/Elle va au marché" },
      { burmese: "ကျွန်တော် ပန်းသီးကို ကောင်းကောင်း စားတယ်", french: "Je mange bien la pomme" },
      { burmese: "မင်း စာအုပ်ကို အသစ် ဝယ်တယ်", french: "Tu achètes un nouveau livre" },
      { burmese: "သူ အိမ်ကို ကြီးကြီး ဆောက်တယ်", french: "Il/Elle construit une grande maison" },
      { burmese: "ကျွန်တော် ကားကို မြန်မြန် မောင်းတယ်", french: "Je conduis vite la voiture" },
      { burmese: "မင်း လမ်းကို နှေးနှေး လမ်းတယ်", french: "Tu marches lentement sur la route" },
      { burmese: "သူ အလုပ်ကို လွယ်လွယ် လုပ်တယ်", french: "Il/Elle fait facilement le travail" },
      { burmese: "ကျွန်တော် အိမ်ကို နီးနီး ရှာတယ်", french: "Je cherche une maison près" },
      { burmese: "မင်း ကျောင်းကို ဝေးဝေး သွားတယ်", french: "Tu vas loin à l'école" },
      { burmese: "သူ စားပွဲကို ရှေ့မှာ ထားတယ်", french: "Il/Elle met la table devant" },
      { burmese: "ကျွန်တော် စာအုပ်ကို အပေါ်မှာ ထားတယ်", french: "Je mets le livre en haut" },
      { burmese: "မင်း ကားကို ဘယ်ဘက် ထားတယ်", french: "Tu mets la voiture à gauche" },
      { burmese: "သူ အိတ်ကို ညာဘက် ထားတယ်", french: "Il/Elle met le sac à droite" },
      { burmese: "ကျွန်တော် အလုပ်ကို နေ့ လုပ်တယ်", french: "Je fais le travail le jour" },
      { burmese: "မင်း စာကို ည ရေးတယ်", french: "Tu écris la lettre la nuit" },
      { burmese: "သူ ထမင်းကို မနက် စားတယ်", french: "Il/Elle mange le riz le matin" },
      { burmese: "ကျွန်တော် ဆိုင်ကို နေ့လည် သွားတယ်", french: "Je vais au magasin l'après-midi" },
      { burmese: "မင်း သူငယ်ချင်းကို ညနေ တွေ့တယ်", french: "Tu rencontres un ami le soir" },
      { burmese: "သူ အိမ်ကို ဒီနေ့ သန့်ရှင်းတယ်", french: "Il/Elle nettoie la maison aujourd'hui" },
      { burmese: "ကျွန်တော် စာအုပ်ကို ဖတ်လား", french: "Est-ce que je lis un livre ?" },
      { burmese: "မင်း ရေကို သောက်လား", french: "Est-ce que tu bois de l'eau ?" },
      { burmese: "သူ ထမင်းကို စားလား", french: "Est-ce qu'il/elle mange du riz ?" },
      { burmese: "ကျွန်တော် ကားကို မဝယ်ဘူး", french: "Je n'achète pas de voiture" },
      { burmese: "မင်း အိမ်ကို မသန့်ရှင်းဘူး", french: "Tu ne nettoies pas la maison" },
      { burmese: "သူ အလုပ်ကို မလုပ်ဘူး", french: "Il/Elle ne fait pas le travail" },
      { burmese: "ကျွန်တော် သူငယ်ချင်းကို မတွေ့ဘူး", french: "Je ne rencontre pas d'ami" },
      { burmese: "မင်း ဆရာကို မမေးဘူး", french: "Tu ne demandes pas au professeur" },
      { burmese: "သူ ကလေးကို မကြည့်ဘူး", french: "Il/Elle ne regarde pas l'enfant" },
      { burmese: "ကျွန်တော် ဖုန်းကို မယူဘူး", french: "Je ne prends pas le téléphone" },
      { burmese: "မင်း စာကို ကောင်းကောင်း ရေးလား", french: "Écris-tu bien la lettre ?" },
      { burmese: "သူ အလုပ်ကို မြန်မြန် လုပ်လား", french: "Fait-il/elle vite le travail ?" },
      { burmese: "ကျွန်တော် ကားကို နှေးနှေး မောင်းလား", french: "Est-ce que je conduis lentement ?" },
      { burmese: "မင်း အိမ်ကို လွယ်လွယ် ရှာလား", french: "Trouves-tu facilement la maison ?" },
      { burmese: "သူ ကျောင်းကို နီးနီး နေလား", french: "Habite-t-il/elle près de l'école ?" },
      { burmese: "ကျွန်တော် စာအုပ်ကို အသစ် မဝယ်ဘူး", french: "Je n'achète pas de nouveau livre" },
      { burmese: "မင်း အိမ်ကို ကြီးကြီး မဆောက်ဘူး", french: "Tu ne construis pas de grande maison" },
      { burmese: "သူ ရေကို ပူပူ မသောက်ဘူး", french: "Il/Elle ne boit pas d'eau chaude" },
      { burmese: "ကျွန်တော် စာကို ည မရေးဘူး", french: "Je n'écris pas la lettre la nuit" },
      { burmese: "မင်း ထမင်းကို မနက် မစားဘူး", french: "Tu ne manges pas de riz le matin" },
      { burmese: "သူ ဆိုင်ကို ဒီနေ့ မသွားဘူး", french: "Il/Elle ne va pas au magasin aujourd'hui" },
      { burmese: "ကျွန်တော် သူငယ်ချင်းကို မနက်ဖြန် တွေ့လား", french: "Est-ce que je rencontre un ami demain ?" },
      { burmese: "မင်း အိမ်ကို မနေ့က သန့်ရှင်းလား", french: "As-tu nettoyé la maison hier ?" },
      { burmese: "သူ အလုပ်ကို တစ်ခါ လုပ်လား", french: "Fait-il/elle le travail une fois ?" },
      { burmese: "ကျွန်တော် စာအုပ်ကို အချိန်မှာ ဖတ်လား", french: "Est-ce que je lis le livre à l'heure ?" },
      { burmese: "မင်း ကားကို ရှေ့မှာ ထားလား", french: "Mets-tu la voiture devant ?" },
      { burmese: "သူ အိတ်ကို အပေါ်မှာ ထားလား", french: "Met-il/elle le sac en haut ?" },
      { burmese: "ကျွန်တော် လမ်းကို ဘယ်ဘက် လှည့်လား", french: "Est-ce que je tourne à gauche sur la route ?" },
      { burmese: "မင်း စားပွဲကို ညာဘက် ထားလား", french: "Mets-tu la table à droite ?" },
      { burmese: "သူ အိမ်ကို အလယ်မှာ ဆောက်လား", french: "Construit-il/elle la maison au milieu ?" }
    ];

    const allExercises = [];
    let exId = 1;

    for (const item of sentences) {
      const words = item.burmese.split(' ');
      const blocks = words.map((word, idx) => {
        let category: "pronoun" | "noun" | "adjective" | "particle" | "verb" = "noun";
        
        // Déterminer la catégorie
        if (["ကျွန်တော်", "မင်း", "သူ"].includes(word)) category = "pronoun";
        else if (word === "ကို" || word === "မ" || word === "ဘူး" || word === "လား") category = "particle";
        else if (word.endsWith("တယ်") || word.endsWith("လား") || word.endsWith("ဘူး")) category = "verb";
        else if (["ကောင်းကောင်း", "အသစ်", "ကြီးကြီး", "ရှည်ရှည်", "မြန်မြန်", "နှေးနှေး", "လွယ်လွယ်", "နီးနီး", "ဝေးဝေး", "မြင့်မြင့်", "ထူထူ", "ပူပူ", "အေးအေး", "သန့်သန့်", "လှလှ", "ရှေ့မှာ", "နောက်မှာ", "ဘေးမှာ", "အပေါ်မှာ", "အောက်မှာ", "ဘယ်ဘက်", "ညာဘက်", "အလယ်မှာ", "နေ့ဘက်", "ည", "မနက်", "နေ့လည်", "ညနေ", "ဒီနေ့", "မနက်ဖြန်", "မနေ့က", "တစ်ခါ", "အချိန်မှာ", "မကောင်းဘူး", "နားလည်ဘူး", "သဃ္ဃာ"].includes(word)) category = "adjective";
        
        return {
          id: `b${exId}-${idx + 1}`,
          text: word,
          category,
          correctPosition: idx
        };
      });

      allExercises.push({
        id: `ex-${exId}`,
        reference: item.french,
        blocks,
        correctOrder: blocks.map(b => b.id),
        translation: item.french,
        hints: words.includes("ကို") 
          ? "Structure: Sujet + Objet + ကို + Verbe"
          : words.length <= 3
          ? "Structure: Sujet + Adverbe + Verbe"
          : "Identifiez le sujet, l'objet et le verbe"
      });
      exId++;
    }

    const mixerContent = {
      exercises: allExercises,
      difficulty: "medium" as const,
      showCategories: true,
      generalNotes: "Niveau 2 : Reconstruisez les phrases birmanes en respectant l'ordre correct (S+O+ကို+V ou S+Adv+V), puis traduisez-les en français."
    };

    const exerciseData = {
      type: "sentence-mixer",
      title: "Birman Niveau 2 - Mixeur de Phrases",
      description: "Reconstruisez 100 phrases birmanes du niveau 2 en mélangeant les mots. Maîtrisez la structure SOV avec objet direct (ကို) et la négation (မ, ဘူး).",
      difficulty: 2,
      source: "official",
      language: "burmese",
      tags: ["mixeur", "phrases", "birman", "niveau 2", "structure", "SOV", "ကို", "ordre"],
      content: mixerContent,
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

      console.log('✅ Exercice Birman Niveau 2 Mixeur de Phrases créé:', data);
      toast.success("Exercice Mixeur de Phrases créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇲🇲 Birman - Niveau 2 : Mixeur de Phrases</h1>
          <p className="text-muted-foreground mb-6">
            Insérer l'exercice de mixeur de phrases avec 100 phrases complètes du niveau 2.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Mixeur de Phrases + Traduction</li>
              <li>• Nombre de phrases : 100 (COMPLET)</li>
              <li>• Langue : Birman 🇲🇲</li>
              <li>• Niveau : 2 (Débutant)</li>
              <li>• Thème : Structure SOV, Objet direct (ကို), Négation</li>
              <li>• Points : 2000 (20 points par phrase)</li>
              <li>• Mots mélangés à reconstruire</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBurmeseLevel2Mixer}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Mixeur de Phrases (100 phrases)"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBurmeseLevel2Mixer;
