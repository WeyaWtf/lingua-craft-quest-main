import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useTopics } from "@/contexts/TopicContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TopicCreator = () => {
  const navigate = useNavigate();
  const { addTopic } = useTopics();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("📚");
  const [color, setColor] = useState("from-indigo-500 to-purple-500");
  const [language, setLanguage] = useState("japanese");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!title || !description) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const tagArray = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);

    // Use default content if empty
    const finalContent = content.trim() || `# ${title}\n\n${description}`;

    addTopic({
      title,
      description,
      content: finalContent,
      icon,
      color,
      language,
      pathIds: [],
      exerciseIds: [],
      tags: tagArray,
      authorId: "current-user",
      isPublished: true
    });

    toast.success("Topic créé avec succès ! ⚠️ Note: Les topics sont stockés en mémoire et seront perdus au rafraîchissement de la page.");
    navigate("/catalog");
  };

  const colorOptions = [
    { label: "Indigo", value: "from-indigo-500 to-purple-500" },
    { label: "Bleu", value: "from-blue-500 to-cyan-500" },
    { label: "Violet", value: "from-purple-500 to-pink-500" },
    { label: "Vert", value: "from-green-500 to-emerald-500" },
    { label: "Orange", value: "from-orange-500 to-amber-500" },
    { label: "Rose", value: "from-pink-500 to-rose-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate("/creator")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Créer un Topic</h1>
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Configuration du Topic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre du topic *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Japonais pour Débutants"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Décrivez le contenu et les objectifs de ce topic..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="language">Langue *</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birman">🇲🇲 Birman</SelectItem>
                      <SelectItem value="thai">🇹🇭 Thaï</SelectItem>
                      <SelectItem value="korean">🇰🇷 Coréen</SelectItem>
                      <SelectItem value="japanese">🇯🇵 Japonais</SelectItem>
                      <SelectItem value="vietnamese">🇻🇳 Vietnamien</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="content">Contenu (Markdown) *</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="# Titre du Topic&#10;&#10;## Section 1&#10;&#10;Votre contenu en Markdown...&#10;&#10;- Liste d'items&#10;- **Gras** et *italique*&#10;&#10;## Section 2&#10;&#10;Plus de contenu..."
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Utilisez la syntaxe Markdown : # pour les titres, ** pour le gras, * pour l'italique, - pour les listes
                  </p>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="débutant, hiragana, katakana, grammaire"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="icon">Icône (emoji)</Label>
                    <Input
                      id="icon"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder="📚"
                      maxLength={2}
                      className="text-2xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="color">Couleur du thème</Label>
                    <select
                      id="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    >
                      {colorOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <Label>Aperçu</Label>
                  <div className={`w-full h-48 bg-gradient-to-br ${color} rounded-xl flex flex-col items-center justify-center text-white mt-2 p-6`}>
                    <div className="text-8xl mb-4">{icon}</div>
                    <h3 className="text-2xl font-bold">{title || "Titre du topic"}</h3>
                    <p className="text-sm mt-2 text-center opacity-90">
                      {description || "Description du topic..."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-3">💡 À propos des Topics</h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>
                    <strong>Un Topic</strong> est une collection thématique qui regroupe plusieurs parcours et exercices autour d'un sujet commun.
                  </p>
                  <p>
                    <strong>Exemple :</strong> Le topic "Japonais pour Débutants" pourrait contenir :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Parcours "Hiragana Complet"</li>
                    <li>Parcours "Katakana Complet"</li>
                    <li>Parcours "Grammaire de base"</li>
                    <li>Exercices individuels de vocabulaire</li>
                  </ul>
                  <p className="mt-3">
                    <Badge className="bg-blue-600">Astuce</Badge> Après avoir créé le topic, vous pourrez y ajouter des parcours et exercices existants.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future sections */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-dashed opacity-60">
              <CardHeader>
                <CardTitle className="text-sm">Parcours associés</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground text-center py-4">
                  Disponible après la création du topic
                </p>
              </CardContent>
            </Card>

            <Card className="border-dashed opacity-60">
              <CardHeader>
                <CardTitle className="text-sm">Exercices associés</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground text-center py-4">
                  Disponible après la création du topic
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCreator;
