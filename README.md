# SAS Progress Console

Une application console simple en Node.js permettant de suivre la progression pédagogique des apprenants pendant le programme SAS.

---

## 🎯 Objectif du Projet

Ce projet permet aux formateurs de suivre les résultats des exercices et des challenges quotidiens des apprenants. Il calcule automatiquement leur niveau de progression et permet de repérer facilement les journées ou challenges non renseignés.

---

## 🚀 Installation & Exécution

### Prérequis
* Node.js installé sur votre machine.

### Installation
1. Installez le module requis pour la saisie console :
   ```bash
   npm install prompt-sync

```

### Lancement

Exécutez la commande suivante depuis la racine du projet :

```bash
node src/index.js

```

---

## 📂 Structure du Projet

```text
projet-final/
├── README.md
└── src/
    ├── data.js         # Données initiales des apprenants
    ├── progression.js  # Calculs métier, filtres et tris
    └── index.js        # Menu principal et navigation

```

---

## 📋 Fonctionnalités de l'Application

1. **Afficher le tableau de bord :** Affiche la progression moyenne globale, le nombre d'apprenants par niveau, le classement et les données manquantes.
2. **Afficher la liste des apprenants :** Liste tous les apprenants avec leur identifiant, leur ville et leur progression.
3. **Ajouter un apprenant :** Permet d'inscrire un nouvel apprenant avec son nom complet et sa ville.
4. **Consulter un apprenant par identifiant :** Affiche le profil détaillé d'un apprenant et l'historique de ses résultats journaliers.
5. **Ajouter ou modifier le résultat d'une journée :** Enregistre ou met à jour le nombre d'exercices et le statut du challenge pour un jour donné (1 à 7).
6. **Rechercher un apprenant par nom :** Recherche un profil à partir d'un nom complet ou partiel.
7. **Filtrer les apprenants par niveau :** Affiche les apprenants selon leur catégorie (*Solide*, *En progression*, ou *À renforcer*).
8. **Trier par progression décroissante :** Classe les apprenants du pourcentage le plus élevé au plus bas.
9. **Trier par ordre alphabétique :** Tri la liste des apprenants de A à Z.
10. **Quitter :** Ferme l'application.

---

## 📊 Règles de Calcul & Niveaux

* **Calcul de progression :** `(Total exercices terminés / Total exercices proposés) * 100`
* **Niveaux pédagogiques :**
* **Solide :** 80% ou plus
* **En progression :** Entre 50% et 79%
* **À renforcer :** Moins de 50%
