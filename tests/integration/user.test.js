import {
  expect
} from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import fs from 'fs'

import app from '../../src/index';
import { updateNote } from '../../src/services/user.service';
const rawdata = fs.readFileSync("./../FandooNotes_webAPI/src/utils/data.json")


const jsondata = JSON.parse(rawdata);


describe('User APIs Test', (done) => {

// is commmented in order to update note by manual id
  // before((done) => {
  //   const clearCollections = () => {
  //     for (const collection in mongoose.connection.collections) {
  //       mongoose.connection.collections[collection].deleteOne(() => {});
  //     }
  //   };

  //   const mongooseConnect = async () => {
  //     await mongoose.connect(process.env.DATABASE_TEST);
  //     clearCollections();
  //   };

  //   if (mongoose.connection.readyState === 0) {
  //     mongooseConnect();
  //   } else {
  //     clearCollections();
  //   }

  //   done();
  // });



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
      const inputdata = jsondata.test5
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






  describe('POST /register/login and /addnote', () => {
    it("login and auth to add notes", (done) => {
      const inputdetail = jsondata.login1

      request(app).post('/api/v1/register/login').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("sucessfully logged in");
        expect(res.body).to.be.property("data")
        const token = res.body.data;
        const inputNotedata = jsondata.note2;

        request(app).post('/api/v1/register/addnote').send(inputNotedata).set('Authorization', 'JWT ' + token).end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.be.property("message").eq("Note added sucessfully");
          expect(res.body).to.be.property("data");
          console.log("data",res.body.data)

          done();
        });

      })
    })
  })



  describe('POST /get notes', () => {
    it("login and auth get notes", (done) => {
      const inputdetail = jsondata.login1

      request(app).post('/api/v1/register/login').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("sucessfully logged in");
        expect(res.body).to.be.property("data")
        const token = res.body.data;
      

        request(app).get('/api/v1/register/getnote').set('Authorization', 'JWT ' + token).end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.be.property("message").eq("Fetched Notes Sucessfully");
          done();
        });

      })
    })
  })


  describe('POST /update notes', () => {
    it("login and auth update notes using notid", (done) => {
      const inputdetail = jsondata.login1

      request(app).post('/api/v1/register/login').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("sucessfully logged in");
        expect(res.body).to.be.property("data")
        const token = res.body.data;
        
        const updateNOTE = jsondata.update1
        request(app).patch('/api/v1/register/updatenote').set('Authorization', 'JWT ' + token).send(updateNOTE).end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          // expect(res.body).to.be.property("message").eq("Fetched Notes Sucessfully");
          done();
        });

      })
    })
  })


  
  describe('POST /get trashed', () => {
    it("login and auth get trashed", (done) => {
      const inputdetail = jsondata.login1

      request(app).post('/api/v1/register/login').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("sucessfully logged in");
        expect(res.body).to.be.property("data")
        const token = res.body.data;
        
        request(app).get('/api/v1/register/trashed').set('Authorization', 'JWT ' + token).end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.be.property("message").eq("Fetched Deleted Notes Sucessfully");
          done();
        });

      })
    })
  })



   
  describe('POST /get isArchived', () => {
    it("login and auth get isArchived", (done) => {
      const inputdetail = jsondata.login1

      request(app).post('/api/v1/register/login').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("sucessfully logged in");
        expect(res.body).to.be.property("data")
        const token = res.body.data;

        request(app).get('/api/v1/register/isArchived').set('Authorization', 'JWT ' + token).end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.be.property("message").eq("Fetched Archived Notes Sucessfully");
          done();
        });

      })
    })
  })

  describe('POST /register/forgetpassword', () => {
    it("sent mail for forget password ", (done) => {
      const inputdetail = jsondata.forgetPassword1;
      request(app).post('/api/v1/register/forgetpassword').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("Mail Sent Sucesssfully");
      
        done();
      });
    });
  });


  
  // describe('POST /register/resetpassword', () => {
  //   it("reset the new password", (done) => {
  //     const inputdetail = jsondata.resetpassword1;
  //     const token = res.body.data;

  //     request(app).post('/api/v1/register/resetpassword').set('Authorization', 'JWT ' + token).send(inputdetail).end((err, res) => {
  //       expect(res.statusCode).to.be.equal(200);
  //       // expect(res.body).to.be.property("message").eq("Mail Sent Sucesssfully");
      
  //       done();
  //     });
  //   });
  // });

});