const passport = require('passport');

const checkAdminAuth = (req, res, next) => {

    if (req.cookies.admin) {
        passport.authenticate('adminJWT', { session:false })(req, res, next)
    }

    else next();

}

module.exports = { checkAdminAuth };