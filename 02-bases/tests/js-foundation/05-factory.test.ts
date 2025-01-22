import { describe, expect, test } from '@jest/globals';
import { buildMakePerson } from '../../src/js-foundation/05-factory';


describe('js-foundation/05-factory.ts', () => {

    const getUUID = () => '123abc';
    const getAge = () => 30;

    test('buildMakePerson should return a function', () => {
        const makePerson = buildMakePerson({  getUUID, getAge });
        expect(typeof makePerson).toBe('function');
    })

    test('buildMakePerson should return a Person', () => {
        const makePerson = buildMakePerson({ getUUID, getAge });
        const person = makePerson({ name: 'Jorge', birthDate: '1991-01-01' });
        expect(person).toStrictEqual({
            id: getUUID(),
            name: 'Jorge',
            birthDate: '1991-01-01',
            age: getAge()
        });
    })
});