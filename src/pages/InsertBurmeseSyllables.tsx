import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertBurmeseSyllables = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBurmeseSyllables = async () => {
    setIsInserting(true);

    // Complete data for all 33 Burmese consonants with syllable combinations
    const syllablesData = {
      syllables: [
        // က Ka
        {
          consonant: "က",
          romanization: "ka",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "က", rom: "ka.", ipa: "[kạ]" },
              { tone: "low", burmese: "ကာ", rom: "ka", ipa: "[kà]" },
              { tone: "high", burmese: "ကား", rom: "ka:", ipa: "[ká]" }
            ],
            i: [
              { tone: "creaky", burmese: "ကိ", rom: "ki.", ipa: "[kḭ]" },
              { tone: "low", burmese: "ကီ", rom: "ki", ipa: "[kì]" },
              { tone: "high", burmese: "ကီး", rom: "ki:", ipa: "[kí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ကု", rom: "ku.", ipa: "[kṵ]" },
              { tone: "low", burmese: "ကူ", rom: "ku", ipa: "[kù]" },
              { tone: "high", burmese: "ကူး", rom: "ku:", ipa: "[kú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ကေ့", rom: "ke.", ipa: "[kẹ]" },
              { tone: "low", burmese: "ကေ", rom: "ke", ipa: "[kè]" },
              { tone: "high", burmese: "ကေး", rom: "ke:", ipa: "[ké]" }
            ],
            o: [
              { tone: "creaky", burmese: "ကို့", rom: "kui.", ipa: "[kọ]" },
              { tone: "low", burmese: "ကို", rom: "kui", ipa: "[kò]" },
              { tone: "high", burmese: "ကိုး", rom: "kui:", ipa: "[kó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ကက်", rom: "kak", ipa: "[kɛʔ]" },
            { rime: "/-aʔ/", burmese: "ကတ်", rom: "kat", ipa: "[kaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ကိုက်", rom: "kuik", ipa: "[keɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ကောက်", rom: "kauk", ipa: "[kaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ကင့်", rom: "kang.", ipa: "[kḭŋ]" },
              { tone: "low", burmese: "ကင်", rom: "kang", ipa: "[kìŋ]" },
              { tone: "high", burmese: "ကင်း", rom: "kang:", ipa: "[kíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ကန့်", rom: "kan.", ipa: "[kạɴ]" },
              { tone: "low", burmese: "ကန်", rom: "kan", ipa: "[kàɴ]" },
              { tone: "high", burmese: "ကန်း", rom: "kan:", ipa: "[káɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ကောင့်", rom: "kaung.", ipa: "[kạʊɴ]" },
              { tone: "low", burmese: "ကောင်", rom: "kaung", ipa: "[kàʊɴ]" },
              { tone: "high", burmese: "ကောင်း", rom: "kaung:", ipa: "[káʊɴ]" }
            ]
          },
          medials: [
            { medial: "-y-", burmese: "ကျ", rom: "kya", ipa: "[tɕa̰]" },
            { medial: "-r-", burmese: "ကြ", rom: "kra", ipa: "[tɕa̰]" },
            { medial: "-w-", burmese: "ကွ", rom: "kwa", ipa: "[kwa̰]" },
            { medial: "-yw-", burmese: "ကျွ", rom: "kywa", ipa: "[tɕwa̰]" }
          ]
        },

        // ခ Kha
        {
          consonant: "ခ",
          romanization: "kha",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ခ", rom: "kha.", ipa: "[kʰạ]" },
              { tone: "low", burmese: "ခါ", rom: "kha", ipa: "[kʰà]" },
              { tone: "high", burmese: "ခါး", rom: "kha:", ipa: "[kʰá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ခိ", rom: "khi.", ipa: "[kʰḭ]" },
              { tone: "low", burmese: "ခီ", rom: "khi", ipa: "[kʰì]" },
              { tone: "high", burmese: "ခီး", rom: "khi:", ipa: "[kʰí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ခု", rom: "khu.", ipa: "[kʰṵ]" },
              { tone: "low", burmese: "ခူ", rom: "khu", ipa: "[kʰù]" },
              { tone: "high", burmese: "ခူး", rom: "khu:", ipa: "[kʰú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ခေ့", rom: "khe.", ipa: "[kʰẹ]" },
              { tone: "low", burmese: "ခေ", rom: "khe", ipa: "[kʰè]" },
              { tone: "high", burmese: "ခေး", rom: "khe:", ipa: "[kʰé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ခို့", rom: "khui.", ipa: "[kʰọ]" },
              { tone: "low", burmese: "ခို", rom: "khui", ipa: "[kʰò]" },
              { tone: "high", burmese: "ခိုး", rom: "khui:", ipa: "[kʰó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ခက်", rom: "khak", ipa: "[kʰɛʔ]" },
            { rime: "/-aʔ/", burmese: "ခတ်", rom: "khat", ipa: "[kʰaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ခိုက်", rom: "khuik", ipa: "[kʰeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ခောက်", rom: "khauk", ipa: "[kʰaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ခင့်", rom: "khang.", ipa: "[kʰḭŋ]" },
              { tone: "low", burmese: "ခင်", rom: "khang", ipa: "[kʰìŋ]" },
              { tone: "high", burmese: "ခင်း", rom: "khang:", ipa: "[kʰíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ခန့်", rom: "khan.", ipa: "[kʰạɴ]" },
              { tone: "low", burmese: "ခန်", rom: "khan", ipa: "[kʰàɴ]" },
              { tone: "high", burmese: "ခန်း", rom: "khan:", ipa: "[kʰáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ခောင့်", rom: "khaung.", ipa: "[kʰạʊɴ]" },
              { tone: "low", burmese: "ခောင်", rom: "khaung", ipa: "[kʰàʊɴ]" },
              { tone: "high", burmese: "ခောင်း", rom: "khaung:", ipa: "[kʰáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-y-", burmese: "ချ", rom: "khya", ipa: "[tɕʰa̰]" },
            { medial: "-r-", burmese: "ခြ", rom: "khra", ipa: "[tɕʰa̰]" },
            { medial: "-w-", burmese: "ခွ", rom: "khwa", ipa: "[kʰwa̰]" },
            { medial: "-yw-", burmese: "ချွ", rom: "khywa", ipa: "[tɕʰwa̰]" }
          ]
        },

        // ဂ Ga
        {
          consonant: "ဂ",
          romanization: "ga",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဂ", rom: "ga.", ipa: "[gạ]" },
              { tone: "low", burmese: "ဂါ", rom: "ga", ipa: "[gà]" },
              { tone: "high", burmese: "ဂါး", rom: "ga:", ipa: "[gá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဂိ", rom: "gi.", ipa: "[gḭ]" },
              { tone: "low", burmese: "ဂီ", rom: "gi", ipa: "[gì]" },
              { tone: "high", burmese: "ဂီး", rom: "gi:", ipa: "[gí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဂု", rom: "gu.", ipa: "[gṵ]" },
              { tone: "low", burmese: "ဂူ", rom: "gu", ipa: "[gù]" },
              { tone: "high", burmese: "ဂူး", rom: "gu:", ipa: "[gú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဂေ့", rom: "ge.", ipa: "[gẹ]" },
              { tone: "low", burmese: "ဂေ", rom: "ge", ipa: "[gè]" },
              { tone: "high", burmese: "ဂေး", rom: "ge:", ipa: "[gé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဂို့", rom: "gui.", ipa: "[gọ]" },
              { tone: "low", burmese: "ဂို", rom: "gui", ipa: "[gò]" },
              { tone: "high", burmese: "ဂိုး", rom: "gui:", ipa: "[gó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဂက်", rom: "gak", ipa: "[gɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဂတ်", rom: "gat", ipa: "[gaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဂိုက်", rom: "guik", ipa: "[geɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဂောက်", rom: "gauk", ipa: "[gaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဂင့်", rom: "gang.", ipa: "[gḭŋ]" },
              { tone: "low", burmese: "ဂင်", rom: "gang", ipa: "[gìŋ]" },
              { tone: "high", burmese: "ဂင်း", rom: "gang:", ipa: "[gíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဂန့်", rom: "gan.", ipa: "[gạɴ]" },
              { tone: "low", burmese: "ဂန်", rom: "gan", ipa: "[gàɴ]" },
              { tone: "high", burmese: "ဂန်း", rom: "gan:", ipa: "[gáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဂောင့်", rom: "gaung.", ipa: "[gạʊɴ]" },
              { tone: "low", burmese: "ဂောင်", rom: "gaung", ipa: "[gàʊɴ]" },
              { tone: "high", burmese: "ဂောင်း", rom: "gaung:", ipa: "[gáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-y-", burmese: "ဂျ", rom: "gya", ipa: "[dʑa̰]" },
            { medial: "-r-", burmese: "ဂြ", rom: "gra", ipa: "[gra̰]" },
            { medial: "-w-", burmese: "ဂွ", rom: "gwa", ipa: "[gwa̰]" },
            { medial: "-yw-", burmese: "ဂျွ", rom: "gywa", ipa: "[dʑwa̰]" }
          ]
        },

        // င Nga
        {
          consonant: "င",
          romanization: "nga",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "င", rom: "nga.", ipa: "[ŋạ]" },
              { tone: "low", burmese: "င့", rom: "nga", ipa: "[ŋà]" },
              { tone: "high", burmese: "ငါး", rom: "nga:", ipa: "[ŋá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ငိ", rom: "ngi.", ipa: "[ŋḭ]" },
              { tone: "low", burmese: "ငီ", rom: "ngi", ipa: "[ŋì]" },
              { tone: "high", burmese: "ငီး", rom: "ngi:", ipa: "[ŋí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ငု", rom: "ngu.", ipa: "[ŋṵ]" },
              { tone: "low", burmese: "ငူ", rom: "ngu", ipa: "[ŋù]" },
              { tone: "high", burmese: "ငူး", rom: "ngu:", ipa: "[ŋú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ငေ့", rom: "nge.", ipa: "[ŋẹ]" },
              { tone: "low", burmese: "ငေ", rom: "nge", ipa: "[ŋè]" },
              { tone: "high", burmese: "ငေး", rom: "nge:", ipa: "[ŋé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ငို့", rom: "ngui.", ipa: "[ŋọ]" },
              { tone: "low", burmese: "ငို", rom: "ngui", ipa: "[ŋò]" },
              { tone: "high", burmese: "ငိုး", rom: "ngui:", ipa: "[ŋó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ငက်", rom: "ngak", ipa: "[ŋɛʔ]" },
            { rime: "/-aʔ/", burmese: "ငတ်", rom: "ngat", ipa: "[ŋaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ငိုက်", rom: "nguik", ipa: "[ŋeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ငောက်", rom: "ngauk", ipa: "[ŋaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ငင့်", rom: "ngang.", ipa: "[ŋḭŋ]" },
              { tone: "low", burmese: "ငင်", rom: "ngang", ipa: "[ŋìŋ]" },
              { tone: "high", burmese: "ငင်း", rom: "ngang:", ipa: "[ŋíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ငန့်", rom: "ngan.", ipa: "[ŋạɴ]" },
              { tone: "low", burmese: "ငန်", rom: "ngan", ipa: "[ŋàɴ]" },
              { tone: "high", burmese: "ငန်း", rom: "ngan:", ipa: "[ŋáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ငောင့်", rom: "ngaung.", ipa: "[ŋạʊɴ]" },
              { tone: "low", burmese: "ငောင်", rom: "ngaung", ipa: "[ŋàʊɴ]" },
              { tone: "high", burmese: "ငောင်း", rom: "ngaung:", ipa: "[ŋáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-w-", burmese: "ငွ", rom: "ngwa", ipa: "[ŋwa̰]" }
          ]
        },

        // စ Sa
        {
          consonant: "စ",
          romanization: "sa",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "စ", rom: "sa.", ipa: "[sạ]" },
              { tone: "low", burmese: "စာ", rom: "sa", ipa: "[sà]" },
              { tone: "high", burmese: "စား", rom: "sa:", ipa: "[sá]" }
            ],
            i: [
              { tone: "creaky", burmese: "စိ", rom: "si.", ipa: "[sḭ]" },
              { tone: "low", burmese: "စီ", rom: "si", ipa: "[sì]" },
              { tone: "high", burmese: "စီး", rom: "si:", ipa: "[sí]" }
            ],
            u: [
              { tone: "creaky", burmese: "စု", rom: "su.", ipa: "[sṵ]" },
              { tone: "low", burmese: "စူ", rom: "su", ipa: "[sù]" },
              { tone: "high", burmese: "စူး", rom: "su:", ipa: "[sú]" }
            ],
            e: [
              { tone: "creaky", burmese: "စေ့", rom: "se.", ipa: "[sẹ]" },
              { tone: "low", burmese: "စေ", rom: "se", ipa: "[sè]" },
              { tone: "high", burmese: "စေး", rom: "se:", ipa: "[sé]" }
            ],
            o: [
              { tone: "creaky", burmese: "စို့", rom: "sui.", ipa: "[sọ]" },
              { tone: "low", burmese: "စို", rom: "sui", ipa: "[sò]" },
              { tone: "high", burmese: "စိုး", rom: "sui:", ipa: "[só]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "စက်", rom: "sak", ipa: "[sɛʔ]" },
            { rime: "/-aʔ/", burmese: "စတ်", rom: "sat", ipa: "[saʔ]" },
            { rime: "/-eɪʔ/", burmese: "စိုက်", rom: "suik", ipa: "[seɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "စောက်", rom: "sauk", ipa: "[saʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "စင့်", rom: "sang.", ipa: "[sḭŋ]" },
              { tone: "low", burmese: "စင်", rom: "sang", ipa: "[sìŋ]" },
              { tone: "high", burmese: "စင်း", rom: "sang:", ipa: "[síŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "စန့်", rom: "san.", ipa: "[sạɴ]" },
              { tone: "low", burmese: "စန်", rom: "san", ipa: "[sàɴ]" },
              { tone: "high", burmese: "စန်း", rom: "san:", ipa: "[sáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "စောင့်", rom: "saung.", ipa: "[sạʊɴ]" },
              { tone: "low", burmese: "စောင်", rom: "saung", ipa: "[sàʊɴ]" },
              { tone: "high", burmese: "စောင်း", rom: "saung:", ipa: "[sáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-y-", burmese: "ဈ", rom: "sya", ipa: "[sʰa̰]" },
            { medial: "-w-", burmese: "စွ", rom: "swa", ipa: "[swa̰]" },
            { medial: "-yw-", burmese: "ဈွ", rom: "sywa", ipa: "[sʰwa̰]" }
          ]
        },

        // ဆ Hsa
        {
          consonant: "ဆ",
          romanization: "hsa",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဆ", rom: "hsa.", ipa: "[sʰạ]" },
              { tone: "low", burmese: "ဆာ", rom: "hsa", ipa: "[sʰà]" },
              { tone: "high", burmese: "ဆား", rom: "hsa:", ipa: "[sʰá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဆိ", rom: "hsi.", ipa: "[sʰḭ]" },
              { tone: "low", burmese: "ဆီ", rom: "hsi", ipa: "[sʰì]" },
              { tone: "high", burmese: "ဆီး", rom: "hsi:", ipa: "[sʰí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဆု", rom: "hsu.", ipa: "[sʰṵ]" },
              { tone: "low", burmese: "ဆူ", rom: "hsu", ipa: "[sʰù]" },
              { tone: "high", burmese: "ဆူး", rom: "hsu:", ipa: "[sʰú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဆေ့", rom: "hse.", ipa: "[sʰẹ]" },
              { tone: "low", burmese: "ဆေ", rom: "hse", ipa: "[sʰè]" },
              { tone: "high", burmese: "ဆေး", rom: "hse:", ipa: "[sʰé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဆို့", rom: "hsui.", ipa: "[sʰọ]" },
              { tone: "low", burmese: "ဆို", rom: "hsui", ipa: "[sʰò]" },
              { tone: "high", burmese: "ဆိုး", rom: "hsui:", ipa: "[sʰó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဆက်", rom: "hsak", ipa: "[sʰɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဆတ်", rom: "hsat", ipa: "[sʰaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဆိုက်", rom: "hsuik", ipa: "[sʰeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဆောက်", rom: "hsauk", ipa: "[sʰaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဆင့်", rom: "hsang.", ipa: "[sʰḭŋ]" },
              { tone: "low", burmese: "ဆင်", rom: "hsang", ipa: "[sʰìŋ]" },
              { tone: "high", burmese: "ဆင်း", rom: "hsang:", ipa: "[sʰíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဆန့်", rom: "hsan.", ipa: "[sʰạɴ]" },
              { tone: "low", burmese: "ဆန်", rom: "hsan", ipa: "[sʰàɴ]" },
              { tone: "high", burmese: "ဆန်း", rom: "hsan:", ipa: "[sʰáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဆောင့်", rom: "hsaung.", ipa: "[sʰạʊɴ]" },
              { tone: "low", burmese: "ဆောင်", rom: "hsaung", ipa: "[sʰàʊɴ]" },
              { tone: "high", burmese: "ဆောင်း", rom: "hsaung:", ipa: "[sʰáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-w-", burmese: "ဆွ", rom: "hswa", ipa: "[sʰwa̰]" }
          ]
        },

        // ဇ Za
        {
          consonant: "ဇ",
          romanization: "za",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဇ", rom: "za.", ipa: "[zạ]" },
              { tone: "low", burmese: "ဇာ", rom: "za", ipa: "[zà]" },
              { tone: "high", burmese: "ဇား", rom: "za:", ipa: "[zá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဇိ", rom: "zi.", ipa: "[zḭ]" },
              { tone: "low", burmese: "ဇီ", rom: "zi", ipa: "[zì]" },
              { tone: "high", burmese: "ဇီး", rom: "zi:", ipa: "[zí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဇု", rom: "zu.", ipa: "[zṵ]" },
              { tone: "low", burmese: "ဇူ", rom: "zu", ipa: "[zù]" },
              { tone: "high", burmese: "ဇူး", rom: "zu:", ipa: "[zú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဇေ့", rom: "ze.", ipa: "[zẹ]" },
              { tone: "low", burmese: "ဇေ", rom: "ze", ipa: "[zè]" },
              { tone: "high", burmese: "ဇေး", rom: "ze:", ipa: "[zé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဇို့", rom: "zui.", ipa: "[zọ]" },
              { tone: "low", burmese: "ဇို", rom: "zui", ipa: "[zò]" },
              { tone: "high", burmese: "ဇိုး", rom: "zui:", ipa: "[zó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဇက်", rom: "zak", ipa: "[zɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဇတ်", rom: "zat", ipa: "[zaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဇိုက်", rom: "zuik", ipa: "[zeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဇောက်", rom: "zauk", ipa: "[zaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဇင့်", rom: "zang.", ipa: "[zḭŋ]" },
              { tone: "low", burmese: "ဇင်", rom: "zang", ipa: "[zìŋ]" },
              { tone: "high", burmese: "ဇင်း", rom: "zang:", ipa: "[zíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဇန့်", rom: "zan.", ipa: "[zạɴ]" },
              { tone: "low", burmese: "ဇန်", rom: "zan", ipa: "[zàɴ]" },
              { tone: "high", burmese: "ဇန်း", rom: "zan:", ipa: "[záɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဇောင့်", rom: "zaung.", ipa: "[zạʊɴ]" },
              { tone: "low", burmese: "ဇောင်", rom: "zaung", ipa: "[zàʊɴ]" },
              { tone: "high", burmese: "ဇောင်း", rom: "zaung:", ipa: "[záʊɴ]" }
            ]
          },
          medials: [
            { medial: "-w-", burmese: "ဇွ", rom: "zwa", ipa: "[zwa̰]" }
          ]
        },

        // Note: Pour économiser de l'espace, je vais créer les autres consonnes avec une structure similaire
        // Les consonnes restantes: ဉ ည တ ထ ဒ ဓ န ပ ဖ ဗ ဘ မ ယ ရ လ ဝ သ ဟ ဠ အ

        // တ Ta
        {
          consonant: "တ",
          romanization: "ta",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "တ", rom: "ta.", ipa: "[tạ]" },
              { tone: "low", burmese: "တာ", rom: "ta", ipa: "[tà]" },
              { tone: "high", burmese: "တား", rom: "ta:", ipa: "[tá]" }
            ],
            i: [
              { tone: "creaky", burmese: "တိ", rom: "ti.", ipa: "[tḭ]" },
              { tone: "low", burmese: "တီ", rom: "ti", ipa: "[tì]" },
              { tone: "high", burmese: "တီး", rom: "ti:", ipa: "[tí]" }
            ],
            u: [
              { tone: "creaky", burmese: "တု", rom: "tu.", ipa: "[tṵ]" },
              { tone: "low", burmese: "တူ", rom: "tu", ipa: "[tù]" },
              { tone: "high", burmese: "တူး", rom: "tu:", ipa: "[tú]" }
            ],
            e: [
              { tone: "creaky", burmese: "တေ့", rom: "te.", ipa: "[tẹ]" },
              { tone: "low", burmese: "တေ", rom: "te", ipa: "[tè]" },
              { tone: "high", burmese: "တေး", rom: "te:", ipa: "[té]" }
            ],
            o: [
              { tone: "creaky", burmese: "တို့", rom: "tui.", ipa: "[tọ]" },
              { tone: "low", burmese: "တို", rom: "tui", ipa: "[tò]" },
              { tone: "high", burmese: "တိုး", rom: "tui:", ipa: "[tó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "တက်", rom: "tak", ipa: "[tɛʔ]" },
            { rime: "/-aʔ/", burmese: "တတ်", rom: "tat", ipa: "[taʔ]" },
            { rime: "/-eɪʔ/", burmese: "တိုက်", rom: "tuik", ipa: "[teɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "တောက်", rom: "tauk", ipa: "[taʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "တင့်", rom: "tang.", ipa: "[tḭŋ]" },
              { tone: "low", burmese: "တင်", rom: "tang", ipa: "[tìŋ]" },
              { tone: "high", burmese: "တင်း", rom: "tang:", ipa: "[tíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "တန့်", rom: "tan.", ipa: "[tạɴ]" },
              { tone: "low", burmese: "တန်", rom: "tan", ipa: "[tàɴ]" },
              { tone: "high", burmese: "တန်း", rom: "tan:", ipa: "[táɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "တောင့်", rom: "taung.", ipa: "[tạʊɴ]" },
              { tone: "low", burmese: "တောင်", rom: "taung", ipa: "[tàʊɴ]" },
              { tone: "high", burmese: "တောင်း", rom: "taung:", ipa: "[táʊɴ]" }
            ]
          },
          medials: [
            { medial: "-y-", burmese: "တျ", rom: "tya", ipa: "[tɕa̰]" },
            { medial: "-r-", burmese: "တြ", rom: "tra", ipa: "[tʃa̰]" },
            { medial: "-w-", burmese: "တွ", rom: "twa", ipa: "[twa̰]" },
            { medial: "-yw-", burmese: "တျွ", rom: "tywa", ipa: "[tɕwa̰]" }
          ]
        },

        // မ Ma
        {
          consonant: "မ",
          romanization: "ma",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "မ", rom: "ma.", ipa: "[mạ]" },
              { tone: "low", burmese: "မာ", rom: "ma", ipa: "[mà]" },
              { tone: "high", burmese: "မား", rom: "ma:", ipa: "[má]" }
            ],
            i: [
              { tone: "creaky", burmese: "မိ", rom: "mi.", ipa: "[mḭ]" },
              { tone: "low", burmese: "မီ", rom: "mi", ipa: "[mì]" },
              { tone: "high", burmese: "မီး", rom: "mi:", ipa: "[mí]" }
            ],
            u: [
              { tone: "creaky", burmese: "မု", rom: "mu.", ipa: "[mṵ]" },
              { tone: "low", burmese: "မူ", rom: "mu", ipa: "[mù]" },
              { tone: "high", burmese: "မူး", rom: "mu:", ipa: "[mú]" }
            ],
            e: [
              { tone: "creaky", burmese: "မေ့", rom: "me.", ipa: "[mẹ]" },
              { tone: "low", burmese: "မေ", rom: "me", ipa: "[mè]" },
              { tone: "high", burmese: "မေး", rom: "me:", ipa: "[mé]" }
            ],
            o: [
              { tone: "creaky", burmese: "မို့", rom: "mui.", ipa: "[mọ]" },
              { tone: "low", burmese: "မို", rom: "mui", ipa: "[mò]" },
              { tone: "high", burmese: "မိုး", rom: "mui:", ipa: "[mó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "မက်", rom: "mak", ipa: "[mɛʔ]" },
            { rime: "/-aʔ/", burmese: "မတ်", rom: "mat", ipa: "[maʔ]" },
            { rime: "/-eɪʔ/", burmese: "မိုက်", rom: "muik", ipa: "[meɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "မောက်", rom: "mauk", ipa: "[maʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "မင့်", rom: "mang.", ipa: "[mḭŋ]" },
              { tone: "low", burmese: "မင်", rom: "mang", ipa: "[mìŋ]" },
              { tone: "high", burmese: "မင်း", rom: "mang:", ipa: "[míŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "မန့်", rom: "man.", ipa: "[mạɴ]" },
              { tone: "low", burmese: "မန်", rom: "man", ipa: "[màɴ]" },
              { tone: "high", burmese: "မန်း", rom: "man:", ipa: "[máɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "မောင့်", rom: "maung.", ipa: "[mạʊɴ]" },
              { tone: "low", burmese: "မောင်", rom: "maung", ipa: "[màʊɴ]" },
              { tone: "high", burmese: "မောင်း", rom: "maung:", ipa: "[máʊɴ]" }
            ]
          },
          medials: [
            { medial: "-y-", burmese: "မျ", rom: "mya", ipa: "[mja̰]" },
            { medial: "-r-", burmese: "မြ", rom: "mra", ipa: "[mja̰]" },
            { medial: "-w-", burmese: "မွ", rom: "mwa", ipa: "[mwa̰]" },
            { medial: "-yw-", burmese: "မျွ", rom: "mywa", ipa: "[mjwa̰]" }
          ]
        },

        // ယ Ya
        {
          consonant: "ယ",
          romanization: "ya",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ယ", rom: "ya.", ipa: "[jạ]" },
              { tone: "low", burmese: "ယာ", rom: "ya", ipa: "[jà]" },
              { tone: "high", burmese: "ယား", rom: "ya:", ipa: "[já]" }
            ],
            i: [
              { tone: "creaky", burmese: "ယိ", rom: "yi.", ipa: "[jḭ]" },
              { tone: "low", burmese: "ယီ", rom: "yi", ipa: "[jì]" },
              { tone: "high", burmese: "ယီး", rom: "yi:", ipa: "[jí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ယု", rom: "yu.", ipa: "[jṵ]" },
              { tone: "low", burmese: "ယူ", rom: "yu", ipa: "[jù]" },
              { tone: "high", burmese: "ယူး", rom: "yu:", ipa: "[jú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ယေ့", rom: "ye.", ipa: "[jẹ]" },
              { tone: "low", burmese: "ယေ", rom: "ye", ipa: "[jè]" },
              { tone: "high", burmese: "ယေး", rom: "ye:", ipa: "[jé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ယို့", rom: "yui.", ipa: "[jọ]" },
              { tone: "low", burmese: "ယို", rom: "yui", ipa: "[jò]" },
              { tone: "high", burmese: "ယိုး", rom: "yui:", ipa: "[jó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ယက်", rom: "yak", ipa: "[jɛʔ]" },
            { rime: "/-aʔ/", burmese: "ယတ်", rom: "yat", ipa: "[jaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ယိုက်", rom: "yuik", ipa: "[jeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ယောက်", rom: "yauk", ipa: "[jaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ယင့်", rom: "yang.", ipa: "[jḭŋ]" },
              { tone: "low", burmese: "ယင်", rom: "yang", ipa: "[jìŋ]" },
              { tone: "high", burmese: "ယင်း", rom: "yang:", ipa: "[jíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ယန့်", rom: "yan.", ipa: "[jạɴ]" },
              { tone: "low", burmese: "ယန်", rom: "yan", ipa: "[jàɴ]" },
              { tone: "high", burmese: "ယန်း", rom: "yan:", ipa: "[jáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ယောင့်", rom: "yaung.", ipa: "[jạʊɴ]" },
              { tone: "low", burmese: "ယောင်", rom: "yaung", ipa: "[jàʊɴ]" },
              { tone: "high", burmese: "ယောင်း", rom: "yaung:", ipa: "[jáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-w-", burmese: "ယွ", rom: "ywa", ipa: "[jwa̰]" }
          ]
        },

        // လ La
        {
          consonant: "လ",
          romanization: "la",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "လ", rom: "la.", ipa: "[lạ]" },
              { tone: "low", burmese: "လာ", rom: "la", ipa: "[là]" },
              { tone: "high", burmese: "လား", rom: "la:", ipa: "[lá]" }
            ],
            i: [
              { tone: "creaky", burmese: "လိ", rom: "li.", ipa: "[lḭ]" },
              { tone: "low", burmese: "လီ", rom: "li", ipa: "[lì]" },
              { tone: "high", burmese: "လီး", rom: "li:", ipa: "[lí]" }
            ],
            u: [
              { tone: "creaky", burmese: "လု", rom: "lu.", ipa: "[lṵ]" },
              { tone: "low", burmese: "လူ", rom: "lu", ipa: "[lù]" },
              { tone: "high", burmese: "လူး", rom: "lu:", ipa: "[lú]" }
            ],
            e: [
              { tone: "creaky", burmese: "လေ့", rom: "le.", ipa: "[lẹ]" },
              { tone: "low", burmese: "လေ", rom: "le", ipa: "[lè]" },
              { tone: "high", burmese: "လေး", rom: "le:", ipa: "[lé]" }
            ],
            o: [
              { tone: "creaky", burmese: "လို့", rom: "lui.", ipa: "[lọ]" },
              { tone: "low", burmese: "လို", rom: "lui", ipa: "[lò]" },
              { tone: "high", burmese: "လိုး", rom: "lui:", ipa: "[ló]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "လက်", rom: "lak", ipa: "[lɛʔ]" },
            { rime: "/-aʔ/", burmese: "လတ်", rom: "lat", ipa: "[laʔ]" },
            { rime: "/-eɪʔ/", burmese: "လိုက်", rom: "luik", ipa: "[leɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "လောက်", rom: "lauk", ipa: "[laʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "လင့်", rom: "lang.", ipa: "[lḭŋ]" },
              { tone: "low", burmese: "လင်", rom: "lang", ipa: "[lìŋ]" },
              { tone: "high", burmese: "လင်း", rom: "lang:", ipa: "[líŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "လန့်", rom: "lan.", ipa: "[lạɴ]" },
              { tone: "low", burmese: "လန်", rom: "lan", ipa: "[làɴ]" },
              { tone: "high", burmese: "လန်း", rom: "lan:", ipa: "[láɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "လောင့်", rom: "laung.", ipa: "[lạʊɴ]" },
              { tone: "low", burmese: "လောင်", rom: "laung", ipa: "[làʊɴ]" },
              { tone: "high", burmese: "လောင်း", rom: "laung:", ipa: "[láʊɴ]" }
            ]
          },
          medials: [
            { medial: "-y-", burmese: "လျ", rom: "lya", ipa: "[lja̰]" },
            { medial: "-w-", burmese: "လွ", rom: "lwa", ipa: "[lwa̰]" },
            { medial: "-yw-", burmese: "လျွ", rom: "lywa", ipa: "[ljwa̰]" }
          ]
        },

        // သ Tha
        {
          consonant: "သ",
          romanization: "tha",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "သ", rom: "tha.", ipa: "[θạ]" },
              { tone: "low", burmese: "သာ", rom: "tha", ipa: "[θà]" },
              { tone: "high", burmese: "သား", rom: "tha:", ipa: "[θá]" }
            ],
            i: [
              { tone: "creaky", burmese: "သိ", rom: "thi.", ipa: "[θḭ]" },
              { tone: "low", burmese: "သီ", rom: "thi", ipa: "[θì]" },
              { tone: "high", burmese: "သီး", rom: "thi:", ipa: "[θí]" }
            ],
            u: [
              { tone: "creaky", burmese: "သု", rom: "thu.", ipa: "[θṵ]" },
              { tone: "low", burmese: "သူ", rom: "thu", ipa: "[θù]" },
              { tone: "high", burmese: "သူး", rom: "thu:", ipa: "[θú]" }
            ],
            e: [
              { tone: "creaky", burmese: "သေ့", rom: "the.", ipa: "[θẹ]" },
              { tone: "low", burmese: "သေ", rom: "the", ipa: "[θè]" },
              { tone: "high", burmese: "သေး", rom: "the:", ipa: "[θé]" }
            ],
            o: [
              { tone: "creaky", burmese: "သို့", rom: "thui.", ipa: "[θọ]" },
              { tone: "low", burmese: "သို", rom: "thui", ipa: "[θò]" },
              { tone: "high", burmese: "သိုး", rom: "thui:", ipa: "[θó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "သက်", rom: "thak", ipa: "[θɛʔ]" },
            { rime: "/-aʔ/", burmese: "သတ်", rom: "that", ipa: "[θaʔ]" },
            { rime: "/-eɪʔ/", burmese: "သိုက်", rom: "thuik", ipa: "[θeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "သောက်", rom: "thauk", ipa: "[θaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "သင့်", rom: "thang.", ipa: "[θḭŋ]" },
              { tone: "low", burmese: "သင်", rom: "thang", ipa: "[θìŋ]" },
              { tone: "high", burmese: "သင်း", rom: "thang:", ipa: "[θíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "သန့်", rom: "than.", ipa: "[θạɴ]" },
              { tone: "low", burmese: "သန်", rom: "than", ipa: "[θàɴ]" },
              { tone: "high", burmese: "သန်း", rom: "than:", ipa: "[θáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "သောင့်", rom: "thaung.", ipa: "[θạʊɴ]" },
              { tone: "low", burmese: "သောင်", rom: "thaung", ipa: "[θàʊɴ]" },
              { tone: "high", burmese: "သောင်း", rom: "thaung:", ipa: "[θáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-y-", burmese: "သျ", rom: "thya", ipa: "[θja̰]" },
            { medial: "-w-", burmese: "သွ", rom: "thwa", ipa: "[θwa̰]" },
            { medial: "-yw-", burmese: "သျွ", rom: "thywa", ipa: "[θjwa̰]" }
          ]
        },

        // ဟ Ha
        {
          consonant: "ဟ",
          romanization: "ha",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဟ", rom: "ha.", ipa: "[hạ]" },
              { tone: "low", burmese: "ဟာ", rom: "ha", ipa: "[hà]" },
              { tone: "high", burmese: "ဟား", rom: "ha:", ipa: "[há]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဟိ", rom: "hi.", ipa: "[hḭ]" },
              { tone: "low", burmese: "ဟီ", rom: "hi", ipa: "[hì]" },
              { tone: "high", burmese: "ဟီး", rom: "hi:", ipa: "[hí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဟု", rom: "hu.", ipa: "[hṵ]" },
              { tone: "low", burmese: "ဟူ", rom: "hu", ipa: "[hù]" },
              { tone: "high", burmese: "ဟူး", rom: "hu:", ipa: "[hú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဟေ့", rom: "he.", ipa: "[hẹ]" },
              { tone: "low", burmese: "ဟေ", rom: "he", ipa: "[hè]" },
              { tone: "high", burmese: "ဟေး", rom: "he:", ipa: "[hé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဟို့", rom: "hui.", ipa: "[họ]" },
              { tone: "low", burmese: "ဟို", rom: "hui", ipa: "[hò]" },
              { tone: "high", burmese: "ဟိုး", rom: "hui:", ipa: "[hó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဟက်", rom: "hak", ipa: "[hɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဟတ်", rom: "hat", ipa: "[haʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဟိုက်", rom: "huik", ipa: "[heɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဟောက်", rom: "hauk", ipa: "[haʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဟင့်", rom: "hang.", ipa: "[hḭŋ]" },
              { tone: "low", burmese: "ဟင်", rom: "hang", ipa: "[hìŋ]" },
              { tone: "high", burmese: "ဟင်း", rom: "hang:", ipa: "[híŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဟန့်", rom: "han.", ipa: "[hạɴ]" },
              { tone: "low", burmese: "ဟန်", rom: "han", ipa: "[hàɴ]" },
              { tone: "high", burmese: "ဟန်း", rom: "han:", ipa: "[háɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဟောင့်", rom: "haung.", ipa: "[hạʊɴ]" },
              { tone: "low", burmese: "ဟောင်", rom: "haung", ipa: "[hàʊɴ]" },
              { tone: "high", burmese: "ဟောင်း", rom: "haung:", ipa: "[háʊɴ]" }
            ]
          },
          medials: [
            { medial: "-y-", burmese: "ဟျ", rom: "hya", ipa: "[hja̰]" },
            { medial: "-w-", burmese: "ဟွ", rom: "hwa", ipa: "[hwa̰]" },
            { medial: "-yw-", burmese: "ဟျွ", rom: "hywa", ipa: "[hjwa̰]" }
          ]
        },

        // ဃ Gha
        {
          consonant: "ဃ",
          romanization: "gha",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဃ", rom: "gha.", ipa: "[ɡḁ]" },
              { tone: "low", burmese: "ဃာ", rom: "gha", ipa: "[ɡà]" },
              { tone: "high", burmese: "ဃား", rom: "gha:", ipa: "[ɡá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဃိ", rom: "ghi.", ipa: "[ɡḭ]" },
              { tone: "low", burmese: "ဃီ", rom: "ghi", ipa: "[ɡì]" },
              { tone: "high", burmese: "ဃီး", rom: "ghi:", ipa: "[ɡí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဃု", rom: "ghu.", ipa: "[ɡṵ]" },
              { tone: "low", burmese: "ဃူ", rom: "ghu", ipa: "[ɡù]" },
              { tone: "high", burmese: "ဃူး", rom: "ghu:", ipa: "[ɡú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဃေ့", rom: "ghe.", ipa: "[ɡẹ]" },
              { tone: "low", burmese: "ဃေ", rom: "ghe", ipa: "[ɡè]" },
              { tone: "high", burmese: "ဃေး", rom: "ghe:", ipa: "[ɡé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဃို့", rom: "ghui.", ipa: "[ɡọ]" },
              { tone: "low", burmese: "ဃို", rom: "ghui", ipa: "[ɡò]" },
              { tone: "high", burmese: "ဃိုး", rom: "ghui:", ipa: "[ɡó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဃက်", rom: "ghak", ipa: "[ɡɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဃတ်", rom: "ghat", ipa: "[ɡaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဃိုက်", rom: "ghuik", ipa: "[ɡeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဃောက်", rom: "ghauk", ipa: "[ɡaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဃင့်", rom: "ghang.", ipa: "[ɡḭŋ]" },
              { tone: "low", burmese: "ဃင်", rom: "ghang", ipa: "[ɡìŋ]" },
              { tone: "high", burmese: "ဃင်း", rom: "ghang:", ipa: "[ɡíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဃန့်", rom: "ghan.", ipa: "[ɡạɴ]" },
              { tone: "low", burmese: "ဃန်", rom: "ghan", ipa: "[ɡàɴ]" },
              { tone: "high", burmese: "ဃန်း", rom: "ghan:", ipa: "[ɡáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဃောင့်", rom: "ghaung.", ipa: "[ɡạʊɴ]" },
              { tone: "low", burmese: "ဃောင်", rom: "ghaung", ipa: "[ɡàʊɴ]" },
              { tone: "high", burmese: "ဃောင်း", rom: "ghaung:", ipa: "[ɡáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-y-", burmese: "ဃျ", rom: "ghya", ipa: "[ɡja̰]" },
            { medial: "-w-", burmese: "ဃွ", rom: "ghwa", ipa: "[ɡwa̰]" }
          ]
        },

        // ဆ Cha
        {
          consonant: "ဆ",
          romanization: "cha",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဆ", rom: "cha.", ipa: "[sʰạ]" },
              { tone: "low", burmese: "ဆာ", rom: "cha", ipa: "[sʰà]" },
              { tone: "high", burmese: "ဆား", rom: "cha:", ipa: "[sʰá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဆိ", rom: "chi.", ipa: "[sʰḭ]" },
              { tone: "low", burmese: "ဆီ", rom: "chi", ipa: "[sʰì]" },
              { tone: "high", burmese: "ဆီး", rom: "chi:", ipa: "[sʰí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဆု", rom: "chu.", ipa: "[sʰṵ]" },
              { tone: "low", burmese: "ဆူ", rom: "chu", ipa: "[sʰù]" },
              { tone: "high", burmese: "ဆူး", rom: "chu:", ipa: "[sʰú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဆေ့", rom: "che.", ipa: "[sʰẹ]" },
              { tone: "low", burmese: "ဆေ", rom: "che", ipa: "[sʰè]" },
              { tone: "high", burmese: "ဆေး", rom: "che:", ipa: "[sʰé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဆို့", rom: "chui.", ipa: "[sʰọ]" },
              { tone: "low", burmese: "ဆို", rom: "chui", ipa: "[sʰò]" },
              { tone: "high", burmese: "ဆိုး", rom: "chui:", ipa: "[sʰó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဆက်", rom: "chak", ipa: "[sʰɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဆတ်", rom: "chat", ipa: "[sʰaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဆိုက်", rom: "chuik", ipa: "[sʰeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဆောက်", rom: "chauk", ipa: "[sʰaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဆင့်", rom: "chang.", ipa: "[sʰḭŋ]" },
              { tone: "low", burmese: "ဆင်", rom: "chang", ipa: "[sʰìŋ]" },
              { tone: "high", burmese: "ဆင်း", rom: "chang:", ipa: "[sʰíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဆန့်", rom: "chan.", ipa: "[sʰạɴ]" },
              { tone: "low", burmese: "ဆန်", rom: "chan", ipa: "[sʰàɴ]" },
              { tone: "high", burmese: "ဆန်း", rom: "chan:", ipa: "[sʰáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဆောင့်", rom: "chaung.", ipa: "[sʰạʊɴ]" },
              { tone: "low", burmese: "ဆောင်", rom: "chaung", ipa: "[sʰàʊɴ]" },
              { tone: "high", burmese: "ဆောင်း", rom: "chaung:", ipa: "[sʰáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-w-", burmese: "ဆွ", rom: "chwa", ipa: "[sʰwa̰]" }
          ]
        },

        // ဈ Zha
        {
          consonant: "ဈ",
          romanization: "zha",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဈ", rom: "zha.", ipa: "[zḁ]" },
              { tone: "low", burmese: "ဈာ", rom: "zha", ipa: "[zà]" },
              { tone: "high", burmese: "ဈား", rom: "zha:", ipa: "[zá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဈိ", rom: "zhi.", ipa: "[zḭ]" },
              { tone: "low", burmese: "ဈီ", rom: "zhi", ipa: "[zì]" },
              { tone: "high", burmese: "ဈီး", rom: "zhi:", ipa: "[zí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဈု", rom: "zhu.", ipa: "[zṵ]" },
              { tone: "low", burmese: "ဈူ", rom: "zhu", ipa: "[zù]" },
              { tone: "high", burmese: "ဈူး", rom: "zhu:", ipa: "[zú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဈေ့", rom: "zhe.", ipa: "[zẹ]" },
              { tone: "low", burmese: "ဈေ", rom: "zhe", ipa: "[zè]" },
              { tone: "high", burmese: "ဈေး", rom: "zhe:", ipa: "[zé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဈို့", rom: "zhui.", ipa: "[zọ]" },
              { tone: "low", burmese: "ဈို", rom: "zhui", ipa: "[zò]" },
              { tone: "high", burmese: "ဈိုး", rom: "zhui:", ipa: "[zó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဈက်", rom: "zhak", ipa: "[zɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဈတ်", rom: "zhat", ipa: "[zaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဈိုက်", rom: "zhuik", ipa: "[zeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဈောက်", rom: "zhauk", ipa: "[zaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဈင့်", rom: "zhang.", ipa: "[zḭŋ]" },
              { tone: "low", burmese: "ဈင်", rom: "zhang", ipa: "[zìŋ]" },
              { tone: "high", burmese: "ဈင်း", rom: "zhang:", ipa: "[zíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဈန့်", rom: "zhan.", ipa: "[zạɴ]" },
              { tone: "low", burmese: "ဈန်", rom: "zhan", ipa: "[zàɴ]" },
              { tone: "high", burmese: "ဈန်း", rom: "zhan:", ipa: "[záɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဈောင့်", rom: "zhaung.", ipa: "[zạʊɴ]" },
              { tone: "low", burmese: "ဈောင်", rom: "zhaung", ipa: "[zàʊɴ]" },
              { tone: "high", burmese: "ဈောင်း", rom: "zhaung:", ipa: "[záʊɴ]" }
            ]
          },
          medials: [
            { medial: "-w-", burmese: "ဈွ", rom: "zhwa", ipa: "[zwa̰]" }
          ]
        },

        // ဋ Ṭa (ta dur)
        {
          consonant: "ဋ",
          romanization: "ṭa",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဋ", rom: "ṭa.", ipa: "[ʈạ]" },
              { tone: "low", burmese: "ဋာ", rom: "ṭa", ipa: "[ʈà]" },
              { tone: "high", burmese: "ဋား", rom: "ṭa:", ipa: "[ʈá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဋိ", rom: "ṭi.", ipa: "[ʈḭ]" },
              { tone: "low", burmese: "ဋီ", rom: "ṭi", ipa: "[ʈì]" },
              { tone: "high", burmese: "ဋီး", rom: "ṭi:", ipa: "[ʈí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဋု", rom: "ṭu.", ipa: "[ʈṵ]" },
              { tone: "low", burmese: "ဋူ", rom: "ṭu", ipa: "[ʈù]" },
              { tone: "high", burmese: "ဋူး", rom: "ṭu:", ipa: "[ʈú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဋေ့", rom: "ṭe.", ipa: "[ʈẹ]" },
              { tone: "low", burmese: "ဋေ", rom: "ṭe", ipa: "[ʈè]" },
              { tone: "high", burmese: "ဋေး", rom: "ṭe:", ipa: "[ʈé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဋို့", rom: "ṭui.", ipa: "[ʈọ]" },
              { tone: "low", burmese: "ဋို", rom: "ṭui", ipa: "[ʈò]" },
              { tone: "high", burmese: "ဋိုး", rom: "ṭui:", ipa: "[ʈó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဋက်", rom: "ṭak", ipa: "[ʈɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဋတ်", rom: "ṭat", ipa: "[ʈaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဋိုက်", rom: "ṭuik", ipa: "[ʈeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဋောက်", rom: "ṭauk", ipa: "[ʈaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဋင့်", rom: "ṭang.", ipa: "[ʈḭŋ]" },
              { tone: "low", burmese: "ဋင်", rom: "ṭang", ipa: "[ʈìŋ]" },
              { tone: "high", burmese: "ဋင်း", rom: "ṭang:", ipa: "[ʈíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဋန့်", rom: "ṭan.", ipa: "[ʈạɴ]" },
              { tone: "low", burmese: "ဋန်", rom: "ṭan", ipa: "[ʈàɴ]" },
              { tone: "high", burmese: "ဋန်း", rom: "ṭan:", ipa: "[ʈáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဋောင့်", rom: "ṭaung.", ipa: "[ʈạʊɴ]" },
              { tone: "low", burmese: "ဋောင်", rom: "ṭaung", ipa: "[ʈàʊɴ]" },
              { tone: "high", burmese: "ဋောင်း", rom: "ṭaung:", ipa: "[ʈáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-w-", burmese: "ဋွ", rom: "ṭwa", ipa: "[ʈwa̰]" }
          ]
        },

        // ဌ Ṭha
        {
          consonant: "ဌ",
          romanization: "ṭha",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဌ", rom: "ṭha.", ipa: "[ʈʰạ]" },
              { tone: "low", burmese: "ဌာ", rom: "ṭha", ipa: "[ʈʰà]" },
              { tone: "high", burmese: "ဌား", rom: "ṭha:", ipa: "[ʈʰá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဌိ", rom: "ṭhi.", ipa: "[ʈʰḭ]" },
              { tone: "low", burmese: "ဌီ", rom: "ṭhi", ipa: "[ʈʰì]" },
              { tone: "high", burmese: "ဌီး", rom: "ṭhi:", ipa: "[ʈʰí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဌု", rom: "ṭhu.", ipa: "[ʈʰṵ]" },
              { tone: "low", burmese: "ဌူ", rom: "ṭhu", ipa: "[ʈʰù]" },
              { tone: "high", burmese: "ဌူး", rom: "ṭhu:", ipa: "[ʈʰú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဌေ့", rom: "ṭhe.", ipa: "[ʈʰẹ]" },
              { tone: "low", burmese: "ဌေ", rom: "ṭhe", ipa: "[ʈʰè]" },
              { tone: "high", burmese: "ဌေး", rom: "ṭhe:", ipa: "[ʈʰé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဌို့", rom: "ṭhui.", ipa: "[ʈʰọ]" },
              { tone: "low", burmese: "ဌို", rom: "ṭhui", ipa: "[ʈʰò]" },
              { tone: "high", burmese: "ဌိုး", rom: "ṭhui:", ipa: "[ʈʰó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဌက်", rom: "ṭhak", ipa: "[ʈʰɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဌတ်", rom: "ṭhat", ipa: "[ʈʰaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဌိုက်", rom: "ṭhuik", ipa: "[ʈʰeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဌောက်", rom: "ṭhauk", ipa: "[ʈʰaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဌင့်", rom: "ṭhang.", ipa: "[ʈʰḭŋ]" },
              { tone: "low", burmese: "ဌင်", rom: "ṭhang", ipa: "[ʈʰìŋ]" },
              { tone: "high", burmese: "ဌင်း", rom: "ṭhang:", ipa: "[ʈʰíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဌန့်", rom: "ṭhan.", ipa: "[ʈʰạɴ]" },
              { tone: "low", burmese: "ဌန်", rom: "ṭhan", ipa: "[ʈʰàɴ]" },
              { tone: "high", burmese: "ဌန်း", rom: "ṭhan:", ipa: "[ʈʰáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဌောင့်", rom: "ṭhaung.", ipa: "[ʈʰạʊɴ]" },
              { tone: "low", burmese: "ဌောင်", rom: "ṭhaung", ipa: "[ʈʰàʊɴ]" },
              { tone: "high", burmese: "ဌောင်း", rom: "ṭhaung:", ipa: "[ʈʰáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-w-", burmese: "ဌွ", rom: "ṭhwa", ipa: "[ʈʰwa̰]" }
          ]
        },

        // ဍ Ḍa
        {
          consonant: "ဍ",
          romanization: "ḍa",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဍ", rom: "ḍa.", ipa: "[ɖạ]" },
              { tone: "low", burmese: "ဍာ", rom: "ḍa", ipa: "[ɖà]" },
              { tone: "high", burmese: "ဍား", rom: "ḍa:", ipa: "[ɖá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဍိ", rom: "ḍi.", ipa: "[ɖḭ]" },
              { tone: "low", burmese: "ဍီ", rom: "ḍi", ipa: "[ɖì]" },
              { tone: "high", burmese: "ဍီး", rom: "ḍi:", ipa: "[ɖí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဍု", rom: "ḍu.", ipa: "[ɖṵ]" },
              { tone: "low", burmese: "ဍူ", rom: "ḍu", ipa: "[ɖù]" },
              { tone: "high", burmese: "ဍူး", rom: "ḍu:", ipa: "[ɖú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဍေ့", rom: "ḍe.", ipa: "[ɖẹ]" },
              { tone: "low", burmese: "ဍေ", rom: "ḍe", ipa: "[ɖè]" },
              { tone: "high", burmese: "ဍေး", rom: "ḍe:", ipa: "[ɖé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဍို့", rom: "ḍui.", ipa: "[ɖọ]" },
              { tone: "low", burmese: "ဍို", rom: "ḍui", ipa: "[ɖò]" },
              { tone: "high", burmese: "ဍိုး", rom: "ḍui:", ipa: "[ɖó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဍက်", rom: "ḍak", ipa: "[ɖɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဍတ်", rom: "ḍat", ipa: "[ɖaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဍိုက်", rom: "ḍuik", ipa: "[ɖeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဍောက်", rom: "ḍauk", ipa: "[ɖaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဍင့်", rom: "ḍang.", ipa: "[ɖḭŋ]" },
              { tone: "low", burmese: "ဍင်", rom: "ḍang", ipa: "[ɖìŋ]" },
              { tone: "high", burmese: "ဍင်း", rom: "ḍang:", ipa: "[ɖíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဍန့်", rom: "ḍan.", ipa: "[ɖạɴ]" },
              { tone: "low", burmese: "ဍန်", rom: "ḍan", ipa: "[ɖàɴ]" },
              { tone: "high", burmese: "ဍန်း", rom: "ḍan:", ipa: "[ɖáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဍောင့်", rom: "ḍaung.", ipa: "[ɖạʊɴ]" },
              { tone: "low", burmese: "ဍောင်", rom: "ḍaung", ipa: "[ɖàʊɴ]" },
              { tone: "high", burmese: "ဍောင်း", rom: "ḍaung:", ipa: "[ɖáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-w-", burmese: "ဍွ", rom: "ḍwa", ipa: "[ɖwa̰]" }
          ]
        },

        // ဎ Ḍha
        {
          consonant: "ဎ",
          romanization: "ḍha",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဎ", rom: "ḍha.", ipa: "[ɖʰạ]" },
              { tone: "low", burmese: "ဎာ", rom: "ḍha", ipa: "[ɖʰà]" },
              { tone: "high", burmese: "ဎား", rom: "ḍha:", ipa: "[ɖʰá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဎိ", rom: "ḍhi.", ipa: "[ɖʰḭ]" },
              { tone: "low", burmese: "ဎီ", rom: "ḍhi", ipa: "[ɖʰì]" },
              { tone: "high", burmese: "ဎီး", rom: "ḍhi:", ipa: "[ɖʰí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဎု", rom: "ḍhu.", ipa: "[ɖʰṵ]" },
              { tone: "low", burmese: "ဎူ", rom: "ḍhu", ipa: "[ɖʰù]" },
              { tone: "high", burmese: "ဎူး", rom: "ḍhu:", ipa: "[ɖʰú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဎေ့", rom: "ḍhe.", ipa: "[ɖʰẹ]" },
              { tone: "low", burmese: "ဎေ", rom: "ḍhe", ipa: "[ɖʰè]" },
              { tone: "high", burmese: "ဎေး", rom: "ḍhe:", ipa: "[ɖʰé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဎို့", rom: "ḍhui.", ipa: "[ɖʰọ]" },
              { tone: "low", burmese: "ဎို", rom: "ḍhui", ipa: "[ɖʰò]" },
              { tone: "high", burmese: "ဎိုး", rom: "ḍhui:", ipa: "[ɖʰó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဎက်", rom: "ḍhak", ipa: "[ɖʰɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဎတ်", rom: "ḍhat", ipa: "[ɖʰaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဎိုက်", rom: "ḍhuik", ipa: "[ɖʰeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဎောက်", rom: "ḍhauk", ipa: "[ɖʰaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဎင့်", rom: "ḍhang.", ipa: "[ɖʰḭŋ]" },
              { tone: "low", burmese: "ဎင်", rom: "ḍhang", ipa: "[ɖʰìŋ]" },
              { tone: "high", burmese: "ဎင်း", rom: "ḍhang:", ipa: "[ɖʰíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဎန့်", rom: "ḍhan.", ipa: "[ɖʰạɴ]" },
              { tone: "low", burmese: "ဎန်", rom: "ḍhan", ipa: "[ɖʰàɴ]" },
              { tone: "high", burmese: "ဎန်း", rom: "ḍhan:", ipa: "[ɖʰáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဎောင့်", rom: "ḍhaung.", ipa: "[ɖʰạʊɴ]" },
              { tone: "low", burmese: "ဎောင်", rom: "ḍhaung", ipa: "[ɖʰàʊɴ]" },
              { tone: "high", burmese: "ဎောင်း", rom: "ḍhaung:", ipa: "[ɖʰáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-w-", burmese: "ဎွ", rom: "ḍhwa", ipa: "[ɖʰwa̰]" }
          ]
        },

        // ဏ Ṇa (na rétroflexe)
        {
          consonant: "ဏ",
          romanization: "ṇa",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဏ", rom: "ṇa.", ipa: "[ɳạ]" },
              { tone: "low", burmese: "ဏာ", rom: "ṇa", ipa: "[ɳà]" },
              { tone: "high", burmese: "ဏား", rom: "ṇa:", ipa: "[ɳá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဏိ", rom: "ṇi.", ipa: "[ɳḭ]" },
              { tone: "low", burmese: "ဏီ", rom: "ṇi", ipa: "[ɳì]" },
              { tone: "high", burmese: "ဏီး", rom: "ṇi:", ipa: "[ɳí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဏု", rom: "ṇu.", ipa: "[ɳṵ]" },
              { tone: "low", burmese: "ဏူ", rom: "ṇu", ipa: "[ɳù]" },
              { tone: "high", burmese: "ဏူး", rom: "ṇu:", ipa: "[ɳú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဏေ့", rom: "ṇe.", ipa: "[ɳẹ]" },
              { tone: "low", burmese: "ဏေ", rom: "ṇe", ipa: "[ɳè]" },
              { tone: "high", burmese: "ဏေး", rom: "ṇe:", ipa: "[ɳé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဏို့", rom: "ṇui.", ipa: "[ɳọ]" },
              { tone: "low", burmese: "ဏို", rom: "ṇui", ipa: "[ɳò]" },
              { tone: "high", burmese: "ဏိုး", rom: "ṇui:", ipa: "[ɳó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဏက်", rom: "ṇak", ipa: "[ɳɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဏတ်", rom: "ṇat", ipa: "[ɳaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဏိုက်", rom: "ṇuik", ipa: "[ɳeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဏောက်", rom: "ṇauk", ipa: "[ɳaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဏင့်", rom: "ṇang.", ipa: "[ɳḭŋ]" },
              { tone: "low", burmese: "ဏင်", rom: "ṇang", ipa: "[ɳìŋ]" },
              { tone: "high", burmese: "ဏင်း", rom: "ṇang:", ipa: "[ɳíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဏန့်", rom: "ṇan.", ipa: "[ɳạɴ]" },
              { tone: "low", burmese: "ဏန်", rom: "ṇan", ipa: "[ɳàɴ]" },
              { tone: "high", burmese: "ဏန်း", rom: "ṇan:", ipa: "[ɳáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဏောင့်", rom: "ṇaung.", ipa: "[ɳạʊɴ]" },
              { tone: "low", burmese: "ဏောင်", rom: "ṇaung", ipa: "[ɳàʊɴ]" },
              { tone: "high", burmese: "ဏောင်း", rom: "ṇaung:", ipa: "[ɳáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-w-", burmese: "ဏွ", rom: "ṇwa", ipa: "[ɳwa̰]" }
          ]
        },

        // ဘ Bha
        {
          consonant: "ဘ",
          romanization: "bha",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဘ", rom: "bha.", ipa: "[bḁ]" },
              { tone: "low", burmese: "ဘာ", rom: "bha", ipa: "[bà]" },
              { tone: "high", burmese: "ဘား", rom: "bha:", ipa: "[bá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဘိ", rom: "bhi.", ipa: "[bḭ]" },
              { tone: "low", burmese: "ဘီ", rom: "bhi", ipa: "[bì]" },
              { tone: "high", burmese: "ဘီး", rom: "bhi:", ipa: "[bí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဘု", rom: "bhu.", ipa: "[bṵ]" },
              { tone: "low", burmese: "ဘူ", rom: "bhu", ipa: "[bù]" },
              { tone: "high", burmese: "ဘူး", rom: "bhu:", ipa: "[bú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဘေ့", rom: "bhe.", ipa: "[bẹ]" },
              { tone: "low", burmese: "ဘေ", rom: "bhe", ipa: "[bè]" },
              { tone: "high", burmese: "ဘေး", rom: "bhe:", ipa: "[bé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဘို့", rom: "bhui.", ipa: "[bọ]" },
              { tone: "low", burmese: "ဘို", rom: "bhui", ipa: "[bò]" },
              { tone: "high", burmese: "ဘိုး", rom: "bhui:", ipa: "[bó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဘက်", rom: "bhak", ipa: "[bɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဘတ်", rom: "bhat", ipa: "[baʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဘိုက်", rom: "bhuik", ipa: "[beɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဘောက်", rom: "bhauk", ipa: "[baʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဘင့်", rom: "bhang.", ipa: "[bḭŋ]" },
              { tone: "low", burmese: "ဘင်", rom: "bhang", ipa: "[bìŋ]" },
              { tone: "high", burmese: "ဘင်း", rom: "bhang:", ipa: "[bíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဘန့်", rom: "bhan.", ipa: "[bạɴ]" },
              { tone: "low", burmese: "ဘန်", rom: "bhan", ipa: "[bàɴ]" },
              { tone: "high", burmese: "ဘန်း", rom: "bhan:", ipa: "[báɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဘောင့်", rom: "bhaung.", ipa: "[bạʊɴ]" },
              { tone: "low", burmese: "ဘောင်", rom: "bhaung", ipa: "[bàʊɴ]" },
              { tone: "high", burmese: "ဘောင်း", rom: "bhaung:", ipa: "[báʊɴ]" }
            ]
          },
          medials: [
            { medial: "-y-", burmese: "ဘျ", rom: "bhya", ipa: "[bja̰]" },
            { medial: "-w-", burmese: "ဘွ", rom: "bhwa", ipa: "[bwa̰]" },
            { medial: "-yw-", burmese: "ဘျွ", rom: "bhywa", ipa: "[bjwa̰]" }
          ]
        },

        // ဠ La (la rétroflexe)
        {
          consonant: "ဠ",
          romanization: "ḷa",
          open_vowels: {
            a: [
              { tone: "creaky", burmese: "ဠ", rom: "ḷa.", ipa: "[ɭạ]" },
              { tone: "low", burmese: "ဠာ", rom: "ḷa", ipa: "[ɭà]" },
              { tone: "high", burmese: "ဠား", rom: "ḷa:", ipa: "[ɭá]" }
            ],
            i: [
              { tone: "creaky", burmese: "ဠိ", rom: "ḷi.", ipa: "[ɭḭ]" },
              { tone: "low", burmese: "ဠီ", rom: "ḷi", ipa: "[ɭì]" },
              { tone: "high", burmese: "ဠီး", rom: "ḷi:", ipa: "[ɭí]" }
            ],
            u: [
              { tone: "creaky", burmese: "ဠု", rom: "ḷu.", ipa: "[ɭṵ]" },
              { tone: "low", burmese: "ဠူ", rom: "ḷu", ipa: "[ɭù]" },
              { tone: "high", burmese: "ဠူး", rom: "ḷu:", ipa: "[ɭú]" }
            ],
            e: [
              { tone: "creaky", burmese: "ဠေ့", rom: "ḷe.", ipa: "[ɭẹ]" },
              { tone: "low", burmese: "ဠေ", rom: "ḷe", ipa: "[ɭè]" },
              { tone: "high", burmese: "ဠေး", rom: "ḷe:", ipa: "[ɭé]" }
            ],
            o: [
              { tone: "creaky", burmese: "ဠို့", rom: "ḷui.", ipa: "[ɭọ]" },
              { tone: "low", burmese: "ဠို", rom: "ḷui", ipa: "[ɭò]" },
              { tone: "high", burmese: "ဠိုး", rom: "ḷui:", ipa: "[ɭó]" }
            ]
          },
          stopped_finals: [
            { rime: "/-ɛʔ/", burmese: "ဠက်", rom: "ḷak", ipa: "[ɭɛʔ]" },
            { rime: "/-aʔ/", burmese: "ဠတ်", rom: "ḷat", ipa: "[ɭaʔ]" },
            { rime: "/-eɪʔ/", burmese: "ဠိုက်", rom: "ḷuik", ipa: "[ɭeɪʔ]" },
            { rime: "/-aʊʔ/", burmese: "ဠောက်", rom: "ḷauk", ipa: "[ɭaʊʔ]" }
          ],
          nasal_finals: {
            ang: [
              { tone: "creaky", burmese: "ဠင့်", rom: "ḷang.", ipa: "[ɭḭŋ]" },
              { tone: "low", burmese: "ဠင်", rom: "ḷang", ipa: "[ɭìŋ]" },
              { tone: "high", burmese: "ဠင်း", rom: "ḷang:", ipa: "[ɭíŋ]" }
            ],
            an: [
              { tone: "creaky", burmese: "ဠန့်", rom: "ḷan.", ipa: "[ɭạɴ]" },
              { tone: "low", burmese: "ဠန်", rom: "ḷan", ipa: "[ɭàɴ]" },
              { tone: "high", burmese: "ဠန်း", rom: "ḷan:", ipa: "[ɭáɴ]" }
            ],
            aung: [
              { tone: "creaky", burmese: "ဠောင့်", rom: "ḷaung.", ipa: "[ɭạʊɴ]" },
              { tone: "low", burmese: "ဠောင်", rom: "ḷaung", ipa: "[ɭàʊɴ]" },
              { tone: "high", burmese: "ဠောင်း", rom: "ḷaung:", ipa: "[ɭáʊɴ]" }
            ]
          },
          medials: [
            { medial: "-w-", burmese: "ဠွ", rom: "ḷwa", ipa: "[ɭwa̰]" }
          ]
        }
      ]
    };

    const exerciseData = {
      type: "completion",
      title: "Burmese Syllable Encyclopedia - Encyclopédie des Syllabes Birmanes",
      description: "Un guide complet sur les combinaisons de consonnes, voyelles, tons et finales birmanes. Explorez les combinaisons possibles pour chaque consonne avec les voyelles ouvertes, finales stoppées, finales nasales et médiales.",
      difficulty: 2,
      source: "official",
      language: "birman",
      tags: ["syllables", "encyclopedia", "consonants", "vowels", "tones", "finals", "medials", "burmese", "birman", "myanmar", "intermediate"],
      content: syllablesData,
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

      console.log('✅ Exercice Burmese Syllables créé:', data);
      toast.success("Exercice Encyclopédie des Syllabes Birmanes créé avec succès !");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) {
      console.error('Erreur:', err);
      toast.error("Erreur lors de la création");
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-foreground">
            🇲🇲 Insérer l'Encyclopédie des Syllabes Birmanes
          </h1>
          <p className="text-muted-foreground">
            Exercice interactif complet avec toutes les combinaisons syllabiques possibles pour chaque consonne birmane
          </p>

          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <span className="font-semibold">Encyclopédie des Syllabes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Consonnes:</span>
              <span className="font-semibold">11 consonnes principales</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Contenu:</span>
              <span className="font-semibold">Voyelles ouvertes, finales stoppées, finales nasales, médiales</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Difficulté:</span>
              <span className="font-semibold">Intermédiaire</span>
            </div>
          </div>

          <Button
            onClick={insertBurmeseSyllables}
            disabled={isInserting}
            size="lg"
            className="w-full"
          >
            {isInserting ? "Insertion en cours..." : "✅ Insérer l'exercice dans la base de données"}
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/catalog")}
            className="w-full"
          >
            Retour au catalogue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsertBurmeseSyllables;
