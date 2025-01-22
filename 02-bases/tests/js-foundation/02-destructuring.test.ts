import { describe, expect, test } from "@jest/globals";
import { characters } from "../../src/js-foundation/02-destructuring";

describe('js-foundation/02-destructuring', () => {
    test('characters should contain Flash and Superman', () => {
        expect(characters).toContain('Flash');
        expect(characters).toContain('Superman');
    });

    test('characters should not contain Green Lantern ', () => {
        expect(characters).not.toContain('Green Lantern');
    });

    test('first character should be Flash and second Arrow', () => {
        const [first, second] = characters;
        expect(first).toBe('Flash');
        expect(second).toBe('Arrow');
    });
});