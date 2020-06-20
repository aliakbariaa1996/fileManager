const Transform = require('../../../Transform');

class FileInformationTransform extends Transform {
    transform(item) {
        return {
            fileId: item._id,
            name: item.name,
            uri: item.uri,
            token: item.token
        }
    }
}
module.exports = FileInformationTransform;