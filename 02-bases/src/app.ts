/*
//* Referencia a module exports de archivos/métodos
import { emailTemplate } from "./js-foundation/01-template";
let emailTemplateCopy = emailTemplate;
emailTemplateCopy = emailTemplateCopy.replace('{{ name }}', 'John Doe');
emailTemplateCopy = emailTemplateCopy.replace('{{ orderDetail }}', 'Order detail Amazon Echo');
console.log(emailTemplateCopy); 
*/

import { getPokemonNameById } from "./js-foundation/06-promises";

/* 
//* Referencia a archivo 02 destructuring
require('./js-foundation/02-destructuring');
 */


/* 
//* Referencia a ejercicio de 03 callbacks y 04 arrow functions
//import { getUserById } from "./js-foundation/03-callbacks";
import { getUserById } from "./js-foundation/04-arrow";
getUserById(1, (error, user) => {
    if (error) {
        throw new Error(error);
    }

    console.log({user});
});
*/




/*
//* Referencia a 05 factory, patrones Factory Functions (buildMakePerson) y Adapter (getUUID, getAge)
import { getUUID, getAge } from './plugins';
const { buildMakePerson } = require('./js-foundation/05-factory');
const makePerson = buildMakePerson({ getUUID, getAge })
const obj = { name: 'John', birthDate: '1985-10-15' };
const johnDoe = makePerson(obj);
console.log(johnDoe); 
*/






/*
//* Referencia a 06 promises 

const name = getPokemonNameById(4)
    .then((pokemon) => console.log(pokemon))
    .catch((error) => console.log('Ha ocurrido un error, intente nuevamnete: ', error))
    .finally(() => console.log('Final'));
*/




//* Referencia a Logger winston
import { buildLogger } from "./plugins";

const logger = buildLogger('app.js');

logger.log('This is a test message');
logger.error('This is a test ERROR');



