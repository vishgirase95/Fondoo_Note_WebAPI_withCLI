import amqp from 'amqplib/callback_api';
import logger from '../config/logger';
import {mailSend} from './sendregistrationmail'

//1 create connection
export const reciver = (RegData) => {
  amqp.connect('amqp://localhost', function (error, connection) {
    if (error) {
    
    logger.error('Error at reciver end'+error);

      throw error;
    }
    //2  create channel
    connection.createChannel(function (error1, channel) {
      if (error1) {
    logger.error(error1);
        
        throw error1;
      }

    let queue = 'GMAIL_QUEUE.....';
    
      
      // 3 assert quee
      channel.assertQueue(queue, {
        durable: false
      });
      // 4 consume the quess
      channel.consume(queue, (msgg) => {
        logger.info("Recived mail at : "+msgg.content.toString());
    

        mailSend(msgg.content.toString())
      },{ noAck: true}
      );
    });
  });
};
