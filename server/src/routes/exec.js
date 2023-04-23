import { Router } from "express"
import runHelloPy from "../controllers/exec/runHelloPy.js"

const execRouter = Router()

execRouter.get("/", runHelloPy)

export default execRouter
