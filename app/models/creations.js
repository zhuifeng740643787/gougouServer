'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CreationsSchema = new Schema({
  title: {
    unique: true,
    type: String,
    index: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  thumb: String,
  video: String,
  votes: {
    total: Number,
    data: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        createdAt: Date,
      }
    ],
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})
CreationsSchema.index({"meta.createAt": -1})

CreationsSchema.pre('save', function (next) {
  if(!this.isNew){
    this.meta.updateAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('Creations', CreationsSchema)  