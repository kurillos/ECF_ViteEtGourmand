<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260205123128 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE menu_plats (menu_id INT NOT NULL, plat_id INT NOT NULL, INDEX IDX_14E6416DCCD7E912 (menu_id), INDEX IDX_14E6416DD73DB560 (plat_id), PRIMARY KEY (menu_id, plat_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE menu_plats ADD CONSTRAINT FK_14E6416DCCD7E912 FOREIGN KEY (menu_id) REFERENCES menu (menu_id)');
        $this->addSql('ALTER TABLE menu_plats ADD CONSTRAINT FK_14E6416DD73DB560 FOREIGN KEY (plat_id) REFERENCES plat (plat_id)');
        $this->addSql('ALTER TABLE plat CHANGE photo photo VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE menu_plats DROP FOREIGN KEY FK_14E6416DCCD7E912');
        $this->addSql('ALTER TABLE menu_plats DROP FOREIGN KEY FK_14E6416DD73DB560');
        $this->addSql('DROP TABLE menu_plats');
        $this->addSql('ALTER TABLE plat CHANGE photo photo LONGBLOB DEFAULT NULL');
    }
}
