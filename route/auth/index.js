import express from 'express'
import ChatCollection from '../../functions.js'
import {env,logger} from "../../imported_libs.js"
import Joi from 'joi'
import messages from './messages.js'
import msg_validation,{validation} from './form-validation.js'
import server from "http"
import {Server} from "socket.io"

const io = new Server(server);

const sys_msg = messages()

const auth = express.Router()

auth.get(``, async(req, res) => {
    res.send("hello from express")
})
.get(`/get-messages`, async(req,res) => {
    const api_response = {}
    logger.info(`request ${JSON.stringify(req.body)}`)

    const schema = Joi.object({
        query: Joi.object({
            _id: validation.id,
            message: validation.message(false)
        }),
        limit: validation.limit,
        projection: Joi.object({
            _id: validation.num_bool(false),
            message: validation.num_bool(false)
        }),
        sort: Joi.object({
            _id: validation.num_bool(false),
            message: validation.num_bool(false)
        })
    })
    logger.info(schema)
    let data
    data = schema.validate(req.body)
    if(schema && data.error && data.error.details){
        api_response.message = data.error.details || data.error
        res.status(412).json(api_response)
    }else{
        const response = await ChatCollection.readAllMessage(data && data.value ? data.value : req.body).catch((error) => {
            logger.info(error)
            api_response.message = error.message || sys_msg.err_msg
            res.status(500).json(api_response)
        })
        api_response.message = sys_msg.data_fetch
        api_response.data= response
        res.status(200).json(api_response)
    }
})
.get('/readmessage', async(req, res) => {
    const schema = Joi.object({
        _id: validation.id
    })
    const api_response = {}
    if(env.ENV == 'dev'){
        logger.info(`request ${JSON.stringify(req.body)}`)
    }
    let data = schema.validate(req.body)
    if(data.error && data.error.details){
        api_response.message = data.error.details || data.error
        res.status(412).json(api_response)
    }else{
        const response = await ChatCollection.readMessage(data.value).catch((error) => {
            logger.info(error)
            api_response.message = error.message || sys_msg.err_msg
            res.status(500).json(api_response)
        })
        api_response.message = sys_msg.data_fetch
        api_response.data= response
        res.json(api_response).status(200)
    }

}).post("/save-message", async(req,res)=>{
    const schema = Joi.object({
        message: msg_validation.message
    })
    const api_response = {}
    let data = schema.validate(req.body)
    if(data.value === undefined && data.error && data.error.details == undefined){
        api_response.message= "something went wrong"
        res.status(500).json(api_response)
    }
    if(data.error && data.error.details){
        api_response.message = data.error.details || data.error
        res.status(412).json(api_response)
    }else{
        const response = await ChatCollection.saveMessage([data.value]).catch((error) => {
            logger.info(error)
            api_response.message = error.message || sys_msg.err_msg
            res.status(500).json(api_response)
        })
        api_response.message = "data has been saved"
        api_response.data= response.insertedIds
        res.json(api_response).status(200)
    }
}).patch(`/update-message`, async(req,res) => {
    const schema = Joi.object({
        _id: validation.id,
        data: Joi.object({
            message: msg_validation.message,
            views: validation.views(false),
        }).required()
    })
    const api_response = {}
    let data = schema.validate(req.body)
    if(data.value === undefined && data.error && data.error.details == undefined){
        api_response.message= sys_msg.err_msg
        res.status(500).json(api_response)
    }
    if(data.error && data.error.details){
        api_response.message = data.error.details || data.error
        res.status(412).json(api_response)
    }else{
        logger.info(data.value)
        const response = await ChatCollection.updateMessage(data.value).catch((error) => {
            logger.info(error)
            api_response.message = error.message || sys_msg.err_msg
            res.status(500).json(api_response)
        })
        logger.info(JSON.stringify(response))
        api_response.data = data.value
        if(response && response.matchedCount === 0){
            api_response.message = sys_msg.no_rec
            res.status(412).json(api_response)
        }else{
            api_response.message = sys_msg.update_msg
            res.status(200).json(api_response)
        }
    }
}).post("/chat-report", async(req,res)=>{
    let api_response = {}

    const response = await ChatCollection.chatReporting().catch((error) => {
        logger.info(error)
        api_response.message = error.message || sys_msg.err_msg
        res.status(500).json(api_response)
    })
    logger.info(JSON.stringify(response))
    api_response.data = response

    if(response){
        api_response.message = sys_msg.update_msg
        res.status(200).json(api_response)
    }
})

export default auth
