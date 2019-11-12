var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var attachementSchema = new Schema ({
    complaintsID: String,
    image: [Buffer],
    recording: Buffer,
    video: Buffer,
    convertedText: String
})

module.exports = mongoose.model("attachments",attachementSchema);