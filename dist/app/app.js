"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const express = require('express')
const app = (0, express_1.default)();
// parsers 
app.use(express_1.default.json());
app.use(express_1.default.text());
// router object 
const userRouter = express_1.default.Router();
const userCourse = express_1.default.Router();
// app.use(userRouter)
// userRouter.use(express.json())
app.use('/api/v1/users', userRouter);
app.use('/api/v1/course', userCourse);
userRouter.post('/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: 'user is create success',
        data: user
    });
});
userCourse.post('/create-course', (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "User Is create successfully",
        data: course
    });
});
// middleware 
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
app.get('/', logger, (req, res, next) => {
    try {
        res.send(something);
    }
    catch (error) {
        next(error);
        // res.status(400).json({
        //     success: false,
        //     message: "Failed to get data",
        // })
    }
});
app.post('/', logger, (req, res) => {
    console.log(req.body);
    res.json({
        message: "successfully resive data"
    });
});
// Any Error handaling 
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
// Global error handler 
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "Route is not found"
        });
    }
});
exports.default = app;
