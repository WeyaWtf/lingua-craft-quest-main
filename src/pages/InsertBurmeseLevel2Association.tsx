import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseLevel2Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseLevel2Association = async () => {
    setIsInserting(true);

    const associationContent = {
      pairs: [
        {
          id: "pair-1",
          left: "ကျွန်တော် စာအုပ်___ ဖတ်တယ်",
          right: "ကို",
          explanation: "ကို marque 'စာအုပ်' (livre) comme objet direct. → Je lis un livre"
        },
        {
          id: "pair-2",
          left: "မင်း ထမင်း ___စားဘူး",
          right: "မ",
          explanation: "မ exprime la négation devant le verbe. → Tu ne manges pas de riz"
        },
        {
          id: "pair-3",
          left: "သူ အလုပ် မလုပ်___",
          right: "ဘူး",
          explanation: "ဘူး termine la phrase négative. → Il/Elle ne travaille pas"
        },
        {
          id: "pair-4",
          left: "ကျွန်တော် ရေ___ သောက်တယ်",
          right: "ကို",
          explanation: "ကို marque 'ရေ' (eau) comme objet direct. → Je bois de l'eau"
        },
        {
          id: "pair-5",
          left: "မင်း ကျောင်း ___သွားဘူး",
          right: "မ",
          explanation: "မ pour la négation devant သွား (aller). → Tu ne vas pas à l'école"
        },
        {
          id: "pair-6",
          left: "သူ ကား မဝယ်___",
          right: "ဘူး",
          explanation: "ဘူး termine la négation. → Il/Elle n'achète pas de voiture"
        },
        {
          id: "pair-7",
          left: "ကျွန်တော် သူငယ်ချင်း___ တွေ့တယ်",
          right: "ကို",
          explanation: "ကို marque 'သူငယ်ချင်း' (ami) comme objet direct. → Je rencontre un ami"
        },
        {
          id: "pair-8",
          left: "မင်း အိမ် ___သန့်ရှင်းဘူး",
          right: "မ",
          explanation: "မ pour la négation. → Tu ne nettoies pas la maison"
        },
        {
          id: "pair-9",
          left: "သူ စာ မရေး___",
          right: "ဘူး",
          explanation: "ဘူး termine la négation. → Il/Elle n'écrit pas de lettre"
        },
        {
          id: "pair-10",
          left: "ကျွန်တော် ဆရာ___ မေးတယ်",
          right: "ကို",
          explanation: "ကို marque 'ဆရာ' (professeur) comme objet indirect. → Je demande au professeur"
        },
        {
          id: "pair-11",
          left: "မင်း ဖုန်း ___ယူဘူး",
          right: "မ",
          explanation: "မ pour la négation. → Tu ne prends pas le téléphone"
        },
        {
          id: "pair-12",
          left: "သူ ပန်းသီး မစား___",
          right: "ဘူး",
          explanation: "ဘူး termine la négation. → Il/Elle ne mange pas de pomme"
        }
      ],
      instructions: "Associez chaque phrase incomplète avec la particule correcte (ကို pour l'objet direct, မ pour la négation devant le verbe, ဘူး pour terminer la négation)."
    };

    const exerciseData = {
      type: "association",
      title: "Birman Niveau 2 - Association Particules",
      description: "Associez les phrases incomplètes avec les bonnes particules : ကို (objet direct), မ (négation), ဘူး (fin de négation). 12 paires à associer.",
      difficulty: 2,
      source: "official",
      language: "burmese",
      tags: ["association", "particules", "birman", "niveau 2", "grammaire", "ကို", "မ", "ဘူး"],
      content: associationContent,
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

      console.log('✅ Exercice Birman Niveau 2 Association créé:', data);
      toast.success("Exercice Association créé avec succès !");
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
          <h1 className="text-3xl font-bold mb-4">🇲🇲 Birman - Niveau 2 : Association Particules</h1>
          <p className="text-muted-foreground mb-6">
            Insérer l'exercice d'association avec 12 paires pour pratiquer les particules ကို, မ, et ဘူး.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Détails de l'exercice :</h3>
            <ul className="text-sm space-y-1">
              <li>• Type : Association (Paires)</li>
              <li>• Nombre de paires : 12</li>
              <li>• Langue : Birman 🇲🇲</li>
              <li>• Niveau : 2 (Débutant)</li>
              <li>• Particules : ကို (objet direct), မ (négation), ဘူး (fin)</li>
              <li>• Points : 240 (20 points par paire)</li>
              <li>• Avec explications</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBurmeseLevel2Association}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "Créer Association Niveau 2"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Une fois créé, l'exercice sera disponible dans le catalogue
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBurmeseLevel2Association;
