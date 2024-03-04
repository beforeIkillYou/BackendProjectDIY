// require("dotenv").config({
//     path: ".env"
// });//firstly congiduring the .env variables

import connectDB from "./db/index.js";   
import dotenv from "dotenv"

dotenv.config({path: ".env"});

connectDB();