import {Notes} from '../models/note.model';
import {mailSend} from "../middlewares/sendmail"
import {User} from '../models/user.model';
import {Console} from 'winston/lib/winston/transports';
import {error} from 'winston';
import bcrypt from 'bcrypt';
import jwt, { verify } from 'jsonwebtoken';


//create new user
export const newUser = async (body) => {
  const HashedPassword = await bcrypt.hash(body.Password, 10);
  console.log(HashedPassword);
  body.Password = HashedPassword;
  const data = await User.create(body);

  return data;
};




export const login = async (body) => {
  const searchData = await User.findOne({
    Email: body.Email
  });

  const token = jwt.sign({
      Email: searchData.Email,
      ID: searchData._id
    },
    'vishalgirase'
  );

  const isMatch = await bcrypt.compare(body.Password, searchData.Password);
  console.log(isMatch);
  if (body.Email == searchData.Email) {
    if (isMatch) {
      return token;
    } else {
      throw new Error('Invalid pasword');
    }
  }
};




export const addNote = async (body) => {
  body.UserID = body.data.ID;

  const newNote = await Notes.create(body);

  return newNote;
};





export const getNote = async (body) => {
  console.log("ID", body.data.ID)
  const findNote = await Notes.find({UserID: body.data.ID,isDeleted:true,isArchived:true})
  console.log("finddd note", findNote)
  return findNote;
}




export const findtrashed = async (body) => {
  const deletedNote = await Notes.find({
    UserID: body.data.ID,
    isDeleted: true
  });
  return deletedNote;
}





export const isArchived = async (body) => {
  const archivedNotes = await Notes.find({
    UserID: body.data.ID,
    isArchived: true
  });
  return archivedNotes;
}






export const forgetPassword = async (req) => {

const token= jwt.sign({ Email: req.body.Email }, "rajput")
console.log("token",token)
  const SearchMail = await User.find({
    Email: req.body.Email
  })
console.log("search mail",SearchMail)
  if (SearchMail) {
  const mail=mailSend(SearchMail[0].Email,token)
    return mail;
  } else {

    throw Error("EMAIL ID NOT FOUND IN DATABASE!");
  }
}






export const resetPassword=async (req)=>{
const tokenfound= req.header('Authorization').split(' ')[1];
const isVerified= jwt.verify(tokenfound,"rajput")
const newPassword=req.body.Password;
const HashednewPassword=await bcrypt.hash(newPassword,10);

if(isVerified){
const updatePassword=await User.findOneAndUpdate({Email:req.body.Email},
  {
    Password:HashednewPassword
  },{new:true})
return updatePassword;

}else{
  throw Error ;
}
}

