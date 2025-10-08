import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseLevel1Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseLevel1Association = async () => {
    setIsInserting(true);

    const associationPairs = [
      // Série 1 : Affirmations vs Questions
      { left: "ကျွန်တော် စား___ (Je mange)", right: "တယ်", category: "particules" },
      { left: "မင်း သွား___ (Vas-tu ?)", right: "လား", category: "particules" },
      { left: "သူ အိပ်___ (Il/Elle dort)", right: "တယ်", category: "particules" },
      { left: "ကျွန်တော် ပြေး___ (Je cours)", right: "တယ်", category: "particules" },
      { left: "မင်း ဖတ်___ (Lis-tu ?)", right: "လား", category: "particules" },
      
      // Série 2 : Contexte d'usage
      { left: "Pour affirmer quelque chose", right: "တယ်", category: "fonction" },
      { left: "Pour poser une question simple", right: "လား", category: "fonction" },
      { left: "Pour déclarer un fait", right: "တယ်", category: "fonction" },
      { left: "Pour demander une confirmation", right: "လား", category: "fonction" },
      { left: "Pour exprimer une action habituelle", right: "တယ်", category: "fonction" },
      
      // Série 3 : Traductions
      { left: "သူ လာတယ်", right: "Il/Elle vient (affirmation)", category: "traduction" },
      { left: "သူ လာလား", right: "Vient-il/elle ? (question)", category: "traduction" },
      { left: "ကျွန်တော် ရှိတယ်", right: "J'ai (affirmation)", category: "traduction" },
      { left: "မင်း နေတယ်", right: "Tu restes (affirmation)", category: "traduction" },
      { left: "မင်း နေလား", right: "Restes-tu ? (question)", category: "traduction" }
    ];

    const exerciseData = {
      type: "association",
      title: "Birman Niveau 1 - Association Particules",
      description: "Associez les phrases incomplètes avec les bonnes particules (တယ် ou လား). 15 paires pour maîtriser l'usage des particules birmanes.",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["grammaire", "birman", "débutant", "niveau 1", "particules", "association", "တယ်", "လား"],
      content: {
        pairGroups: [
          associationPairs.slice(0, 5),   // Page 1: 5 paires
          associationPairs.slice(5, 10),  // Page 2: 5 paires
          associationPairs.slice(10, 15)  // Page 3: 5 paires
        ]
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

      console.log('✅ Exercice Birman Niveau 1 Association créé:', data);
      toast.success("Exercice Association Niveau 1 créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇲🇲 Birman - Niveau 1 : Association</h1>
          <p className="text-muted-foreground mb-6">
            Insérer l'exercice d'association avec 15 paires pour pratiquer
            l'usage des particules တယ် et လား dans différents contextes.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Association (paires)</li>
              <li>• Nombre de paires : 15</li>
              <li>• Langue : Birman 🇲🇲</li>
              <li>• Niveau : Débutant absolu (Niveau 1)</li>
              <li>• Thème : Particules grammaticales တယ် et လား</li>
              <li>• Points : 150 (10 points par paire)</li>
              <li>• 3 séries : Affirmations/Questions, Contextes, Traductions</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBurmeseLevel1Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Association Niveau 1"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBurmeseLevel1Association;
