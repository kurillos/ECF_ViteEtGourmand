<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260202140548 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE opening_hour CHANGE open_am open_am VARCHAR(255) DEFAULT NULL, CHANGE close_am close_am VARCHAR(255) DEFAULT NULL, CHANGE open_pm open_pm VARCHAR(255) DEFAULT NULL, CHANGE close_pm close_pm VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE opening_hour CHANGE open_am open_am VARCHAR(255) NOT NULL, CHANGE close_am close_am VARCHAR(255) NOT NULL, CHANGE open_pm open_pm VARCHAR(255) NOT NULL, CHANGE close_pm close_pm VARCHAR(255) NOT NULL');
    }
}
