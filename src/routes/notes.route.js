import express from 'express';
import * as userController from '../controllers/user.controller';
import {userAuth} from '../middlewares/auth.middleware';
import {reddis_archived_data} from '../middlewares/reddis.middleware';
import {reddis_notes_data} from '../middlewares/reddis.middleware';


const router = express.Router();


// adding new note and assinging userid
router.post("/", userAuth, userController.addNote);


// updating notes
router.patch("/",userAuth, userController.updateNote);


// getting notes of individual user
router.get("/", userAuth,reddis_notes_data, userController.getNote);

// fetching all deleted mail
router.get("/trash", userAuth, userController.findtrashed);

// fetching all archived notes
router.get("/archive",userAuth,reddis_archived_data, userController.isArchived);



// deleteing the note by id
router.delete("/delete/:_id", userController.deletenote);


export default router;