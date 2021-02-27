const cryptojs = require("crypto-js");
const key = process.env.CRYPTO_KEY || "aplikasifitness";

const generateRandomAccountCode = (type, email) => cryptojs.HmacSHA1(`${type}${email}${Date.now()}`, key).toString()

module.exports = {
    generateRandomAccountCode
}