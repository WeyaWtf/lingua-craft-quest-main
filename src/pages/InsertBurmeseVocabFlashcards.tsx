import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseVocabFlashcards = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertVocabFlashcards = async () => {
    setIsInserting(true);

    // 100 essential Burmese words with syllable breakdown
    const vocabCards = [
      // Greetings & Polite Expressions (10)
      {
        front: "မင်္ဂလာဘာ",
        back: "mingala ba | Hello / Bonjour",
        category: "greetings",
        id: "1",
        extra: { syllables: ["မင်္ဂ", "လာ", "ဘာ"], ipa: "[mɪ̀ŋɡəlà bà]" }
      },
      {
        front: "ကျေးဇူးတင်ပါတယ်",
        back: "kyay-zu tin-ba-deh | Thank you / Merci",
        category: "greetings",
        id: "2",
        extra: { syllables: ["ကျေး", "ဇူး", "တင်", "ပါ", "တယ်"], ipa: "[tɕézú tɪ̀ɴ bà dɛ̀]" }
      },
      {
        front: "နေကောင်းလား",
        back: "nay kaung: la: | How are you? / Comment allez-vous?",
        category: "greetings",
        id: "3",
        extra: { syllables: ["နေ", "ကောင်း", "လား"], ipa: "[nè káʊɴ lá]" }
      },
      {
        front: "ကောင်းပါတယ်",
        back: "kaung:-ba-deh | I'm fine / Je vais bien",
        category: "greetings",
        id: "4",
        extra: { syllables: ["ကောင်း", "ပါ", "တယ်"], ipa: "[káʊɴ bà dɛ̀]" }
      },
      {
        front: "တောင်းပန်ပါတယ်",
        back: "taung-ban-ba-deh | Sorry / Désolé",
        category: "greetings",
        id: "5",
        extra: { syllables: ["တောင်း", "ပန်", "ပါ", "တယ်"], ipa: "[táʊɴ bàɴ bà dɛ̀]" }
      },
      {
        front: "ခွင့်ပြုပါ",
        back: "khwin-pyu-ba | Excuse me / Excusez-moi",
        category: "greetings",
        id: "6",
        extra: { syllables: ["ခွင့်", "ပြု", "ပါ"], ipa: "[kʰwɪ̰ɴ pjù bà]" }
      },
      {
        front: "ကြိုဆိုပါတယ်",
        back: "kyaw-hso-ba-deh | Welcome / Bienvenue",
        category: "greetings",
        id: "7",
        extra: { syllables: ["ကြို", "ဆို", "ပါ", "တယ်"], ipa: "[tɕɔ̀ sʰò bà dɛ̀]" }
      },
      {
        front: "သွားခွာတော့မယ်",
        back: "thwa:-khwa-taw-meh | Goodbye (leaving) / Au revoir",
        category: "greetings",
        id: "8",
        extra: { syllables: ["သွား", "ခွာ", "တော့", "မယ်"], ipa: "[θwá kʰwà tɔ̰ mɛ̀]" }
      },
      {
        front: "နောက်မှတွေ့မယ်",
        back: "nauk-hma-twe-meh | See you later / À plus tard",
        category: "greetings",
        id: "9",
        extra: { syllables: ["နောက်", "မှ", "တွေ့", "မယ်"], ipa: "[naʊʔ m̥ə twɛ̰ mɛ̀]" }
      },
      {
        front: "ကျန်းမာပါစေ",
        back: "kyan:-ma-ba-zay | Stay healthy / Restez en bonne santé",
        category: "greetings",
        id: "10",
        extra: { syllables: ["ကျန်း", "မာ", "ပါ", "စေ"], ipa: "[tɕáɴ mà bà zè]" }
      },

      // Family (10)
      {
        front: "အမေ",
        back: "a-may | Mother / Mère",
        category: "family",
        id: "11",
        extra: { syllables: ["အ", "မေ"], ipa: "[ʔəmè]" }
      },
      {
        front: "အဖေ",
        back: "a-phay | Father / Père",
        category: "family",
        id: "12",
        extra: { syllables: ["အ", "ဖေ"], ipa: "[ʔəpʰè]" }
      },
      {
        front: "သား",
        back: "tha: | Son / Fils",
        category: "family",
        id: "13",
        extra: { syllables: ["သား"], ipa: "[θá]" }
      },
      {
        front: "သမီး",
        back: "tha-mi: | Daughter / Fille",
        category: "family",
        id: "14",
        extra: { syllables: ["သ", "မီး"], ipa: "[θəmí]" }
      },
      {
        front: "ကလေး",
        back: "ka-lay: | Child / Enfant",
        category: "family",
        id: "15",
        extra: { syllables: ["က", "လေး"], ipa: "[kəlé]" }
      },
      {
        front: "အစ်ကို",
        back: "a-ko | Elder brother / Frère aîné",
        category: "family",
        id: "16",
        extra: { syllables: ["အစ်", "ကို"], ipa: "[ʔəkò]" }
      },
      {
        front: "အစ်မ",
        back: "a-ma. | Elder sister / Sœur aînée",
        category: "family",
        id: "17",
        extra: { syllables: ["အစ်", "မ"], ipa: "[ʔəma̰]" }
      },
      {
        front: "ညီ",
        back: "nyi | Younger sibling (male) / Frère cadet",
        category: "family",
        id: "18",
        extra: { syllables: ["ညီ"], ipa: "[ɲì]" }
      },
      {
        front: "နှမ",
        back: "hma. | Younger sister / Sœur cadette",
        category: "family",
        id: "19",
        extra: { syllables: ["နှမ"], ipa: "[n̥ma̰]" }
      },
      {
        front: "မိတ်ဆွေ",
        back: "mei'-hswè | Friend / Ami(e)",
        category: "family",
        id: "20",
        extra: { syllables: ["မိတ်", "ဆွေ"], ipa: "[meɪʔ sʰwè]" }
      },

      // Food & Drink (15)
      {
        front: "ထမင်း",
        back: "hta-min: | Rice (cooked) / Riz cuit",
        category: "food",
        id: "21",
        extra: { syllables: ["ထ", "မင်း"], ipa: "[tʰəmín]" }
      },
      {
        front: "ရေ",
        back: "yay | Water / Eau",
        category: "food",
        id: "22",
        extra: { syllables: ["ရေ"], ipa: "[jè]" }
      },
      {
        front: "လဖက်ရည်",
        back: "la-phet-yay | Tea / Thé",
        category: "food",
        id: "23",
        extra: { syllables: ["လ", "ဖက်", "ရည်"], ipa: "[ləpʰɛʔ jɛ̀]" }
      },
      {
        front: "ကော်ဖီ",
        back: "kaw-phi | Coffee / Café",
        category: "food",
        id: "24",
        extra: { syllables: ["ကော်", "ဖီ"], ipa: "[kɔ̀pʰì]" }
      },
      {
        front: "နို့",
        back: "no. | Milk / Lait",
        category: "food",
        id: "25",
        extra: { syllables: ["နို့"], ipa: "[no̰]" }
      },
      {
        front: "ထုပ်",
        back: "htote | Bread / Pain",
        category: "food",
        id: "26",
        extra: { syllables: ["ထုပ်"], ipa: "[tʰoʊʔ]" }
      },
      {
        front: "သစ်သီး",
        back: "thi'-thi: | Fruit / Fruit",
        category: "food",
        id: "27",
        extra: { syllables: ["သစ်", "သီး"], ipa: "[θɪʔ θí]" }
      },
      {
        front: "ဟင်းသီး",
        back: "hin:-thi: | Vegetable / Légume",
        category: "food",
        id: "28",
        extra: { syllables: ["ဟင်း", "သီး"], ipa: "[hɪ́ɴ θí]" }
      },
      {
        front: "အသား",
        back: "a-tha: | Meat / Viande",
        category: "food",
        id: "29",
        extra: { syllables: ["အ", "သား"], ipa: "[ʔəθá]" }
      },
      {
        front: "ငါး",
        back: "nga: | Fish / Poisson",
        category: "food",
        id: "30",
        extra: { syllables: ["ငါး"], ipa: "[ŋá]" }
      },
      {
        front: "ဥ",
        back: "u. | Egg / Œuf",
        category: "food",
        id: "31",
        extra: { syllables: ["ဥ"], ipa: "[ʔṵ]" }
      },
      {
        front: "ဆား",
        back: "hsa: | Salt / Sel",
        category: "food",
        id: "32",
        extra: { syllables: ["ဆား"], ipa: "[sʰá]" }
      },
      {
        front: "ချို",
        back: "cho | Sweet / Sucré",
        category: "food",
        id: "33",
        extra: { syllables: ["ချို"], ipa: "[tɕʰò]" }
      },
      {
        front: "စားသောက်ဆိုင်",
        back: "sa:-thauk-hsain | Restaurant / Restaurant",
        category: "food",
        id: "34",
        extra: { syllables: ["စား", "သောက်", "ဆိုင်"], ipa: "[sá θaʊʔ sʰàɪɴ]" }
      },
      {
        front: "အရသာ",
        back: "a-ya-tha | Delicious / Délicieux",
        category: "food",
        id: "35",
        extra: { syllables: ["အ", "ရ", "သာ"], ipa: "[ʔəjəθà]" }
      },

      // Places (10)
      {
        front: "အိမ်",
        back: "ein | House / Maison",
        category: "places",
        id: "36",
        extra: { syllables: ["အိမ်"], ipa: "[ʔèɪɴ]" }
      },
      {
        front: "မြို့",
        back: "myo. | City / Ville",
        category: "places",
        id: "37",
        extra: { syllables: ["မြို့"], ipa: "[mjo̰]" }
      },
      {
        front: "ကျေးရွာ",
        back: "kyay:-ywa | Village / Village",
        category: "places",
        id: "38",
        extra: { syllables: ["ကျေး", "ရွာ"], ipa: "[tɕéjwà]" }
      },
      {
        front: "ကျောင်း",
        back: "kyaung: | School / École",
        category: "places",
        id: "39",
        extra: { syllables: ["ကျောင်း"], ipa: "[tɕáʊɴ]" }
      },
      {
        front: "ဈေး",
        back: "zay: | Market / Marché",
        category: "places",
        id: "40",
        extra: { syllables: ["ဈေး"], ipa: "[zé]" }
      },
      {
        front: "ဆေးရုံ",
        back: "hsay:-yon | Hospital / Hôpital",
        category: "places",
        id: "41",
        extra: { syllables: ["ဆေး", "ရုံ"], ipa: "[sʰéjòʊɴ]" }
      },
      {
        front: "ရဲစခန်း",
        back: "yay-sa-khan: | Police station / Poste de police",
        category: "places",
        id: "42",
        extra: { syllables: ["ရဲ", "စ", "ခန်း"], ipa: "[jɛ̀ səkʰáɴ]" }
      },
      {
        front: "လမ်း",
        back: "lan: | Road / Route",
        category: "places",
        id: "43",
        extra: { syllables: ["လမ်း"], ipa: "[láɴ]" }
      },
      {
        front: "ပန်းခြံ",
        back: "pan:-chan | Garden / Jardin",
        category: "places",
        id: "44",
        extra: { syllables: ["ပန်း", "ခြံ"], ipa: "[páɴ dʒàɴ]" }
      },
      {
        front: "ဟိုတယ်",
        back: "ho-teh | Hotel / Hôtel",
        category: "places",
        id: "45",
        extra: { syllables: ["ဟို", "တယ်"], ipa: "[hòtɛ̀]" }
      },

      // Common Verbs (15)
      {
        front: "သွား",
        back: "thwa: | Go / Aller",
        category: "verbs",
        id: "46",
        extra: { syllables: ["သွား"], ipa: "[θwá]" }
      },
      {
        front: "လာ",
        back: "la | Come / Venir",
        category: "verbs",
        id: "47",
        extra: { syllables: ["လာ"], ipa: "[là]" }
      },
      {
        front: "နေ",
        back: "nay | Stay, live / Rester, vivre",
        category: "verbs",
        id: "48",
        extra: { syllables: ["နေ"], ipa: "[nè]" }
      },
      {
        front: "စား",
        back: "sa: | Eat / Manger",
        category: "verbs",
        id: "49",
        extra: { syllables: ["စား"], ipa: "[sá]" }
      },
      {
        front: "သောက်",
        back: "thauk | Drink / Boire",
        category: "verbs",
        id: "50",
        extra: { syllables: ["သောက်"], ipa: "[θaʊʔ]" }
      },
      {
        front: "ဖတ်",
        back: "phat | Read / Lire",
        category: "verbs",
        id: "51",
        extra: { syllables: ["ဖတ်"], ipa: "[pʰaʔ]" }
      },
      {
        front: "ရေး",
        back: "yay: | Write / Écrire",
        category: "verbs",
        id: "52",
        extra: { syllables: ["ရေး"], ipa: "[jé]" }
      },
      {
        front: "ပြော",
        back: "pyaw | Speak / Parler",
        category: "verbs",
        id: "53",
        extra: { syllables: ["ပြော"], ipa: "[pjɔ̀]" }
      },
      {
        front: "နားလည်",
        back: "na:-leh | Understand / Comprendre",
        category: "verbs",
        id: "54",
        extra: { syllables: ["နား", "လည်"], ipa: "[nálɛ̀]" }
      },
      {
        front: "ချစ်",
        back: "chit | Love / Aimer",
        category: "verbs",
        id: "55",
        extra: { syllables: ["ချစ်"], ipa: "[tɕʰɪʔ]" }
      },
      {
        front: "လုပ်",
        back: "loat | Do, make / Faire",
        category: "verbs",
        id: "56",
        extra: { syllables: ["လုပ်"], ipa: "[loʊʔ]" }
      },
      {
        front: "ကြည့်",
        back: "kyi. | Look, see / Regarder, voir",
        category: "verbs",
        id: "57",
        extra: { syllables: ["ကြည့်"], ipa: "[tɕḭ]" }
      },
      {
        front: "ရ",
        back: "ya. | Get, receive / Obtenir, recevoir",
        category: "verbs",
        id: "58",
        extra: { syllables: ["ရ"], ipa: "[jạ]" }
      },
      {
        front: "ပေး",
        back: "pay: | Give / Donner",
        category: "verbs",
        id: "59",
        extra: { syllables: ["ပေး"], ipa: "[pé]" }
      },
      {
        front: "သိ",
        back: "thi. | Know / Savoir",
        category: "verbs",
        id: "60",
        extra: { syllables: ["သိ"], ipa: "[θḭ]" }
      },

      // Adjectives (10)
      {
        front: "ကြီး",
        back: "kyi: | Big / Grand",
        category: "adjectives",
        id: "61",
        extra: { syllables: ["ကြီး"], ipa: "[tɕí]" }
      },
      {
        front: "သေး",
        back: "thay: | Small / Petit",
        category: "adjectives",
        id: "62",
        extra: { syllables: ["သေး"], ipa: "[θé]" }
      },
      {
        front: "ကောင်း",
        back: "kaung: | Good / Bon",
        category: "adjectives",
        id: "63",
        extra: { syllables: ["ကောင်း"], ipa: "[káʊɴ]" }
      },
      {
        front: "ဆိုး",
        back: "hso: | Bad / Mauvais",
        category: "adjectives",
        id: "64",
        extra: { syllables: ["ဆိုး"], ipa: "[sʰó]" }
      },
      {
        front: "လှ",
        back: "hla. | Beautiful / Beau",
        category: "adjectives",
        id: "65",
        extra: { syllables: ["လှ"], ipa: "[l̥a̰]" }
      },
      {
        front: "ချော",
        back: "chaw | Smooth, pretty / Lisse, joli",
        category: "adjectives",
        id: "66",
        extra: { syllables: ["ချော"], ipa: "[tɕʰɔ̀]" }
      },
      {
        front: "မြန်",
        back: "myan | Fast / Rapide",
        category: "adjectives",
        id: "67",
        extra: { syllables: ["မြန်"], ipa: "[mjàɴ]" }
      },
      {
        front: "နှေး",
        back: "hnay: | Slow / Lent",
        category: "adjectives",
        id: "68",
        extra: { syllables: ["နှေး"], ipa: "[n̥é]" }
      },
      {
        front: "နွေး",
        back: "nway: | Warm / Chaud",
        category: "adjectives",
        id: "69",
        extra: { syllables: ["နွေး"], ipa: "[nwé]" }
      },
      {
        front: "အေး",
        back: "ay: | Cool, cold / Froid",
        category: "adjectives",
        id: "70",
        extra: { syllables: ["အေး"], ipa: "[ʔé]" }
      },

      // Colors (8)
      {
        front: "အနီ",
        back: "a-ni | Red / Rouge",
        category: "colors",
        id: "71",
        extra: { syllables: ["အ", "နီ"], ipa: "[ʔənì]" }
      },
      {
        front: "အဖြူ",
        back: "a-phyu | White / Blanc",
        category: "colors",
        id: "72",
        extra: { syllables: ["အ", "ဖြူ"], ipa: "[ʔəpʰjù]" }
      },
      {
        front: "အနက်",
        back: "a-net | Black / Noir",
        category: "colors",
        id: "73",
        extra: { syllables: ["အ", "နက်"], ipa: "[ʔənɛʔ]" }
      },
      {
        front: "အစိမ်း",
        back: "a-sein: | Green / Vert",
        category: "colors",
        id: "74",
        extra: { syllables: ["အ", "စိမ်း"], ipa: "[ʔəséɪɴ]" }
      },
      {
        front: "အပြာ",
        back: "a-pya | Blue / Bleu",
        category: "colors",
        id: "75",
        extra: { syllables: ["အ", "ပြာ"], ipa: "[ʔəpjà]" }
      },
      {
        front: "အဝါ",
        back: "a-wa | Yellow / Jaune",
        category: "colors",
        id: "76",
        extra: { syllables: ["အ", "ဝါ"], ipa: "[ʔəwà]" }
      },
      {
        front: "ခရမ်း",
        back: "kha-yan: | Purple / Violet",
        category: "colors",
        id: "77",
        extra: { syllables: ["ခ", "ရမ်း"], ipa: "[kʰəjáɴ]" }
      },
      {
        front: "အညိုရင့်",
        back: "a-nyo-yin. | Brown / Marron",
        category: "colors",
        id: "78",
        extra: { syllables: ["အ", "ညို", "ရင့်"], ipa: "[ʔəɲòjḭɴ]" }
      },

      // Numbers (10)
      {
        front: "တစ်",
        back: "tit | One / Un",
        category: "numbers",
        id: "79",
        extra: { syllables: ["တစ်"], ipa: "[tɪʔ]" }
      },
      {
        front: "နှစ်",
        back: "hnit | Two / Deux",
        category: "numbers",
        id: "80",
        extra: { syllables: ["နှစ်"], ipa: "[n̥ɪʔ]" }
      },
      {
        front: "သုံး",
        back: "thoun: | Three / Trois",
        category: "numbers",
        id: "81",
        extra: { syllables: ["သုံး"], ipa: "[θóʊɴ]" }
      },
      {
        front: "လေး",
        back: "lay: | Four / Quatre",
        category: "numbers",
        id: "82",
        extra: { syllables: ["လေး"], ipa: "[lé]" }
      },
      {
        front: "ငါး",
        back: "nga: | Five / Cinq",
        category: "numbers",
        id: "83",
        extra: { syllables: ["ငါး"], ipa: "[ŋá]" }
      },
      {
        front: "ခြောက်",
        back: "chauk | Six / Six",
        category: "numbers",
        id: "84",
        extra: { syllables: ["ခြောက်"], ipa: "[tɕʰaʊʔ]" }
      },
      {
        front: "ခုနှစ်",
        back: "khu-nit | Seven / Sept",
        category: "numbers",
        id: "85",
        extra: { syllables: ["ခု", "နှစ်"], ipa: "[kʰṵ n̥ɪʔ]" }
      },
      {
        front: "ရှစ်",
        back: "shit | Eight / Huit",
        category: "numbers",
        id: "86",
        extra: { syllables: ["ရှစ်"], ipa: "[ʃɪʔ]" }
      },
      {
        front: "ကိုး",
        back: "ko: | Nine / Neuf",
        category: "numbers",
        id: "87",
        extra: { syllables: ["ကိုး"], ipa: "[kó]" }
      },
      {
        front: "ဆယ်",
        back: "hsè | Ten / Dix",
        category: "numbers",
        id: "88",
        extra: { syllables: ["ဆယ်"], ipa: "[sʰɛ̀]" }
      },

      // Time & Weather (12)
      {
        front: "ယနေ့",
        back: "ya-neh | Today / Aujourd'hui",
        category: "time",
        id: "89",
        extra: { syllables: ["ယ", "နေ့"], ipa: "[jənɛ̰]" }
      },
      {
        front: "မနက်ဖြန်",
        back: "ma-net-hpyan | Tomorrow / Demain",
        category: "time",
        id: "90",
        extra: { syllables: ["မ", "နက်", "ဖြန်"], ipa: "[mənɛʔ pʰjàɴ]" }
      },
      {
        front: "မနေ့က",
        back: "ma-neh-ka. | Yesterday / Hier",
        category: "time",
        id: "91",
        extra: { syllables: ["မ", "နေ့", "က"], ipa: "[mənɛ̰ kạ]" }
      },
      {
        front: "နေ့",
        back: "neh | Day / Jour",
        category: "time",
        id: "92",
        extra: { syllables: ["နေ့"], ipa: "[nɛ̰]" }
      },
      {
        front: "ည",
        back: "nya. | Night / Nuit",
        category: "time",
        id: "93",
        extra: { syllables: ["ည"], ipa: "[ɲa̰]" }
      },
      {
        front: "မနက်",
        back: "ma-net | Morning / Matin",
        category: "time",
        id: "94",
        extra: { syllables: ["မ", "နက်"], ipa: "[mənɛʔ]" }
      },
      {
        front: "ညနေ",
        back: "nya-nay | Evening / Soir",
        category: "time",
        id: "95",
        extra: { syllables: ["ည", "နေ"], ipa: "[ɲənè]" }
      },
      {
        front: "အချိန်",
        back: "a-chain | Time / Temps",
        category: "time",
        id: "96",
        extra: { syllables: ["အ", "ချိန်"], ipa: "[ʔətɕʰèɪɴ]" }
      },
      {
        front: "မိုး",
        back: "mo: | Rain / Pluie",
        category: "weather",
        id: "97",
        extra: { syllables: ["မိုး"], ipa: "[mó]" }
      },
      {
        front: "နေ",
        back: "nay | Sun / Soleil",
        category: "weather",
        id: "98",
        extra: { syllables: ["နေ"], ipa: "[nè]" }
      },
      {
        front: "လေ",
        back: "lay | Wind / Vent",
        category: "weather",
        id: "99",
        extra: { syllables: ["လေ"], ipa: "[lè]" }
      },
      {
        front: "မိုးကောင်းကင်",
        back: "mo:-kaung:-gin | Sky / Ciel",
        category: "weather",
        id: "100",
        extra: { syllables: ["မိုး", "ကောင်း", "ကင်"], ipa: "[mó káʊɴ dʒɪ̀ɴ]" }
      }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "Burmese Vocabulary - 100 Essential Words / 100 Mots Birmans Essentiels",
      description: "Master 100 essential Burmese words with complete syllable breakdown, IPA pronunciation, and translations. Covers greetings, family, food, places, verbs, adjectives, colors, numbers, time, and weather.",
      difficulty: 2,
      source: "official",
      language: "birman",
      tags: ["vocabulary", "flashcards", "burmese", "birman", "words", "essential", "beginner", "intermediate"],
      content: {
        cards: vocabCards,
        shuffleSides: true
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
        toast.error(`Erreur: ${error.message || "Erreur lors de la création de l'exercice"}`);
        setIsInserting(false);
        return;
      }

      console.log('✅ Vocabulary Flashcards créées:', data);
      toast.success("Burmese Vocabulary Flashcards créées avec succès !");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) {
      console.error('Erreur:', err);
      toast.error("Une erreur s'est produite");
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">📚 Burmese Vocabulary Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            100 mots birmans essentiels avec décomposition syllabique, prononciation IPA et traductions
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Salutations • Famille • Nourriture • Lieux • Verbes • Adjectifs • Couleurs • Nombres • Temps • Météo
          </p>
          <Button
            size="lg"
            onClick={insertVocabFlashcards}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Insertion en cours..." : "✅ Insérer l'exercice dans la base de données"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsertBurmeseVocabFlashcards;
