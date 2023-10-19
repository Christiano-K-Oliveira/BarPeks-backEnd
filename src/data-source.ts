import 'dotenv/config'
import path from 'path'
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}')
    const migrationsPath: string = path.join(__dirname, './migrations/**.{ts,js}')
    const nodeEnv: string | undefined = process.env.NODE_ENV
    
    const dbUrl: string | undefined = process.env.DATABASE_URL

    if(!dbUrl){
        throw new Error("Missing env var: 'DATABASE_URL'")
    }


    if(nodeEnv === 'test'){
        return {
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            entities: [entitiesPath]
        }
    }
    else if (nodeEnv === "production") {
        return {
          type: "postgres",
          url: dbUrl,
          entities: [entitiesPath],
          migrations: [migrationsPath],
        };
      }

    return {
        type: 'postgres',
        url: dbUrl,
        synchronize: false,
        logging: true,
        migrations: [migrationsPath],
        entities: [entitiesPath]
    }
}

const AppDataSource = new DataSource(dataSourceConfig())

export { AppDataSource }