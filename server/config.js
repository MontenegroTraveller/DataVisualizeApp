require('dotenv').config()

const options = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  loginUrl: process.env.LOGIN_URL,
  verifyTokenUrl: process.env.VERIFY_TOKEN_URL,
  getDataSetUrl: process.env.GET_DATA_URL
}

export default options
