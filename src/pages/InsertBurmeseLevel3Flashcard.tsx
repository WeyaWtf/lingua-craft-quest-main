import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseLevel3Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseLevel3Flashcard = async () => {
    setIsInserting(true);

    const flashcardContent = {
      cards: [
        // Particle မှာ (hma) - Time/Location marker
        {
          id: "card-1",
          front: "မှာ\n(hma)",
          back: "**Function**: Time/location marker\n\n**Examples**:\n1. မနက်ဖြန်မှာ သွားမယ် = will go tomorrow\n2. ဒီနေ့မှာ စားတယ် = eat today\n3. အိမ်မှာ နေတယ် = stay at home",
          hint: "Placed after time expressions or locations"
        },
        {
          id: "card-2",
          front: "ကျွန်တော် မနက်ဖြန်___ စာအုပ်ကို ဖတ်မယ်\n\nWhich particle is missing?",
          back: "**မှာ (hma)**\n\nကျွန်တော် မနက်ဖြန်**မှာ** စာအုပ်ကို ဖတ်မယ်\n\n= I will read a book tomorrow",
          hint: "Marks the time (tomorrow)"
        },
        {
          id: "card-3",
          front: "သူ ဒီနေ့___ ထမင်းကို စားတယ်\n\nWhich particle is missing?",
          back: "**မှာ (hma)**\n\nသူ ဒီနေ့**မှာ** ထမင်းကို စားတယ်\n\n= He/She eats rice today",
          hint: "Marks the time (today)"
        },
        
        // Particle က (ka) - From/Since marker
        {
          id: "card-4",
          front: "က\n(ka)",
          back: "**Function**: From/since marker\n\n**Examples**:\n1. မနေ့က စတင်တယ် = started from yesterday\n2. နှစ်က စားတယ် = has been eating since this year\n3. အရင်က လုပ်တယ် = has been working since before",
          hint: "Always used with past or ongoing actions"
        },
        {
          id: "card-5",
          front: "သူ မနေ့___ ထမင်းကို စားတယ်\n\nWhich particle is missing?",
          back: "**က (ka)**\n\nသူ မနေ့**က** ထမင်းကို စားတယ်\n\n= He/She has been eating rice since yesterday",
          hint: "Placed after time expression for 'since/from'"
        },
        {
          id: "card-6",
          front: "ကျွန်တော် နှစ်___ အလုပ်ကို လုပ်တယ်\n\nWhich particle is missing?",
          back: "**က (ka)**\n\nကျွန်တော် နှစ်**က** အလုပ်ကို လုပ်တယ်\n\n= I have been working since this year",
          hint: "'Since' this year - ongoing action"
        },
        
        // Particle အထိ (a-hti) - Until/To marker
        {
          id: "card-7",
          front: "အထိ\n(a-hti)",
          back: "**Function**: Until/to marker\n\n**Examples**:\n1. ည အထိ လုပ်မယ် = will work until night\n2. မနက် အထိ အိပ်မယ် = will sleep until morning\n3. ညနေ အထိ နေမယ် = will stay until evening",
          hint: "Always after time expression for 'until'"
        },
        {
          id: "card-8",
          front: "မင်း ညနေ ___ အိမ်မှာ နေမယ်\n\nWhich particle is missing?",
          back: "**အထိ (a-hti)**\n\nမင်း ညနေ **အထိ** အိမ်မှာ နေမယ်\n\n= You will stay at home until evening",
          hint: "Final particle for 'until'"
        },
        {
          id: "card-9",
          front: "သူ ည ___ အလုပ်ကို လုပ်မယ်\n\nWhich particle is missing?",
          back: "**အထိ (a-hti)**\n\nသူ ည **အထိ** အလုပ်ကို လုပ်မယ်\n\n= He/She will work until night",
          hint: "Marks the end time limit"
        },
        
        // Summary card
        {
          id: "card-10",
          front: "**SUMMARY**\n\nမှာ, က, အထိ\n\nWhat are their functions?",
          back: "**မှာ (hma)** = Time/location marker\n→ Subject + Time + **မှာ** + Object + ကို + Verb\n\n**က (ka)** = From/since marker\n→ Subject + Time + **က** + Object + ကို + Verb\n\n**အထိ (a-hti)** = Until/to marker\n→ Subject + Time + **အထိ** + Object + ကို + Verb",
          hint: "Three essential particles for Level 3"
        }
      ]
    };

    const exerciseData = {
      type: "flashcard",
      title: "Burmese Level 3 - Time Particle Flashcards",
      description: "Master the 3 essential time particles of Level 3: မှာ (at/in time), က (from/since), and အထိ (until). 10 cards with practical examples.",
      difficulty: 3,
      source: "official",
      language: "burmese",
      tags: ["particles", "burmese", "level 3", "grammar", "related vocabulary", "မှာ", "က", "အထိ", "time expressions"],
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
        console.error('Error during insertion:', error);
        toast.error("Error creating exercise");
        setIsInserting(false);
        return;
      }

      console.log('✅ Burmese Level 3 Flashcards exercise created:', data);
      toast.success("Flashcards exercise created successfully!");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) {
      console.error('Error:', err);
      toast.error("Error during creation");
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">🇲🇲 Burmese - Level 3: Time Particle Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Insert the flashcard exercise with 10 cards to learn the particles မှာ, က, and အထိ.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Exercise details:</h3>
            <ul className="text-sm space-y-1">
              <li>• Type: Flashcards (Related Vocabulary)</li>
              <li>• Number of cards: 10</li>
              <li>• Language: Burmese 🇲🇲</li>
              <li>• Level: 3 (Beginner)</li>
              <li>• Particles: မှာ (at/in time), က (from/since), အထိ (until)</li>
              <li>• Points: 200 (20 points per card)</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBurmeseLevel3Flashcard}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Level 3 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertBurmeseLevel3Flashcard;
