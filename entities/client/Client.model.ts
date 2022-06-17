import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export const Client = mongoose.model('Client', ClientSchema);
