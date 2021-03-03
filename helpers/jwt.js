const jwt = require('jsonwebtoken')

const generateJwtToken = (id) => jwt.sign({id}, process.env.JWT_SECRET || 'defaultjwtapps', {expiresIn: '1d'})

module.exports = {
    generateJwtToken
}