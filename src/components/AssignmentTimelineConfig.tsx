import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Calendar, TrendingUp, Award, Clock, Target, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

type RepetitionPhase = {
  id: string;
  name: string;
  durationDays: number;
  frequency: 'daily' | 'every_2_days' | 'every_3_days' | 'every_4_days' | 'every_5_days' | 'every_6_days' | 'weekly' | 'biweekly' | 'monthly';
  customDays?: number;
  requiredAccuracy: number;
  repetitionsPerOccurrence: number;
  xpReward?: number;
  coinsReward?: number;
};

type AssignmentConfig = {
  enabled: boolean;
  mode: 'simple' | 'timeline';
  frequency?: 'daily' | 'every_2_days' | 'every_3_days' | 'weekly';
  requiredAccuracy?: number;
  repetitionsRequired?: number;
  phases?: RepetitionPhase[];
  startDate?: string;
  autoAdjust?: boolean;
};

interface AssignmentTimelineConfigProps {
  config: AssignmentConfig;
  onChange: (config: AssignmentConfig) => void;
}

export const AssignmentTimelineConfig = ({ config, onChange }: AssignmentTimelineConfigProps) => {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());

  const togglePhase = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  const addPhase = () => {
    const phases = config.phases || [];
    const newPhase: RepetitionPhase = {
      id: `phase-${Date.now()}`,
      name: `Phase ${phases.length + 1}`,
      durationDays: 7,
      frequency: 'daily',
      requiredAccuracy: 80,
      repetitionsPerOccurrence: 1,
      xpReward: 10,
      coinsReward: 5
    };

    onChange({
      ...config,
      phases: [...phases, newPhase]
    });

    // Expand new phase
    setExpandedPhases(new Set([...expandedPhases, newPhase.id]));
    toast.success('Phase ajoutée');
  };

  const removePhase = (phaseId: string) => {
    const phases = (config.phases || []).filter(p => p.id !== phaseId);
    onChange({
      ...config,
      phases
    });
    toast.success('Phase supprimée');
  };

  const updatePhase = (phaseId: string, updates: Partial<RepetitionPhase>) => {
    const phases = (config.phases || []).map(p =>
      p.id === phaseId ? { ...p, ...updates } : p
    );
    onChange({
      ...config,
      phases
    });
  };

  const movePhase = (index: number, direction: 'up' | 'down') => {
    const phases = [...(config.phases || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= phases.length) return;

    [phases[index], phases[newIndex]] = [phases[newIndex], phases[index]];

    onChange({
      ...config,
      phases
    });
  };

  const getFrequencyLabel = (frequency: string) => {
    const labels: Record<string, string> = {
      daily: 'Quotidien',
      every_2_days: 'Tous les 2 jours',
      every_3_days: 'Tous les 3 jours',
      every_4_days: 'Tous les 4 jours',
      every_5_days: 'Tous les 5 jours',
      every_6_days: 'Tous les 6 jours',
      weekly: 'Hebdomadaire',
      biweekly: 'Toutes les 2 semaines',
      monthly: 'Mensuel'
    };
    return labels[frequency] || frequency;
  };

  const calculateTotalDuration = () => {
    return (config.phases || []).reduce((sum, phase) => sum + phase.durationDays, 0);
  };

  const calculateTotalOccurrences = () => {
    return (config.phases || []).reduce((sum, phase) => {
      const frequencyDays: Record<string, number> = {
        daily: 1,
        every_2_days: 2,
        every_3_days: 3,
        every_4_days: 4,
        every_5_days: 5,
        every_6_days: 6,
        weekly: 7,
        biweekly: 14,
        monthly: 30
      };
      const days = frequencyDays[phase.frequency] || 1;
      const occurrences = Math.floor(phase.durationDays / days);
      return sum + (occurrences * phase.repetitionsPerOccurrence);
    }, 0);
  };

  return (
    <div className="space-y-4">
      {/* Enable checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="assignment-enabled"
          checked={config.enabled || false}
          onChange={(e) => onChange({ ...config, enabled: e.target.checked })}
          className="w-4 h-4"
        />
        <Label htmlFor="assignment-enabled" className="cursor-pointer">
          Activer les devoirs automatiques
        </Label>
      </div>

      {config.enabled && (
        <>
          {/* Mode selection */}
          <div>
            <Label>Mode de configuration</Label>
            <Select
              value={config.mode || 'simple'}
              onValueChange={(value: 'simple' | 'timeline') => onChange({ ...config, mode: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">📝 Simple - Une seule fréquence</SelectItem>
                <SelectItem value="timeline">📊 Timeline - Phases progressives</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {config.mode === 'simple'
                ? 'Configuration simple avec une fréquence constante'
                : 'Configuration avancée avec plusieurs phases de répétition'}
            </p>
          </div>

          {config.mode === 'simple' ? (
            /* SIMPLE MODE */
            <>
              <div>
                <Label htmlFor="frequency">Fréquence de révision</Label>
                <Select
                  value={config.frequency || 'daily'}
                  onValueChange={(value) => onChange({ ...config, frequency: value as any })}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Quotidien</SelectItem>
                    <SelectItem value="every_2_days">Tous les 2 jours</SelectItem>
                    <SelectItem value="every_3_days">Tous les 3 jours</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accuracy">Taux de réussite requis (%)</Label>
                <Input
                  id="accuracy"
                  type="number"
                  min="0"
                  max="100"
                  value={config.requiredAccuracy || 80}
                  onChange={(e) => onChange({ ...config, requiredAccuracy: parseInt(e.target.value) || 80 })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  L'utilisateur doit atteindre ce taux de réussite avant de passer à l'étape suivante
                </p>
              </div>

              <div>
                <Label htmlFor="repetitions">Nombre de répétitions requises</Label>
                <Input
                  id="repetitions"
                  type="number"
                  min="1"
                  max="10"
                  value={config.repetitionsRequired || 3}
                  onChange={(e) => onChange({ ...config, repetitionsRequired: parseInt(e.target.value) || 3 })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Nombre de fois que l'exercice doit être complété avec succès
                </p>
              </div>
            </>
          ) : (
            /* TIMELINE MODE */
            <>
              {/* Start date */}
              <div>
                <Label htmlFor="start-date">Date de début (optionnelle)</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={config.startDate || ''}
                  onChange={(e) => onChange({ ...config, startDate: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Si vide, démarre dès l'inscription de l'utilisateur
                </p>
              </div>

              {/* Auto adjust */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="auto-adjust"
                  checked={config.autoAdjust || false}
                  onChange={(e) => onChange({ ...config, autoAdjust: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="auto-adjust" className="cursor-pointer text-sm">
                  Ajustement automatique selon performance
                </Label>
              </div>

              {/* Statistics summary */}
              {(config.phases || []).length > 0 && (
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-900">{calculateTotalDuration()}</div>
                      <div className="text-xs text-blue-700">Jours total</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-900">{(config.phases || []).length}</div>
                      <div className="text-xs text-blue-700">Phases</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-900">{calculateTotalOccurrences()}</div>
                      <div className="text-xs text-blue-700">Répétitions totales</div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Phases list */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-base">Phases de répétition</Label>
                  <Button onClick={addPhase} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter une phase
                  </Button>
                </div>

                {(config.phases || []).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Aucune phase configurée</p>
                    <p className="text-xs mt-1">Cliquez sur "Ajouter une phase" pour commencer</p>
                  </div>
                )}

                {(config.phases || []).map((phase, index) => {
                  const isExpanded = expandedPhases.has(phase.id);

                  return (
                    <Card key={phase.id} className="overflow-hidden">
                      {/* Phase header */}
                      <div
                        className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 cursor-pointer hover:from-purple-100 hover:to-blue-100 transition-colors"
                        onClick={() => togglePhase(phase.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="flex flex-col gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-5 w-5 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  movePhase(index, 'up');
                                }}
                                disabled={index === 0}
                              >
                                <ChevronUp className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-5 w-5 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  movePhase(index, 'down');
                                }}
                                disabled={index === (config.phases || []).length - 1}
                              >
                                <ChevronDown className="w-3 h-3" />
                              </Button>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                                  Phase {index + 1}
                                </Badge>
                                <span className="font-semibold text-sm">{phase.name}</span>
                              </div>
                              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {phase.durationDays} jours
                                </span>
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  {getFrequencyLabel(phase.frequency)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Target className="w-3 h-3" />
                                  {phase.requiredAccuracy}%
                                </span>
                              </div>
                            </div>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                removePhase(phase.id);
                              }}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Phase details (expanded) */}
                      {isExpanded && (
                        <div className="p-4 space-y-3 border-t">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">Nom de la phase</Label>
                              <Input
                                value={phase.name}
                                onChange={(e) => updatePhase(phase.id, { name: e.target.value })}
                                placeholder="Ex: Apprentissage intensif"
                              />
                            </div>

                            <div>
                              <Label className="text-xs">Durée (jours)</Label>
                              <Input
                                type="number"
                                min="1"
                                value={phase.durationDays}
                                onChange={(e) => updatePhase(phase.id, { durationDays: parseInt(e.target.value) || 7 })}
                              />
                            </div>

                            <div>
                              <Label className="text-xs">Fréquence</Label>
                              <Select
                                value={phase.frequency}
                                onValueChange={(value) => updatePhase(phase.id, { frequency: value as any })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="daily">Quotidien</SelectItem>
                                  <SelectItem value="every_2_days">Tous les 2 jours</SelectItem>
                                  <SelectItem value="every_3_days">Tous les 3 jours</SelectItem>
                                  <SelectItem value="every_4_days">Tous les 4 jours</SelectItem>
                                  <SelectItem value="every_5_days">Tous les 5 jours</SelectItem>
                                  <SelectItem value="every_6_days">Tous les 6 jours</SelectItem>
                                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                                  <SelectItem value="biweekly">Toutes les 2 semaines</SelectItem>
                                  <SelectItem value="monthly">Mensuel</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label className="text-xs">Répétitions par occurrence</Label>
                              <Input
                                type="number"
                                min="1"
                                max="10"
                                value={phase.repetitionsPerOccurrence}
                                onChange={(e) => updatePhase(phase.id, { repetitionsPerOccurrence: parseInt(e.target.value) || 1 })}
                              />
                            </div>

                            <div>
                              <Label className="text-xs">Précision requise (%)</Label>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={phase.requiredAccuracy}
                                onChange={(e) => updatePhase(phase.id, { requiredAccuracy: parseInt(e.target.value) || 80 })}
                              />
                            </div>

                            <div>
                              <Label className="text-xs">XP par réussite</Label>
                              <Input
                                type="number"
                                min="0"
                                value={phase.xpReward || 10}
                                onChange={(e) => updatePhase(phase.id, { xpReward: parseInt(e.target.value) || 10 })}
                              />
                            </div>

                            <div>
                              <Label className="text-xs">Coins par réussite 🪙</Label>
                              <Input
                                type="number"
                                min="0"
                                value={phase.coinsReward || 5}
                                onChange={(e) => updatePhase(phase.id, { coinsReward: parseInt(e.target.value) || 5 })}
                              />
                            </div>
                          </div>

                          {/* Phase preview */}
                          <div className="bg-gray-50 rounded p-2 text-xs text-muted-foreground">
                            <p className="font-semibold mb-1">📊 Aperçu de cette phase :</p>
                            <p>
                              • Durée : {phase.durationDays} jours ({Math.ceil(phase.durationDays / 7)} semaines)
                            </p>
                            <p>
                              • Fréquence : {getFrequencyLabel(phase.frequency)} ({phase.repetitionsPerOccurrence}x par occurrence)
                            </p>
                            <p>
                              • Répétitions totales : ~{Math.floor(phase.durationDays / (phase.frequency === 'daily' ? 1 : phase.frequency === 'every_2_days' ? 2 : phase.frequency === 'every_3_days' ? 3 : 7)) * phase.repetitionsPerOccurrence}x
                            </p>
                            <p>
                              • XP total possible : ~{(Math.floor(phase.durationDays / (phase.frequency === 'daily' ? 1 : phase.frequency === 'every_2_days' ? 2 : phase.frequency === 'every_3_days' ? 3 : 7)) * phase.repetitionsPerOccurrence) * (phase.xpReward || 10)} XP
                            </p>
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>

              {/* Example timeline button */}
              {(config.phases || []).length === 0 && (
                <Button
                  onClick={() => {
                    // Add example timeline
                    onChange({
                      ...config,
                      phases: [
                        {
                          id: `phase-${Date.now()}-1`,
                          name: 'Semaine 1 - Apprentissage intensif',
                          durationDays: 7,
                          frequency: 'daily',
                          requiredAccuracy: 70,
                          repetitionsPerOccurrence: 2,
                          xpReward: 15,
                          coinsReward: 8
                        },
                        {
                          id: `phase-${Date.now()}-2`,
                          name: 'Semaine 2 - Consolidation',
                          durationDays: 7,
                          frequency: 'every_2_days',
                          requiredAccuracy: 80,
                          repetitionsPerOccurrence: 1,
                          xpReward: 12,
                          coinsReward: 6
                        },
                        {
                          id: `phase-${Date.now()}-3`,
                          name: 'Semaine 3-4 - Révision espacée',
                          durationDays: 14,
                          frequency: 'every_3_days',
                          requiredAccuracy: 85,
                          repetitionsPerOccurrence: 1,
                          xpReward: 10,
                          coinsReward: 5
                        },
                        {
                          id: `phase-${Date.now()}-4`,
                          name: 'Mois 2+ - Maintien',
                          durationDays: 30,
                          frequency: 'weekly',
                          requiredAccuracy: 90,
                          repetitionsPerOccurrence: 1,
                          xpReward: 20,
                          coinsReward: 10
                        }
                      ]
                    });
                    toast.success('Timeline exemple ajoutée !');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Utiliser une timeline exemple
                </Button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
