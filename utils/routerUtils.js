let paths = new Set(["/", "/api"]);

exports.isAuthorizedRoute = (req) => {
    return (paths.has("/"+req.originalUrl.split("/")[1]));
};
