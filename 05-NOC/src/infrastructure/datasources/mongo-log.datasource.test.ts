import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

beforeAll(async () => {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })
});

afterEach(async () => {
    await LogModel.deleteMany();
})

afterAll(async () => {
    mongoose.connection.close();
});

const logDataSource = new MongoLogDatasource();

const log = new LogEntity({
    level: LogSeverityLevel.low,
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts'
});

describe('mongo-log-datasource', () => {
    test('Should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log');
        await logDataSource.saveLog(log);
        expect(logSpy).toHaveBeenCalled();
    })
    
    test('should get logs', async () => {
        await logDataSource.saveLog(log);
        const logs = await logDataSource.getLogs(LogSeverityLevel.low);
        expect( logs.length ).toBe(1);
        expect( logs[0] ).toBeInstanceOf( LogEntity );

    })
})