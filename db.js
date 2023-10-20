import { MongoClient } from "mongodb"
import dotenv from 'dotenv'

dotenv.config()
let env = process.env
const client = new MongoClient(env.MONGODB_CONNECTION_STRING);
let db
const run = async() =>{
    try {
        await client.connect();
        db = client
    }
    catch {

        await client.close();
    }
}
await run().catch(console.dir)

export default db
