import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

const mockRepository = {
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
        const checkservice = new CheckService(
            mockRepository,
            successCallback,
            errorCallback
        );
        const wasOk = await checkservice.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    })

    test('should call errorcallback when fetch return false', async () => {
        const checkservice = new CheckService(
            mockRepository,
            successCallback,
            errorCallback
        );
        const wasOk = await checkservice.execute('https://gyfjhbjhoogle.com');

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    })
})