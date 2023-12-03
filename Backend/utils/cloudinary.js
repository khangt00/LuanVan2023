const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:  process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY,
})

const cloudinaryUploadFile = async(fileToUploads, type) =>{
    try {
    const result = await cloudinary.v2.uploader.upload(fileToUploads, {
      resource_type: type,
    });

    // The 'result' object contains information about the uploaded file
    return {
            url : result.secure_url,
            asset_id : result.asset_id,
            public_id : result.public_id,
        }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

const cloudinaryUploadVideo = async(fileToUploads) =>{
    return new Promise((resolve)=>{
        cloudinary.uploader.upload(fileToUploads,(result)=>{
            console.log("fileToUploads: ", fileToUploads)
            console.log("result: ", result)
            resolve(
                {
                    url : result.secure_url,
                    asset_id : result.asset_id,
                    public_id : result.public_id,
                },
                {  
                    resource_type : "video"
                }
            )
        })
    })
};

const cloudinaryDeleteImg = async(fileToDelete) =>{
    return new Promise((resolve)=>{
        cloudinary.uploader.destroy(fileToDelete,(result)=>{
            resolve(
                {
                url : result.secure_url,
                asset_id : result.asset_id,
                public_id : result.public_id,
                },
                {  
                resource_type : "auto"
                }
            )
        })
    })
};

module.exports = {cloudinaryUploadFile, cloudinaryUploadVideo, cloudinaryDeleteImg};