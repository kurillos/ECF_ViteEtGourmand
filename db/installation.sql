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