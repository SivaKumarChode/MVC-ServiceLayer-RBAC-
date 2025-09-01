import express  from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import { dbConnection } from "./config/DbConnection.js"
import UserRouters from "./routers/user.Routers.js"

const app= express()

const PORT= 5500

dbConnection()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api",UserRouters)

app.listen(PORT,()=>{
    console.log(`server running successfully`);
})