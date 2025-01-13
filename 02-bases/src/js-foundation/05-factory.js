// const { getUUID } = require('../plugins/get-id.plugin');
// const { getAge } = require('../plugins/get-age.plugin');
// const { getAge, getUUID } = require('../plugins')

const buildMakePerson = ({ getUUID, getAge }) => {
    return ({ name, birthDate }) => {
        return {
            id: getUUID(),
            name: name,
            birthDate: birthDate,
            age: getAge(birthDate)
        }
    }
}

module.exports = {
    buildMakePerson,
}
