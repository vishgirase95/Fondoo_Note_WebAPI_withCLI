import express from 'express';
import * as userController from '../controllers/user.controller';
import {
    newUserValidator
} from '../validators/user.validator';
import {
    userAuth
} from '../middlewares/auth.middleware';

const router = express.Router();


//route to create a new user
router.post('', newUserValidator, userController.newUser);
router.post('/login', userController.login);
router.post("/addnote", userAuth, userController.addNote);


router.get("/getnote", userAuth, userController.getNote);
router.get("/trashnotes", userAuth, userController.trashedNote);
router.get("/isArchived", userAuth, userController.isArchived);

router.patch("/updatenote", userAuth, userController.updateNote);
router.delete("/delete",userAuth, userController.deleteNote);







export default router;