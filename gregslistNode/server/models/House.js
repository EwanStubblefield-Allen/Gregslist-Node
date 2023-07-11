import { Schema } from "mongoose";

export const HouseSchema = new Schema({
  bedrooms: {
    type: Number,
    required: true,
    max: 10
  },
  bathrooms: {
    type: Number,
    required: true,
    max: 10
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2024
  },
  price: {
    type: Number,
    required: true,
    min: 1000,
    max: 1000000
  },
  imgUrl: {
    type: String,
    default: '//placehold.it/300x300',
    maxLength: 300
  },
  description: {
    type: String,
    minLength: 3,
    maxLength: 200
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