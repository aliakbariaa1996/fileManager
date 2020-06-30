// require coredinator
const { api: corePatch } = configApp.paths.core;
const Controller = require(`${corePatch}/versionOne/version1.1/Controller`);

// require model
const { api: pathModel } = configApp.paths.models;

// require transform
const { api: patchTransform } = configApp.paths.transforms;
const LoginTransform = require(`${patchTransform}/versionOne/version1.1/authorize/LoginTransform`);

class AuthorizeController extends Controller {
    login(request, response) {
        request.checkBody('email', 'text message').notEmpty().matches(configApp.regexEmail, "i");
        request.checkBody('password', 'text message').notEmpty();

        let validationErrors = request.validationErrors();
        if (validationErrors) {
            return this.helpers.response.getInstance().checkResponse(response, {}, 422, 'message TODO', validationErrors); // TODO set message
        } else {
            const body = request.body;
            this.models.userModel.findOne({ email: body.email }, (error, userInfo) => {
                if (error) {
                    return this.helpers.response.getInstance().checkResponse(response, {}, 500, 'message TODO', {}); // TODO set message
                } else {
                    if (userInfo) {
                        bcrypt.compare(request.body.password, userInfo.password, (errorPassword, status) => {
                            if (!status) {
                                return this.helpers.response.getInstance().checkResponse(response, {}, 404, "notfound user ", {});
                            } else {
                                return this.helpers.response.getInstance().checkResponse(response, userInfo, 200, "login success", {});
                            }
                        });
                    } else {
                        return this.helpers.response.getInstance().checkResponse(response, {}, 404, "notfound user 1", {});
                    }
                }
            });
        }
    }

    register(request, response) {
        request.checkBody('email', 'text message').notEmpty().matches(configApp.regexEmail, "i");
        request.checkBody('fullName', 'text message').notEmpty();
        request.checkBody('password', 'text message').notEmpty();
        request.checkBody('confirmPassword', 'text message').notEmpty();

        let validationErrors = request.validationErrors();
        if (validationErrors) {
            return this.helpers.response.getInstance().checkResponse(response, {}, 422, 'message TODO', validationErrors); // TODO set message
        } else {
            const body = request.body;
            if (body.password === body.confirmPassword) {
                const finalPassword = new this.helpers.defaultHelper().getInstance().hashPassword(body.password);
                this.models.userModel({
                    email: body.email,
                    fullName: body.fullName,
                    password: finalPassword,
                }).save(error => {
                    if (error) {
                        if (error.code === 11000) {
                            return this.helpers.response.getInstance().checkResponse(response, {}, 400, 'message TODO', {}); // TODO set message
                        } else {
                            return this.helpers.response.getInstance().checkResponse(response, {}, 500, 'message TODO', {}); // TODO set message
                        }
                    } else {
                        return this.helpers.response.getInstance().checkResponse(response, {}, 200, 'message TODO', {}); // TODO set message
                    }
                });
            } else {
                return this.helpers.response.getInstance().checkResponse(response, {}, 400, 'message TODO', {}); // TODO set message
            }
        }
    }

    logout(request, response) {
    }
}

module.exports = new AuthorizeController();