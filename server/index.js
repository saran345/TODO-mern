const express=require('express')
const dotenv=require('dotenv').config()
const mongoose=require('mongoose')
const app=express() 
const PORT=process.env.PORT
const model=require('./config/db')
const cors=require('cors')
const bodyparser=require('body-parser')


app.use(cors())

app.use(express.urlencoded({extended:true}))
 
mongoose.connect(process.env.URI).then(()=> console.log('connected successfully'))
.catch(()=> console.log('disconnected database.../'))


 app.use('/',require('./router/router'))
    
app.listen(PORT,()=> console.log(`server is running....127.0.0.1:${PORT}`))
    