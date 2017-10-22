const yelp = require('yelp-fusion');

module.exports = async () => {
  const res = await yelp.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET);

  return yelp.client(res.jsonBody.access_token);;
}
