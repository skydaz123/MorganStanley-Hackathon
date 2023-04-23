import { Router } from "express";
import execRouter from "./exec.js"
import firebaseRouter from "./firebase.js";

// this router is where you add more routers
const indexRouter = Router()
indexRouter.use("/firebase", firebaseRouter)
indexRouter.use("/exec", execRouter)

export default indexRouter
