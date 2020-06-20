const mongoose = require('mongoose');
const schema = mongoose.Schema;
const timeStamp = require('mongoose-timestamp');

const fileSchema = new schema({
    userId: { type: schema.Types.ObjectId, default: null },
    name: { type: String, index: true, default: null },
    uri: { type: String, default: null },
    token: { type: String, index: true },
});

fileSchema.plugin(timeStamp);
module.exports = mongoose.model('fm_files', fileSchema);