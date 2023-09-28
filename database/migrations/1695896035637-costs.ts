import { MigrationInterface, QueryRunner } from "typeorm";

export class Costs1695896035637 implements MigrationInterface {
    name = 'Costs1695896035637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`koszty\` (\`id_kosztu\` int NOT NULL AUTO_INCREMENT, \`nazwa\` varchar(50) NOT NULL, \`opis\` text NOT NULL, \`koszt\` int NOT NULL, \`data\` datetime NOT NULL, \`id_user\` int NOT NULL, PRIMARY KEY (\`id_kosztu\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`przebiegi\` (\`id_przebiegu\` int NOT NULL AUTO_INCREMENT, \`stan_licznika\` int NOT NULL, \`data\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id_pojazdu\` int NOT NULL, PRIMARY KEY (\`id_przebiegu\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`koszty\` ADD CONSTRAINT \`FK_86f5416c62b93341c093d7123ee\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`przebiegi\` ADD CONSTRAINT \`FK_79e3da3a2df8ec56cc4e1fcb826\` FOREIGN KEY (\`id_pojazdu\`) REFERENCES \`pojazdy\`(\`id_pojazdu\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`przebiegi\` DROP FOREIGN KEY \`FK_79e3da3a2df8ec56cc4e1fcb826\``);
        await queryRunner.query(`ALTER TABLE \`koszty\` DROP FOREIGN KEY \`FK_86f5416c62b93341c093d7123ee\``);
        await queryRunner.query(`DROP TABLE \`przebiegi\``);
        await queryRunner.query(`DROP TABLE \`koszty\``);
    }

}
