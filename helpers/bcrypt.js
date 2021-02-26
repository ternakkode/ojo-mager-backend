const bcrypt = require('bcrypt');

const encryptPassword = async (password) => await bcrypt.hash(password, 10);
const comparePassword = async (nonDecryptedPassword, DecryptedPassword) => await bcrypt.compare(nonDecryptedPassword, DecryptedPassword);

module.exports = {
    encryptPassword,
    comparePassword
}