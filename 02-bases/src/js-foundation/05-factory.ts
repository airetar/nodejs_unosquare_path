// const { getUUID } = require('../plugins/get-id.plugin');
// const { getAge } = require('../plugins/get-age.plugin');
// const { getAge, getUUID } = require('../plugins')

interface BuildMakerPersonOptions {
    getUUID: () => string,
    getAge: (birthDate: string) => number
}

interface BuildPerson {
    name: string,
    birthDate: string
}

export const buildMakePerson = ({ getUUID, getAge }: BuildMakerPersonOptions) => {
    return ({ name, birthDate }: BuildPerson) => {
        return {
            id: getUUID(),
            name: name,
            birthDate: birthDate,
            age: getAge(birthDate)
        }
    }
}
