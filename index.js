import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

import bodycompRouter from "./src/routers/bodycompRouter.js"
import faceRouter from "./src/routers/faceRouter.js"
import nodeRouter from "./src/routers/nodeRouter.js"
import cylinderRouter from "./src/routers/cylinderRouter.js"
import accountRouter from "./src/routers/AccountRouter.js"

const app = express();
const port = 3000;


mongoose.connect(process.env.MONGODB_URL)

app.use(cors())
app.use(express.json())

app.use(nodeRouter)
app.use(faceRouter)
app.use(bodycompRouter)
app.use(cylinderRouter)
app.use(accountRouter)

app.listen(port, () => {
    console.log("Server is up on PORT " + port)
})
