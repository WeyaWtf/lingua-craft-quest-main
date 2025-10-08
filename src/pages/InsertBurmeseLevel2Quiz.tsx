import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseLevel2Quiz = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseLevel2Quiz = async () => {
    setIsInserting(true);

    const quizContent = {
      questions: [
        {
          id: "q1",
          question: "Quelle particule marque l'objet direct en birman ?",
          options: ["တယ် (de)", "ကို (ko)", "လား (la)", "မ (ma)"],
          correctAnswer: 1,
          explanation: "ကို (ko) est la particule d'objet direct. Elle se place après l'objet et avant le verbe."
        },
        {
          id: "q2",
          question: "Dans la phrase 'ကျွန်တော် စာအုပ်ကို ဖတ်တယ်', que signifie ကို ?",
          options: ["Question", "Négation", "Objet direct", "Affirmation"],
          correctAnswer: 2,
          explanation: "ကို (ko) marque 'စာအုပ်' (livre) comme objet direct du verbe 'ဖတ်တယ်' (lire)."
        },
        {
          id: "q3",
          question: "Quelle particule exprime la négation devant le verbe ?",
          options: ["ကို (ko)", "တယ် (de)", "မ (ma)", "ဘူး (bu)"],
          correctAnswer: 2,
          explanation: "မ (ma) se place devant le verbe pour exprimer la négation."
        },
        {
          id: "q4",
          question: "Quelle particule termine une phrase négative ?",
          options: ["တယ် (de)", "လား (la)", "ဘူး (bu)", "ကို (ko)"],
          correctAnswer: 2,
          explanation: "ဘူး (bu) termine les phrases négatives, après le verbe précédé de မ."
        },
        {
          id: "q5",
          question: "Comment dit-on 'Je ne mange pas' en birman ?",
          options: [
            "ကျွန်တော် စားတယ်",
            "ကျွန်တော် မစားဘူး",
            "ကျွန်တော် စားလား",
            "ကျွန်တော် ကို စားတယ်"
          ],
          correctAnswer: 1,
          explanation: "မစားဘူး (ma sa bu) = ne mange pas. Structure : မ + verbe + ဘူး"
        },
        {
          id: "q6",
          question: "Dans 'မင်း ရေကို သောက်တယ်', quel est le rôle de ကို ?",
          options: [
            "Marque la question",
            "Marque l'objet direct (eau)",
            "Marque la négation",
            "Marque l'affirmation"
          ],
          correctAnswer: 1,
          explanation: "ကို marque ရေ (eau) comme objet direct du verbe သောက်တယ် (boire)."
        },
        {
          id: "q7",
          question: "Complétez: 'သူ အလုပ် မလုပ်___' (Il ne travaille pas)",
          options: ["တယ်", "လား", "ဘူး", "ကို"],
          correctAnswer: 2,
          explanation: "ဘူး (bu) termine la phrase négative. → မလုပ်ဘူး (ne travaille pas)"
        },
        {
          id: "q8",
          question: "Quelle est la structure correcte avec ကို ?",
          options: [
            "Sujet + Verbe + ကို + Objet",
            "Sujet + ကို + Objet + Verbe",
            "Sujet + Objet + ကို + Verbe",
            "ကို + Sujet + Objet + Verbe"
          ],
          correctAnswer: 2,
          explanation: "Structure correcte : Sujet + Objet + ကို + Verbe. Exemple : ကျွန်တော် စာအုပ်ကို ဖတ်တယ်"
        },
        {
          id: "q9",
          question: "Quelle est la structure correcte pour une négation ?",
          options: [
            "Sujet + မ + Verbe + ဘူး",
            "Sujet + Verbe + မ + ဘူး",
            "မ + Sujet + Verbe + ဘူး",
            "Sujet + မ + ဘူး + Verbe"
          ],
          correctAnswer: 0,
          explanation: "Structure négative : Sujet + မ + Verbe + ဘူး. Exemple : ကျွန်တော် မသွားဘူး"
        },
        {
          id: "q10",
          question: "Complétez: 'ကျွန်တော် ကျောင်း___ သွားတယ်' (Je vais à l'école)",
          options: ["မ", "ကို", "ဘူး", "လား"],
          correctAnswer: 1,
          explanation: "ကို marque ကျောင်း (école) comme objet/destination. → ကျောင်းကို သွားတယ်"
        },
        {
          id: "q11",
          question: "Comment dit-on 'Tu ne bois pas d'eau' ?",
          options: [
            "မင်း ရေ သောက်တယ်",
            "မင်း ရေကို မသောက်ဘူး",
            "မင်း ရေ သောက်လား",
            "မင်း ရေ မကို သောက်ဘူး"
          ],
          correctAnswer: 1,
          explanation: "မင်း ရေကို မသောက်ဘူး. Structure : Sujet + Objet + ကို + မ + Verbe + ဘူး"
        },
        {
          id: "q12",
          question: "Quel est le rôle de မ dans 'သူ မစားဘူး' ?",
          options: [
            "Marque l'objet",
            "Marque la négation",
            "Marque la question",
            "Marque le temps"
          ],
          correctAnswer: 1,
          explanation: "မ (ma) marque la négation devant le verbe စား (manger)."
        },
        {
          id: "q13",
          question: "Peut-on utiliser ကို et မ ensemble dans une phrase ?",
          options: [
            "Non, jamais",
            "Oui, pour une négation avec objet direct",
            "Seulement dans les questions",
            "Seulement au passé"
          ],
          correctAnswer: 1,
          explanation: "Oui ! Exemple : ကျွန်တော် စာအုပ်ကို မဖတ်ဘူး (Je ne lis pas de livre)"
        },
        {
          id: "q14",
          question: "Dans quelle phrase ကို est-il correctement utilisé ?",
          options: [
            "ကျွန်တော် စားတယ် ကို",
            "ကို ကျွန်တော် ထမင်း စားတယ်",
            "ကျွန်တော် ထမင်းကို စားတယ်",
            "ကျွန်တော် ကို ထမင်း စားတယ်"
          ],
          correctAnswer: 2,
          explanation: "ကို se place après l'objet direct : ကျွန်တော် ထမင်းကို စားတယ် (Je mange du riz)"
        },
        {
          id: "q15",
          question: "Quelle combinaison est correcte pour dire 'ne pas lire un livre' ?",
          options: [
            "စာအုပ် ဖတ်တယ်",
            "စာအုပ်ကို မဖတ်ဘူး",
            "စာအုပ် မကို ဖတ်ဘူး",
            "မ စာအုပ်ကို ဖတ် ဘူး"
          ],
          correctAnswer: 1,
          explanation: "စာအုပ်ကို မဖတ်ဘူး : Objet + ကို + မ + Verbe + ဘူး"
        }
      ]
    };

    const exerciseData = {
      type: "quiz",
      title: "Birman Niveau 2 - Quiz Particules",
      description: "Testez vos connaissances sur les particules ကို (objet direct), မ (négation), et ဘူး (fin de négation). 15 questions à choix multiples avec explications détaillées.",
      difficulty: 2,
      source: "official",
      language: "burmese",
      tags: ["quiz", "particules", "birman", "niveau 2", "grammaire", "ကို", "မ", "ဘူး", "test"],
      content: quizContent,
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

      console.log('✅ Exercice Birman Niveau 2 Quiz créé:', data);
      toast.success("Exercice Quiz créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇲🇲 Birman - Niveau 2 : Quiz Particules</h1>
          <p className="text-muted-foreground mb-6">
            Insérer le quiz avec 15 questions sur les particules ကို, မ, et ဘူး.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Quiz (QCM)</li>
              <li>• Nombre de questions : 15</li>
              <li>• Langue : Birman 🇲🇲</li>
              <li>• Niveau : 2 (Débutant)</li>
              <li>• Thèmes : Objet direct (ကို), Négation (မ, ဘူး)</li>
              <li>• Points : 300 (20 points par question)</li>
              <li>• Avec explications détaillées</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBurmeseLevel2Quiz}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Quiz Niveau 2"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBurmeseLevel2Quiz;
