const { LogEvent } = require("./logger");

const ErrorHandle = (err, req, res, next) => {
    // Log the error details to a file
    LogEvent(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorlog.log');

    // Print the error stack trace to the console for debugging
    console.log(err.stack);

    // Use the response object to get the current status code, default to 500 if not set
    const status = res.statusCode ? res.statusCode : 500;

    // Send the response with the appropriate status and error message
    res.status(status);
    res.json({ message: err.message });
};

// Export the error handling middleware
module.exports = ErrorHandle;
