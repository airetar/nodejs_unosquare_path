let { emailTemplate } = require('./js-foundation/01-template');
require('./js-foundation/02-destructuring');
const { getUserById } = require('./js-foundation/04-arrow');

/*
emailTemplate = emailTemplate.replace('{{ name }}', 'John Doe');
emailTemplate = emailTemplate.replace('{{ orderDetail }}', 'Order detail Amazon Echo');
console.log(emailTemplate);
*/

getUserById(1, (error, user) => {
    if (error) {
        throw new Error(error);
    }

    console.log({user});
});

