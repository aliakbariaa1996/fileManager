const Transform = require('./../../../Transform');
const jwt = require('jsonwebtoken');

class LoginTransform extends Transform {
    transform(item) {
        return {
            ...this.showUserInfo(item).info,
            ...this.withAccessToken(item)
        }
    }

    showUserInfo(item) {
        const getUserInformationTransform = require('./../user/UserInformationTransform');
        return {
            info: new getUserInformationTransform().transform(item, true),
        }
    }

    withAccessToken(item) {
        if (item.accessToken)
            return { accessToken: item.accessToken }

        let accessToken = jwt.sign({
            userId: item._id
        }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '24h' });
        return { accessToken };
    }
}

module.exports = LoginTransform;