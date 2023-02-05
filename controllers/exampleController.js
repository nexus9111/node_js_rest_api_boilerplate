const { USE_DATABASE } = require('../config/vars');

const exampleModel = require("../models/exampleModels");

exports.mainController = (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            data: {
                message: "Main controller",
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.mainErrorController = (req, res, next) => {
    try {
        // custom status code before throw error
        req.statusCode = 403;
        throw new Error("Main error controller");
    } catch (error) {
        next(error);
    }
};

exports.dataBaseController = async (req, res, next) => {
    try {
        if (!USE_DATABASE) {
            req.statusCode = 403;
            throw new Error("Database is not used");
        }
        // insert data to database
        let newData = new exampleModel({
            name: "test",
            age: 20,
        });
        await newData.save();

        // get data from database
        let data = await exampleModel.find({});
        return res.status(200).json({
            success: true,
            data: {
                message: "Main error controller",
                data: data,
            }
        });
    } catch (error) {
        next(error);
    }
};
