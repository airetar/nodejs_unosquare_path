import { describe, expect, jest, test } from '@jest/globals';
import { buildLogger, logger as winstonLogger } from '../../src/plugins/logger.plugin';

describe('plugins/logger.plugin.ts', () => {
    test('Logger properties must be functions', () => {
        const logger = buildLogger('test');

        expect(typeof logger.log).toBe('function');
        expect(typeof logger.error).toBe('function');
    });

    test('logger.log must be called', () => {
        const message = 'Messages';
        const service = 'Service test';
        const winstonLoggerMock = jest.spyOn(winstonLogger, 'log');
        const logger = buildLogger(service);

        logger.log(message);
        
        expect(winstonLoggerMock).toHaveBeenCalledWith(
            'info',
            expect.objectContaining({ message, service })
        );

    });

    test('logger.error must be called', () => {
        const winstonLoggerMock = jest.spyOn(winstonLogger, 'error');
        const logger = buildLogger('test');
        logger.error('Messages');
        expect(winstonLoggerMock).toHaveBeenCalled();
    });
}); 