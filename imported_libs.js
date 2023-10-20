import { ObjectId}  from "mongodb"
import pino from "pino"
import dotenv from 'dotenv'


const ObjectID = (id) => new ObjectId(id)
dotenv.config()

export const env = process.env
export const logger = pino()
export default ObjectID