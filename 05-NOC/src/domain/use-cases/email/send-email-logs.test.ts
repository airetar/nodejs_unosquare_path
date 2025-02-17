import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"
import { SendEmailLogs } from "./send-email-logs"

describe('send-email-logs', () => {
    const mocklogRespository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mocklogRespository
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('Should call send email and save logs method', async () => {
        const sendEmailLogs = new SendEmailLogs(
            mockEmailService as any,
            mocklogRespository
        );

        const result = await sendEmailLogs.execute(`test_email@gmail.com`);
        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mocklogRespository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mocklogRespository.saveLog).toHaveBeenCalledWith(
            {
                createdAt: expect.any(Date),
                message: `Log files sent to test_email@gmail.com`,
                level: LogSeverityLevel.low,
                origin: 'send-email-logs.ts'
            }
        )
    })

    test('Should save log in case of error', async () => {
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);
        const result = await sendEmailLogs.execute(`test_email@gmail.com`);
        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mocklogRespository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mocklogRespository.saveLog).toHaveBeenCalledWith(
            {
                createdAt: expect.any(Date),
                message: expect.any(String),
                level: LogSeverityLevel.high,
                origin: 'send-email-logs.ts'
            }
        )
    })
})