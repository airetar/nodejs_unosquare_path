import { describe, expect, jest, test } from "@jest/globals";
import { getAge } from "../../src/plugins/get-age.plugin";

describe('plugins/get-age.plugin.ts', () => {
    test('getAge() should return the age of a person', () => {
        const birthDate = '1985-10-21';
        const age = getAge(birthDate);
        expect(typeof age).toBe('number');
    });

    test('getAge() should return current age', () => {
        const birthDate = '1985-10-21';
        const age = getAge(birthDate);
        
        const calculatedAge = new Date().getFullYear() - new Date(birthDate).getFullYear();

        expect(calculatedAge).toBe(age);
    });

    test('getAge() should return 0 if birthdate is today', () => {
        const spy = jest.spyOn( Date.prototype, 'getFullYear' ).mockReturnValue(1995);

        const birthDate = '1995-10-21';
        const age = getAge(birthDate);
        expect(age).toBe(0);
        expect(spy).toHaveBeenCalled();
    });
});