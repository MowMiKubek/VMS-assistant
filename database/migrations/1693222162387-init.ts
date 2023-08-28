import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1693222162387 implements MigrationInterface {
    name = 'Init1693222162387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`mandaty\` (\`id_mandatu\` int NOT NULL AUTO_INCREMENT, \`nazwa\` varchar(50) NOT NULL, \`liczba_punktow\` int NOT NULL, \`waznosc\` int NOT NULL, \`data_wystawienia\` datetime NOT NULL, \`cena\` int NOT NULL, \`id_user\` int NOT NULL, PRIMARY KEY (\`id_mandatu\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id_user\` int NOT NULL AUTO_INCREMENT, \`imie\` varchar(50) NOT NULL, \`nazwisko\` varchar(50) NOT NULL, \`email\` varchar(45) NOT NULL, \`login\` varchar(45) NOT NULL, \`haslo\` text NOT NULL, \`rola\` varchar(255) NOT NULL DEFAULT 'user', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_2d443082eccd5198f95f2a36e2\` (\`login\`), PRIMARY KEY (\`id_user\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pojazdy\` (\`id_pojazdu\` int NOT NULL AUTO_INCREMENT, \`marka\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`rocznik\` int NOT NULL, \`VIN\` varchar(255) NULL, \`nr_rejestracyjny\` varchar(255) NULL, \`data_pierw_rej\` date NULL, \`typ_paliwa\` enum ('benzyna', 'diesel', 'LPG', 'inne') NOT NULL DEFAULT 'inne', \`kategoria\` varchar(2) NOT NULL, \`id_user\` int NULL, PRIMARY KEY (\`id_pojazdu\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tankowania\` (\`id_tankowania\` int NOT NULL AUTO_INCREMENT, \`ilosc_paliwa\` decimal NOT NULL, \`typ_paliwa\` enum ('benzyna', 'diesel', 'LPG', 'inne') NOT NULL DEFAULT 'inne', \`cena_za_litr\` int NOT NULL, \`cena\` int NOT NULL, \`blokada\` smallint NOT NULL DEFAULT '0', \`id_pojazdu\` int NOT NULL, PRIMARY KEY (\`id_tankowania\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`mandaty\` ADD CONSTRAINT \`FK_cf9351a4584e4e48b236f271330\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pojazdy\` ADD CONSTRAINT \`FK_69a34179be47cb7f8142b87bea2\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tankowania\` ADD CONSTRAINT \`FK_c1f49578d78704f56641cb01c43\` FOREIGN KEY (\`id_pojazdu\`) REFERENCES \`pojazdy\`(\`id_pojazdu\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tankowania\` DROP FOREIGN KEY \`FK_c1f49578d78704f56641cb01c43\``);
        await queryRunner.query(`ALTER TABLE \`pojazdy\` DROP FOREIGN KEY \`FK_69a34179be47cb7f8142b87bea2\``);
        await queryRunner.query(`ALTER TABLE \`mandaty\` DROP FOREIGN KEY \`FK_cf9351a4584e4e48b236f271330\``);
        await queryRunner.query(`DROP TABLE \`tankowania\``);
        await queryRunner.query(`DROP TABLE \`pojazdy\``);
        await queryRunner.query(`DROP INDEX \`IDX_2d443082eccd5198f95f2a36e2\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`mandaty\``);
    }

}
