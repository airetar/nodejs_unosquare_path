import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('filesystem datasource', () => {

    const allLogsFilename = 'logs-all.log';
    const mediumLogsFilename = 'logs-medium.log';
    const highLogsFilename = 'logs-high.log';

    const logPath = path.join(__dirname, '../../../logs');
    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    })

    test('should create log files if they dont exist', () => {
        new FileSystemDatasource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual([
            allLogsFilename, highLogsFilename, mediumLogsFilename
        ])
    })

    test('Should save a log in all logs file', () => {
        const logDataSource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.ts'
        });
        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/${allLogsFilename}`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
    })

    test('Should save a log in all logs file and medium logs file', () => {
        const logDataSource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.ts'
        });
        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/${allLogsFilename}`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/${mediumLogsFilename}`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    })

    test('Should save a log in all logs file and high logs file', () => {
        const logDataSource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.ts'
        });
        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/${allLogsFilename}`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/${highLogsFilename}`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    })

    test('Should return all logs', async () => {
        const logDataSource = new FileSystemDatasource();
        const logLow = new LogEntity({
            message: 'test low',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.ts'
        });
        const logMedium = new LogEntity({
            message: 'test medium',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.ts'
        });
        const logHigh = new LogEntity({
            message: 'test high',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.ts'
        });

        await logDataSource.saveLog(logHigh);
        await logDataSource.saveLog(logLow);
        await logDataSource.saveLog(logMedium);

        const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);

        expect( logsLow ).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh ]) );
        expect( logsMedium ).toEqual( expect.arrayContaining([ logMedium ]) );
        expect( logsHigh ).toEqual( expect.arrayContaining([ logHigh ]) );
    })

    test('should throw an error if path not exist', () => {
        new FileSystemDatasource();
        new FileSystemDatasource();
    })

    test('should throw an error when severity level is not implemented',async () => {
        const logDataSource = new FileSystemDatasource();
        const customSeverity = 'super_high' as LogSeverityLevel;
        try {
            await logDataSource.getLogs(customSeverity);
            expect(true).toBeFalsy();
        } catch (error) {
            const errorStr = `${error}`;
            expect(errorStr).toBe(`Error: Severity ${customSeverity} Not implemented`)
        }
    })

    test('should return and empy array when file is empty', async () => {
        const logDataSource = new FileSystemDatasource();
        const anyLevelLogs = await logDataSource.getLogs(LogSeverityLevel.low);
        expect(anyLevelLogs.length).toBe(0);
    })
})