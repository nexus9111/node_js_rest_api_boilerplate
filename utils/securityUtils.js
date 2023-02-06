const getConnectedUser = async (req) => {
    try {
        // get the user from your db
        req.connectedUser = {}; // replace this with your user
        return; // success
    } catch (error) {
        throw error;
    }
};

exports.authorize = (roles = []) => async (req, res, next) => {
    try {
        await getConnectedUser(req);
        // you can now access the user from req.connectedUser
        // you can do all verifications you want here
        // you can also check if the user has the right role
        // if not, throw an error like : throw new Error("You are not allowed to access this route");
        next();
    } catch(error) {
        next(error);
    }
};