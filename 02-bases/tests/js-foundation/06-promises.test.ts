import { describe, expect, test } from '@jest/globals';
import { getPokemonNameById } from '../../src/js-foundation/06-promises';

describe('js-foundation/06-promises', () => {
    test('getPokemonById', async () => {
        const pokemonName = await getPokemonNameById(1);
        expect(pokemonName).toBe('bulbasaur');
    });

    test('should return an error if pokemon does not exist', async () => {
        const pokemonId = 100000;
        try {
            const pokemonName = await getPokemonNameById(pokemonId);
        } catch (error) {
            expect(error).toBe(`Pokemon with id ${ pokemonId } not found`);
        }
    })
});