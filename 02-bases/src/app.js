/*
 * Referencia a module exports de archivos/métodos
let { emailTemplate } = require('./js-foundation/01-template');
emailTemplate = emailTemplate.replace('{{ name }}', 'John Doe');
emailTemplate = emailTemplate.replace('{{ orderDetail }}', 'Order detail Amazon Echo');
console.log(emailTemplate);
*/

/*
 * Referencia a archivo 02 destructuring
require('./js-foundation/02-destructuring');
*/

/*
 * Referencia a ejercicio de 03 callbacks y 04 arrow functions

const { getUserById } = require('./js-foundation/04-arrow');
getUserById(1, (error, user) => {
    if (error) {
        throw new Error(error);
    }

    console.log({user});
});
*/

/*
 * Referencia a 05 factory, patrones Factory Functions (buildMakePerson) y Adapter (getUUID, getAge)
const { getAge, getUUID } = require('./plugins')
const { buildMakePerson } = require('./js-foundation/05-factory');
const makePerson = buildMakePerson({ getUUID, getAge })
const obj = { name: 'John', birthDate: '1985-10-15' };
const johnDoe = makePerson(obj);
*/



/* const getPokemonById = require('./js-foundation/06-promises');
const name = getPokemonById(4)
    .then((pokemon) => console.log(pokemon))
    .catch((error) => console.log('Ha ocurrido un error, intente nuevamnete: ', error))
    .finally(() => console.log('Final')); */


const { buildLogger } = require('./plugins');

const logger = buildLogger('app.js');

logger.log('This is a test message');
logger.error('This is a test ERROR');
