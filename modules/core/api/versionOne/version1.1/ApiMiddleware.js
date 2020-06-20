// require helper 
const { api : pathHelper } = configApp.paths.helpers;
const response = require(`${pathHelper}/versionOne/version1.1/ResponseHelper`);

class ApiMiddleware{
    constructor(){
        this.helpers = { response };
    }
}

module.exports = ApiMiddleware;
