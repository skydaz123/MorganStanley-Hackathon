import { Router } from "express";
import execRouter from "./exec-routes.js"
import firebaseRouter from "./firebase-routes.js";

// this router is where you add more routers
const indexRouter = Router()
indexRouter.use("/firebase", firebaseRouter)
indexRouter.use("/exec", execRouter)

export default indexRouter
