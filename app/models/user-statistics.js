'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserStatisticsSchema = new mongoose.Schema({
  userId: {
    unique: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  attentionNumber: Number,//关注的个数
  fansNumber: Number,//粉丝个数
  collectConditionNumber: Number,//收藏的个数
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserStatisticsSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.meta.updateAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('UserStatistics', UserStatisticsSchema)
