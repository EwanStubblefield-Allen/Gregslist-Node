import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { CarSchema } from '../models/Car.js';
import { HouseSchema } from '../models/House.js';
import { JobSchema } from '../models/Job.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Cars = mongoose.model('Car', CarSchema)

  Houses = mongoose.model('House', HouseSchema)

  Jobs = mongoose.model('Job', JobSchema)
}

export const dbContext = new DbContext()
