import { LogEntity, LogSeverityLevel } from "./log.entity"

const dataObj = {
    level: LogSeverityLevel.high,
    message: 'message test',
    origin: 'log.entity.test.ts'
};

describe('LogEntity', () => {
    test('Should create a log entity instance', () => {
        const log = new LogEntity(dataObj);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('Should create a Logentoty instance from json', () => {
        const json = `{"message":"TypeError: fetch failed","level":"high","origin":"check-service.ts","createdAt":"2025-02-11T06:52:20.028Z"}`;
        const log = LogEntity.fromJSON(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('TypeError: fetch failed');
        expect(log.level).toBe('high');
        expect(log.origin).toBe('check-service.ts');
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from object', () => {
        const entity = new LogEntity(dataObj);
        expect(entity).toBeInstanceOf(LogEntity);
        expect(entity.message).toBe(dataObj.message);
        expect(entity.level).toBe(dataObj.level);
        expect(entity.origin).toBe(dataObj.origin);
        expect(entity.createdAt).toBeInstanceOf(Date);
    });
})