import amqp from 'amqplib/callback_api';
import {reciver} from './reciver';


//1 create connection
export const sender=(data)=>{amqp.connect('amqp://localhost', function(error, connection) {
if(error){
    console.log("Error :",error)
    throw error;
}
//2  create channel 
connection.createChannel(function(error1, channel) {

    if(error1){
        console.log(error1);
        throw error1;
    }

    let queue = 'GMAIL_QUEUE.....';
    
    let msg =data.Email;
    
// 3 assert quee
    channel.assertQueue(queue, {
        durable: false
      });
// 4 send to queue
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(`send mail by ${queue} to ${msg}`);


  reciver();

    });
});}

