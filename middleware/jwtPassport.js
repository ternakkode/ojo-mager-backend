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
        }).catch(err => {
            throw new ApiErrorHandler(401, "unauthorized");
        })
    })
)

module.exports = passport.authenticate('jwt', { session: false });