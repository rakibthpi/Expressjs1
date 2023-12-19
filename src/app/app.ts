import express, { NextFunction, Request, Response } from 'express';
// const express = require('express')
const app = express()

// parsers 
app.use(express.json());
app.use(express.text())


// router object 
const userRouter = express.Router()
const userCourse = express.Router()
// app.use(userRouter)
// userRouter.use(express.json())
app.use('/api/v1/users', userRouter)
app.use('/api/v1/course', userCourse)

userRouter.post('/create-user', (req: Request, res: Response) => {
    const user = req.body;
    console.log(user);

    res.json({
        success: true,
        message: 'user is create success',
        data: user
    });

});

userCourse.post('/create-course', (req: Request, res: Response) => {
    const course = req.body;
    console.log(course)
    res.json({
        success: true,
        message: "User Is create successfully",
        data: course
    })
})


// middleware 
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url, req.method, req.hostname)

    next();
}

app.get('/', logger, (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send("something");
    }
    catch (error) {
        next(error)
        // res.status(400).json({
        //     success: false,
        //     message: "Failed to get data",
        // })
    }

})

app.post('/', logger, (req: Request, res: Response) => {
    console.log(req.body);
    res.json({
        message: "successfully resive data"
    })
})


// Any Error handaling 
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    })
});

// Global error handler 
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "Route is not found"
        })
    }
})



export default app;
