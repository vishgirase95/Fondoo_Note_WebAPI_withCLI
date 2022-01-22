import {
  expect
} from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import fs from 'fs'

import app from '../../src/index';
import {
  updateNote
} from '../../src/services/user.service';
import {
  User
} from '../../src/models/user.model';
const rawdata = fs.readFileSync("./../FandooNotes_webAPI/src/utils/data.json")


const jsondata = JSON.parse(rawdata);


describe('User APIs Test', (done) => {
  var _id = '';
  let Token = '';
  
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
      request(app).get('/api/v1/').end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.text).to.be.equal('Welcome');
          done();
        });
    });
  });



  describe('POST /users/register', () => {
    it('should return User created successfully ', (done) => {
      const inputdata = jsondata.test1
      request(app).post('/api/v1/users/register').send(inputdata).end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body).to.be.property("message").eq("User created successfully");


          done();
        });
    });
  });





  describe('POST /users/login', () => {
    it("logi and return sucessfully logged in ", (done) => {
      const inputdetail = jsondata.login1
      request(app).post('/api/v1/users/login').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("sucessfully logged in");
    
        done();
      });
    });
  });






  describe('POST /users/login and /notes', () => {
    it("login and auth to add notes", (done) => {
      const inputdetail = jsondata.login1

      request(app).post('/api/v1/users/login').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("sucessfully logged in");
        expect(res.body).to.be.property("data")
        const token = res.body.data;
        const inputNotedata = jsondata.note2;


        request(app).post('/api/v1/notes').send(inputNotedata).set('Authorization', 'JWT ' + token).end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.be.property("message").eq("Note added sucessfully");
          expect(res.body).to.be.property("data");
          console.log("data", res.body.data)
          _id = res.body.data._id;
          console.log("iddd", _id)

          done();
        });

      })
    })
  })



  describe('POST /get notes', () => {
    it("login and auth get notes", (done) => {
      const inputdetail = jsondata.login1

      request(app).post('/api/v1/users/login').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("sucessfully logged in");
        expect(res.body).to.be.property("data")
        const token = res.body.data;


        request(app).get('/api/v1/notes').set('Authorization', 'JWT ' + token).end((err, res) => {
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

      request(app).post('/api/v1/users/login').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("sucessfully logged in");
        expect(res.body).to.be.property("data")
        const token = res.body.data;

        const updateNOTE = {
          "NoteID": _id,
          "color": "purple"
        }
        request(app).patch('/api/v1/notes').set('Authorization', 'JWT ' + token).send(updateNOTE).end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.be.property("message").eq("Updated Sucessfully");
          done();
        });

      })
    })
  })



  describe('POST /get trashed', () => {
    it("login and auth get trashed", (done) => {
      const inputdetail = jsondata.login1

      request(app).post('/api/v1/users/login').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("sucessfully logged in");
        expect(res.body).to.be.property("data")
        const token = res.body.data;

        request(app).get('/api/v1/notes/trash').set('Authorization', 'JWT ' + token).end((err, res) => {
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

      request(app).post('/api/v1/users/login').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("sucessfully logged in");
        expect(res.body).to.be.property("data")
        const token = res.body.data;

        request(app).get('/api/v1/notes/archive').set('Authorization', 'JWT ' + token).end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.be.property("message").eq("Fetched Archived Notes Sucessfully");
          done();
        });

      })
    })
  })

  describe('POST /users/forgetpassword', () => {
    it("sent mail for forget password ", (done) => {
      const inputdetail = jsondata.forgetPassword1;

      request(app).post('/api/v1/users/forgetpassword').send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("Mail Sent Sucesssfully");

        Token = res.body.data.token;
        done();
      });
    });
  });



  describe('POST /users/resetpassword', () => {
    it("reset the new password", (done) => {
      const inputdetail = jsondata.resetpassword1;


      request(app).post('/api/v1/users/resetpassword').set('Authorization', 'JWT ' + Token).send(inputdetail).end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.property("message").eq("Reset Password Sucessfully")
        done();
      });
    });
  });

});