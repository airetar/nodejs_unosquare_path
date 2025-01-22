import { describe, expect, test } from '@jest/globals';
import { getUserById } from '../../src/js-foundation/03-callbacks';

describe('js-foundation/03-callbacks.ts', () => {
    test('getUserById should return an error if the user is not found', () => {
        getUserById(4, (err, user) => {
            expect(err).toBe('User not found with id 4');
            expect(user).toBeUndefined();
        })
    });

    test('getUserById should return Jorge if parameter is 1', () => {
        getUserById(1, (err, user) => {
            expect(err).toBeUndefined();
            expect(user).toStrictEqual({
                id: 1,
                name: 'Jorge'
            });
        })
    });

    test('getUserById should return a user ', () => {
        getUserById(2, (err, user) => {
            expect(err).toBeUndefined();
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('name');
        })
    });
});
