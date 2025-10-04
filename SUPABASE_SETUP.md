# Configuration Supabase pour Lingua Craft Quest

## 📋 Étapes de configuration

### 1. Récupérer vos clés Supabase

1. Connectez-vous à votre dashboard Supabase : https://supabase.com/dashboard
2. Sélectionnez votre projet (ou créez-en un nouveau)
3. Allez dans **Settings** > **API**
4. Copiez les valeurs suivantes :
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 2. Configurer les variables d'environnement

Ouvrez le fichier `.env.local` à la racine du projet et remplacez les valeurs :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_anon_key_ici
```

⚠️ **Important** : Ne commitez JAMAIS ce fichier dans Git !

### 3. Créer la table dans Supabase

1. Dans votre dashboard Supabase, allez dans **SQL Editor**
2. Cliquez sur **New Query**
3. Copiez-collez tout le contenu du fichier `supabase-schema.sql`
4. Cliquez sur **Run** pour exécuter le script

Cela va créer :
- ✅ La table `exercises`
- ✅ Les index pour améliorer les performances
- ✅ Les politiques de sécurité (Row Level Security)
- ✅ Deux exercices d'exemple

### 4. Vérifier la configuration

1. Redémarrez votre serveur de développement :
   ```bash
   npm run dev
   ```

2. Ouvrez votre application dans le navigateur

3. Testez en créant un nouvel exercice :
   - Allez dans l'onglet "Créer"
   - Remplissez un exercice
   - Cliquez sur "Publier"

4. Vérifiez dans Supabase :
   - Dashboard > **Table Editor** > `exercises`
   - Vous devriez voir votre nouvel exercice !

### 5. Vérifier que les données persistent

1. Créez un exercice dans votre application
2. Fermez complètement votre navigateur
3. Rouvrez l'application
4. ✅ L'exercice devrait toujours être là !

## 🔧 Fonctionnalités disponibles

- ✅ **Création** : Les exercices sont sauvegardés dans Supabase
- ✅ **Lecture** : Chargement automatique au démarrage
- ✅ **Modification** : Mise à jour en temps réel
- ✅ **Suppression** : Suppression permanente
- ✅ **Publication** : Gestion du statut publié/brouillon

## 🔐 Sécurité

Le Row Level Security (RLS) est activé avec les politiques suivantes :
- Tout le monde peut voir les exercices publiés
- Tout le monde peut créer/modifier/supprimer des exercices (pour le moment)

⚠️ **Pour la production**, vous devrez :
1. Ajouter l'authentification utilisateur
2. Restreindre les politiques RLS pour que les utilisateurs ne puissent modifier que leurs propres exercices

## 🐛 Dépannage

### Les exercices ne s'affichent pas
- Vérifiez que les clés dans `.env.local` sont correctes
- Vérifiez la console du navigateur pour les erreurs
- Vérifiez que le script SQL a bien été exécuté

### Erreur "Missing Supabase environment variables"
- Vérifiez que le fichier `.env.local` existe à la racine
- Redémarrez le serveur de développement

### Erreur 401 Unauthorized
- Vérifiez que la clé `VITE_SUPABASE_ANON_KEY` est correcte
- Vérifiez que le RLS est bien configuré

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Guide JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
