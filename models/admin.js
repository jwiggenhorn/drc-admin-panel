import mongoose from 'mongoose'
const ObjectId = require('mongodb').ObjectId

const AdminSchema = new mongoose.Schema({
  email: String,
  studies: [ObjectId],
})

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema)
