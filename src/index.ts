import express from "express";

export const app = express();
const port = 3000;

const jsonBodeMiddleware = express.json(); //  Посмотреть где это
app.use(jsonBodeMiddleware);

export const HTTP_STATUSES = {
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
    foundCourses = foundCourses.filter(
      (courses) => courses.title.indexOf(req.query.title as string) > 1
    );
  }

  res.json(foundCourses);
});

app.get("/courses/:id", (req, res) => {
  const foundCourse = db.courses.find((course) => course.id === +req.params.id);

  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return; // ???
  }
  res.json(foundCourse);
});

app.post("/courses", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQ_400);
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

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.put("/courses/:id", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQ_400);
    return;
  }

  const foundCourse = db.courses.find((course) => course.id === +req.params.id);

  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  foundCourse.title = req.body.title;

  res.json(foundCourse);
});

app.delete("/__test__/data", (req, res) => {
  db.courses = [];

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
