const Transform = require('./../../../Transform');

class UserInformationTransform extends Transform {
    transform(item, isLogin = true) {
        if (isLogin == false) {
            return {
                userId: item._id,
                email: item.email,
                fullName: item.fullName,
                avatar: configApp.baseUrl + item.avatar,
                gender: item.gender
            }
        } else {
            return {
                fullName: item.fullName,
                avatar: configApp.baseUrl + item.avatar,

            }
        }
    }
}

module.exports = UserInformationTransform;