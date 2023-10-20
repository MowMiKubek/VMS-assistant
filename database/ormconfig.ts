import { DataSource } from "typeorm";


import { config } from "dotenv";
const ENV = process.env.NODE_ENV || 'development';

if(ENV === 'production')
    config({ path: `${process.cwd()}/.env` });
else
    config({ path: `${process.cwd()}/development.env` });


export default new DataSource({
    type: `${ENV === 'production' ? 'postgres' : 'mysql'}`,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [`${process.cwd()}/src/**/*.entity.ts`],
    migrations: [`${process.cwd()}/database/migrations${process.env.NODE_ENV === 'production' ? '/postgres' : '/mysql'}/**/*.ts`],
})