import { describe, expect, test } from '@jest/globals';
import { httpClientPlugin } from '../../src/plugins/http-client.plugin';

describe('plugins/http-client.plugin.ts', () => {
    test('should return a string', async () => {
        const url = 'https://jsonplaceholder.typicode.com/todos/1';
        const data = await httpClientPlugin.get(url);
        expect(data).toEqual(
            {
                "userId": 1,
                "id": 1,
                "title": "delectus aut autem",
                "completed": expect.any(Boolean)
            }
        );
       // expect(data).resolves.toBeInstanceOf(Object);
    });

    test('Should have methods POST, PUT, DELETE', async () => {
        expect(typeof httpClientPlugin.post).toBe('function');
        expect(typeof httpClientPlugin.put).toBe('function');
        expect(typeof httpClientPlugin.delete).toBe('function');
    });
});