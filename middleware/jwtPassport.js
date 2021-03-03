const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const ApiErrorHandler = require('./../helpers/ApiErrorHandler');
const { User } = require('../database/models');

passport.use(
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'defaultjwtapps'
    }, (res, done) => {
        return User.findByPk(res.id)
        .then(user => {
            return done(null, user);
        });
    })
)

const jwt = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, function(err, user, info) { 
        if (err) { throw new ApiErrorHandler(401, "unauthorized"); } 
        if (!user) { throw new ApiErrorHandler(401, "unauthorized"); }
        
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = jwt;