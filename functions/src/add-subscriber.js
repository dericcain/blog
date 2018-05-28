const API_KEY = process.env.MAILGUN_API_KEY;
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: 'subscribe.dericcain.com' });

export const handler = async (event, context, callback) => {
  const { email } = JSON.parse(event.body);
  const list = mailgun.lists(`followers@subscribe.dericcain.com`);

  list.members().create({ address: email }, (error, data) => {
    if (error) {
      callback(error);
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data),
    });
  });
};
