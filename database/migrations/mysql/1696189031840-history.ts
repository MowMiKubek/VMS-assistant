import { MigrationInterface, QueryRunner } from "typeorm";

export class History1696189031840 implements MigrationInterface {
    name = 'History1696189031840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`historia\` (\`id_wpis\` int NOT NULL AUTO_INCREMENT, \`poczatek\` datetime NOT NULL, \`koniec\` datetime NULL, \`id_pojazdu\` int NOT NULL, \`id_user\` int NOT NULL, PRIMARY KEY (\`id_wpis\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`historia\``);
    }

}
