'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ConditionCommentSchema = new Schema({
  conditionId: {//状态ID
    type: Schema.Types.ObjectId,
    ref: 'Condition'
  },
  status: {
    type: Number,
    enum: [
      _global.ENABLE,
      _global.DISABLE,
    ],
  },//状态 1=启用 0=禁用
  votes: {
    count: Number,//点赞个数
    data: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
      },
    ]
  },
  commentNumber: Number,//评论个数
  comment: {
    content: String,
    commentedId: {//被回复的评论
      type: Schema.Types.ObjectId,
      ref: 'ConditionComment'
    },
    commentedUserId: {//被回复的用户
      type: Schema.Types.ObjectId,
      ref: 'User'
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
ConditionCommentSchema.index({"meta.createAt": -1})
ConditionCommentSchema.index({"creationId": 1})

ConditionCommentSchema.pre('save', function (next) {
  var now = Date.now()
  if (this.isNew) {
    this.meta.createAt = now
  }
  this.meta.updateAt = now
  next()
})

module.exports = mongoose.model('ConditionComment', ConditionCommentSchema)  