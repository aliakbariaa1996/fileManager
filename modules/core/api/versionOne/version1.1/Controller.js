// require helper 
const { api: pathHelper, basePath: basePath } = configApp.paths.helpers;
const response = require(`${pathHelper}/versionOne/version1.1/ResponseHelper`);

// require model
const { api: pathModel } = configApp.paths.models;
const userModel = require(`${pathModel}/versionOne/version1.1/userModel`);

class Controller {
    constructor() {
        this.helpers = { response };
        this.models = { userModel };
    }
}

module.exports = Controller;