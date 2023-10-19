import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697663199360 implements MigrationInterface {
    name = 'Init1697663199360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tankowania_typ_paliwa_enum" AS ENUM('benzyna', 'diesel', 'LPG', 'inne')`);
        await queryRunner.query(`CREATE TABLE "tankowania" ("id_tankowania" SERIAL NOT NULL, "ilosc_paliwa" numeric NOT NULL, "typ_paliwa" "public"."tankowania_typ_paliwa_enum" NOT NULL DEFAULT 'inne', "cena_za_litr" integer NOT NULL, "cena" integer NOT NULL, "blokada" smallint NOT NULL DEFAULT '0', "id_pojazdu" integer NOT NULL, CONSTRAINT "PK_d89cb11e661221821ef277f0080" PRIMARY KEY ("id_tankowania"))`);
        await queryRunner.query(`CREATE TABLE "przebiegi" ("id_przebiegu" SERIAL NOT NULL, "stan_licznika" integer NOT NULL, "data" TIMESTAMP NOT NULL DEFAULT now(), "id_pojazdu" integer NOT NULL, CONSTRAINT "PK_8ae627f0fd7cbefac5e9dc30dec" PRIMARY KEY ("id_przebiegu"))`);
        await queryRunner.query(`CREATE TABLE "wydarzenia" ("id_wydarzenia" SERIAL NOT NULL, "nazwa" character varying(20) NOT NULL, "opis" text NOT NULL, "data" TIMESTAMP NOT NULL, "koszt" integer NOT NULL, "czy_przypomniec" smallint NOT NULL DEFAULT '0', "czy_okresowe" smallint NOT NULL DEFAULT '0', "okres" integer, "id_pojazdu" integer NOT NULL, CONSTRAINT "PK_6f564f7231e4463d2a517007ae3" PRIMARY KEY ("id_wydarzenia"))`);
        await queryRunner.query(`CREATE TYPE "public"."pojazdy_typ_paliwa_enum" AS ENUM('benzyna', 'diesel', 'LPG', 'inne')`);
        await queryRunner.query(`CREATE TABLE "pojazdy" ("id_pojazdu" SERIAL NOT NULL, "marka" character varying NOT NULL, "model" character varying NOT NULL, "rocznik" integer NOT NULL, "VIN" character varying, "nr_rejestracyjny" character varying, "data_pierw_rej" date, "typ_paliwa" "public"."pojazdy_typ_paliwa_enum" NOT NULL DEFAULT 'inne', "kategoria" character varying(2), "id_user" integer, CONSTRAINT "UQ_VIN" UNIQUE ("VIN"), CONSTRAINT "UQ_NR_REJESTRACYJNY" UNIQUE ("nr_rejestracyjny"), CONSTRAINT "PK_37a01cf6d6319eb8614672dd009" PRIMARY KEY ("id_pojazdu"))`);
        await queryRunner.query(`CREATE TABLE "mandaty" ("id_mandatu" SERIAL NOT NULL, "nazwa" character varying(50) NOT NULL, "liczba_punktow" integer NOT NULL, "waznosc" integer NOT NULL DEFAULT '12', "data_wystawienia" TIMESTAMP NOT NULL, "cena" integer NOT NULL, "id_user" integer NOT NULL, CONSTRAINT "PK_31657ba8fe97757471d68ec4330" PRIMARY KEY ("id_mandatu"))`);
        await queryRunner.query(`CREATE TABLE "uprawnienia" ("id_uprawnienia" SERIAL NOT NULL, "kategoria" character varying(2) NOT NULL, "id_user" integer NOT NULL, CONSTRAINT "PK_13ad074bdc8c41e3334b09fea30" PRIMARY KEY ("id_uprawnienia"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_rola_enum" AS ENUM('user', 'manager', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "users" ("id_user" SERIAL NOT NULL, "imie" character varying(50) NOT NULL, "nazwisko" character varying(50) NOT NULL, "email" character varying(45) NOT NULL, "login" character varying(45) NOT NULL, "haslo" text NOT NULL, "rola" "public"."users_rola_enum" NOT NULL DEFAULT 'user', "status" "public"."users_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "UQ_EMAIL" UNIQUE ("email"), CONSTRAINT "UQ_LOGIN" UNIQUE ("login"), CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "koszty" ("id_kosztu" SERIAL NOT NULL, "nazwa" character varying(50) NOT NULL, "opis" text NOT NULL, "koszt" integer NOT NULL, "data" TIMESTAMP NOT NULL DEFAULT now(), "id_user" integer NOT NULL, CONSTRAINT "PK_316d84222f1f249308b4ddc88be" PRIMARY KEY ("id_kosztu"))`);
        await queryRunner.query(`CREATE TABLE "historia" ("id_wpis" SERIAL NOT NULL, "poczatek" TIMESTAMP NOT NULL, "koniec" TIMESTAMP, "id_pojazdu" integer NOT NULL, "id_user" integer NOT NULL, CONSTRAINT "PK_f14063d52d9465f7151b21fc16f" PRIMARY KEY ("id_wpis"))`);
        await queryRunner.query(`ALTER TABLE "tankowania" ADD CONSTRAINT "FK_c1f49578d78704f56641cb01c43" FOREIGN KEY ("id_pojazdu") REFERENCES "pojazdy"("id_pojazdu") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "przebiegi" ADD CONSTRAINT "FK_79e3da3a2df8ec56cc4e1fcb826" FOREIGN KEY ("id_pojazdu") REFERENCES "pojazdy"("id_pojazdu") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wydarzenia" ADD CONSTRAINT "FK_5e686d879ed14cb7be2f34f3a4c" FOREIGN KEY ("id_pojazdu") REFERENCES "pojazdy"("id_pojazdu") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pojazdy" ADD CONSTRAINT "FK_69a34179be47cb7f8142b87bea2" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mandaty" ADD CONSTRAINT "FK_cf9351a4584e4e48b236f271330" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "uprawnienia" ADD CONSTRAINT "FK_668595a2e266bc71de9c283d972" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "koszty" ADD CONSTRAINT "FK_86f5416c62b93341c093d7123ee" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "koszty" DROP CONSTRAINT "FK_86f5416c62b93341c093d7123ee"`);
        await queryRunner.query(`ALTER TABLE "uprawnienia" DROP CONSTRAINT "FK_668595a2e266bc71de9c283d972"`);
        await queryRunner.query(`ALTER TABLE "mandaty" DROP CONSTRAINT "FK_cf9351a4584e4e48b236f271330"`);
        await queryRunner.query(`ALTER TABLE "pojazdy" DROP CONSTRAINT "FK_69a34179be47cb7f8142b87bea2"`);
        await queryRunner.query(`ALTER TABLE "wydarzenia" DROP CONSTRAINT "FK_5e686d879ed14cb7be2f34f3a4c"`);
        await queryRunner.query(`ALTER TABLE "przebiegi" DROP CONSTRAINT "FK_79e3da3a2df8ec56cc4e1fcb826"`);
        await queryRunner.query(`ALTER TABLE "tankowania" DROP CONSTRAINT "FK_c1f49578d78704f56641cb01c43"`);
        await queryRunner.query(`DROP TABLE "historia"`);
        await queryRunner.query(`DROP TABLE "koszty"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_rola_enum"`);
        await queryRunner.query(`DROP TABLE "uprawnienia"`);
        await queryRunner.query(`DROP TABLE "mandaty"`);
        await queryRunner.query(`DROP TABLE "pojazdy"`);
        await queryRunner.query(`DROP TYPE "public"."pojazdy_typ_paliwa_enum"`);
        await queryRunner.query(`DROP TABLE "wydarzenia"`);
        await queryRunner.query(`DROP TABLE "przebiegi"`);
        await queryRunner.query(`DROP TABLE "tankowania"`);
        await queryRunner.query(`DROP TYPE "public"."tankowania_typ_paliwa_enum"`);
    }

}
