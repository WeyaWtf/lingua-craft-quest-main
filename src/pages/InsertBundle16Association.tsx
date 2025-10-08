import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBundle16Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle16Association = async () => {
    setIsInserting(true);
    const pairGroups = [[{left:"来年|rainen",right:"next year",id:"1-1"},{left:"六|roku",right:"six",id:"1-2"},{left:"悪い|warui",right:"bad",id:"1-3"},{left:"お手洗い|otearai",right:"toilet, bathroom",id:"1-4"}],[{left:"ご主人|goshujin",right:"husband (polite)",id:"2-1"},{left:"本当に|hontouni",right:"really, truly",id:"2-2"},{left:"自分|jibun",right:"self, oneself",id:"2-3"},{left:"ため|tame",right:"sake, purpose",id:"2-4"}],[{left:"見つかる|mitsukaru",right:"be found",id:"3-1"},{left:"休む|yasumu",right:"take a rest",id:"3-2"},{left:"ゆっくり|yukkuri",right:"slowly",id:"3-3"},{left:"六つ|muttsu",right:"six (things)",id:"3-4"}],[{left:"花|hana",right:"flower",id:"4-1"},{left:"動く|ugoku",right:"move",id:"4-2"},{left:"線|sen",right:"line",id:"4-3"},{left:"七日|nanoka",right:"seven days",id:"4-4"}],[{left:"以外|igai",right:"except for",id:"5-1"},{left:"男|otoko",right:"man, male",id:"5-2"},{left:"彼|kare",right:"he, boyfriend",id:"5-3"},{left:"女|onna",right:"woman",id:"5-4"}],[{left:"妻|tsuma",right:"wife",id:"6-1"},{left:"百|hyaku",right:"hundred",id:"6-2"},{left:"辺|atari",right:"vicinity",id:"6-3"},{left:"店|mise",right:"shop, store",id:"6-4"}],[{left:"閉まる|shimaru",right:"be shut, closed",id:"7-1"}]];
    const exerciseData = {type:"association",title:"JAP LIST 1000 - Bundle 16 Association",description:"Match Japanese vocabulary with English translations (N5 level)",difficulty:1,source:"official",language:"japanese",tags:["vocabulary","japanese","beginner","N5","JLPT","association"],content:{pairGroups:pairGroups,shufflePairs:true},author_id:"demo",is_published:true};
    try{const{data,error}=await supabase.from('exercises').insert([exerciseData]).select().single();if(error){console.error('Erreur:',error);toast.error("Erreur");setIsInserting(false);return;}console.log('✅ Bundle 16 Association créé:',data);toast.success("Bundle 16 Association créé !");setTimeout(()=>navigate("/catalog"),1500);}catch(err){console.error('Erreur:',err);toast.error("Erreur");setIsInserting(false);}
  };

  return (<div className="min-h-screen bg-gradient-subtle"><Navigation /><div className="container mx-auto px-4 py-16 max-w-2xl"><div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center"><h1 className="text-3xl font-bold mb-4">🇯🇵 JAP LIST 1000 - Bundle 16 Association</h1><Button size="lg" onClick={insertBundle16Association} disabled={isInserting} className="min-w-[200px]">{isInserting?"Insertion...":"Créer Bundle 16 Association"}</Button></div></div></div>);
};

export default InsertBundle16Association;
