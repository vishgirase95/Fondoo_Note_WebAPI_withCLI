import {
  expect
} from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import fs from 'fs'

import app from '../../src/index';
const rawdata = fs.readFileSync("./../FandooNotes_webAPI/src/utils/data.json")


const jsondata = JSON.parse(rawdata);


describe('User APIs Test', (done) => {


  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });



  describe('GET /', () => {
    it('should return Wellcome', (done) => {
      request(app)
        .get('/api/v1/')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.text).to.be.equal('Welcome');
          done();
        });
    });
  });



  describe('POST /register', () => {
    it('should return User created successfully ', (done) => {
      const inputdata = jsondata.test1
      request(app)
        .post('/api/v1/register').send(inputdata).end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body).to.be.property("message").eq("User created successfully");
          done();
        });
    });
  });





  describe('POST /register/login', () => {
    it("logi and return sucessfully logged in ", (done) => {
      const inputdetail = jsondata.login1
      request(app).post('/api/v1/register/login').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("sucessfully logged in");
        expect(res.body).to.be.property("data")
        done();
      });
    });
  });

});