import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async(req,res)=>{
   // get user details from frontend 
   // validation - not empty
   // check user already exist : username,email
   // check for images , check for avatar
   // if available , upload the images to cloudinary
   // check if images are uploaded to cloudinary
   // create user object to save data - create entry in DB
   // remove password and refresh fill from response , cause we dont our client to see the password
   // check for user creation
   // return res

   const {fullName,email,username,password} = req.body
   
   if (fullName || email || username || password === ""){
    throw new ApiError(400,"All fields are required!")
   }

    const existedUser = User.findOne({
        $or : [{ username },{ email }]
    })

    if (existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath){
        throw new ApiError(400,"Avatar file is missing!")
    }

     const avatar = await uploadCloudinary(avatarLocalPath)
     const coverImage = await uploadCloudinary(coverImageLocalPath)

    if (!avatar){
        throw new ApiError(400,"Error in uploading with Avatar")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        email,
        coverImage: coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    // "- represent which fields we dont want"
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User registered successfully!")
    )

})




export {registerUser}