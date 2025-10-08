import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseLevel1Quiz = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseLevel1Quiz = async () => {
    setIsInserting(true);

    const quizQuestions = [
      {
        question: "Quelle particule utilise-t-on pour une phrase affirmative ?",
        options: ["လား (la)", "တယ် (de)", "ကို (ko)", "မှာ (hma)"],
        correctAnswer: 1,
        explanation: "တယ် (de) est la particule d'affirmation en birman."
      },
      {
        question: "Quelle particule utilise-t-on pour poser une question simple ?",
        options: ["တယ် (de)", "ကို (ko)", "လား (la)", "နဲ့ (neh)"],
        correctAnswer: 2,
        explanation: "လား (la) transforme une affirmation en question."
      },
      {
        question: "Complétez : ကျွန်တော် သွား___ (Je vais)",
        options: ["လား", "တယ်", "ကို", "မှာ"],
        correctAnswer: 1,
        explanation: "Pour une affirmation, on utilise တယ်"
      },
      {
        question: "Complétez : မင်း စား___ (Manges-tu ?)",
        options: ["တယ်", "ကို", "လား", "နဲ့"],
        correctAnswer: 2,
        explanation: "Pour une question, on utilise လား"
      },
      {
        question: "Que signifie 'သူ ပြောတယ်' ?",
        options: ["Parle-t-il ?", "Il parle", "Il parlait", "Il va parler"],
        correctAnswer: 1,
        explanation: "တယ် indique l'affirmation au présent/général"
      },
      {
        question: "Que signifie 'ကျွန်တော် ရှိလား' ?",
        options: ["J'ai", "As-tu ?", "Ai-je ?", "Il a"],
        correctAnswer: 2,
        explanation: "ကျွန်တော် = je, လား = question"
      },
      {
        question: "Comment transforme-t-on une phrase affirmative en question ?",
        options: [
          "On ajoute လား à la fin",
          "On remplace တယ် par လား",
          "On change l'ordre des mots",
          "On double le verbe"
        ],
        correctAnswer: 1,
        explanation: "Il suffit de remplacer la particule တယ် par လား"
      },
      {
        question: "Quelle phrase est correcte ?",
        options: [
          "ကျွန်တော် စား",
          "ကျွန်တော် စားတယ်",
          "စား ကျွန်တော် တယ်",
          "တယ် ကျွန်တော် စား"
        ],
        correctAnswer: 1,
        explanation: "L'ordre correct est Sujet + Verbe + Particule"
      },
      {
        question: "Dans 'မင်း သောက်တယ်', quelle est la fonction de တယ် ?",
        options: [
          "Marquer le passé",
          "Marquer le futur",
          "Marquer l'affirmation/présent",
          "Marquer la négation"
        ],
        correctAnswer: 2,
        explanation: "တယ် marque l'affirmation au présent/général"
      },
      {
        question: "Dans 'သူ လာလား', quelle est la fonction de လား ?",
        options: [
          "Marquer la négation",
          "Marquer la question",
          "Marquer le passé",
          "Marquer le pluriel"
        ],
        correctAnswer: 1,
        explanation: "လား transforme la phrase en question"
      },
      {
        question: "Quelle est la traduction de 'သူ အိပ်လား' ?",
        options: ["Il dort", "Elle dort", "Dort-il/elle ?", "Dormait-il/elle ?"],
        correctAnswer: 2,
        explanation: "လား indique qu'il s'agit d'une question"
      },
      {
        question: "Comment dit-on 'Je lis' en birman ?",
        options: [
          "ကျွန်တော် ဖတ်လား",
          "ကျွန်တော် ဖတ်တယ်",
          "မင်း ဖတ်တယ်",
          "သူ ဖတ်တယ်"
        ],
        correctAnswer: 1,
        explanation: "ကျွန်တော် (je) + ဖတ် (lire) + တယ် (affirmation)"
      },
      {
        question: "Quelle phrase signifie 'Tu cours ?' ?",
        options: [
          "မင်း ပြေးတယ်",
          "မင်း ပြေးလား",
          "ကျွန်တော် ပြေးလား",
          "သူ ပြေးတယ်"
        ],
        correctAnswer: 1,
        explanation: "မင်း (tu) + ပြေး (courir) + လား (question)"
      },
      {
        question: "Sans particule finale, une phrase birmane est :",
        options: ["Correcte", "Formelle", "Incomplète", "Au passé"],
        correctAnswer: 2,
        explanation: "Une particule finale est OBLIGATOIRE en birman"
      },
      {
        question: "'ကျွန်တော် ကြည့်တယ်' est une phrase :",
        options: ["Interrogative", "Affirmative", "Négative", "Exclamative"],
        correctAnswer: 1,
        explanation: "တယ် indique une affirmation"
      },
      {
        question: "Pour dire 'Vois-tu ?', on utilise :",
        options: [
          "မင်း မြင်တယ်",
          "မင်း မြင်လား",
          "ကျွန်တော် မြင်လား",
          "သူ မြင်တယ်"
        ],
        correctAnswer: 1,
        explanation: "မင်း (tu) + မြင် (voir) + လား (question)"
      },
      {
        question: "La particule တယ် se prononce :",
        options: ["la", "de/te", "ko", "hma"],
        correctAnswer: 1,
        explanation: "တယ် se prononce 'de' ou 'te'"
      },
      {
        question: "La particule လား se prononce :",
        options: ["de", "te", "la", "ka"],
        correctAnswer: 2,
        explanation: "လား se prononce 'la'"
      },
      {
        question: "Dans une phrase birmane de niveau 1, la particule se place :",
        options: ["Au début", "Au milieu", "À la fin", "N'importe où"],
        correctAnswer: 2,
        explanation: "La particule est toujours à la fin de la phrase"
      },
      {
        question: "Quelle affirmation est FAUSSE ?",
        options: [
          "တယ် marque l'affirmation",
          "လား marque la question",
          "On peut omettre la particule finale",
          "Une phrase sans particule est incomplète"
        ],
        correctAnswer: 2,
        explanation: "On ne peut JAMAIS omettre la particule finale !"
      }
    ];

    const exerciseData = {
      type: "quiz",
      title: "Birman Niveau 1 - Quiz Particules",
      description: "Testez vos connaissances sur les particules တယ် et လား avec ce quiz de 20 questions. Évaluez votre compréhension de la grammaire birmane de base.",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["grammaire", "birman", "débutant", "niveau 1", "particules", "quiz", "တယ်", "လား"],
      content: {
        questions: quizQuestions,
        passingScore: 80
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

      console.log('✅ Exercice Birman Niveau 1 Quiz créé:', data);
      toast.success("Exercice Quiz Niveau 1 créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇲🇲 Birman - Niveau 1 : Quiz</h1>
          <p className="text-muted-foreground mb-6">
            Insérer le quiz de 20 questions sur les particules တယ် et လား.
            Testez vos connaissances sur la grammaire birmane de base !
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Quiz (QCM)</li>
              <li>• Nombre de questions : 20</li>
              <li>• Langue : Birman 🇲🇲</li>
              <li>• Niveau : Débutant absolu (Niveau 1)</li>
              <li>• Thème : Particules grammaticales တယ် et လား</li>
              <li>• Points : 200 (10 points par question)</li>
              <li>• Score de passage : 80%</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBurmeseLevel1Quiz}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Quiz Niveau 1"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBurmeseLevel1Quiz;
