import {v2 as cloudinary} from "cloudinary";
import fs from "fs";  

// fs = fileSystem 
// when we delete any file its unlink not delete

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadCloudinary =async(localFilePath)=>{
  try{
    if (!localFilePath) return null
    //upload the file on cloud

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })

    // file has been uploaded successfully
    // console.log("File is uploaded on cloudinary",response.url)
    fs.unlinkSync(localFilePath)

    console.log("Cloudinary Response:",response)
    return response 

  }catch(error){
    fs.unlinkSync(localFilePath) // remove the locally saved temprory file as the operation of uploading got failed
  }
}


export {uploadCloudinary}