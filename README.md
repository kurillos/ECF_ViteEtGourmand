# Vite & Gourmand - Application de Commande de Menus

## Description
[cite_start]Projet réalisé dans le cadre du titre professionnel Développeur Web et Web Mobile[cite: 3].
[cite_start]L'aplication permet de visualiser les menus de l'entreprise "Vite & Gourmand", de commander en ligne et de gérer les prestations (Julie & José)[cite: 35, 40].

## Installation en local

1. Cloner le dépôt : `git clone https://github.com/kurillos/ECF_ViteEtGourmand.git`

2. [cite_start]Configurer la base de données : Importer le fichier SQL fourni dans le dossier `/db`[cite: 218].

3. [cite_start]Installer les dépendances : (à compléter selon la stack technique)[cite: 194].

4. Lancer le serveur local.

## Stack Technique

- [cite_start]Front-end : HTML, CSS, JS

- Back-end : PHP (PDO)

- BDD : MySQL (Relationnel) et MongoDB (NoSQL).

## Branches

- `main` : Branche de production.

- `develop` : Branche de developpement.

- `feature/` : Branche pour chaque nouvelle fonctionnalité.

## Architecture des Données 

Le projet utilise une architecture hybride pour répondre aux besoins de performances et d'analyse statistiques :

### 1. Base de données Relationnelles (MySQL)

- **Rôle** : gestion critique des données (Utilisateurs, Menus, Commandes, Allergènes).

- **Justifications** : Garantit l'intégrité des données et les relations complexes entre les entités.


### 2. Base de données NoSQL (MongoDB Atlas)

- **Rôle** : Stockage des statistiques de vente et données analytiques.

- **Utilisation** : Utilisée spécifiquement pour générer les graphiques du tableau de bord administrateur (comparaison du nombre de commandes par menu).

- **Configutation** : Hébergée sur MongoDB Atlas pour permettre une haute disponibilité et une scalabilité des données analytiques.

## Installation & Configuration NoSQL

1. Créez un fichier `.env` à la racine du projet.

2. Ajoutez la chaîne de connexion MongoDB : `mongodb+srv://bocagecyril_db_user:<db_password>@cluster0.kaorimy.mongodb.net/?appName=Cluster0`

3. La collection utilisée est `commandes_stats`.