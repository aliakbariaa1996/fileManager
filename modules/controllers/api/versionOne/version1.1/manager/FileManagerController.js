const jwt = require('jsonwebtoken');

// require coredinator
const { api: corePatch } = configApp.paths.core;
const Controller = require(`${corePatch}/versionOne/version1.1/Controller`);

// require model
const { api: pathModel } = configApp.paths.models;
const fileModel = require(`${pathModel}/versionOne/version1.1/fileModel`);

// require transform
const { api: patchTransform } = configApp.paths.transforms;
const fileInformationTransform = require(`${patchTransform}/versionOne/version1.1/file/FileInformationTransform`);

class FileManagerController extends Controller {

    get(request, response) {
        request.checkQuery('page', 'text message').notEmpty();
        let validationErrors = request.validationErrors();
        if (validationErrors) {
            return this.helpers.response.getInstance().checkResponse(response, {}, 422, 'message TODO', validationErrors); // TODO set message
        } else {
            const page = new this.helpers.defaultHelper().getInstance().checkPage(request.query.page);
            fileModel.paginate({ 'userId': request.userInfo._id }, { page, limit: configApp.paginateLimit }).then(result => {
                if (result) {
                    let responseFile = new fileInformationTransform().withPaginate().transformCollection(result);
                    return this.helpers.response.getInstance().checkResponse(response, responseFile, 200, 'success message', {}); // TODO set message
                } else {
                    return this.helpers.response.getInstance().checkResponse(response, {}, 200, 'success message', {}); // TODO set message 
                }
            });
        }
    }

    delete(request, response) {
        request.checkParams('fileId', 'message fileId').isMongoId();
        let validationErrors = request.validationErrors();
        if (validationErrors) {
            return this.helpers.response.getInstance().checkResponse(response, {}, 422, 'message TODO', validationErrors); // TODO set message
        } else {
            let params = request.params;
            this.models.fileModel.find({ _id: params.fileId, userId: request.userInfo._id }, (error, fileInformation) => {
                if (error) {
                    return this.helpers.response.getInstance().checkResponse(response, {}, 500, 'warning message', {}); // TODO set message
                } else {
                    fs.unlink(fileInformation.uri, function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                    return this.helpers.response.getInstance().checkResponse(response, {}, 200, 'success message', {}); // TODO set message
                }
            });
        }
    }

    async upload(request, response) {
        const body = request.body;
        if (request.files.length >= 1) {
            const objectMultiMedia = [];
            for (const value of request.files) {
                objectMultiMedia.push({
                    userId: body.userId,
                    name: value.path,
                    uri: await new this.helpers.defaultHelper().getInstance().checkValidUri(value.path)
                });
            }
            fileModel.insertMany(objectMultiMedia, (error, result) => {
                if (error) {
                    return this.helpers.response.getInstance().checkResponse(response, {}, 400, 'message TODO ...', {}); // TODO set message
                } else {
                    this.models.userModel.findById(request.userInfo._id, (errorUser, resultUser) => {
                        if (errorUser) {
                            return this.helpers.response.getInstance().checkResponse(response, {}, 400, 'message TODO ...', {}); // TODO set message
                        } else {
                            for (const valueMultiMedia of result) {
                                resultUser.files.push(valueMultiMedia._id);
                            }
                            resultUser.save();
                            return this.helpers.response.getInstance().checkResponse(response, {}, 200, 'message success request', {}); // TODO set message
                        }
                    });
                }
            });
        } else {
            return this.helpers.response.getInstance().checkResponse(response, {}, 400, 'file not found ...', {}); // TODO set message
        }
    }

    share(request, response) {
        request.checkParams('fileId', 'message fileId').isMongoId();
        let validationErrors = request.validationErrors();
        if (validationErrors) {
            return this.helpers.response.getInstance().checkResponse(response, {}, 422, 'message TODO', validationErrors); // TODO set message
        } else {
            let params = request.params;
            fileModel.find({ _id: params.fileId, userId: request.userInfo._id }, (error, fileInformation) => {
                if (error) {
                    return this.helpers.response.getInstance().checkResponse(response, {}, 500, 'warning message', {}); // TODO set message
                } else {
                    if (fileInformation != null) {
                        return this.helpers.response.getInstance().checkResponse(response, {}, 404, 'file not found ...', {}); // TODO set message
                    } else {
                        let accessToken = jwt.sign({
                            userId: item._id,
                            fileId: params.fileId
                        }, process.env.SECRET_FILE_ACCESS_TOKEN, { expiresIn: '24h' });
                        fileInformation.token = accessToken;
                        fileInformation.save();
                        return this.helpers.response.getInstance().checkResponse(response, {}, 200, 'message success request', {}); // TODO set message
                    }
                }
            });
        }
    }
}
module.exports = new FileManagerController();