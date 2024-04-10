const mongoose=require('mongoose')

const schema=mongoose.Schema(
   {
     name:{
        type:String,
        required:[true,'it must required']
     }

   }
)
const model=mongoose.model('todo',schema)
module.exports=model
