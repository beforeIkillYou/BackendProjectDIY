import mongoose,{Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber:{
        types:Schema.Types.ObjectId, //one who is subscribing
        ref:"User"
    },
    channel:{
        types:Schema.Types.ObjectId, //one who is getting subscribed
        ref:"User"
    }
},
{timestamps:true})

export const Subscription = mongoose.model("Subscription",subscriptionSchema)