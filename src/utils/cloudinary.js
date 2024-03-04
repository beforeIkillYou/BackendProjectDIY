import fs from "fs";

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'ddefovwve', 
  api_key: '222974652297163', 
  api_secret: '_NoZ2TsBnzZbZkca-aGEtPoJ9j4' 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if(!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type: "auto"
    })
    fs.unlinkSync(localFilePath);
    return response
  } catch (error) {
      fs.unlinkSync(localFilePath) //remove local file save on system
      return null;
  }
}

export { uploadOnCloudinary }