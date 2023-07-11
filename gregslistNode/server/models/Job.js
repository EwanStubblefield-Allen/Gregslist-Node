import { Schema } from "mongoose";

export const JobSchema = new Schema({
  position: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  salary: {
    type: Number,
    required: true,
    min: 1000,
    max: 1000000
  },
  isFullTime: {
    type: Boolean,
    default: true
  },
  schedule: {
    type: String,
    enum: ['Weekdays', 'Weekends', 'Flexible', 'On call'],
    default: 'Flexible'
  },
  description: {
    type: String,
    maxLength: 300
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})