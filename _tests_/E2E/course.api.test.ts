import request from "supertest";
import { HTTP_STATUSES, app } from "../../src";

describe("/course", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("should return 200 and empty array", async () => {
    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  it("should return 404 for not existing course", async () => {
    await request(app).get("/courses/1").expect(HTTP_STATUSES.NOT_FOUND_404);
  });
  it("should'nt create course with incorrect input data", async () => {
    await request(app)
      .post("/courses")
      .send({ title: "" })
      .expect(HTTP_STATUSES.BAD_REQ_400);

    // await request(app).post("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  let createdCourse: any = null;
  it("should create course with correct input data", async () => {
    const createResponse = await request(app)
      .post("/courses")
      .send({ title: "new course" })
      .expect(HTTP_STATUSES.CREATED_201);

    createdCourse = createResponse.body;

    expect(createdCourse).toEqual({
      id: expect.any(Number),
      title: "new course",
    });

    await request(app)
      .get("/courses")
      .expect(HTTP_STATUSES.OK_200, [createdCourse]);
  });

  // it("should'nt update course with incorrect input data", async () => {
  //   await request(app)
  //     .put("/courses/" + createdCourse.id)
  //     .send({ title: undefined })
  //     .expect(HTTP_STATUSES.BAD_REQ_400);

  //   await request(app)
  //     .put("/courses/" + createdCourse.id)
  //     .expect(HTTP_STATUSES.OK_200, createdCourse);
  // });
});
