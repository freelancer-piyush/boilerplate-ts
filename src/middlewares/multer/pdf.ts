import multer from "multer";

let storage = multer.memoryStorage();

export const uploadPdf = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only pdf file allowed!"));
    }
  },
});

export default multer({ storage: storage });
