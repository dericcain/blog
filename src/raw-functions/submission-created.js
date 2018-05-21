const API_KEY = process.env.MAILGUN_API_KEY;
const URL = `https://api:${API_KEY}@api.mailgun.net/v3/subscribe.dericcain.com/lists/followers@subscribe.dericcain.com/members`;

exports.handler = ({ body }, context, callback) => {
  console.log(body);

  const email = '';

  fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ email }),
  }).then(result => {

  });

  callback(null, {
    statusCode: 200,
    body: 'Done!'
  });
};


