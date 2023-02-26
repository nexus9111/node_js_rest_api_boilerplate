const { USE_DATABASE } = require("../config/variables");
const errors = require("../config/errors");
const { v4: uuidv4 } = require("uuid");

const exampleModel = require("../models/exampleModels");
const responseUtils = require("../utils/apiResponseUtils");

exports.mainController = (req, res, next) => {
    try {
        return responseUtils.successResponse(res, req, 200, {
            message: "Main controller",
            foo: "bar",
        });
    } catch (error) {
        next(error);
    }
};

exports.mainErrorController = (req, res, next) => {
    try {
        // custom status code before throw error
        responseUtils.errorResponse(req, errors.errors.FORBIDDEN, "Main error controller");
    } catch (error) {
        next(error);
    }
};

exports.dataBaseController = async (req, res, next) => {
    try {
        if (!USE_DATABASE) {
            responseUtils.errorResponse(req, errors.errors.FORBIDDEN, "Database is not used");
        }

        // insert data to database
        let newData = new exampleModel({
            name: uuidv4(),
            age: 20,
        });
        await newData.save();

        let data = await exampleModel.find({});
        return responseUtils.successResponse(res, req, 200, {
            message: "Main error controller",
            data: responseUtils.safeDatabaseArray(data),
        });
    } catch (error) {
        next(error);
    }
};
