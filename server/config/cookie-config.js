const options = {
  maxAge: 1000 * 60 * 60 * 24, // would expire after (for 15 minutes  1000 * 60 * 15 ) 15 minutes
  httpOnly: true, // The cookie only accessible by the web server
  // signed: true, // Indicates if the cookie should be signed
};
if (process.env.NODE_ENV !== 'development') {
  options.sameSite = 'none';
  // options.secure = true;
}

module.exports = options;
