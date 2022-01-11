import  mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
  
      trim: true
    },
    LastName: {
      type: String,
  
      trim: true
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    Password: {
      type: String,
      required: true,
      trim: true
    },
   
  },
  {
    timestamps: true
  }
);



const user =mongoose.model("User", userSchema)

export default user;
