import express from "express"
import isAuth from "../middlewares/isAuth.js"
import optionalAuth from "../middlewares/optionalAuth.js"
import { getCurrentUser, UpdateProfile } from "../controllers/userController.js"
import upload from "../middlewares/multer.js"



let userRouter = express.Router()

userRouter.get("/currentuser", optionalAuth, getCurrentUser)
userRouter.post("/updateprofile",isAuth,upload.single("photoUrl"),UpdateProfile)


export default userRouter