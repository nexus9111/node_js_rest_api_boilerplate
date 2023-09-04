const validator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/variables");
const logger = require("../config/logger");
const errors = require("../config/errors");

const User = require("../models/userModels");

const securityUtils = require("../utils/securityUtils");
const responseUtils = require("../utils/apiResponseUtils");

const SALT_ROUNDS = 10;

exports.register = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            responseUtils.errorResponse(req, errors.errors.BAD_BODY, "missing email or password");
        }

        email = email.toLowerCase().trim();
        if (!validator.validate(email)) {
            responseUtils.errorResponse(req, errors.errors.BAD_BODY, "invalid email");
        }


        if (!securityUtils.isPasswordValid(password)) {
            responseUtils.errorResponse(req, errors.errors.BAD_BODY, "password is not strong enough");
        }

        let accountWithGivenEmail = await User.findOne({
            email: email,
        });

        if (accountWithGivenEmail) {
            await new Promise(resolve => setTimeout(resolve, 300)); // wait .3s to prevent brute force
            responseUtils.errorResponse(req, errors.errors.CONFLICT, "email already registered");
        }

        //hash password
        let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        let newUser = new User({
            email: email,
            password: hashedPassword,
        });

        await newUser.save();

        //generate token
        let token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1d" });

        logger.info(`User ${newUser.email} registered successfully`);

        return responseUtils.successResponse(res, req, 201, {
            message: "Account created successfully",
            token: "Bearer " + token,
            user: responseUtils.safeDatabaseData(newUser),
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            responseUtils.errorResponse(req, errors.errors.BAD_BODY, "missing email or password");
        }

        let user = await User.findOne({ email: email });
        if (!user) {
            responseUtils.errorResponse(req, errors.errors.BAD_CREDENTIALS, "invalid email or password");
        }

        let isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            responseUtils.errorResponse(req, errors.errors.BAD_CREDENTIALS, "invalid email or password");
        }

        //generate token
        let token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

        return responseUtils.successResponse(res, req, 200, {
            message: "Logged in successfully",
            token: "Bearer " + token,
            user: responseUtils.safeDatabaseData(user),
        });
    } catch (error) {
        next(error);
    }
};

exports.profile = async (req, res, next) => {
    try {
        return responseUtils.successResponse(res, req, 200, {
            message: "Profile fetched successfully",
            user: responseUtils.safeDatabaseData(req.connectedUser),
        });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        await User.deleteOne({ id: req.connectedUser.id });

        logger.info(`User ${req.connectedUser.email} deleted his profile`);

        return responseUtils.successResponse(res, req, 200, {
            message: "Profile deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};