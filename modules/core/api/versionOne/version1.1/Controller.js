// require helper 
const { api: pathHelper, basePath: basePath } = configApp.paths.helpers;
const response = require(`${pathHelper}/versionOne/version1.1/ResponseHelper`);
const defaultHelper = require(`${pathHelper}/utils/DefaultHelper`);

// require model
const { api: pathModel } = configApp.paths.models;
const userModel = require(`${pathModel}/versionOne/version1.1/userModel`);


class Controller {
    constructor() {
        this.helpers = { response , defaultHelper };
        this.models = { userModel };
    }
}

module.exports = Controller;