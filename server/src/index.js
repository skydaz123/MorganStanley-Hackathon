import cors from "cors"
import express from "express"
import "./firebase.js"
import errorHandler from "./middlewares/errorHandler.js"
import indexRouter from "./routes/index.js"

const app = express()

// allow JSON body to be parsed
app.use(express.json())

// allow CORS
app.use(cors())

// DO NOT add endpoints here, go to routes/index.js
app.use("/", indexRouter)

app.get("*", (req, res) => {
    res.sendStatus(404)
})

app.use(errorHandler)

// we don't need dotenv.config() here because it is already done in firebase.js
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})
