const multer = require('multer');
const mkdirp = require('mkdirp');
const basePath = configApp.upload.basePath;

// config upload avatar
const avatarStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        let directory = `${basePath}${configApp.upload.avatarPath}${request.userInfo._id}`;
        mkdirp(directory, error => callback(error, directory));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + request.userInfo._id + file.originalname)
    }
});

const avatarFilter = (request, file, callback) => {
    if(configApp.upload.typeAvatar.includes(file.mimetype )){
        callback(null, true);
    } else {
        callback(null, false);
    }
}

const uploadAvatar = multer({
    storage: avatarStorage,
    limits: {
        fileSize: 1024
    },
    fileFilter: avatarFilter
});

// config upload file
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        let directory = `${basePath}${configApp.upload.fileManagerPath}${request.userInfo._id}`;
        mkdirp(directory, error => callback(error, directory));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + request.userInfo._id + file.originalname)
    }
});

const fileFilter = (request, file, callback) => {
    if(configApp.upload.typeFile.includes(file.mimetype )){
        callback(null, true);
    } else {
        callback(null, false);
    }
}

const uploadfile = multer({
    storage: fileStorage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: fileFilter
});

module.exports = {
    uploadAvatar,
    uploadfile
}