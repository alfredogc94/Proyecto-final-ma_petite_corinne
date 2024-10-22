import multer from "multer";

function uploadImage(folder) {
  const storage = multer.diskStorage({
    destination: `./public/images/${folder}`,
    filename: function (req, file, callback) {
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage }).array("file"); 
  return upload;
}

export default uploadImage;
