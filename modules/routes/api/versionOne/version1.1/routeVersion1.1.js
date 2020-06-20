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
apiRouter.post('/login', controllerAuthorize.login.bind(controllerAuthorize));
apiRouter.get('/register', controllerAuthorize.register.bind(controllerAuthorize));
apiRouter.delete('/logout', userMiddleware.auth.bind(userMiddleware), controllerAuthorize.logout.bind(controllerAuthorize));

//route file manager
apiRouter.post('/upload', userMiddleware.auth.bind(userMiddleware),uploadImagePlace.array('uploadedImages', 10),fileManagerController.upload.bind(fileManagerController));
apiRouter.get('/get', userMiddleware.auth.bind(userMiddleware),fileManagerController.upload.bind(fileManagerController));
apiRouter.delete('/delete', userMiddleware.auth.bind(userMiddleware),fileManagerController.upload.bind(fileManagerController));

router.use('/', clientRouter);

module.exports = router;