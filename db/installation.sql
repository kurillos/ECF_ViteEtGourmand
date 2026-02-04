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
-- -- Création de la table THEME (Indépendante)
-- ==========================================================

CREATE TABLE theme (
    theme_id INT AUTO_INCREMENT NOT NULL,
    libelle VARCHAR(20) NOT NULL,
    PRIMARY KEY(theme_id)
) ENGINE = InnoDB;

-- ==========================================================
-- -- Création de la table PLAT (Indépendante)
-- ==========================================================

CREATE TABLE plat (
    plat_id INT AUTO_INCREMENT NOT NULL,
    titre_plat VARCHAR(50) NOT NULL,
    prix_plat DECIMAL(10, 2) NOT NULL,
    photo LONGBLOB DEFAULT NULL,
    PRIMARY KEY(plat_id)
) ENGINE = InnoDB;

-- ==========================================================
-- -- Création de la table de liaison COMPOSER (n,n entre Menu et Plat)
-- ==========================================================

CREATE TABLE composer (
    menu_id INT NOT NULL,
    plat_id INT NOT NULL,
    PRIMARY KEY(menu_id, plat_id),
    CONSTRAINT FK_COMPOSER_MENU FOREIGN KEY (menu_id) REFERENCES menu (menu_id) ON DELETE CASCADE,
    CONSTRAINT FK_COMPOSER_PLAT FOREIGN KEY (plat_id) REFERENCES plat (plat_id) ON DELETE CASCADE
) ENGINE = InnoDB;

-- ==========================================================
-- -- Création de la table MENU (Dépend de theme)
-- ==========================================================

CREATE TABLE menu (
    menu_id INT AUTO_INCREMENT NOT NULL,
    theme_id INT NOT NULL,
    titre_menu VARCHAR(50) NOT NULL,
    description_menu VARCHAR(255) NOT NULL,
    prix_menu DECIMAL(10, 2) NOT NULL,
    nb_personnes INT NOT NULL,
    regime VARCHAR(20) DEFAULT NULL,
    quantite_restante INT NOT NULL DEFAULT 0,
    image_menu LONGBLOB DEFAULT NULL,
    PRIMARY KEY(menu_id),
    CONSTRAINT FK_MENU_THEME FOREIGN KEY (theme_id) 
        REFERENCES theme (theme_id) ON DELETE CASCADE
) ENGINE = InnoDB;

-- ==========================================================
-- -- INSERTION DE DONNÉES DE TEST (Fixtures manuelles)
-- ==========================================================

INSERT INTO theme (libelle) VALUES ('Pâques'), ('Noël'), ('Mariage');

INSERT INTO menu (theme_id, titre_menu, description_menu, prix_menu, nb_personnes, regime, quantite_restante) 
VALUES (1, 'Menu Printanier', 'Un délice de saison', 45.00, 4, 'Végétarien', 15);

INSERT INTO plat (titre_plat, prix_plat) VALUES ('Gigot d''agneau', 12.50), ('Asperges sauce mousseline', 8.00);

-- ==========================================================
-- -- Liaison Menu 1 avec Plats 1 et 2
-- ==========================================================

INSERT INTO composer (menu_id, plat_id) VALUES (1, 1), (1, 2);

-- ==========================================================
-- -- Table horaires
-- ==========================================================

CREATE TABLE horaire (
    id INT AUTO_INCREMENT NOT NULL,
    jour VARCHAR(10) NOT NULL,
    ouverture_matin VARCHAR(5) DEFAULT NULL,
    fermeture_matin VARCHAR(5) DEFAULT NULL,
    ouverture_soir VARCHAR(5) DEFAULT NULL,
    fermeture_soir VARCHAR(5) DEFAULT NULL,
    is_closed BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY(id)
) ENGINE = InnoDB;