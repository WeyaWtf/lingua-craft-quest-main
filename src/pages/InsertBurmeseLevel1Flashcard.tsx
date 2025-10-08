import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseLevel1Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseLevel1Flashcard = async () => {
    setIsInserting(true);

    const flashcards = [
      {
        front: "တယ် (de/te)",
        back: "Particule verbale de base - marque le présent/général/affirmation\n\nExemples:\n• စားတယ် (sa de) = mange\n• သွားတယ် (thwa de) = va\n• ရှိတယ် (shi de) = a/existe\n\nAstuce: \"DE\" comme \"DÉclaration\" - on déclare un fait !",
        category: "grammar",
        id: "1"
      },
      {
        front: "လား (la)",
        back: "Particule interrogative - transforme l'affirmation en question\n\nExemples:\n• စားလား (sa la) = mange-t-il/elle ?\n• သွားလား (thwa la) = va-t-il/elle ?\n• ရှိလား (shi la) = a-t-il/elle ?\n\nAstuce: \"LA\" comme \"LA question\" - on pose LA question !",
        category: "grammar",
        id: "2"
      },
      {
        front: "Quelle particule pour une affirmation ?\nကျွန်တော် စား___",
        back: "Réponse: တယ် (de)\n\nPhrase complète: ကျွန်တော် စားတယ် (kyanaw sa de) = Je mange\n\nRègle: Pour affirmer quelque chose, on utilise toujours တယ်",
        category: "grammar",
        id: "3"
      },
      {
        front: "Quelle particule pour une question ?\nမင်း သွား___",
        back: "Réponse: လား (la)\n\nPhrase complète: မင်း သွားလား (min thwa la) = Vas-tu ?\n\nRègle: Pour poser une question simple, on utilise toujours လား",
        category: "grammar",
        id: "4"
      },
      {
        front: "Transformation :\nကျွန်တော် အိပ်တယ် → Question",
        back: "Processus: Remplacer တယ် par လား\n\nRésultat: ကျွန်တော် အိပ်လား (kyanaw eik la) = Est-ce que je dors ?\n\nRègle: Affirmation → Question = changer la particule finale !",
        category: "grammar",
        id: "5"
      },
      {
        front: "Structure de base birmane :\nSujet + Verbe + ___",
        back: "Réponse: PARTICULE (တယ် ou လား)\n\nImportant: En birman, TOUTE phrase doit avoir une particule finale. Sans particule = phrase incomplète !",
        category: "grammar",
        id: "6"
      },
      {
        front: "ကျွန်တော် သောက်တယ်\nTraduction + type de phrase ?",
        back: "Traduction: Je bois\n\nType: Phrase affirmative (présent/général)\n\nParticule: တယ် indique l'affirmation",
        category: "grammar",
        id: "7"
      },
      {
        front: "သူ ပြေးလား\nTraduction + type de phrase ?",
        back: "Traduction: Court-il/elle ?\n\nType: Phrase interrogative\n\nParticule: လား indique la question",
        category: "grammar",
        id: "8"
      },
      {
        front: "Erreur courante :\nကျွန်တော် စား ❌",
        back: "Problème: Pas de particule finale !\n\nCorrection: ကျွန်တော် စားတယ် ✅\n\nExplication: En birman, on ne peut jamais oublier la particule finale",
        category: "grammar",
        id: "9"
      },
      {
        front: "Différence :\nမင်း နေတယ် VS မင်း နေလား",
        back: "Phrase 1: မင်း နေတယ် = Tu restes/habites (AFFIRMATION)\n\nPhrase 2: မင်း နေလား = Restes-tu/Habites-tu ? (QUESTION)\n\nDifférence: Seule la particule finale change !",
        category: "grammar",
        id: "10"
      }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "Birman Niveau 1 - Particules တယ် et လား",
      description: "Maîtrisez les deux particules essentielles du birman : တယ် (affirmation) et လား (question). 10 cartes pour comprendre leur usage et leurs différences.",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["grammaire", "birman", "débutant", "niveau 1", "particules", "တယ်", "လား"],
      content: {
        cards: flashcards,
        shuffleSides: false
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

      console.log('✅ Exercice Birman Niveau 1 Flashcards créé:', data);
      toast.success("Exercice Flashcards Niveau 1 créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇲🇲 Birman - Niveau 1 : Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Insérer l'exercice de flashcards sur les particules တယ် (de) et လား (la) - 
            les deux particules essentielles du birman niveau débutant.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Flashcards</li>
              <li>• Nombre de cartes : 10</li>
              <li>• Langue : Birman 🇲🇲</li>
              <li>• Niveau : Débutant absolu (Niveau 1)</li>
              <li>• Thème : Particules grammaticales တယ် et လား</li>
              <li>• Points : 100 (10 points par carte)</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBurmeseLevel1Flashcard}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Flashcards Niveau 1"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBurmeseLevel1Flashcard;
