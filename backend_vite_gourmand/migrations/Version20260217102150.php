<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260217102150 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE avis (avis_id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, message LONGTEXT NOT NULL, note INT NOT NULL, is_validated TINYINT NOT NULL, PRIMARY KEY (avis_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE commande (id INT AUTO_INCREMENT NOT NULL, date_commande DATETIME NOT NULL, statut VARCHAR(50) NOT NULL, total NUMERIC(10, 2) NOT NULL, a_pret_materiel TINYINT NOT NULL, motif_modification LONGTEXT DEFAULT NULL, mode_contact_motif VARCHAR(50) DEFAULT NULL, date_prestation DATE NOT NULL, heure_livraison TIME NOT NULL, lieu_livraison VARCHAR(255) NOT NULL, nombre_personnes INT NOT NULL, frais_livraison DOUBLE PRECISION NOT NULL, total_ttc DOUBLE PRECISION NOT NULL, relation VARCHAR(255) NOT NULL, client_id INT NOT NULL, user_id INT DEFAULT NULL, INDEX IDX_6EEAA67D19EB6921 (client_id), INDEX IDX_6EEAA67DA76ED395 (user_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE ligne_commande (id INT AUTO_INCREMENT NOT NULL, quantite INT NOT NULL, prix_unitaire NUMERIC(10, 2) NOT NULL, commande_id INT NOT NULL, menu_id INT NOT NULL, INDEX IDX_3170B74B82EA2E54 (commande_id), INDEX IDX_3170B74BCCD7E912 (menu_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE menu (menu_id INT AUTO_INCREMENT NOT NULL, titre_menu VARCHAR(50) NOT NULL, description_menu LONGTEXT NOT NULL, prix_menu NUMERIC(10, 2) NOT NULL, nb_personnes INT NOT NULL, regime VARCHAR(20) DEFAULT NULL, quantite_restante INT NOT NULL, image_url VARCHAR(255) DEFAULT NULL, allergenes LONGTEXT DEFAULT NULL, conditions LONGTEXT DEFAULT NULL, theme_id INT NOT NULL, INDEX IDX_7D053A9359027487 (theme_id), PRIMARY KEY (menu_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE menu_plats (menu_id INT NOT NULL, plat_id INT NOT NULL, INDEX IDX_14E6416DCCD7E912 (menu_id), INDEX IDX_14E6416DD73DB560 (plat_id), PRIMARY KEY (menu_id, plat_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE opening_hour (id INT AUTO_INCREMENT NOT NULL, day VARCHAR(255) NOT NULL, open_am VARCHAR(255) DEFAULT NULL, close_am VARCHAR(255) DEFAULT NULL, open_pm VARCHAR(255) DEFAULT NULL, close_pm VARCHAR(255) DEFAULT NULL, is_closed TINYINT NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE plat (plat_id INT AUTO_INCREMENT NOT NULL, titre_plat VARCHAR(50) NOT NULL, photo VARCHAR(255) DEFAULT NULL, PRIMARY KEY (plat_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE theme (theme_id INT AUTO_INCREMENT NOT NULL, libelle VARCHAR(20) NOT NULL, PRIMARY KEY (theme_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, telephone VARCHAR(255) NOT NULL, adresse_postale LONGTEXT NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0E3BD61CE16BA31DBBF396750 (queue_name, available_at, delivered_at, id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE commande ADD CONSTRAINT FK_6EEAA67D19EB6921 FOREIGN KEY (client_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE commande ADD CONSTRAINT FK_6EEAA67DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE ligne_commande ADD CONSTRAINT FK_3170B74B82EA2E54 FOREIGN KEY (commande_id) REFERENCES commande (id)');
        $this->addSql('ALTER TABLE ligne_commande ADD CONSTRAINT FK_3170B74BCCD7E912 FOREIGN KEY (menu_id) REFERENCES menu (menu_id)');
        $this->addSql('ALTER TABLE menu ADD CONSTRAINT FK_7D053A9359027487 FOREIGN KEY (theme_id) REFERENCES theme (theme_id)');
        $this->addSql('ALTER TABLE menu_plats ADD CONSTRAINT FK_14E6416DCCD7E912 FOREIGN KEY (menu_id) REFERENCES menu (menu_id)');
        $this->addSql('ALTER TABLE menu_plats ADD CONSTRAINT FK_14E6416DD73DB560 FOREIGN KEY (plat_id) REFERENCES plat (plat_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE commande DROP FOREIGN KEY FK_6EEAA67D19EB6921');
        $this->addSql('ALTER TABLE commande DROP FOREIGN KEY FK_6EEAA67DA76ED395');
        $this->addSql('ALTER TABLE ligne_commande DROP FOREIGN KEY FK_3170B74B82EA2E54');
        $this->addSql('ALTER TABLE ligne_commande DROP FOREIGN KEY FK_3170B74BCCD7E912');
        $this->addSql('ALTER TABLE menu DROP FOREIGN KEY FK_7D053A9359027487');
        $this->addSql('ALTER TABLE menu_plats DROP FOREIGN KEY FK_14E6416DCCD7E912');
        $this->addSql('ALTER TABLE menu_plats DROP FOREIGN KEY FK_14E6416DD73DB560');
        $this->addSql('DROP TABLE avis');
        $this->addSql('DROP TABLE commande');
        $this->addSql('DROP TABLE ligne_commande');
        $this->addSql('DROP TABLE menu');
        $this->addSql('DROP TABLE menu_plats');
        $this->addSql('DROP TABLE opening_hour');
        $this->addSql('DROP TABLE plat');
        $this->addSql('DROP TABLE theme');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
