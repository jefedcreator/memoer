const usersDao = require('../dao/users.dao')

const createUser = (user,done) => {
    usersDao.createUser(user,done);
}

const getUsers = (done) => {
    usersDao.getUsers(done);
}

const getUser = (user_id,done) => {
    usersDao.getUser(user_id,done);
}

module.exports = {
    createUser,getUsers,getUser
}