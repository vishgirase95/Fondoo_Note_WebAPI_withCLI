import Notes from '../models/note.model';

import User from '../models/user.model';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  console.log('datta', searchData);
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


export const getNote=async (body)=>{
const findNote=await Notes.find({UserID:body.data.ID})
return findNote;
}


export const trashNotes=async (body)=>{
  const deletedNote=await Notes.find({UserID:body.data.ID,isDeleted:true});
  return deletedNote;
}


export const isArchived=async (body)=>{
  const archivedNotes=await Notes.find({UserID:body.data.ID,isArchived:true});
  return archivedNotes;
}

export const updateNote=async (body)=>{
  console.log("body update",body);
  const updatedNote=await Notes.updateOne({_id:body.NoteID},
    {
      Title:body.Title,
      Descreption:body.Descreption,
      color:body.color,
      isArchived:body.isArchived,
      isDeleted:body.isDeleted
    },{new:true} )
  return updatedNote;
}




export const deleteNote=async (body)=>{
  const TrashedNote=await Notes.findOneAndDelete({_id:body.NoteID});
  return TrashedNote;
}