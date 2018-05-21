const API_KEY = process.env.MAILGUN_API_KEY;
const URL = `https://api:${API_KEY}@api.mailgun.net/v3/subscribe.dericcain.com/lists/followers@subscribe.dericcain.com/members`;

export function handler({ body: { payload, site }, isBase64Encoded }) {
  console.log(payload);
  console.log(URL);
  const { email } = payload;
  if (email) {
    console.log(email);
    console.log(site);
  }
};

// https://api:key-0dec61ab03904da7a5b62dd26d415b28@api.mailgun.net/v3/subscribe.dericcain.com
