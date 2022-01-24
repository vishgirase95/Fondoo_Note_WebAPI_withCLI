import amqp from 'amqplib/callback_api';
import logger from '../config/logger';
import {reciver} from './reciver';


//1 create connection
export const sender=(data)=>{amqp.connect('amqp://localhost', function(error, connection) {
if(error){
    logger.error('Error at sender end'+ error);
    
    throw error;
}
//2  create channel 
connection.createChannel(function(error1, channel) {

    if(error1){
    logger.error('Error'+error);
        
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
    logger.info(`send mail by ${queue} to ${msg}`);


  reciver();

    });
});}

