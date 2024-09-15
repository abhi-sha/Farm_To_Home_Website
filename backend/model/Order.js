const mongoose=require('mongoose')
const {Schema}=mongoose

const OrderSchema=new Schema({
    mail:
    {
        type:String,
        required:true
    },
    data:{
        type:Object ,
        required:true
    },
    date:{
        type:String ,
        required:true,
        default:new Date(Date.now()).toString(),
    }

})

module.exports=mongoose.model('order',OrderSchema)
