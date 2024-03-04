// require("dotenv").config({
//     path: ".env"
// });//firstly congiduring the .env variables

import connectDB from "./db/index.js";   
import dotenv from "dotenv"
import {app} from "./app.js"

dotenv.config({path: ".env"});

connectDB()
.then(() => {
      app.listen(process.env.PORT || 3000, () =>{
        console.log("Server is running on port :",process.env.PORT);
    });
})
.catch(err => console.log("MONGODB CONNECTION FAILED",err));