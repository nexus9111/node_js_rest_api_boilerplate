const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/variables");
const logger = require("../config/logger");
const errors = require("../config/errors");

const User = require("../users/models/userModels");

const responseUtils = require("../utils/apiResponseUtils");


let schema = new passwordValidator();

schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(["Passw0rd", "Password123"]); // Blacklist these values

exports.isPasswordValid = (password) => {
    return schema.validate(password);
};

const getConnectedUser = async (req) => {
    let decoded;

    let token = req.headers.authorization;
    if (!token) {
        responseUtils.errorResponse(req, errors.errors.UNAUTHORIZED, "missing token");
    };

    try {
        token = token.split(" ")[1];
        decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            throw new Error("invalid token");
        }
    } catch {
        responseUtils.errorResponse(req, errors.errors.UNAUTHORIZED, "invalid token");
    }

    let now = new Date();
    if (now > decoded.expires) {
        responseUtils.errorResponse(req, errors.errors.UNAUTHORIZED, "token expired");
    }

    let user = await User.findOne({ id: decoded.id }).select("-__v -_id");

    if (!user) {
        responseUtils.errorResponse(req, errors.errors.UNAUTHORIZED, "user with given token not found");
    }

    // store user in request for later use
    req.connectedUser = user;
};

exports.authenticate = async (req, res, next) => {
    try {
        await getConnectedUser(req);
        next();
    } catch (error) {
        next(error);
    }
};