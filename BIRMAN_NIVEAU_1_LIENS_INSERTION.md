# 🇲🇲 BIRMAN - NIVEAU 1 : LIENS D'INSERTION

## 📝 Vue d'Ensemble

Ce document contient tous les liens pour insérer les 5 exercices du **Niveau 1 - Birman** dans la base de données Supabase via l'interface web.

---

## 🎯 Bundle Niveau 1 - Informations

**Niveau** : 1 sur 20  
**Structure grammaticale** : Sujet + Verbe (Base absolue)  
**Particules** : တယ် (de - affirmation) et လား (la - question)  
**Vocabulaire** : 50 premiers mots (groupes 1 & 2)  
**Difficulté** : ⭐ Débutant absolu  

**Total exercices** : 5  
**Total points** : 1550  
**Seuil de réussite** : 80% (1240 points)

---

## 🔗 LIENS D'INSERTION

### 1️⃣ Flashcards (10 cartes) - 100 points
**Description** : Cartes recto-verso sur les particules တယ် et လား avec astuces mnémotechniques

**🔗 Lien** : http://localhost:8080/insert-burmese-level1-flashcard

---

### 2️⃣ Quiz (20 questions) - 200 points
**Description** : Quiz QCM pour tester la compréhension des particules တယ် et လား

**🔗 Lien** : http://localhost:8080/insert-burmese-level1-quiz

---

### 3️⃣ Association (15 paires) - 150 points
**Description** : Associer phrases incomplètes avec les bonnes particules dans différents contextes

**🔗 Lien** : http://localhost:8080/insert-burmese-level1-association

---

### 4️⃣ Identification Grammaticale (25 phrases) - 500 points
**Description** : Analyser et identifier les composants grammaticaux (sujet, verbe, particule) + traduction

**🔗 Lien** : http://localhost:8080/insert-burmese-level1-grammar

---

### 5️⃣ Mixeur de Phrases (30 exercices) - 600 points
**Description** : Réordonner des mots mélangés dans le bon ordre SOV + traduction

**🔗 Lien** : http://localhost:8080/insert-burmese-level1-mixer

---

## 📋 ORDRE D'INSERTION RECOMMANDÉ

Pour une meilleure organisation, insérez les exercices dans l'ordre suivant :

1. **Flashcards** → Apprentissage de base
2. **Quiz** → Évaluation de la compréhension
3. **Association** → Application pratique
4. **Identification Grammaticale** → Analyse approfondie
5. **Mixeur de Phrases** → Production active

---

## ✅ CHECKLIST DE PUBLICATION

Avant de publier, vérifiez que :

- [ ] Le serveur de développement est lancé (`npm run dev`)
- [ ] La connexion Supabase fonctionne correctement
- [ ] Les 5 exercices sont insérés avec succès
- [ ] Chaque exercice apparaît dans le catalogue
- [ ] Les exercices sont marqués comme `is_published: true`
- [ ] Le tag "birman" et "niveau 1" sont présents
- [ ] La difficulté est définie à 1

---

## 📊 RÉCAPITULATIF DES EXERCICES

| # | Type | Items | Points | Difficulté | Lien |
|---|------|-------|--------|------------|------|
| 1 | Flashcards | 10 | 100 | Facile | `/insert-burmese-level1-flashcard` |
| 2 | Quiz | 20 | 200 | Facile | `/insert-burmese-level1-quiz` |
| 3 | Association | 15 | 150 | Facile | `/insert-burmese-level1-association` |
| 4 | Identification | 25 | 500 | Moyen | `/insert-burmese-level1-grammar` |
| 5 | Mixeur | 30 | 600 | Moyen | `/insert-burmese-level1-mixer` |
| **TOTAL** | **5 types** | **100** | **1550** | **Niveau 1** | - |

---

## 🎯 TAGS À VÉRIFIER

Chaque exercice devrait avoir ces tags :
- `grammaire`
- `birman`
- `débutant`
- `niveau 1`
- `particules`
- `တယ်`
- `လား`

Tags additionnels selon le type :
- **Flashcards** : aucun additionnel
- **Quiz** : `quiz`
- **Association** : `association`
- **Identification** : `analyse`, `structure`, `SOV`
- **Mixeur** : `ordre des mots`, `SOV`, `reconstruction`

---

## 🚀 APRÈS L'INSERTION

Une fois tous les exercices insérés :

1. **Vérifier dans le catalogue** que les 5 exercices apparaissent
2. **Tester chaque exercice** individuellement
3. **Créer un Learning Path** "Birman Niveau 1" incluant ces 5 exercices
4. **Documenter** les exercices pour les utilisateurs
5. **Préparer le Niveau 2** en suivant la même structure

---

## 📚 FICHIERS ASSOCIÉS

- **Documentation exercices** : `grammar/Burmese grammar/burmese_level_1_exercises_complete.md`
- **Bundle théorique** : `grammar/Burmese grammar/burmese_level_1_bundle.md`
- **Générateur de niveaux** : `grammar/Burmese grammar/burmese_all_levels_generator.md`

---

## 💡 NOTES IMPORTANTES

### Structure des données
Tous les exercices utilisent le format standard Supabase :
```typescript
{
  type: string,          // flashcard, quiz, association, etc.
  title: string,
  description: string,
  difficulty: number,    // 1 pour niveau 1
  source: "official",
  language: "burmese",
  tags: string[],
  content: object,       // Structure spécifique au type
  author_id: "demo",
  is_published: true
}
```

### Compatibilité
- ✅ Compatible avec la plateforme Koilingua
- ✅ Suit le système de progression défini
- ✅ Prêt pour l'intégration dans un Learning Path
- ✅ Format compatible avec les exercices existants

---

## 🎓 PROCHAINES ÉTAPES

Après avoir publié le Niveau 1 :

1. **Niveau 2** : Ajout de l'objet direct avec particule ကို (ko)
2. **Niveau 3** : Ajout du complément de lieu avec မှာ (hma)
3. **Niveaux 4-10** : Suivre le même pattern (5 types d'exercices)
4. **Niveaux 11-20** : Ajouter 2 types supplémentaires (Transformation + Chasse aux erreurs)

---

**Document créé le** : 08/10/2025  
**Version** : 1.0  
**Langue** : Birman 🇲🇲  
**Niveau** : 1/20

---

🎉 **Bon courage pour l'insertion des exercices !**
