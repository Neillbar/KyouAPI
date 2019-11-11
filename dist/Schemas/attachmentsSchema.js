"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var attachementSchema = new Schema({
    complaintsID: String,
    image: [Buffer],
    recording: Buffer,
    convertedText: String
});

module.exports = mongoose.model("attachments", attachementSchema);
//# sourceMappingURL=attachmentsSchema.js.map