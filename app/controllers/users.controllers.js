const userService = require('../service/users.service')

const createUser = (comment,done) => {
    userService.createUser(comment,done);
}

const getUsers = (done) => {
    userService.getUsers(done);
}

const getUser = (user_id,done) => {
    userService.getUser(user_id,done);
}

module.exports = {
    createUser,getUsers,getUser
}