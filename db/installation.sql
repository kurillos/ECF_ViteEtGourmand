-- ==========================================================
-- SCRIPT D'INSTALLATION DE LA BASE DE DONNÉES SQL
-- Projet : Vite & Gourmand
-- Objectif : Validation des compétences SQL (Activité-Type 2)
-- ==========================================================

-- 1. Création de la base de données
CREATE DATABASE IF NOT EXISTS vite_et_gourmand CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vite_et_gourmand;

-- 2. Création de l'utilisateur dédié (pour le projet)
-- Note : En production, on limite les privilèges.
CREATE USER IF NOT EXISTS 'dev_user'@'localhost' IDENTIFIED BY 'ViteGourmand2026!';
GRANT ALL PRIVILEGES ON vite_et_gourmand.* TO 'dev_user'@'localhost';

-- 3. Structure initiale (Exemple pour la table Menu selon le MCD)
-- Nous laisserons Symfony générer le reste, mais montrer que tu sais créer 
-- une table complexe est essentiel.
CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix_base DECIMAL(10, 2) NOT NULL,
    nb_pers_min INT NOT NULL,
    nb_pers_max INT NOT NULL,
    theme VARCHAR(100),
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Insertion de données de test (Fixtures manuelles)
INSERT INTO menu (nom, description, prix_base, nb_pers_min, nb_pers_max, theme)
VALUES 
('Menu Tradition', 'Entrée, Plat, Dessert du terroir', 25.50, 10, 50, 'Classique'),
('Buffet Gourmand', 'Large choix de pièces cocktail', 35.00, 20, 100, 'Événementiel');

FLUSH PRIVILEGES;

-- ==========================================================
-- Création de la table Menu
-- ==========================================================

CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    prix_base DECIMAL(10, 2) NOT NULL,
    nb_pers_min INT NOT NULL,
    nb_pers_max INT NOT NULL,
    theme VARCHAR(100),
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================================
-- -- Insertion de l'utilisatrice Julie
-- Le mot de passe est haché
-- ==========================================================

INSERT INTO `user` (`email`, `roles`, `password`) 
VALUES (
    'julie@viteetgourmand.fr', 
    '["ROLE_EMPLOYE"]', 
    '$2y$13$V.uG8X.z6K/A9YqR7J7W9uO6f5e4d3c2b1a0z9y8x7w6v5u4t3s2r' -- Remplace par ton hash réel
);


-- ==========================================================
-- -- Création table categorie
-- ==========================================================

CREATE TABLE category (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;

-- ==========================================================
-- -- Création table dish (menu)
-- ==========================================================

CREATE TABLE dish (
    id INT AUTO_INCREMENT NOT NULL,
    category_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description LONGTEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    INDEX IDX_957D8CB812469DE2 (category_id),
    PRIMARY KEY(id),
    CONSTRAINT FK_957D8CB812469DE2 FOREIGN KEY (category_id) 
        REFERENCES category (id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;