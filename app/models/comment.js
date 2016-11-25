'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CommentSchema = new Schema({
  creationId: {//视频ID
    type: Schema.Types.ObjectId,
    ref: 'Creations'
  },
  comment: {
    content: String,
    commentId: {//被回复的评论
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    },
  },
  userId: {//评论人
    type: Schema.Types.ObjectId,
    ref: 'User'
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
CommentSchema.index({"meta.createAt": -1})
CommentSchema.index({"creationId": 1})

CommentSchema.pre('save', function (next) {
  if(!this.isNew){
    this.meta.updateAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('Comment', CommentSchema)  