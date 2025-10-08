import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseLevel1Mixer = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseLevel1Mixer = async () => {
    setIsInserting(true);

    // Toutes les 100 phrases du bundle Niveau 1
    const allExercises = [];
    
    // Section A : Phrases Affirmatives Simples (1-30) - 2 mots
    const section1Data = [
      ["ကျွန်တော်", "စားတယ်", "Je mange"],
      ["မင်း", "အိပ်တယ်", "Tu dors"],
      ["သူ", "ပြေးတယ်", "Il/Elle court"],
      ["ကျွန်တော်", "သွားတယ်", "Je vais"],
      ["မင်း", "လာတယ်", "Tu viens"],
      ["သူ", "နေတယ်", "Il/Elle reste"],
      ["ကျွန်တော်", "ဖတ်တယ်", "Je lis"],
      ["မင်း", "သောက်တယ်", "Tu bois"],
      ["သူ", "ကြည့်တယ်", "Il/Elle regarde"],
      ["ကျွန်တော်", "လုပ်တယ်", "Je travaille"],
      ["မင်း", "ပြောတယ်", "Tu parles"],
      ["သူ", "မြင်တယ်", "Il/Elle voit"],
      ["ကျွန်တော်", "ယူတယ်", "Je prends"],
      ["မင်း", "ပေးတယ်", "Tu donnes"],
      ["သူ", "ဝယ်တယ်", "Il/Elle achète"],
      ["ကျွန်တော်", "ရှိတယ်", "J'ai/existe"],
      ["မင်း", "ကောင်းတယ်", "Tu vas bien"],
      ["သူ", "စားတယ်", "Il/Elle mange"],
      ["ကျွန်တော်", "အိပ်တယ်", "Je dors"],
      ["မင်း", "ပြေးတယ်", "Tu cours"],
      ["သူ", "လာတယ်", "Il/Elle vient"],
      ["ကျွန်တော်", "ကြည့်တယ်", "Je regarde"],
      ["မင်း", "နေတယ်", "Tu habites/restes"],
      ["သူ", "ပြောတယ်", "Il/Elle parle"],
      ["ကျွန်တော်", "သွားတယ်", "Je pars"],
      ["မင်း", "လုပ်တယ်", "Tu fais"],
      ["သူ", "သောက်တယ်", "Il/Elle boit"],
      ["ကျွန်တော်", "ဖတ်တယ်", "Je lis"],
      ["မင်း", "ဝယ်တယ်", "Tu achètes"],
      ["သူ", "ရှိတယ်", "Il/Elle a/existe"]
    ];

    // Section B : Phrases Interrogatives (31-60) - 2 mots
    const section2Data = [
      ["ကျွန်တော်", "စားလား", "Est-ce que je mange ?"],
      ["မင်း", "အိပ်လား", "Est-ce que tu dors ?"],
      ["သူ", "ပြေးလား", "Est-ce qu'il/elle court ?"],
      ["ကျွန်တော်", "သွားလား", "Est-ce que je vais ?"],
      ["မင်း", "လာလား", "Est-ce que tu viens ?"],
      ["သူ", "နေလား", "Est-ce qu'il/elle reste ?"],
      ["ကျွန်တော်", "ဖတ်လား", "Est-ce que je lis ?"],
      ["မင်း", "သောက်လား", "Est-ce que tu bois ?"],
      ["သူ", "ကြည့်လား", "Est-ce qu'il/elle regarde ?"],
      ["ကျွန်တော်", "လုပ်လား", "Est-ce que je travaille ?"],
      ["မင်း", "ပြောလား", "Est-ce que tu parles ?"],
      ["သူ", "မြင်လား", "Est-ce qu'il/elle voit ?"],
      ["ကျွန်တော်", "ယူလား", "Est-ce que je prends ?"],
      ["မင်း", "ပေးလား", "Est-ce que tu donnes ?"],
      ["သူ", "ဝယ်လား", "Est-ce qu'il/elle achète ?"],
      ["ကျွန်တော်", "ရှိလား", "Est-ce que j'ai ?"],
      ["မင်း", "ကောင်းလား", "Est-ce que tu vas bien ?"],
      ["သူ", "စားလား", "Est-ce qu'il/elle mange ?"],
      ["ကျွန်တော်", "အိပ်လား", "Est-ce que je dors ?"],
      ["မင်း", "ပြေးလား", "Est-ce que tu cours ?"],
      ["သူ", "လာလား", "Est-ce qu'il/elle vient ?"],
      ["ကျွန်တော်", "ကြည့်လား", "Est-ce que je regarde ?"],
      ["မင်း", "နေလား", "Est-ce que tu restes ?"],
      ["သူ", "ပြောလား", "Est-ce qu'il/elle parle ?"],
      ["ကျွန်တော်", "သွားလား", "Est-ce que je pars ?"],
      ["မင်း", "လုပ်လား", "Est-ce que tu fais ?"],
      ["သူ", "သောက်လား", "Est-ce qu'il/elle boit ?"],
      ["ကျွန်တော်", "ဖတ်လား", "Est-ce que je lis ?"],
      ["မင်း", "ဝယ်လား", "Est-ce que tu achètes ?"],
      ["သူ", "ရှိလား", "Est-ce qu'il/elle a ?"]
    ];

    // Section C : Phrases avec Noms (61-100) - 3 mots
    const section3Data = [
      ["ကျွန်တော်", "ထမင်း", "စားတယ်", "Je mange du riz"],
      ["မင်း", "ရေ", "သောက်တယ်", "Tu bois de l'eau"],
      ["သူ", "စာအုပ်", "ဖတ်တယ်", "Il/Elle lit un livre"],
      ["ကျွန်တော်", "အိမ်", "သွားတယ်", "Je vais à la maison"],
      ["မင်း", "ကျောင်း", "သွားတယ်", "Tu vas à l'école"],
      ["သူ", "ဆိုင်", "သွားတယ်", "Il/Elle va au magasin"],
      ["ကျွန်တော်", "ကား", "ရှိတယ်", "J'ai une voiture"],
      ["မင်း", "သူငယ်ချင်း", "ရှိတယ်", "Tu as un ami"],
      ["သူ", "ငွေ", "ရှိတယ်", "Il/Elle a de l'argent"],
      ["ကျွန်တော်", "အလုပ်", "လုပ်တယ်", "Je travaille"],
      ["မင်း", "မိသားစု", "ရှိတယ်", "Tu as une famille"],
      ["သူ", "ကလေး", "ရှိတယ်", "Il/Elle a un enfant"],
      ["ကျွန်တော်", "သစ်သီး", "စားတယ်", "Je mange un fruit"],
      ["မင်း", "ပန်းသီး", "ဝယ်တယ်", "Tu achètes une pomme"],
      ["သူ", "ကြက်", "ကြည့်တယ်", "Il/Elle regarde le poulet"],
      ["ကျွန်တော်", "ငါး", "သောက်တယ်", "Je bois (de la soupe de) poisson"],
      ["မင်း", "နံနက်", "လာတယ်", "Tu viens le matin"],
      ["သူ", "ညနေ", "သွားတယ်", "Il/Elle va le soir"],
      ["ကျွန်တော်", "နေ့", "လုပ်တယ်", "Je travaille le jour"],
      ["မင်း", "ည", "အိပ်တယ်", "Tu dors la nuit"],
      ["သူ", "ယနေ့", "သွားတယ်", "Il/Elle va aujourd'hui"],
      ["ကျွန်တော်", "မနေ့က", "လာတယ်", "Je suis venu hier"],
      ["မင်း", "နက်ဖြန်", "သွားတယ်", "Tu vas demain"],
      ["သူ", "ဈေး", "သွားတယ်", "Il/Elle va au marché"],
      ["ကျွန်တော်", "လမ်း", "ကြည့်တယ်", "Je regarde la route"],
      ["မင်း", "အဖေ", "ရှိတယ်", "Tu as un père"],
      ["သူ", "အမေ", "ရှိတယ်", "Il/Elle a une mère"],
      ["ကျွန်တော်", "ဆရာ", "မြင်တယ်", "Je vois le professeur"],
      ["မင်း", "ကျောင်းသား", "နေတယ်", "Tu es étudiant"],
      ["သူ", "ထမင်း", "ဝယ်တယ်", "Il/Elle achète du riz"],
      ["ကျွန်တော်", "ရေ", "ပေးတယ်", "Je donne de l'eau"],
      ["မင်း", "စာအုပ်", "ယူတယ်", "Tu prends un livre"],
      ["သူ", "ကား", "ကြည့်တယ်", "Il/Elle regarde la voiture"],
      ["ကျွန်တော်", "အိမ်", "ကောင်းတယ်", "Ma maison est bien"],
      ["မင်း", "လူ", "မြင်တယ်", "Tu vois une personne"],
      ["သူ", "ကျောင်း", "လာတယ်", "Il/Elle vient à l'école"],
      ["ကျွန်တော်", "ဆိုင်", "သွားလား", "Est-ce que je vais au magasin ?"],
      ["မင်း", "အလုပ်", "လုပ်လား", "Est-ce que tu travailles ?"],
      ["သူ", "ထမင်း", "စားလား", "Est-ce qu'il/elle mange du riz ?"],
      ["ကျွန်တော်", "သူငယ်ချင်း", "ရှိလား", "Est-ce que j'ai un ami ?"]
    ];

    // Créer les exercices formatés pour section 1 (2 mots)
    let exId = 1;
    for (const [word1, word2, translation] of section1Data) {
      allExercises.push({
        id: `ex-${exId}`,
        reference: translation,
        blocks: [
          { id: `b${exId}-1`, text: word1, category: "pronoun" as const, correctPosition: 0 },
          { id: `b${exId}-2`, text: word2, category: "verb" as const, correctPosition: 1 }
        ],
        correctOrder: [`b${exId}-1`, `b${exId}-2`],
        translation,
        hints: "Structure: Sujet + Verbe"
      });
      exId++;
    }

    // Section 2 (2 mots - questions)
    for (const [word1, word2, translation] of section2Data) {
      allExercises.push({
        id: `ex-${exId}`,
        reference: translation,
        blocks: [
          { id: `b${exId}-1`, text: word1, category: "pronoun" as const, correctPosition: 0 },
          { id: `b${exId}-2`, text: word2, category: "verb" as const, correctPosition: 1 }
        ],
        correctOrder: [`b${exId}-1`, `b${exId}-2`],
        translation,
        hints: "လား (la) = particule de question"
      });
      exId++;
    }

    // Section 3 (3 mots avec noms)
    for (const [word1, word2, word3, translation] of section3Data) {
      allExercises.push({
        id: `ex-${exId}`,
        reference: translation,
        blocks: [
          { id: `b${exId}-1`, text: word1, category: "pronoun" as const, correctPosition: 0 },
          { id: `b${exId}-2`, text: word2, category: "noun" as const, correctPosition: 1 },
          { id: `b${exId}-3`, text: word3, category: "verb" as const, correctPosition: 2 }
        ],
        correctOrder: [`b${exId}-1`, `b${exId}-2`, `b${exId}-3`],
        translation,
        hints: "Structure SOV: Sujet + Objet + Verbe"
      });
      exId++;
    }

    const mixerContent = {
      exercises: allExercises,
      difficulty: "easy" as const,
      showCategories: true,
      generalNotes: "Ces exercices vous permettent de maîtriser l'ordre SOV du birman : Sujet + Objet + Verbe. Les particules တယ် (affirmation) et လား (question) sont essentielles."
    };

    const exerciseData = {
      type: "sentence-mixer",
      title: "Birman Niveau 1 - Mixeur de Phrases",
      description: "Reconstituez 100 phrases birmanes en réordonnant les mots mélangés, puis traduisez-les. Maîtrisez l'ordre SOV (Sujet-Objet-Verbe) du birman.",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["grammaire", "birman", "débutant", "niveau 1", "ordre des mots", "SOV", "reconstruction"],
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

      console.log('✅ Exercice Birman Niveau 1 Mixeur de Phrases créé:', data);
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
          <h1 className="text-3xl font-bold mb-4">🇲🇲 Birman - Niveau 1 : Mixeur de Phrases</h1>
          <p className="text-muted-foreground mb-6">
            Insérer l'exercice de reconstruction de 100 phrases birmanes complètes.
            Apprenez à maîtriser l'ordre des mots SOV en birman !
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Mixeur de Phrases (Reconstruction + Traduction)</li>
              <li>• Nombre d'exercices : 100 (COMPLET)</li>
              <li>• Langue : Birman 🇲🇲</li>
              <li>• Niveau : Débutant absolu (Niveau 1)</li>
              <li>• Thème : Ordre SOV + Vocabulaire de base</li>
              <li>• Points : 2000 (20 points par exercice)</li>
              <li>• Structure : Blocs avec catégories grammaticales</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBurmeseLevel1Mixer}
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

export default InsertBurmeseLevel1Mixer;
