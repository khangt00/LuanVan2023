const asyncHandler = require("express-async-handler");
const fs = require("fs");
const {
  cloudinaryUploadFile,
  cloudinaryUploadVideo,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");

const FILE_TYPE = {
  VIDEO: 'video',
  IMAGE: 'image'
}

const uploadImages = asyncHandler(async (req, res) => {
  try {
    // const uploader = (path) => cloudinaryUploadVideo(path);
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path, mimetype } = file;
      let type = FILE_TYPE.IMAGE
      if (mimetype === 'image/jpeg') {
        type = FILE_TYPE.IMAGE
      } else if (mimetype === 'video/mp4') {
        type = FILE_TYPE.VIDEO

      }
      const newpath = await cloudinaryUploadFile(path, type);
      console.log('newpath: ', newpath)
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});

/* delete */
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const uploader = cloudinaryDeleteImg(id, "images");
    res.json({
      message: "Deleted",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports={uploadImages,deleteImages}