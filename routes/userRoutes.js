import express from "express";
import { getAllUsers, loginController, regitserController } from "../controllers/userController.js";


//router object 
const router = express.Router();


// get all users || GET

router.get('/all-users', getAllUsers);


//creste new users || post

router.post('/register', regitserController);


//login || POST

router.post("/login", loginController);

export default router;
