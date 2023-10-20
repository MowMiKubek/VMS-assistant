import { MigrationInterface, QueryRunner } from "typeorm";

export class Costs21695926214989 implements MigrationInterface {
    name = 'Costs21695926214989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`koszty\` CHANGE \`data\` \`data\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`przebiegi\` CHANGE \`data\` \`data\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`koszty\` CHANGE \`data\` \`data\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`przebiegi\` CHANGE \`data\` \`data\` datetime NOT NULL`);
    }

}
