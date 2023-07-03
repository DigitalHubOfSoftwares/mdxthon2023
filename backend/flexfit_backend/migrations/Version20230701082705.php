<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230701082705 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE fitness_style (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, color VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE goal (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE level (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE library_media (id INT AUTO_INCREMENT NOT NULL, uploaded_by_id INT DEFAULT NULL, fitness_style_id INT DEFAULT NULL, level_id INT DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, media_path VARCHAR(255) DEFAULT NULL, thumbnail_path VARCHAR(255) DEFAULT NULL, INDEX IDX_59897323A2B28FE8 (uploaded_by_id), INDEX IDX_59897323DBA37C1 (fitness_style_id), INDEX IDX_598973235FB14BA7 (level_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, goal_id INT DEFAULT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), INDEX IDX_8D93D649667D1AFE (goal_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_fitness_style (user_id INT NOT NULL, fitness_style_id INT NOT NULL, INDEX IDX_9A2EC001A76ED395 (user_id), INDEX IDX_9A2EC001DBA37C1 (fitness_style_id), PRIMARY KEY(user_id, fitness_style_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_personalisation_info (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, gender VARCHAR(255) DEFAULT NULL, date_of_birth DATE DEFAULT NULL, height DOUBLE PRECISION DEFAULT NULL, weight DOUBLE PRECISION DEFAULT NULL, workout_days INT DEFAULT NULL, water_intake DOUBLE PRECISION DEFAULT NULL, sleep DOUBLE PRECISION DEFAULT NULL, UNIQUE INDEX UNIQ_DCA414BAA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE library_media ADD CONSTRAINT FK_59897323A2B28FE8 FOREIGN KEY (uploaded_by_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE library_media ADD CONSTRAINT FK_59897323DBA37C1 FOREIGN KEY (fitness_style_id) REFERENCES fitness_style (id)');
        $this->addSql('ALTER TABLE library_media ADD CONSTRAINT FK_598973235FB14BA7 FOREIGN KEY (level_id) REFERENCES level (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649667D1AFE FOREIGN KEY (goal_id) REFERENCES goal (id)');
        $this->addSql('ALTER TABLE user_fitness_style ADD CONSTRAINT FK_9A2EC001A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_fitness_style ADD CONSTRAINT FK_9A2EC001DBA37C1 FOREIGN KEY (fitness_style_id) REFERENCES fitness_style (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_personalisation_info ADD CONSTRAINT FK_DCA414BAA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE library_media DROP FOREIGN KEY FK_59897323A2B28FE8');
        $this->addSql('ALTER TABLE library_media DROP FOREIGN KEY FK_59897323DBA37C1');
        $this->addSql('ALTER TABLE library_media DROP FOREIGN KEY FK_598973235FB14BA7');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649667D1AFE');
        $this->addSql('ALTER TABLE user_fitness_style DROP FOREIGN KEY FK_9A2EC001A76ED395');
        $this->addSql('ALTER TABLE user_fitness_style DROP FOREIGN KEY FK_9A2EC001DBA37C1');
        $this->addSql('ALTER TABLE user_personalisation_info DROP FOREIGN KEY FK_DCA414BAA76ED395');
        $this->addSql('DROP TABLE fitness_style');
        $this->addSql('DROP TABLE goal');
        $this->addSql('DROP TABLE level');
        $this->addSql('DROP TABLE library_media');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_fitness_style');
        $this->addSql('DROP TABLE user_personalisation_info');
    }
}
