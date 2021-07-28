const index = require("../../api/core");
const coreDBA = require('../../dbAccessLayer/core')
jest.mock('../../dbAccessLayer/core');
const request = require("supertest");
const express = require("express");
const app = express();
const { makeMockGetDbWithFindOneThatReturns } = require('./utils')
app.use(express.urlencoded({ extended: false }));
app.use("/", index);



describe('Basic Pulse Check', () => {
  test("healthcheck route ", done => {
    request(app)
      .get("/healthcheck")
      .expect(200, done);
  });
})
describe('Basic Pulse Check', () => {
  beforeAll(() => {
    coreDBA.getRecords.mockImplementation(makeMockGetDbWithFindOneThatReturns([]));
  });
  test("Get Records Test Mock Database", done => {
    request(app)
      .get("/records").expect(200, done);
  });
})

