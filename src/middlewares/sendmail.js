import dotenv from 'dotenv';

dotenv.config("./.env");
import nodemailer from "nodemailer";
const Password=process.env.EMAIL_PASS

export const mailSend=(mail_ID,token)=>{

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
    subject:"BridgeLabz:Pasword Reset",
    text: "Hello world?",
    html:`<h2 style="color:#9a3fda">Hello Sir,Please Reset your password by below link!</h2><h3>Varification Link : <span style="color:#9a3fda"><a href="http://localhost:5000/${token}">click here</a></h3>`
  
}

transport.sendMail(mailOption)
}

// html:'<h2 style="color:#9a3fda">Hello Sir,Please Reset your password by below link!</h2><h3>Varification Link : <span style="color:#9a3fda"><a href="http://localhost:5000/">click here</a></h3>'      
