import express from 'express';
import * as userController from '../controllers/user.controller';
import {newUserValidator} from '../validators/user.validator';



const router = express.Router();


//route to create a new user
router.post('/register', newUserValidator, userController.newUser);


// login to user
router.post('/login',userController.login);


// sendmail token to reset forgetPassword
router.post("/forgetpassword",userController.forgetPassword);

// reset the password using token genrated in above forget password
router.post("/resetpassword",userController.resetPassword);



export default router;