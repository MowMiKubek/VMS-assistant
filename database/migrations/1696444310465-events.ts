import { MigrationInterface, QueryRunner } from "typeorm";

export class Events1696444310465 implements MigrationInterface {
    name = 'Events1696444310465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`wydarzenia\` (\`id_wydarzenia\` int NOT NULL AUTO_INCREMENT, \`nazwa\` varchar(20) NOT NULL, \`opis\` text NOT NULL, \`data\` datetime NOT NULL, \`koszt\` int NOT NULL, \`czy_przypomniec\` tinyint NOT NULL DEFAULT '0', \`czy_okresowe\` tinyint NOT NULL DEFAULT '0', \`okres\` int NULL, \`id_pojazdu\` int NOT NULL, PRIMARY KEY (\`id_wydarzenia\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`wydarzenia\` ADD CONSTRAINT \`FK_5e686d879ed14cb7be2f34f3a4c\` FOREIGN KEY (\`id_pojazdu\`) REFERENCES \`pojazdy\`(\`id_pojazdu\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wydarzenia\` DROP FOREIGN KEY \`FK_5e686d879ed14cb7be2f34f3a4c\``);
        await queryRunner.query(`DROP TABLE \`wydarzenia\``);
    }

}
