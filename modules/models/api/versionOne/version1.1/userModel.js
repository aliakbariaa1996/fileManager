const mongoose = require('mongoose');
const schema = mongoose.Schema;
const timeStamp = require('mongoose-timestamp');

const userSchema = new schema({
    email: { type: String, index: true, default: null },
    fullName: { type: String, default: null },
    avatar: { type: String, default: null },
    password: {type : String , default:null},
    files: [{ type: schema.Types.ObjectId, ref: "fm_files" }],
});

userSchema.plugin(timeStamp);
module.exports = mongoose.model('fm_users', userSchema);