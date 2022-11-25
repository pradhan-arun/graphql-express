const jwt = require("jsonwebtoken");

const createToken = async (value) => {
  try {
    console.log("value = ", value);
    const token = await jwt.sign(value, process.env.JWT_SECRET_KEY, {
      expiresIn: "30hrs",
    });
    console.log("token = ", token);
    return token;
  } catch (error) {
    console.log("error from create token" - error);
  }
};

const verifyToken = async (req) => {
  console.log("request headers = ", req.headers);
  if (req.headers.authorization) {
    var token = req.headers.authorization.split(" ")[1];
    console.log("token ===   ", token);
    var verifyUser = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(" --------------------------   ", verifyUser);
    if (verifyUser) {
      return { success: true, data: verifyUser };
    }
    return { success: false, data: {} };
  }
};

module.exports = { createToken, verifyToken };
