var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var attachementSchema = new Schema ({
    complaintsID: String,
    image: {path: [String], imageID: [Number]},
    recording: String,
    recordingID: String,
    video: String,
    videoID: Number,
    convertedText: String
})

module.exports = mongoose.model("attachments",attachementSchema);