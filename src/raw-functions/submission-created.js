const API_KEY = process.env.MAILGUN_API_KEY;
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: 'subscribe.dericcain.com' });

export const handler = async (event, context, callback) => {
  console.log(JSON.parse(event.body));

  const { email } = JSON.parse(event.body);

  const list = mailgun.lists(`followers@subscribe.dericcain.com`);

  list.members().create({ address: email }, (error, data) => {
    if (error) throw new Error(error);
    console.log(data);

    callback(null, {
      statusCode: 200,
      body: data,
    })
  });

};


