const API_KEY = process.env.MAILGUN_API_KEY;
const URL = `https://api:${API_KEY}@api.mailgun.net/v3/subscribe.dericcain.com/lists/followers@subscribe.dericcain.com/members`;

export function handler({ body: { payload, site }, isBase64Encoded }, context, callback) {
  console.log(payload);
  console.log(URL);
  console.log(isBase64Encoded);
  const { email } = payload;
  if (email) {
    console.log(email);
    console.log(site);
  }
  callback(null, {
    statusCode: 200,
    body: 'Done!'
  });
}
