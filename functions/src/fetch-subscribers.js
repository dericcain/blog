const API_KEY = process.env.MAILGUN_API_KEY;
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: 'subscribe.dericcain.com' });

export const handler = (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    callback('No path here bro...');
  }

  const list = mailgun.lists(`followers@subscribe.dericcain.com`);
  list.members().list((error, members) => {
    if (error) {
      callback(error);
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(members),
    });
  });
};
