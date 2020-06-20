const jwt = require('jsonwebtoken');

// require paths middleware 
const { api: corePath } = configApp.paths.core;
const BaseMiddleware = require(`${corePath}/versionOne/version1.1/ApiMiddleware`);

// require model
const { api: modelPath } = configApp.paths.models;
const userModel = require(`${modelPath}/versionOne/version1.1/userModel`);

class UserMiddleware extends BaseMiddleware {
    auth(request, response, next) {
        let accessToken = request.body.accessToken || request.query.accessToken || request.headers['x-access-token'];
        if (accessToken) {
            jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (error, decode) => {
                if (error) {
                    return this.helpers.response.getInstance().checkResponse(response, {}, 401, 'message TODO', {}); // TODO set message
                } else {
                    userModel.findById(decode.userId, (error, userData) => {
                        if (error) {
                            return this.helpers.response.getInstance().checkResponse(response, {}, 401, 'message TODO', {}); // TODO set message
                        } else {
                            if (userData) {
                                request.userInfo = userData;
                                return next();
                            } else {
                                return this.helpers.response.getInstance().checkResponse(response, {}, 401, 'message TODO', {}); // TODO set message
                            }
                        }
                    });
                }
            });
        } else {
            this.routeList(request, response, next);
        }
    }
}

module.exports = new UserMiddleware()