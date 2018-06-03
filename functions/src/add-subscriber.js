const API_KEY = process.env.MAILGUN_API_KEY;
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: 'subscribe.dericcain.com' });

export const handler = async (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    console.log('Non-POST event');
    callback(null, {
      statusCode: 200,
    });
  }
  
  const { email } = JSON.parse(event.body);
  const list = mailgun.lists(`followers@subscribe.dericcain.com`);
  
  console.log(`The email is: ${email}`);
  const subscribed = {
    address: email,
    subscribed: true,
  }
  list.members().create(subscribed, (error, data) => {
    if (error) {
      console.log(`Something happened: ${error}`);
      callback(error, {
        statusCode: 400
      });
    }

    console.log(`Email was added: ${JSON.stringify(data)}`)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data),
    });
  });
};
