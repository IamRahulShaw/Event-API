const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  schedule: {
    type: Date,
    required: true,
  },
  description: String,
  files: [String],
  moderator: {
    type: String,
    required: true,
  },
  category: String,
  sub_category: String,
  rigor_rank: Number,
  attendies: [String],
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
