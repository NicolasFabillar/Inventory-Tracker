const multer = require("multer");

const uploadFolders = {
    violationEvidenceImg: "public/violation-evidences"
};

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadFolder = uploadFolders[file.fieldname];
        
        if (uploadFolder) {
        cb(null, uploadFolder);
        } else {
        cb(new Error("Invalid fieldname"), false);
        }
    },
    filename: (req, file, cb) => {
        const date = new Date();
        const formattedDate = date.toISOString().replace(/:/g, "-") + "-";
        cb(null, formattedDate + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // DOCX
        file.mimetype === "application/pdf"
    ) {
        cb(null, true);
    } else {
        cb(new Error("File format not supported"), false);
    }
};

const multerConfig = (req, res, next) => {
    multer({
        storage: fileStorage,
        fileFilter: fileFilter,
        limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        },
    }).fields([
        {
            name: "violationEvidenceImg",
            maxCount: 5
        }
    ])(req, res, next);
};

module.exports = multerConfig;

