const users = [
    {
        id: 1,
        name: 'Jorge',
    },
    {
        id: 2,
        name: 'Luis',
    },
    {
        id: 3,
        name: 'Pedro',
    },
];

const getUserById = (id, callback) => {
    const user = users.find((user) => user.id === id);
    user
    ? callback(null, user)
    : callback(`User not found with id ${id}`);
}

module.exports = {
    getUserById
}