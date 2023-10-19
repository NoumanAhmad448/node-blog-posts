import express from 'express'
const auth = express.Router()

auth.get(``, function (req, res) {
    res.send("hello express")
})

export default auth
