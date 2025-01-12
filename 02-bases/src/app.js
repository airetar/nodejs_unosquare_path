let { emailTemplate } = require('./js-foundation/01-template');
require('./js-foundation/02-destructuring');
const { getUserById } = require('./js-foundation/03-callbacks');

/*
emailTemplate = emailTemplate.replace('{{ name }}', 'John Doe');
emailTemplate = emailTemplate.replace('{{ orderDetail }}', 'Order detail Amazon Echo');
console.log(emailTemplate);
*/

getUserById(3, function (error, user) {
    if (error) {
        throw new Error(error);
    }

    console.log({user});
});

