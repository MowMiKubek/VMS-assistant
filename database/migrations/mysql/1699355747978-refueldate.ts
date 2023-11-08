import { MigrationInterface, QueryRunner } from "typeorm";

export class Refueldate1699355747978 implements MigrationInterface {
    name = 'Refueldate1699355747978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tankowania\` ADD \`data\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`historia\` ADD CONSTRAINT \`FK_048945c9f54aa93ee8a5fcab28f\` FOREIGN KEY (\`id_pojazdu\`) REFERENCES \`pojazdy\`(\`id_pojazdu\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`historia\` ADD CONSTRAINT \`FK_e2652ae28169926b7c550f646f3\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`historia\` DROP FOREIGN KEY \`FK_e2652ae28169926b7c550f646f3\``);
        await queryRunner.query(`ALTER TABLE \`historia\` DROP FOREIGN KEY \`FK_048945c9f54aa93ee8a5fcab28f\``);
        await queryRunner.query(`ALTER TABLE \`tankowania\` DROP COLUMN \`data\``);
    }

}
