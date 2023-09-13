import { MigrationInterface, QueryRunner } from "typeorm";

export class Permissions1694640579472 implements MigrationInterface {
    name = 'Permissions1694640579472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`uprawnienia\` (\`id_uprawnienia\` int NOT NULL AUTO_INCREMENT, \`kategoria\` varchar(2) NOT NULL, \`id_user\` int NOT NULL, PRIMARY KEY (\`id_uprawnienia\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`rola\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`rola\` enum ('user', 'manager', 'admin') NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE \`pojazdy\` CHANGE \`kategoria\` \`kategoria\` varchar(2) NULL`);
        await queryRunner.query(`ALTER TABLE \`uprawnienia\` ADD CONSTRAINT \`FK_668595a2e266bc71de9c283d972\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`uprawnienia\` DROP FOREIGN KEY \`FK_668595a2e266bc71de9c283d972\``);
        await queryRunner.query(`ALTER TABLE \`pojazdy\` CHANGE \`kategoria\` \`kategoria\` varchar(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`rola\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`rola\` varchar(255) NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`DROP TABLE \`uprawnienia\``);
    }

}
