const mongoose=require('mongoose')
const env=require('../config/env.config')

const options={
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useFindAndModify:false,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const count=0

const connectionWithRetry=()=>{
    console.log('mongodb connection with retry')
    mongoose.connect(env.connectionString,options).then(()=>{
        console.log('mongodb is connected successfully')
    }).catch((err)=>{
        console.log('mongodb connection unsuccessful ,retry after with 5 seconde')
        setTimeout(connectionWithRetry,5000)
    })
}
connectionWithRetry()

exports.mongoose=mongoose


