import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads') // specify the directory where the file will be saved
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname) // specify the name of the file on the server
    }
  });
const upload = multer({ storage });

export default upload;      