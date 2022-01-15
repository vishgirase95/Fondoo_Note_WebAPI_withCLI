import express from 'express';
import * as userController from '../controllers/user.controller';
import {newUserValidator} from '../validators/user.validator';
import {userAuth} from '../middlewares/auth.middleware';
import { forgetPassword } from '../services/user.service';

const router = express.Router();


//route to create a new user
router.post('', newUserValidator, userController.newUser);
router.post('/login',userController.login);

// adding new note and assinging userid
router.post("/addnote", userAuth, userController.addNote);


// updating notes
router.patch("/updatenote", userController.updateNote);


// getting notes of individual user
router.get("/getnote", userAuth, userController.getNote);

// fetching all deleted mail
router.get("/trashed", userAuth, userController.findtrashed);

// fetching all archived notes
router.get("/isArchived", userAuth, userController.isArchived);


// sendmail token to reset forgetPassword
router.post("/forgetpassword",userController.forgetPassword);

// reset the password using token genrated in above forget password
router.post("/resetpassword",userController.resetPassword);


export default router;