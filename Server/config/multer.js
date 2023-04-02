import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads') // specify the directory where the file will be saved
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname) // specify the name of the file on the server
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
  // fileFilter(req, file, cb) {
  //   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
  //     return cb(new Error('Please upload a valid image file'))
  //   }
  //   cb(undefined, true)
  // }
});
const upload = multer({ storage });

export default upload;      