const jsonwebtoken = require('jsonwebtoken')
// 密钥，只需跟解密的保持一致即可
const secret = "czx"

const jwt = {
  generate(value, exprires) {
    return jsonwebtoken.sign(value, secret, {expiresIn: exprires})
  },
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret)
    } catch(err) {
      return err
    }
  }
}

module.exports = jwt