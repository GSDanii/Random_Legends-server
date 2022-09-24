const roleValidation = (roles) => (req, res, next) => {

    if (req.session.user && roles.includes(req.session.user.role)) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

const userValidation = (roles) => (req, res, next) => {

    if (req.session.user._id === req.params.id && roles.includes(req.session.user.role)) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

module.exports = {
    roleValidation, userValidation
}
