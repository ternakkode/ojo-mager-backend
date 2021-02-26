const jwt = require('jsonwebtoken')

exports.generateJwtToken = (id) => jwt.sign({id}, process.env.JWT_SECRET || 'defaultjwtapps')