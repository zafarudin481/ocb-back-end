import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    // modify the name of uploaded file with identifier and extension name
    filename: function (req, file, cb) {
        const uuid = crypto.randomUUID();
        cb(null, uuid + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;

// const upload = multer({
//     dest: "uploads/"
// });