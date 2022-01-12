const dotenv=require("dotenv")
dotenv.config("./.env");

import nodemailer from "nodemailer";
const Password=process.env.EMAIL_PASS

export const mailSend=(mail_ID)=>{

    
const transport=nodemailer.createTransport(
    {
        service: "gmail",
        auth:{
            user:"vishgirase1995@gmail.com",
            pass:Password
        }
    }
)

const mailOption={
    from:"vishgirase1995@gmail.com",
    to:mail_ID,
    subject:"NodeJS",
    text: "Hello world?",
    html:"Hello, How are you..this mail is from node server"
}

transport.sendMail(mailOption,function(err,info){
    if(err){
        console.log(err);
        return err;
    }else{
        console.log("info response..",info.response)
        console.log("info...........",info)
        return info.response;

    }
})
}