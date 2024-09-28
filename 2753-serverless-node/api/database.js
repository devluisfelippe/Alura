const { MongoClient, ObjectId } = require("mongodb")

let connectionInstance = null
async function connectToDatabase() {
    if (connectionInstance) return connectionInstance
    const client = new MongoClient(process.env.MONGODB_CONNECTIONSTRING)
    const connection = await client.connect()
    connectionInstance = connection.db(process.env.MONGODB_DB_NAME)
    return connectionInstance
}

async function getUserByCredentials(username, hashedPass) {
    const client = await connectToDatabase()
    const collection = await client.collection('users')
    const user = await collection.findOne({ name: username, password: hashedPass })

    if (!user) {
        return null
    }

    return user
}

async function saveResultsToDatabase(result) {
    const client = await connectToDatabase()
    const collection = await client.collection("results")
    const { insertedId } = await collection.insertOne(result)
    return insertedId
}

async function getResultById(id) {
    const client = await connectToDatabase()
    const collection = await client.collection("results")
    const result = await collection.findOne({
        _id: new ObjectId(id)
    })
    
    if(!result) {
        return null
    }
    
    return result
}

module.exports = { getUserByCredentials, saveResultsToDatabase, getResultById }