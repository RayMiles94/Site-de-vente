function logger(req) {
    var today = new Date();
    var now = today.toLocaleString();
    console.log("SERVER LOG => "+ now + " : Route "+req._parsedOriginalUrl.path);
}

module.exports = logger;