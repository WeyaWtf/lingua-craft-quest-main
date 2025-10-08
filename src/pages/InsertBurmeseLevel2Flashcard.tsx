import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseLevel2Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseLevel2Flashcard = async () => {
    setIsInserting(true);

    const flashcardContent = {
      cards: [
        // Particule ကို (ko) - Objet direct
        {
          id: "card-1",
          front: "ကို\n(ko)",
          back: "**Fonction** : Marque d'objet direct\n\n**Exemples** :\n1. စာအုပ်ကို ဖတ်တယ် = lit un livre\n2. ရေကို သောက်တယ် = bois de l'eau\n3. ထမင်းကို စားတယ် = mange du riz",
          hint: "Placé après l'objet direct, avant le verbe"
        },
        {
          id: "card-2",
          front: "ကျွန်တော် စာအုပ်___ ဖတ်တယ်\n\nQuelle particule manque ?",
          back: "**ကို (ko)**\n\nကျွန်တော် စာအုပ်**ကို** ဖတ်တယ်\n\n= Je lis un livre",
          hint: "Marque l'objet direct (un livre)"
        },
        {
          id: "card-3",
          front: "မင်း ရေ___ သောက်လား\n\nQuelle particule manque ?",
          back: "**ကို (ko)**\n\nမင်း ရေ**ကို** သောက်လား\n\n= Bois-tu de l'eau ?",
          hint: "Marque l'objet (l'eau)"
        },
        
        // Particule မ (ma) - Négation
        {
          id: "card-4",
          front: "မ\n(ma)",
          back: "**Fonction** : Négation (placé devant le verbe)\n\n**Exemples** :\n1. မစားဘူး = ne mange pas\n2. မသွားဘူး = ne va pas\n3. မလုပ်ဘူး = ne fait pas",
          hint: "Toujours utilisé avec ဘူး (bu) à la fin"
        },
        {
          id: "card-5",
          front: "သူ ထမင်း ___စားဘူး\n\nQuelle particule manque ?",
          back: "**မ (ma)**\n\nသူ ထမင်း **မ**စားဘူး\n\n= Il/Elle ne mange pas de riz",
          hint: "Placé devant le verbe pour la négation"
        },
        {
          id: "card-6",
          front: "ကျွန်တော် ကျောင်း ___သွားဘူး\n\nQuelle particule manque ?",
          back: "**မ (ma)**\n\nကျွန်တော် ကျောင်း **မ**သွားဘူး\n\n= Je ne vais pas à l'école",
          hint: "Négation devant le verbe"
        },
        
        // Particule ဘူး (bu) - Fin de négation
        {
          id: "card-7",
          front: "ဘူး\n(bu)",
          back: "**Fonction** : Particule finale de négation\n\n**Exemples** :\n1. မစား**ဘူး** = ne mange pas\n2. မသောက်**ဘူး** = ne boit pas\n3. မလုပ်**ဘူး** = ne fait pas",
          hint: "Toujours après un verbe négatif (avec မ)"
        },
        {
          id: "card-8",
          front: "မင်း အလုပ် မလုပ်___\n\nQuelle particule manque ?",
          back: "**ဘူး (bu)**\n\nမင်း အလုပ် မလုပ်**ဘူး**\n\n= Tu ne travailles pas",
          hint: "Particule finale pour la négation"
        },
        {
          id: "card-9",
          front: "သူ စာအုပ် မဖတ်___\n\nQuelle particule manque ?",
          back: "**ဘူး (bu)**\n\nသူ စာအုပ် မဖတ်**ဘူး**\n\n= Il/Elle ne lit pas de livre",
          hint: "Termine la phrase négative"
        },
        
        // Carte récapitulative
        {
          id: "card-10",
          front: "**RÉCAPITULATIF**\n\nကို, မ, ဘူး\n\nQuelles sont leurs fonctions ?",
          back: "**ကို (ko)** = Objet direct\n→ Sujet + Objet + **ကို** + Verbe\n\n**မ (ma)** = Négation (avant verbe)\n→ Sujet + **မ** + Verbe + ဘူး\n\n**ဘူး (bu)** = Fin de négation\n→ Sujet + မ + Verbe + **ဘူး**",
          hint: "Trois particules essentielles du Niveau 2"
        }
      ]
    };

    const exerciseData = {
      type: "flashcard",
      title: "Birman Niveau 2 - Flashcards Particules",
      description: "Maîtrisez les 3 particules essentielles du niveau 2 : ကို (objet direct), မ (négation), et ဘူး (fin de négation). 10 cartes avec exemples pratiques.",
      difficulty: 2,
      source: "official",
      language: "burmese",
      tags: ["particules", "birman", "niveau 2", "grammaire", "vocabulaire connexe", "ကို", "မ", "ဘူး"],
      content: flashcardContent,
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

      console.log('✅ Exercice Birman Niveau 2 Flashcards créé:', data);
      toast.success("Exercice Flashcards créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇲🇲 Birman - Niveau 2 : Flashcards Particules</h1>
          <p className="text-muted-foreground mb-6">
            Insérer l'exercice de flashcards avec 10 cartes pour apprendre les particules ကို, မ, et ဘူး.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Flashcards (Vocabulaire Connexe)</li>
              <li>• Nombre de cartes : 10</li>
              <li>• Langue : Birman 🇲🇲</li>
              <li>• Niveau : 2 (Débutant)</li>
              <li>• Particules : ကို (objet direct), မ (négation), ဘူး (fin négation)</li>
              <li>• Points : 200 (20 points par carte)</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBurmeseLevel2Flashcard}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Flashcards Niveau 2"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBurmeseLevel2Flashcard;
