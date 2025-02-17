import { PrismaClient } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgreLogDatasource } from "./postgre-log.datasource";



describe('postgre-log-datasource', () => {
    const logDataSource = new PostgreLogDatasource();
    const prismaClient = new PrismaClient();

    afterEach(async () => {
        await prismaClient.logModel.deleteMany();
    });

    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test message',
        origin: 'postgre-log.datasource.test.ts'
    });

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