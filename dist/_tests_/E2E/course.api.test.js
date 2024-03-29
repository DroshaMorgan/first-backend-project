"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../../src");
let createdCourse1 = null;
let createdCourse2 = null;
describe("/course", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).delete("/__test__/data");
    }));
    it("should return 200 and empty array", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).get("/courses").expect(src_1.HTTP_STATUSES.OK_200, []);
    }));
    it("should return 404 for not existing course", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).get("/courses/1").expect(src_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it("should'nt create course with incorrect input data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post("/courses")
            .send({ title: "" })
            .expect(src_1.HTTP_STATUSES.BAD_REQ_400);
    }));
    it("should create course with correct input data", () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .post("/courses")
            .send({ title: "new course" })
            .expect(src_1.HTTP_STATUSES.CREATED_201);
        createdCourse1 = createResponse.body;
        expect(createdCourse1).toEqual({
            id: expect.any(Number),
            title: "new course",
        });
        yield (0, supertest_1.default)(src_1.app)
            .get("/courses")
            .expect(src_1.HTTP_STATUSES.OK_200, [createdCourse1]);
    }));
    it("should create course with correct input data", () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .post("/courses")
            .send({ title: "new course2" })
            .expect(src_1.HTTP_STATUSES.CREATED_201);
        createdCourse2 = createResponse.body;
        expect(createdCourse2).toEqual({
            id: expect.any(Number),
            title: "new course2",
        });
        yield (0, supertest_1.default)(src_1.app)
            .get("/courses")
            .expect(src_1.HTTP_STATUSES.OK_200, [createdCourse1, createdCourse2]);
    }));
    it("should'nt update course with incorrect input data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put("/courses/" + createdCourse1.id)
            .send({ title: "" })
            .expect(src_1.HTTP_STATUSES.BAD_REQ_400);
        yield (0, supertest_1.default)(src_1.app)
            .get("/courses/" + createdCourse1.id)
            .expect(src_1.HTTP_STATUSES.OK_200, createdCourse1);
    }));
    it("should'nt update course that not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put("/courses/" + -100)
            .send({ title: "good title" })
            .expect(src_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it("should update course with correct input data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put("/courses/" + createdCourse1.id)
            .send({ title: "good new title" })
            .expect(src_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(src_1.app)
            .get("/courses/" + createdCourse1.id)
            .expect(src_1.HTTP_STATUSES.OK_200, Object.assign(Object.assign({}, createdCourse1), { title: "good new title" }));
        yield (0, supertest_1.default)(src_1.app)
            .get("/courses/" + createdCourse2.id)
            .expect(src_1.HTTP_STATUSES.OK_200, createdCourse2);
    }));
    it("should delete both courses", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete("/courses/" + createdCourse1.id)
            .expect(src_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(src_1.app)
            .get("/courses/" + createdCourse1.id)
            .expect(src_1.HTTP_STATUSES.NOT_FOUND_404);
        yield (0, supertest_1.default)(src_1.app)
            .delete("/courses/" + createdCourse2.id)
            .expect(src_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(src_1.app)
            .get("/courses/" + createdCourse2.id)
            .expect(src_1.HTTP_STATUSES.NOT_FOUND_404);
        yield (0, supertest_1.default)(src_1.app).get("/courses").expect(src_1.HTTP_STATUSES.OK_200, []);
    }));
});
