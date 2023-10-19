import express from 'express'
import dotenv from 'dotenv'
import auth from "../node-blog-posts/route/auth/index.js"

dotenv.config()
let env = process.env
let app = express()

app.use(express.static("public"))
app.use("/",auth)


app.listen(env.PORT, function () {
    console.log(`${env.APP_NAME} is listening on PORT ${env.PORT}!`)
})