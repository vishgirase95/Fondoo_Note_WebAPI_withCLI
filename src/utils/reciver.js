import amqp from 'amqplib/callback_api';
import {mailSend} from './sendregistrationmail'

//1 create connection
export const reciver = (RegData) => {
  amqp.connect('amqp://localhost', function (error, connection) {
    if (error) {
      console.log('Error :', error);
      throw error;
    }
    //2  create channel
    connection.createChannel(function (error1, channel) {
      if (error1) {
        console.log(error1);
        throw error1;
      }

    let queue = 'GMAIL_QUEUE.....';
    let RegistrationData=RegData;
      
      
      // 3 assert quee
      channel.assertQueue(queue, {
        durable: false
      });
      // 4 consume the quess
      channel.consume(queue, (msgg) => {
        console.log('Recived mail at :', msgg.content.toString());
        mailSend(msgg.content.toString(),RegistrationData)
      },{ noAck: true}
      );
    });
  });
};
