const checkRoleUser = ((userRole, role) => userRole === role)

const checkUser = ((session, user) => session === user)

module.exports = {
    checkRoleUser,
    checkUser
} 