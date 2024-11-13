const mongoose=require('mongoose');

const watchLater=new mongoose.Schema({

userId:{type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    unique:true,
},
videoId:[{type:mongoose.Schema.Types.ObjectId,
    ref:'Video',
    required:true,

}]

})

module.exports=mongoose.model('watchLater',watchLater)