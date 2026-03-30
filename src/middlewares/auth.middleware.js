const { unAuthorzation } = require('../utils/handleResponse.util');
const authServices = require('../services/auth.service');
// const authenServices = require('../services/authentication.service');
const db = require('../models/index.model');
const { asyncHandler } = require('../utils/handler.util');
const JWT = require('jsonwebtoken');
const { verifyTokenJWT } = require('../utils/jwt.util');
require('dotenv').config();

const verifySessionAdmin = async (req, res, next) => {
  const session = req.headers.sessionid;
  const sessionData = session ? await authServices.getSession(session) : null;
  const roleData = sessionData
    ? await authServices.getRole(JSON.parse(sessionData.data)?.userid)
    : null;
  if (!session || !roleData || roleData?.roleid !== 1) return unAuthorzation(res);
  req.userid = JSON.parse(sessionData.data)?.userid;
  next();
};

const verifyTokenAdmin = async (req, res, next) => {
  const authorization = req.header('Authorization');
  if (!authorization) return unAuthorzation(res);
  const token = authorization.split(' ')[1];
  const data = verifyTokenJWT(token);
  if (!data || data.role !== 'ADMIN') return unAuthorzation(res);
  req.data = data;
  next();
};

const verifySessionUser = async (req, res, next) => {
  const session = req.headers.sessionid;
  const sessionData = session ? await authServices.getSession(session) : null;
  if (!sessionData) return unAuthorzation(res);
  req.userid = JSON.parse(sessionData.data)?.userid;
  next();
};

const verifyTokenUser = async (req, res, next) => {
  try {
    const encoded = req.headers.authorization;
    if (!encoded) {
      return unAuthorzation(res);
    }
    const decoded = JWT.verify(encoded, process.env.JWT_ACCESS_KEY);
    req.userid = decoded.id;
    next();
  } catch (error) {
    console.log(error);
  }
};

const authenticationV2 = asyncHandler(async (req, res, next) => {
  let userid = req.headers.userid;
  if (!userid) return res.status(404).JSON('false');
  const keyStore = await db.tb_token.findOne({
    where: {
      userid: userid,
    },
    attributes: ['id', 'publicKey', 'privateKey', 'userid'],
  });
  if (!keyStore) return res.status(404).JSON('false');

  userid = parseInt(userid);
  if (req.headers.refreshtoken) {
    try {
      const refreshToken = req.headers.refreshtoken;
      const decodeUser = verifyJWT(refreshToken, keyStore.privateKey);
      if (userid !== decodeUser.id) return res.status(404).JSON('ez');
      req.keyStore = keyStore;
      req.user = decodeUser;
      req.refreshtoken = refreshToken;
      next();
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const accessToken = req.headers.accesstoken;
  if (!accessToken) return res.status(404).JSON('false');
  try {
    const decodeUser = verifyJWT(accessToken, keyStore.publicKey, (err) => {
      if (err) console.log('huhuhuhu');
      return res.status(404).json({ message: 'ez' });
    });
    if (userid !== decodeUser.id || decodeUser === undefined) return res.status(404).JSON('false');
    req.keyStore = keyStore;
    req.user = decodeUser;
    // req.accesstoken = accessToken;
    next();
  } catch (error) {
    console.log(error);
    // return
  }
});

const verifyJWT = (token, keySecret) => {
  return JWT.verify(token, keySecret);
};

const verifyUserId = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return unAuthorzation(res);
    }
    const accessToken = token.split(' ')[1];
    const decodedToken = JWT.verify(accessToken, process.env.JWT_ACCESS_KEY);
    const userid = decodedToken.userid;

    req.userid = userid;
    next();
  } catch (error) {
    return unAuthorzation(res);
  }
};

const verifyToken = (req, res, next) => {
  //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  const token = req.headers.token;
  // const refreshToken = req.cookies.refreshToken;
  if (token) {
    const accessToken = token.split(' ')[1];
    JWT.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        res.status(403).json('Token is not valid!');
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

const verifyLanguage = async (req, res, next) => {
  const locale = req.headers.locale;

  let language_id;

  if (locale === 'en') {
    language_id = 1;
  } else if (locale === 'vi') {
    language_id = 2;
  } else {
    language_id = 1;
  }
  await authServices.getLanguage(language_id);
  req.language_id = language_id;
  next();
};

// VERIFY API KEY
const verifyApiKey = async (req, res, next) => {
  const apiKey = req.header('X-API-Key');
  if (!apiKey || apiKey !== process.env.API_KEY) return unAuthorzation(res);
  next();
};

module.exports = {
  verifySessionAdmin,
  verifySessionUser,
  verifyTokenUser,
  authenticationV2,
  verifyJWT,
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
  verifyUserId,
  verifyTokenAdmin,
  verifyLanguage,
  verifyApiKey,
};
