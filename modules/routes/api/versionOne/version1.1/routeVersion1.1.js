//call expprss js framwork
const express = require('express');
const router = express.Router();

//require middleware
const { api: middlewareApi } = configApp.paths.middlewares;
const userMiddleware = require(`${middlewareApi}/versionOne/version1.1/UserMiddleware`);
const { uploadAvatar,uploadfile } = require(`${middlewareApi}/versionOne/version1.1/UploadMiddleware`);

// require controllers
const { api: controllerPath } = configApp.paths.controllers;

//autorize
const authorizeController = require(`${controllerPath}/versionOne/version1.1/authorize/AuthorizeController`);

//file manager
const fileManagerController = require(`${controllerPath}/versionOne/version1.1/manager/FileManagerController`);

//creation router 
const apiRouter = express.Router();

// route authorize
apiRouter.get('/login', authorizeController.login.bind(authorizeController));
apiRouter.post('/register', authorizeController.register.bind(authorizeController));
apiRouter.delete('/logout', userMiddleware.auth.bind(userMiddleware), authorizeController.logout.bind(authorizeController));

//route file manager
apiRouter.post('/files', userMiddleware.auth.bind(userMiddleware),uploadfile.array('uploadedFiles', 10),fileManagerController.upload.bind(fileManagerController));
apiRouter.get('files', userMiddleware.auth.bind(userMiddleware),fileManagerController.get.bind(fileManagerController));
apiRouter.delete('/files/:fileId', userMiddleware.auth.bind(userMiddleware),fileManagerController.delete.bind(fileManagerController));

router.use('/', apiRouter);

module.exports = router;