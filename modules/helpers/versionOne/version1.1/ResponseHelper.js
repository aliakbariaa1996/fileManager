class ResponseHelper {
    constructor() {
        this.responseEndPoint = {};
    }

    checkResponse(respone, object, code, message, errorValidation = {}) {
        this.responseEndPoint = respone;
        switch (code) {
            case 200:
                this.setObjectResponseSuccess(code, message, object);
                break;
            case 422:
                this.setObjectResponseFail(code, message, errorValidation);
                break;
            default:
                this.setObjectResponseDefault(code, message);
                break;
        }
    }

    setObjectResponseSuccess(code, message, object) {
        this.responseEndPoint.status(code).json({
            success: true,
            status: code,
            message: message,
            result: object
        });
    }

    setObjectResponseFail(code, message, errorValidationList) {
        this.responseEndPoint.status(code).json({
            success: false,
            staus: code,
            message: message,
            errorValidation: errorValidationList.map(mapError => {
                return {
                    'field': mapError.param,
                    'message': mapError.msg
                }
            })
        });
    }

    setObjectResponseDefault(code, message) {
        this.responseEndPoint.status(code).json({
            success: false,
            status: code,
            message: message
        })
    }
}

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new ResponseHelper();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = new Singleton();