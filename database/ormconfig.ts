import { DataSource } from "typeorm";


import { config } from "dotenv";
config({ path: `${process.cwd()}/development.env` });

console.log(process.env.DB_HOST)

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [`${process.cwd()}/src/**/*.entity.ts`],
    migrations: [`${process.cwd()}/database/migrations/**/*.ts`],
})