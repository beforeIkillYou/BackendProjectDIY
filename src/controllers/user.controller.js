import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //1)user details
    //2)validation
    //3)user already exists
    //4)upload them to cloudinary images

    //5)create user object and in db
    //6)remove paddword and refresh token field from response
    //7)check for user creation...return response

    const {fullname, email,username, password} = req.body
    // console.log(username)
    if(
        [fullname, email, username, password].some((x) => x?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverLocalPath = req.files?.coverImage[0]?.path


    if(!avatarLocalPath){
        throw new ApiError(409, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const cover = await uploadOnCloudinary(coverLocalPath);

    if(!avatar){
        throw new ApiError(409, "Avatar upload failed")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: cover?.url || "",
        email,
        username : username.toLowerCase(),
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Internal server error")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser,"User registered successfully")
    )
})

export {registerUser}