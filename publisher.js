const amqplib = require('amqplib');
const amqp_url = 'amqp://172.19.0.2:5672';

(async () => {
  const connection = await amqplib.connect(amqp_url, 'heartbeat=60');
  const channel = await connection.createChannel();
  try {
    console.log('Publishing');
    const exchange = 'user.signed_up';
    const queue = 'user.sign_up_email';
    const routingKey = 'sign_up_email';
    
    await channel.assertExchange(exchange, 'direct', {durable: true});
    await channel.assertQueue(queue, {durable: true});
    await channel.bindQueue(queue, exchange, routingKey);
    
    const msg = {'id': Math.floor(Math.random() * 1000), 'email': 'boussif.assma@gmail.com', name: 'RABBIT MQ TESTER'};
    await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
    console.log('Message published');
  } catch(e) {
    console.error('Error in publishing message', e);
  } finally {
    console.info('Closing channel and connection if available');
    await channel.close();
    await connection.close();
    console.info('Channel and connection closed');
  }
  process.exit(0);
})();
