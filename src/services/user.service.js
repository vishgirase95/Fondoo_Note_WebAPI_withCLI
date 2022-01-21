import {Notes} from '../models/note.model';
import {mailSend} from "../middlewares/sendmail"

import {User} from '../models/user.model';
import {Console} from 'winston/lib/winston/transports';
import {error} from 'winston';
import bcrypt from 'bcrypt';
import jwt, { verify } from 'jsonwebtoken';
import {client} from "../config/reddis.js"


const secretekey_login=process.env.secretkey;
const forgetPassword_token=process.env.forgetPassword_token;
//create new user
export const newUser = async (body) => {
  const HashedPassword = await bcrypt.hash(body.Password, 10);
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
    secretekey_login
  );

  const isMatch = await bcrypt.compare(body.Password, searchData.Password);
  
  if (body.Email == searchData.Email) {
    if (isMatch) {
      return token;
    } else {
      throw new Error('Invalid pasword');
    }
  }else{
    throw new Error("Email id not found ");
  }
};




export const addNote = async (body) => {
  body.UserID = body.data.ID;

  const newNote = await Notes.create(body);
  await client.del  ("notes_data");
  await client.del("Key");
  
  return newNote;
};



export const updateNote=async (body)=>{
  const previous=await Notes.findOne({_id:body.NoteID})
  const updated=await Notes.updateOne({_id:body.NoteID},{
    Title:body.Title?body.Title:previous.Title,
    Descreption:body.Descreption?body.Descreption:previous.Descreption,
    color:body.color?body.color:previous.color,
    isArchived:body.isArchived?body.isArchived:previous.isArchived,
    isDeleted:body.isDeleted?body.isDeleted:previous.isDeleted
  },{
    new:true
  })
await client.del("notes_data");
await client.del("Key");


  return updated;
}

export const getNote = async (body) => {
  
  const findNote = await Notes.find({UserID: body.data.ID,isDeleted:false,isArchived:false})
  await client.set("notes_data",JSON.stringify(findNote));
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
  
  await client.set('Key', JSON.stringify(archivedNotes))
  return archivedNotes;
}


export const deletenote = async (req) => {
  const archivedNotes = await Notes.findByIdAndDelete({
    _id:req.params._id,

  });
  await client.del("Key");
  await client.del("notes_data")

  return "deleted note";
}




export const forgetPassword = async (req) => {

const token= jwt.sign({ Email: req.body.Email },forgetPassword_token)

  const SearchMail = await User.find({
    Email: req.body.Email
  })

  if (SearchMail) {
  const mail=mailSend(SearchMail[0].Email,token)
    return mail;
  } else {

    throw Error("EMAIL ID NOT FOUND IN DATABASE!");
  }
}






export const resetPassword=async (req)=>{
const tokenfound= req.header('Authorization').split(' ')[1];
const isVerified= jwt.verify(tokenfound,forgetPassword_token)
const newPassword=req.body.Password;
const HashednewPassword=await bcrypt.hash(newPassword,10);

if(isVerified){
const updatePassword=await User.findOneAndUpdate({Email:req.body.Email},
  {
    Password:HashednewPassword
  },{new:true})

  if(updatePassword){
    return updatePassword;
  }else{
    throw Error 
  }


}else{
  throw Error ;
}
}

