/**
 * logger functio.
 * @param {string} req The first number.
 */
function logger(req) {
  const today = new Date();
  const now = today.toLocaleString();
  console.log('SERVER LOG => '+ now + ' : Route '+req._parsedOriginalUrl.path);
}

module.exports = logger;
