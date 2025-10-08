import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseLevel1Grammar = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseLevel1Grammar = async () => {
    setIsInserting(true);

    // Toutes les 100 phrases du bundle Niveau 1
    const allExercises = [];
    
    // Section A : Phrases Affirmatives Simples (1-30)
    const section1 = [
      { sentence: "ကျွန်တော် စားတယ်", translation: "Je mange", pronoun: "ကျွန်တော်", verb: "စားတယ်" },
      { sentence: "မင်း အိပ်တယ်", translation: "Tu dors", pronoun: "မင်း", verb: "အိပ်တယ်" },
      { sentence: "သူ ပြေးတယ်", translation: "Il/Elle court", pronoun: "သူ", verb: "ပြေးတယ်" },
      { sentence: "ကျွန်တော် သွားတယ်", translation: "Je vais", pronoun: "ကျွန်တော်", verb: "သွားတယ်" },
      { sentence: "မင်း လာတယ်", translation: "Tu viens", pronoun: "မင်း", verb: "လာတယ်" },
      { sentence: "သူ နေတယ်", translation: "Il/Elle reste", pronoun: "သူ", verb: "နေတယ်" },
      { sentence: "ကျွန်တော် ဖတ်တယ်", translation: "Je lis", pronoun: "ကျွန်တော်", verb: "ဖတ်တယ်" },
      { sentence: "မင်း သောက်တယ်", translation: "Tu bois", pronoun: "မင်း", verb: "သောက်တယ်" },
      { sentence: "သူ ကြည့်တယ်", translation: "Il/Elle regarde", pronoun: "သူ", verb: "ကြည့်တယ်" },
      { sentence: "ကျွန်တော် လုပ်တယ်", translation: "Je travaille/fais", pronoun: "ကျွန်တော်", verb: "လုပ်တယ်" },
      { sentence: "မင်း ပြောတယ်", translation: "Tu parles", pronoun: "မင်း", verb: "ပြောတယ်" },
      { sentence: "သူ မြင်တယ်", translation: "Il/Elle voit", pronoun: "သူ", verb: "မြင်တယ်" },
      { sentence: "ကျွန်တော် ယူတယ်", translation: "Je prends", pronoun: "ကျွန်တော်", verb: "ယူတယ်" },
      { sentence: "မင်း ပေးတယ်", translation: "Tu donnes", pronoun: "မင်း", verb: "ပေးတယ်" },
      { sentence: "သူ ဝယ်တယ်", translation: "Il/Elle achète", pronoun: "သူ", verb: "ဝယ်တယ်" },
      { sentence: "ကျွန်တော် ရှိတယ်", translation: "J'ai/existe", pronoun: "ကျွန်တော်", verb: "ရှိတယ်" },
      { sentence: "မင်း ကောင်းတယ်", translation: "Tu vas bien", pronoun: "မင်း", verb: "ကောင်းတယ်" },
      { sentence: "သူ စားတယ်", translation: "Il/Elle mange", pronoun: "သူ", verb: "စားတယ်" },
      { sentence: "ကျွန်တော် အိပ်တယ်", translation: "Je dors", pronoun: "ကျွန်တော်", verb: "အိပ်တယ်" },
      { sentence: "မင်း ပြေးတယ်", translation: "Tu cours", pronoun: "မင်း", verb: "ပြေးတယ်" },
      { sentence: "သူ လာတယ်", translation: "Il/Elle vient", pronoun: "သူ", verb: "လာတယ်" },
      { sentence: "ကျွန်တော် ကြည့်တယ်", translation: "Je regarde", pronoun: "ကျွန်တော်", verb: "ကြည့်တယ်" },
      { sentence: "မင်း နေတယ်", translation: "Tu habites/restes", pronoun: "မင်း", verb: "နေတယ်" },
      { sentence: "သူ ပြောတယ်", translation: "Il/Elle parle", pronoun: "သူ", verb: "ပြောတယ်" },
      { sentence: "ကျွန်တော် သွားတယ်", translation: "Je pars", pronoun: "ကျွန်တော်", verb: "သွားတယ်" },
      { sentence: "မင်း လုပ်တယ်", translation: "Tu fais", pronoun: "မင်း", verb: "လုပ်တယ်" },
      { sentence: "သူ သောက်တယ်", translation: "Il/Elle boit", pronoun: "သူ", verb: "သောက်တယ်" },
      { sentence: "ကျွန်တော် ဖတ်တယ်", translation: "Je lis", pronoun: "ကျွန်တော်", verb: "ဖတ်တယ်" },
      { sentence: "မင်း ဝယ်တယ်", translation: "Tu achètes", pronoun: "မင်း", verb: "ဝယ်တယ်" },
      { sentence: "သူ ရှိတယ်", translation: "Il/Elle a/existe", pronoun: "သူ", verb: "ရှိတယ်" }
    ];

    // Section B : Phrases Interrogatives (31-60)
    const section2 = [
      { sentence: "ကျွန်တော် စားလား", translation: "Est-ce que je mange ?", pronoun: "ကျွန်တော်", verb: "စားလား" },
      { sentence: "မင်း အိပ်လား", translation: "Est-ce que tu dors ?", pronoun: "မင်း", verb: "အိပ်လား" },
      { sentence: "သူ ပြေးလား", translation: "Est-ce qu'il/elle court ?", pronoun: "သူ", verb: "ပြေးလား" },
      { sentence: "ကျွန်တော် သွားလား", translation: "Est-ce que je vais ?", pronoun: "ကျွန်တော်", verb: "သွားလား" },
      { sentence: "မင်း လာလား", translation: "Est-ce que tu viens ?", pronoun: "မင်း", verb: "လာလား" },
      { sentence: "သူ နေလား", translation: "Est-ce qu'il/elle reste ?", pronoun: "သူ", verb: "နေလား" },
      { sentence: "ကျွန်တော် ဖတ်လား", translation: "Est-ce que je lis ?", pronoun: "ကျွန်တော်", verb: "ဖတ်လား" },
      { sentence: "မင်း သောက်လား", translation: "Est-ce que tu bois ?", pronoun: "မင်း", verb: "သောက်လား" },
      { sentence: "သူ ကြည့်လား", translation: "Est-ce qu'il/elle regarde ?", pronoun: "သူ", verb: "ကြည့်လား" },
      { sentence: "ကျွန်တော် လုပ်လား", translation: "Est-ce que je travaille ?", pronoun: "ကျွန်တော်", verb: "လုပ်လား" },
      { sentence: "မင်း ပြောလား", translation: "Est-ce que tu parles ?", pronoun: "မင်း", verb: "ပြောလား" },
      { sentence: "သူ မြင်လား", translation: "Est-ce qu'il/elle voit ?", pronoun: "သူ", verb: "မြင်လား" },
      { sentence: "ကျွန်တော် ယူလား", translation: "Est-ce que je prends ?", pronoun: "ကျွန်တော်", verb: "ယူလား" },
      { sentence: "မင်း ပေးလား", translation: "Est-ce que tu donnes ?", pronoun: "မင်း", verb: "ပေးလား" },
      { sentence: "သူ ဝယ်လား", translation: "Est-ce qu'il/elle achète ?", pronoun: "သူ", verb: "ဝယ်လား" },
      { sentence: "ကျွန်တော် ရှိလား", translation: "Est-ce que j'ai ?", pronoun: "ကျွန်တော်", verb: "ရှိလား" },
      { sentence: "မင်း ကောင်းလား", translation: "Est-ce que tu vas bien ?", pronoun: "မင်း", verb: "ကောင်းလား" },
      { sentence: "သူ စားလား", translation: "Est-ce qu'il/elle mange ?", pronoun: "သူ", verb: "စားလား" },
      { sentence: "ကျွန်တော် အိပ်လား", translation: "Est-ce que je dors ?", pronoun: "ကျွန်တော်", verb: "အိပ်လား" },
      { sentence: "မင်း ပြေးလား", translation: "Est-ce que tu cours ?", pronoun: "မင်း", verb: "ပြေးလား" },
      { sentence: "သူ လာလား", translation: "Est-ce qu'il/elle vient ?", pronoun: "သူ", verb: "လာလား" },
      { sentence: "ကျွန်တော် ကြည့်လား", translation: "Est-ce que je regarde ?", pronoun: "ကျွန်တော်", verb: "ကြည့်လား" },
      { sentence: "မင်း နေလား", translation: "Est-ce que tu restes ?", pronoun: "မင်း", verb: "နေလား" },
      { sentence: "သူ ပြောလား", translation: "Est-ce qu'il/elle parle ?", pronoun: "သူ", verb: "ပြောလား" },
      { sentence: "ကျွန်တော် သွားလား", translation: "Est-ce que je pars ?", pronoun: "ကျွန်တော်", verb: "သွားလား" },
      { sentence: "မင်း လုပ်လား", translation: "Est-ce que tu fais ?", pronoun: "မင်း", verb: "လုပ်လား" },
      { sentence: "သူ သောက်လား", translation: "Est-ce qu'il/elle boit ?", pronoun: "သူ", verb: "သောက်လား" },
      { sentence: "ကျွန်တော် ဖတ်လား", translation: "Est-ce que je lis ?", pronoun: "ကျွန်တော်", verb: "ဖတ်လား" },
      { sentence: "မင်း ဝယ်လား", translation: "Est-ce que tu achètes ?", pronoun: "မင်း", verb: "ဝယ်လား" },
      { sentence: "သူ ရှိလား", translation: "Est-ce qu'il/elle a ?", pronoun: "သူ", verb: "ရှိလား" }
    ];

    // Section C : Phrases avec Noms (61-100)
    const section3 = [
      { sentence: "ကျွန်တော် ထမင်း စားတယ်", translation: "Je mange du riz", pronoun: "ကျွန်တော်", noun: "ထမင်း", verb: "စားတယ်" },
      { sentence: "မင်း ရေ သောက်တယ်", translation: "Tu bois de l'eau", pronoun: "မင်း", noun: "ရေ", verb: "သောက်တယ်" },
      { sentence: "သူ စာအုပ် ဖတ်တယ်", translation: "Il/Elle lit un livre", pronoun: "သူ", noun: "စာအုပ်", verb: "ဖတ်တယ်" },
      { sentence: "ကျွန်တော် အိမ် သွားတယ်", translation: "Je vais à la maison", pronoun: "ကျွန်တော်", noun: "အိမ်", verb: "သွားတယ်" },
      { sentence: "မင်း ကျောင်း သွားတယ်", translation: "Tu vas à l'école", pronoun: "မင်း", noun: "ကျောင်း", verb: "သွားတယ်" },
      { sentence: "သူ ဆိုင် သွားတယ်", translation: "Il/Elle va au magasin", pronoun: "သူ", noun: "ဆိုင်", verb: "သွားတယ်" },
      { sentence: "ကျွန်တော် ကား ရှိတယ်", translation: "J'ai une voiture", pronoun: "ကျွန်တော်", noun: "ကား", verb: "ရှိတယ်" },
      { sentence: "မင်း သူငယ်ချင်း ရှိတယ်", translation: "Tu as un ami", pronoun: "မင်း", noun: "သူငယ်ချင်း", verb: "ရှိတယ်" },
      { sentence: "သူ ငွေ ရှိတယ်", translation: "Il/Elle a de l'argent", pronoun: "သူ", noun: "ငွေ", verb: "ရှိတယ်" },
      { sentence: "ကျွန်တော် အလုပ် လုပ်တယ်", translation: "Je travaille", pronoun: "ကျွန်တော်", noun: "အလုပ်", verb: "လုပ်တယ်" },
      { sentence: "မင်း မိသားစု ရှိတယ်", translation: "Tu as une famille", pronoun: "မင်း", noun: "မိသားစု", verb: "ရှိတယ်" },
      { sentence: "သူ ကလေး ရှိတယ်", translation: "Il/Elle a un enfant", pronoun: "သူ", noun: "ကလေး", verb: "ရှိတယ်" },
      { sentence: "ကျွန်တော် သစ်သီး စားတယ်", translation: "Je mange un fruit", pronoun: "ကျွန်တော်", noun: "သစ်သီး", verb: "စားတယ်" },
      { sentence: "မင်း ပန်းသီး ဝယ်တယ်", translation: "Tu achètes une pomme", pronoun: "မင်း", noun: "ပန်းသီး", verb: "ဝယ်တယ်" },
      { sentence: "သူ ကြက် ကြည့်တယ်", translation: "Il/Elle regarde le poulet", pronoun: "သူ", noun: "ကြက်", verb: "ကြည့်တယ်" },
      { sentence: "ကျွန်တော် ငါး သောက်တယ်", translation: "Je bois (de la soupe de) poisson", pronoun: "ကျွန်တော်", noun: "ငါး", verb: "သောက်တယ်" },
      { sentence: "မင်း နံနက် လာတယ်", translation: "Tu viens le matin", pronoun: "မင်း", noun: "နံနက်", verb: "လာတယ်" },
      { sentence: "သူ ညနေ သွားတယ်", translation: "Il/Elle va le soir", pronoun: "သူ", noun: "ညနေ", verb: "သွားတယ်" },
      { sentence: "ကျွန်တော် နေ့ လုပ်တယ်", translation: "Je travaille le jour", pronoun: "ကျွန်တော်", noun: "နေ့", verb: "လုပ်တယ်" },
      { sentence: "မင်း ည အိပ်တယ်", translation: "Tu dors la nuit", pronoun: "မင်း", noun: "ည", verb: "အိပ်တယ်" },
      { sentence: "သူ ယနေ့ သွားတယ်", translation: "Il/Elle va aujourd'hui", pronoun: "သူ", noun: "ယနေ့", verb: "သွားတယ်" },
      { sentence: "ကျွန်တော် မနေ့က လာတယ်", translation: "Je suis venu hier", pronoun: "ကျွန်တော်", noun: "မနေ့က", verb: "လာတယ်" },
      { sentence: "မင်း နက်ဖြန် သွားတယ်", translation: "Tu vas demain", pronoun: "မင်း", noun: "နက်ဖြန်", verb: "သွားတယ်" },
      { sentence: "သူ ဈေး သွားတယ်", translation: "Il/Elle va au marché", pronoun: "သူ", noun: "ဈေး", verb: "သွားတယ်" },
      { sentence: "ကျွန်တော် လမ်း ကြည့်တယ်", translation: "Je regarde la route", pronoun: "ကျွန်တော်", noun: "လမ်း", verb: "ကြည့်တယ်" },
      { sentence: "မင်း အဖေ ရှိတယ်", translation: "Tu as un père", pronoun: "မင်း", noun: "အဖေ", verb: "ရှိတယ်" },
      { sentence: "သူ အမေ ရှိတယ်", translation: "Il/Elle a une mère", pronoun: "သူ", noun: "အမေ", verb: "ရှိတယ်" },
      { sentence: "ကျွန်တော် ဆရာ မြင်တယ်", translation: "Je vois le professeur", pronoun: "ကျွန်တော်", noun: "ဆရာ", verb: "မြင်တယ်" },
      { sentence: "မင်း ကျောင်းသား နေတယ်", translation: "Tu es étudiant", pronoun: "မင်း", noun: "ကျောင်းသား", verb: "နေတယ်" },
      { sentence: "သူ ထမင်း ဝယ်တယ်", translation: "Il/Elle achète du riz", pronoun: "သူ", noun: "ထမင်း", verb: "ဝယ်တယ်" },
      { sentence: "ကျွန်တော် ရေ ပေးတယ်", translation: "Je donne de l'eau", pronoun: "ကျွန်တော်", noun: "ရေ", verb: "ပေးတယ်" },
      { sentence: "မင်း စာအုပ် ယူတယ်", translation: "Tu prends un livre", pronoun: "မင်း", noun: "စာအုပ်", verb: "ယူတယ်" },
      { sentence: "သူ ကား ကြည့်တယ်", translation: "Il/Elle regarde la voiture", pronoun: "သူ", noun: "ကား", verb: "ကြည့်တယ်" },
      { sentence: "ကျွန်တော် အိမ် ကောင်းတယ်", translation: "Ma maison est bien", pronoun: "ကျွန်တော်", noun: "အိမ်", verb: "ကောင်းတယ်" },
      { sentence: "မင်း လူ မြင်တယ်", translation: "Tu vois une personne", pronoun: "မင်း", noun: "လူ", verb: "မြင်တယ်" },
      { sentence: "သူ ကျောင်း လာတယ်", translation: "Il/Elle vient à l'école", pronoun: "သူ", noun: "ကျောင်း", verb: "လာတယ်" },
      { sentence: "ကျွန်တော် ဆိုင် သွားလား", translation: "Est-ce que je vais au magasin ?", pronoun: "ကျွန်တော်", noun: "ဆိုင်", verb: "သွားလား" },
      { sentence: "မင်း အလုပ် လုပ်လား", translation: "Est-ce que tu travailles ?", pronoun: "မင်း", noun: "အလုပ်", verb: "လုပ်လား" },
      { sentence: "သူ ထမင်း စားလား", translation: "Est-ce qu'il/elle mange du riz ?", pronoun: "သူ", noun: "ထမင်း", verb: "စားလား" },
      { sentence: "ကျွန်တော် သူငယ်ချင်း ရှိလား", translation: "Est-ce que j'ai un ami ?", pronoun: "ကျွန်တော်", noun: "သူငယ်ချင်း", verb: "ရှိလား" }
    ];

    // Créer les exercices formatés
    let exId = 1;
    
    for (const item of section1) {
      allExercises.push({
        id: `ex-${exId}`,
        sentence: item.sentence,
        elements: [
          { id: `word-0`, word: item.pronoun, category: "pronoun" as const, position: 0 },
          { id: `word-1`, word: item.verb, category: "verb" as const, position: 1 }
        ],
        translation: item.translation,
        hints: `Structure: Sujet + Verbe`
      });
      exId++;
    }

    for (const item of section2) {
      allExercises.push({
        id: `ex-${exId}`,
        sentence: item.sentence,
        elements: [
          { id: `word-0`, word: item.pronoun, category: "pronoun" as const, position: 0 },
          { id: `word-1`, word: item.verb, category: "verb" as const, position: 1 }
        ],
        translation: item.translation,
        hints: `လား (la) = particule de question`
      });
      exId++;
    }

    for (const item of section3) {
      allExercises.push({
        id: `ex-${exId}`,
        sentence: item.sentence,
        elements: [
          { id: `word-0`, word: item.pronoun, category: "pronoun" as const, position: 0 },
          { id: `word-1`, word: item.noun, category: "noun" as const, position: 1 },
          { id: `word-2`, word: item.verb, category: "verb" as const, position: 2 }
        ],
        translation: item.translation,
        hints: `Structure SOV: Sujet + Objet + Verbe`
      });
      exId++;
    }

    const grammarContent = {
      exercises: allExercises,
      generalNotes: "Identifiez les éléments grammaticaux (pronoms, noms, verbes) puis traduisez. Structure birmane : Sujet + Objet + Verbe. Les particules တယ် (de) et လား (la) sont intégrées aux verbes."
    };

    const exerciseData = {
      type: "grammar-identification",
      title: "Birman Niveau 1 - Identification Grammaticale",
      description: "Identifiez les catégories grammaticales de 100 phrases birmanes (pronoms, noms, verbes), puis traduisez-les. Maîtrisez la structure SOV du birman.",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["grammaire", "birman", "débutant", "niveau 1", "analyse", "structure", "SOV", "identification"],
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

      console.log('✅ Exercice Birman Niveau 1 Identification Grammaticale créé:', data);
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
          <h1 className="text-3xl font-bold mb-4">🇲🇲 Birman - Niveau 1 : Identification Grammaticale</h1>
          <p className="text-muted-foreground mb-6">
            Insérer l'exercice d'identification grammaticale avec 100 phrases complètes à analyser.
            Apprenez à identifier les pronoms, noms et verbes !
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Identification Grammaticale + Traduction</li>
              <li>• Nombre de phrases : 100 (COMPLET)</li>
              <li>• Langue : Birman 🇲🇲</li>
              <li>• Niveau : Débutant absolu (Niveau 1)</li>
              <li>• Thème : Pronoms, Noms, Verbes + Structure SOV</li>
              <li>• Points : 2000 (20 points par phrase)</li>
              <li>• Catégories : Pronom, Nom, Verbe</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBurmeseLevel1Grammar}
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

export default InsertBurmeseLevel1Grammar;
