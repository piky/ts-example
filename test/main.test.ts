import {expect} from 'chai';
import {agent as request} from 'supertest';
import app from '../src/main';

describe("Root API path test", () => {
  it('should always pass', function () {
    expect(true).to.equal(true);
  });
});

it("Should POST /mirror 1 type of json(string)", async function () {
  const res = await request(app).post('/mirror').send({"data": "Funny Dummy"});
  
  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body.data).not.to.be.empty;
  expect(res.body.data).to.be.an("string");
  expect(res.body.error).to.be.undefined;
})
it("Should POST /mirror 1 type of json(number)", async function () {
  const res = await request(app).post('/mirror').send({"data": 112});
  
  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body.data).not.to.be.null;
  expect(res.body.data).to.be.an("number");
  expect(res.body.error).to.be.undefined;
})
it("Should POST /mirror 1 type of json(bool)", async function () {
  const res = await request(app).post('/mirror').send({"data": true});
  
  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body.data).not.to.be.null;
  expect(res.body.data).to.be.an("boolean");
  expect(res.body.error).to.be.undefined;
})

it("Should POST /mirror 2 type of json", async function () {
  const res = await request(app).post('/mirror').send({"data": "Funny Dummy", "count": 2});
  
  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body.data).not.to.be.empty;
  expect(res.body.data).to.be.an("string");
  expect(res.body.error).to.be.undefined;
})