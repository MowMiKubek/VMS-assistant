import { MigrationInterface, QueryRunner } from "typeorm";

export class Typos1696872714698 implements MigrationInterface {
    name = 'Typos1696872714698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pojazdy\` RENAME INDEX \`IDX_cd9b970e9ff625ea3f056ff6ee\` to \`IDX_VIN_UNIQUE\``);
        await queryRunner.query(`ALTER TABLE \`pojazdy\` RENAME INDEX \`IDX_764d4e0321e994b9cee1f237d2\` to \`nr_rejestracyjny_UNIQUE\``);
        await queryRunner.query(`ALTER TABLE \`users\` RENAME INDEX \`IDX_97672ac88f789774dd47f7c8be\` to \`IDX_email_UNIQUE\``);
        await queryRunner.query(`ALTER TABLE \`users\` RENAME INDEX \`IDX_2d443082eccd5198f95f2a36e2\` to \`IDX_login_UNIQUE\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pojazdy\` RENAME INDEX \`IDX_VIN_UNIQUE\` to \`IDX_cd9b970e9ff625ea3f056ff6ee\``);
        await queryRunner.query(`ALTER TABLE \`pojazdy\` RENAME INDEX \`nr_rejestracyjny_UNIQUE\` to \`IDX_764d4e0321e994b9cee1f237d2\``);
        await queryRunner.query(`ALTER TABLE \`users\` RENAME INDEX \`IDX_email_UNIQUE\` to \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`ALTER TABLE \`users\` RENAME INDEX \`IDX_login_UNIQUE\` to \`IDX_2d443082eccd5198f95f2a36e2\``);
    }
}
