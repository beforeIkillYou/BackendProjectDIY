import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/tmp/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer.upload({
    storage: storage
})