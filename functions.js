import db from "./db.js";
import  ObjectID  from "./imported_libs.js";
import { logger } from "./imported_libs.js";


const database = db.db('chat')
const messages = database.collection('messages')


class ChatCollection{
    constructor(){

    }
    static async readMessage(query){
        var o_id = ObjectID(query._id)
        logger.info(`After changing the value ${JSON.stringify(o_id)}`)

        const message = await messages.findOne({_id: o_id})
        return message
    }

    static async saveMessage(document){
        const message = await messages.insertMany(document)
        return message
    }

    static async updateMessage(document){
        logger.info(document)

        const message = await messages.updateMany({_id: ObjectID(document._id)},{$set: document.data})
        // const message = await messages.updateOne({_id: ObjectID(document._id)},{$set: document.data})
        return message
    }

    static async readAllMessage(document){
        logger.info(document)
        logger.info(`collection name`)
        logger.info(messages.s.namespace || messages.s || messages)
        if(document.query && document.query._id){
            logger.info(`${document.query._id} exists`)
            document.query = {...{_id: ObjectID(document.query._id)}}
        }
        logger.info(document.query ?? {})

        let message = await messages.find(document.query ?? {})
        let response = {count: 0, data: []}
        if(document.limit){
            message.limit(document.limit)
        }
        if(document.projection){
            message.project(document.projection)
        }
        if(document.sort){
            message.sort(document.sort)
            // to count
            // message = message.count()
        }

        message  = message ? message.toArray(): {}
        logger.info(`message response`)
        logger.info(message)
        return message

    }

    static async chatReporting(){
        return "hello world"
    }
}

export default ChatCollection