import multer from "multer";

function uploadImageCat(folder) {
  const storage = multer.diskStorage({
    // destination: ../client/./public/images/${a},
    destination: `./public/images/${folder}`,
    filename: function (req, file, callback) {
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage }).single("file");
  return upload;
}
export default uploadImageCat;