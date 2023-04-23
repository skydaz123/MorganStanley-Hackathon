import { Router } from "express"
import addReport from "../controllers/firebase/addReport.js"
import addUser from "../controllers/firebase/addUser.js"
import getReports from "../controllers/firebase/getReports.js"
import getUser from "../controllers/firebase/getUser.js"
import markers from "../controllers/firebase/markers.js"

const firebaseRouter = Router()

firebaseRouter.get("/markers", markers)

//Writing user addition here for now to see if it works, will move to other path later
firebaseRouter.post("/addUser", addUser)

firebaseRouter.get("/getUser", getUser)

firebaseRouter.post("/addReport", addReport)

firebaseRouter.get("/getReports", getReports)

export default firebaseRouter
