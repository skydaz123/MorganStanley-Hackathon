import { Router } from "express"
import addReport from "../controllers/firebase/addReport.js"
import addUser from "../controllers/firebase/addUser.js"
import getReports from "../controllers/firebase/getReports.js"
import getUser from "../controllers/firebase/getUser.js"
import markers from "../controllers/firebase/markers.js"
import checkToken from "../middlewares/checkToken.js"
import getOtherReports from "../controllers/firebase/getOtherReports.js"

const firebaseRouter = Router()

// should add checkToken
firebaseRouter.get("/markers", markers)

//Writing user addition here for now to see if it works, will move to other path later
firebaseRouter.post("/addUser", checkToken, addUser)

firebaseRouter.get("/getUser", checkToken, getUser)

firebaseRouter.post("/addReport", checkToken, addReport)

firebaseRouter.get("/getReports", checkToken, getReports)

firebaseRouter.get("/getOtherReports", checkToken, getOtherReports)

export default firebaseRouter
