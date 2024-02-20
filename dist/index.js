"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const jsonBodeMiddleware = express_1.default.json();
app.use(jsonBodeMiddleware);
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQ_400: 400,
    NOT_FOUND_404: 404,
};
const db = {
    courses: [
        { id: 1, title: "front-end" },
        { id: 2, title: "back-end" },
        { id: 3, title: "qa" },
        { id: 4, title: "devops" },
    ],
};
app.get("/courses", (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter((courses) => courses.title.indexOf(req.query.title) > 1);
    }
    res.json(foundCourses);
});
app.get("/courses/:id", (req, res) => {
    const foundCourse = db.courses.find((course) => course.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404);
        return; // ???
    }
    res.json(foundCourse);
});
app.post("/courses", (req, res) => {
    if (!req.body.title) {
        res.sendStatus(404);
        return;
    }
    const createdCourse = {
        id: +new Date(),
        title: req.body.title,
    };
    db.courses.push(createdCourse);
    res.status(HTTP_STATUSES.CREATED_201).json(createdCourse);
});
app.delete("/courses/:id", (req, res) => {
    db.courses = db.courses.filter((course) => course.id !== +req.params.id);
    res.sendStatus(204);
});
app.put("/courses/:id", (req, res) => {
    const foundCourse = db.courses.find((course) => course.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    foundCourse.title = req.body.title;
    res.json(foundCourse);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
