const express=require('express')
const router=express.Router()
const model=require('../config/db')

router.get('/',async(req,res)=>{
        const d=await model.find()
        res.status(200).json(d)
        console.log('GET method')
})

router.post('/post',async(req,res)=>{
    try{
        const d=new model({
            name:req.body.name
        })
        
        await d.save() 
        res.status(201).json({'message':'data updated successfully'})
        console.log('post method')
    }catch(e){
        res.status(400).json({'message':'error occur while inserting....'})
    }
})

router.put('/update/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const up=req.body.up;
        const update=await model.findByIdAndUpdate(id,up,{new:true})
        res.status(203).json({'message':'data updated successfully',update})
        console.log('UPDATE method')
    }catch(e){
        res.status(400).json({'message':'error occur while updating...'})
    }
})
router.delete('/delete/:id',async(req,res)=>{
    try{
        const id=req.params.id
        await model.findByIdAndDelete(id)
        res.status(203).json({'message':'data deleted successfully'})
        console.log('DELETED method') 
    }catch(e){
        res.status(400).json({'message':'error occur while deleting....'})
    }
})


module.exports=router