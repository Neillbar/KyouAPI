"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Complaints = new Schema({

  complaintID: { type: String, required: true },
  loggedBy: { type: String, required: true },
  hospID: { type: String, required: true },
  hospName: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, default: Date.now },
  complaintText: { type: String },
  progress: { type: String },
  attachments: { type: String, required: true }
});

module.exports = mongoose.model("complaints", Complaints);
//# sourceMappingURL=complaintsSchema.js.map