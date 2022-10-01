const checkRoleUser = ((userRole, role) => userRole === role)

const checkUser = ((token, user) => token === user)

module.exports = {
    checkRoleUser,
    checkUser
} 