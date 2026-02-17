# Cours complet sur Git

## 📚 Table des matières

1. [Introduction à Git](#introduction)
2. [Installation et configuration](#installation)
3. [Les concepts fondamentaux](#concepts)
4. [Commandes de base](#commandes-base)
5. [Travail avec les branches](#branches)
6. [Gestion des conflits](#conflits)
7. [Bonnes pratiques](#bonnes-pratiques)
8. [Projet pratique guidé](#projet-pratique)

---

## <a name="introduction"></a>1. Introduction à Git

### 1.1 Qu'est-ce que Git ?

**Git** est un **système de contrôle de versions distribué** (DVCS - Distributed Version Control System). Il permet de :

- **Sauvegarder** l'historique de vos fichiers
- **Travailler en équipe** sur un même projet
- **Revenir en arrière** si vous faites une erreur
- **Créer des branches** pour tester de nouvelles fonctionnalités
- **Fusionner** le travail de plusieurs développeurs

### 1.2 Pourquoi utiliser Git ?

Sans Git :
- ❌ Perte de code en cas de bug
- ❌ Difficulté à travailler en équipe
- ❌ Pas d'historique des modifications
- ❌ Risque d'écraser le travail des autres

Avec Git :
- ✅ Historique complet de toutes les modifications
- ✅ Possibilité de revenir à n'importe quelle version
- ✅ Travail en équipe facilité
- ✅ Sauvegarde sécurisée sur un serveur distant (GitHub, GitLab)

### 1.3 Vocabulaire essentiel

- **Repository (Repo)** : Dossier de projet suivi par Git
- **Commit** : Point de sauvegarde dans l'historique
- **Branch (Branche)** : Ligne de développement parallèle
- **Remote (Distant)** : Version du projet sur un serveur (GitHub, GitLab)
- **Clone** : Copier un repository depuis un serveur
- **Push** : Envoyer vos commits vers le serveur
- **Pull** : Récupérer les modifications depuis le serveur

---

## <a name="installation"></a>2. Installation et configuration

### 2.1 Installation de Git

#### Windows
1. Télécharger Git depuis : https://git-scm.com/download/win
2. Installer avec les options par défaut
3. Vérifier l'installation : ouvrir Git Bash ou PowerShell et taper :
```bash
git --version
```

#### Mac
```bash
# Via Homebrew
brew install git

# Vérifier
git --version
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install git
git --version
```

### 2.2 Configuration initiale

**Première utilisation** - Configurer votre identité :

```bash
# Votre nom (visible dans les commits)
git config --global user.name "Votre Nom"

# Votre email (celui de votre compte GitHub/GitLab)
git config --global user.email "votre.email@example.com"

# Vérifier la configuration
git config --list
```

**Configuration optionnelle** :

```bash
# Éditeur par défaut (VS Code)
git config --global core.editor "code --wait"

# Couleurs dans le terminal
git config --global color.ui true

# Nom de la branche par défaut
git config --global init.defaultBranch main
```

---

## <a name="concepts"></a>3. Les concepts fondamentaux

### 3.1 Les trois zones de Git

```
┌─────────────────┐
│  Working Tree   │  ← Vos fichiers modifiés
│  (Répertoire)   │
└────────┬────────┘
         │ git add
         ▼
┌─────────────────┐
│   Staging Area  │  ← Fichiers prêts à être commités
│   (Index)       │
└────────┬────────┘
         │ git commit
         ▼
┌─────────────────┐
│   Repository    │  ← Historique des commits
│   (.git/)       │
└─────────────────┘
```

**Explication** :
1. **Working Tree** : Vos fichiers dans le dossier du projet
2. **Staging Area** : Zone d'attente pour les fichiers à commiter
3. **Repository** : Base de données de tous les commits

### 3.2 Le cycle de vie d'un fichier

```
Fichier non suivi
      │
      │ git add
      ▼
Fichier suivi (staged)
      │
      │ git commit
      ▼
Fichier commité
      │
      │ Modification
      ▼
Fichier modifié (non staged)
      │
      │ git add
      ▼
Fichier modifié (staged)
      │
      │ git commit
      ▼
Nouveau commit créé
```

---

## <a name="commandes-base"></a>4. Commandes de base

### 4.1 Initialiser un repository

```bash
# Créer un nouveau dossier
mkdir mon-projet
cd mon-projet

# Initialiser Git dans ce dossier
git init

# Vérifier que Git est initialisé
ls -la  # Vous verrez un dossier .git
```

### 4.2 Vérifier l'état : `git status`

```bash
# Voir l'état actuel du repository
git status

# Exemple de sortie :
# On branch main
# Untracked files:
#   index.html
#   style.css
```

**États possibles** :
- **Untracked** : Fichier non suivi par Git
- **Modified** : Fichier modifié mais pas encore ajouté
- **Staged** : Fichier ajouté et prêt à être commité

### 4.3 Ajouter des fichiers : `git add`

```bash
# Ajouter un fichier spécifique
git add index.html

# Ajouter tous les fichiers modifiés
git add .

# Ajouter tous les fichiers d'un type
git add *.js

# Ajouter un dossier
git add css/

# Vérifier ce qui est ajouté
git status
```

**Exemple pratique** :
```bash
# Créer un fichier
echo "# Mon projet" > README.md

# Vérifier l'état
git status
# → README.md apparaît en rouge (untracked)

# Ajouter le fichier
git add README.md

# Vérifier à nouveau
git status
# → README.md apparaît en vert (staged)
```

### 4.4 Créer un commit : `git commit`

```bash
# Créer un commit avec un message
git commit -m "Ajout du fichier README.md"

# Créer un commit avec un message détaillé
git commit -m "Ajout du fichier README.md

- Description du projet
- Instructions d'installation
- Auteur et licence"

# Voir l'historique des commits
git log

# Voir l'historique de manière compacte
git log --oneline
```

**Bonnes pratiques pour les messages de commit** :
- ✅ `git commit -m "Ajout de la fonctionnalité de connexion"`
- ✅ `git commit -m "Correction du bug d'affichage sur mobile"`
- ❌ `git commit -m "modifs"`
- ❌ `git commit -m "fix"`

### 4.5 Voir l'historique : `git log`

```bash
# Historique complet
git log

# Historique sur une ligne
git log --oneline

# Historique avec graphique
git log --oneline --graph

# Historique des 5 derniers commits
git log -5

# Historique avec les fichiers modifiés
git log --stat

# Historique avec le contenu des modifications
git log -p
```

### 4.6 Voir les différences : `git diff`

```bash
# Voir les différences dans les fichiers modifiés
git diff

# Voir les différences d'un fichier spécifique
git diff index.html

# Voir les différences dans la staging area
git diff --staged

# Comparer deux commits
git diff commit1 commit2
```

### 4.7 Annuler des modifications : `git restore` / `git reset`

```bash
# Annuler les modifications d'un fichier (avant git add)
git restore index.html

# Annuler tous les fichiers modifiés
git restore .

# Retirer un fichier de la staging area (après git add)
git restore --staged index.html

# Annuler le dernier commit (garder les modifications)
git reset --soft HEAD~1

# Annuler le dernier commit (perdre les modifications)
git reset --hard HEAD~1
```

⚠️ **Attention** : `git reset --hard` supprime définitivement les modifications !

---

## <a name="branches"></a>5. Travail avec les branches

### 5.1 Qu'est-ce qu'une branche ?

Une **branche** est une ligne de développement indépendante. Elle permet de :
- Travailler sur une fonctionnalité sans affecter le code principal
- Tester des idées sans risque
- Travailler en parallèle avec d'autres développeurs

### 5.2 Créer et utiliser des branches

```bash
# Voir toutes les branches
git branch

# Créer une nouvelle branche
git branch ma-branche

# Changer de branche (checkout)
git checkout ma-branche

# Créer et changer de branche en une commande
git checkout -b ma-branche

# Voir sur quelle branche vous êtes
git branch
# L'astérisque * indique la branche active

# Fusionner une branche dans la branche actuelle
git checkout main
git merge ma-branche

# Supprimer une branche
git branch -d ma-branche
```

**Exemple pratique** :
```bash
# Vous êtes sur main
git branch
# * main

# Créer une branche pour une nouvelle fonctionnalité
git checkout -b feature/login

# Travailler sur cette branche
echo "// Code de connexion" > login.js
git add login.js
git commit -m "Ajout de la fonctionnalité de connexion"

# Revenir sur main
git checkout main

# Fusionner la branche
git merge feature/login

# Supprimer la branche (optionnel)
git branch -d feature/login
```

### 5.3 Branches distantes

```bash
# Voir les branches distantes
git branch -r

# Voir toutes les branches (locales + distantes)
git branch -a

# Créer une branche qui suit une branche distante
git checkout -b ma-branche origin/ma-branche

# Pousser une branche vers le serveur
git push -u origin ma-branche
```

---

## <a name="conflits"></a>6. Gestion des conflits

### 6.1 Qu'est-ce qu'un conflit ?

Un **conflit** survient quand Git ne peut pas fusionner automatiquement deux modifications sur la même ligne de code.

**Scénario typique** :
1. Vous modifiez la ligne 10 de `index.html`
2. Un collègue modifie aussi la ligne 10 de `index.html`
3. Vous essayez de fusionner → **CONFLIT** !

### 6.2 Résoudre un conflit

**Étape 1 : Détecter le conflit**
```bash
git merge ma-branche
# Auto-merging index.html
# CONFLICT (content): Merge conflict in index.html
```

**Étape 2 : Ouvrir le fichier en conflit**

Le fichier contiendra des marqueurs :
```html
<<<<<<< HEAD
<!-- Votre version -->
<h1>Mon titre</h1>
=======
<!-- Version de la branche fusionnée -->
<h1>Autre titre</h1>
>>>>>>> ma-branche
```

**Étape 3 : Résoudre manuellement**

Choisir quelle version garder (ou combiner les deux) :
```html
<!-- Version résolue -->
<h1>Mon titre amélioré</h1>
```

**Étape 4 : Marquer comme résolu**
```bash
# Ajouter le fichier résolu
git add index.html

# Finaliser le merge
git commit -m "Résolution du conflit dans index.html"
```

### 6.3 Outils de résolution de conflits

- **VS Code** : Interface graphique intégrée
- **GitKraken** : Outil visuel pour Git
- **SourceTree** : Client Git graphique
- **En ligne de commande** : Éditeur de texte

### 6.4 Annuler un merge en cours

```bash
# Si vous êtes en train de résoudre un conflit et voulez annuler
git merge --abort
```

---

## <a name="bonnes-pratiques"></a>7. Bonnes pratiques

### 7.1 Messages de commit

**Format recommandé** :
```
Type: Description courte (50 caractères max)

Description détaillée si nécessaire (72 caractères par ligne)

- Point 1
- Point 2
```

**Types courants** :
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage (pas de changement de code)
- `refactor:` Refactorisation
- `test:` Ajout de tests
- `chore:` Tâches de maintenance

**Exemples** :
```bash
git commit -m "feat: Ajout du système de connexion utilisateur"
git commit -m "fix: Correction du bug d'affichage sur mobile"
git commit -m "docs: Mise à jour du README avec les instructions"
```

### 7.2 Fréquence des commits

- ✅ Commiter souvent (après chaque fonctionnalité complète)
- ✅ Un commit = une modification logique
- ❌ Ne pas commiter tout à la fin de la journée
- ❌ Ne pas commiter du code qui ne compile pas

### 7.3 Structure des branches

**Convention courante** :
- `main` ou `master` : Code de production stable
- `develop` : Branche de développement
- `feature/nom-fonctionnalité` : Nouvelle fonctionnalité
- `bugfix/nom-bug` : Correction de bug
- `hotfix/nom-urgence` : Correction urgente

### 7.4 Fichier .gitignore

Créer un fichier `.gitignore` à la racine du projet :

```gitignore
# Dépendances
node_modules/
vendor/

# Fichiers de configuration locaux
.env
config.local.js

# Fichiers de build
dist/
build/
*.min.js

# Fichiers système
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp

# Logs
*.log
npm-debug.log*
```
---

## 📚 Ressources supplémentaires

- **Documentation officielle** : https://git-scm.com/doc
- **GitHub Guides** : https://guides.github.com/
- **Visualiser Git** : https://learngitbranching.js.org/
- **Cheat Sheet** : https://education.github.com/git-cheat-sheet-education.pdf
