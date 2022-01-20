import express from 'express';
import * as userController from '../controllers/user.controller';
import {newUserValidator} from '../validators/user.validator';
import {userAuth} from '../middlewares/auth.middleware';
import {reddis_archived_data} from '../middlewares/reddis.middleware';
import {reddis_notes_data} from '../middlewares/reddis.middleware';


const router = express.Router();


//route to create a new user
router.post('', newUserValidator, userController.newUser);
router.post('/login',userController.login);




// sendmail token to reset forgetPassword
router.post("/forgetpassword",userController.forgetPassword);

// reset the password using token genrated in above forget password
router.post("/resetpassword",userController.resetPassword);

// adding new note and assinging userid
router.post("/addnote", userAuth, userController.addNote);


// updating notes
router.patch("/updatenote",userAuth, userController.updateNote);


// getting notes of individual user
router.get("/getnote", userAuth,reddis_notes_data, userController.getNote);

// fetching all deleted mail
router.get("/trashed", userAuth, userController.findtrashed);

// fetching all archived notes
router.get("/isArchived",userAuth,reddis_archived_data, userController.isArchived);



// deleteing the note by id
router.delete("/delete/:_id", userController.deletenote);


export default router;