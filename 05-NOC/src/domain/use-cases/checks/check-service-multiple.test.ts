import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";
import { CheckServiceMultiple } from "./check-service-multiple";

const mockRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
};

const mockRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
};

const mockRepository3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
};

const successCallback = jest.fn();
const errorCallback = jest.fn();

describe('check-service.ts use case', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call successcallback when fetch return true', async () => {
        const checkservice = new CheckServiceMultiple(
            [mockRepository1, mockRepository2, mockRepository3],
            successCallback,
            errorCallback
        );
        const wasOk = await checkservice.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    })

    test('should call errorcallback when fetch return false', async () => {
        const checkservice = new CheckServiceMultiple(
            [mockRepository1, mockRepository2, mockRepository3],
            successCallback,
            errorCallback
        );
        const wasOk = await checkservice.execute('https://gyfjhbjhoogle.com');

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    })
})