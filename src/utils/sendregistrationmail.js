import dotenv from 'dotenv';
import nodemailer from "nodemailer";


dotenv.config("./.env");
let password=process.env.EMAIL_PASS
let EMAIL_ID=process.env.EMAIL_ID_AUTH
export const mailSend=(mail_ID)=>{
const transport=nodemailer.createTransport(
    
    {
        
        service: "gmail",
        auth:{
            user:EMAIL_ID,
            pass:password
        }
    }
)



const mailOption={
    from:EMAIL_ID,
    to:mail_ID,
    subject:"BridgeLabz:Registration Sucessfull",
    text: "Hello world?",
    html:`<h2 style="color:#9a3fda">Congratulation Sir,<br>You have register sucessfully!</h2>`
  
}



return new Promise((resolve, reject) => {
    transport.sendMail(mailOption, (err, result) => {
        if (err) {
            return reject(err)
        }
        
        return resolve({result,token});
    });
});

}
    
