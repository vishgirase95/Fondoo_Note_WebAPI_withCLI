import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true
    },
    Descreption: {
      type: String,
      required: true,

      trim: true
    },
    color: {
      type: String,

      trim: true
    },
    isArchived: {
      type: Boolean,
      trim: true
    },
    isDeleted: {
      type: Boolean,
      trim: true
    },
    UserID: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const Notes = mongoose.model('Notes', noteSchema);

