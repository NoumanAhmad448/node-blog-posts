import express from 'express'
import dotenv from 'dotenv'
import auth from "../node-blog-posts/route/auth/index.js"
import db from "../node-blog-posts/db.js"

dotenv.config()
let env = process.env
// const io = new Server(server);

let app = express()
app.use(express.json())

app.use(express.static("public"))
app.use("",auth)
app.use("/api",auth)


app.listen(env.PORT, function () {
    console.log(`${env.APP_NAME} is listening on PORT ${env.PORT}!`)
})