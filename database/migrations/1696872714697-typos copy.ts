import { MigrationInterface, QueryRunner } from "typeorm";

export class Typos1696872714697 implements MigrationInterface {
    name = 'Typos1696872714697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE \`pojazdy\` ADD UNIQUE INDEX \`IDX_cd9b970e9ff625ea3f056ff6ee\` (\`VIN\`)`);
        await queryRunner.query(`ALTER TABLE \`pojazdy\` ADD UNIQUE INDEX \`IDX_764d4e0321e994b9cee1f237d2\` (\`nr_rejestracyjny\`)`);
        await queryRunner.query(`ALTER TABLE \`mandaty\` CHANGE \`waznosc\` \`waznosc\` int NOT NULL DEFAULT '12'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mandaty\` CHANGE \`waznosc\` \`waznosc\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pojazdy\` DROP INDEX \`IDX_764d4e0321e994b9cee1f237d2\``);
        await queryRunner.query(`ALTER TABLE \`pojazdy\` DROP INDEX \`IDX_cd9b970e9ff625ea3f056ff6ee\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
    }

}
