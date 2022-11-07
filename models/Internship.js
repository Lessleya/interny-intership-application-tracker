const mongoose = require('mongoose')

const InternshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim:true,
  },

  body: {
    type: String,
    required: true,},

  company: {
    type: String,
    required: true,
  },
  applied: {
    type: String,
    required: true,
    enum:['yes','no']
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  skills: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

module.exports = mongoose.model('Intership', InternshipSchema)