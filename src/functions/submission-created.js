const API_KEY = process.env.MAILGUN_API_KEY;
const URL = `https://api:${API_KEY}@api.mailgun.net/v3/subscribe.dericcain.com/lists/followers@subscribe.dericcain.com/members`;

exports.handler = (event, context, callback) => {
  console.log(event);
  console.log(context);

  callback(null, {
    statusCode: 200,
    body: 'Done!'
  });
};
