import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl"

describe('LogRepositoryImpl', () => {
    const mockDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    const log = new LogEntity({
        message: 'log reposityr impl',
        level: LogSeverityLevel.low,
        origin: 'Log repository impl'
    })

    test('Should call the datasource saveLog with arguments', () => {
        const repositoryImpl = new LogRepositoryImpl(mockDataSource);
        repositoryImpl.saveLog(log);
        expect(mockDataSource.saveLog).toHaveBeenCalledTimes(1);
        expect(mockDataSource.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    })

    test('Should call the datasource getLogs with arguments', () => {
        const repositoryImpl = new LogRepositoryImpl(mockDataSource);
        repositoryImpl.getLogs(LogSeverityLevel.low);
        expect(mockDataSource.getLogs).toHaveBeenCalledTimes(1);
        expect(mockDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
    })
})