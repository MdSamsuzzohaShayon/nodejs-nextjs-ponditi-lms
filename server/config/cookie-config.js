const options = {
  maxAge: 1000 * 60 * 60 * 24 * 90, // would expire after (for 15 minutes  1000 * 60 * 15 ) 90 days
  httpOnly: true, // The cookie only accessible by the web server
  // signed: true, // Indicates if the cookie should be signed
};
if (process.env.NODE_ENV !== 'development') {
  options.sameSite = 'none';
  options.secure = true;
}

module.exports = options;
