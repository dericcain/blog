const isDev = process.env.NODE_ENV === 'development';
export const ADD_SUBSCRIBER = isDev
  ? 'http://localhost:9000/add-subscriber'
  : '/.netlify/functions/add-subscriber';
