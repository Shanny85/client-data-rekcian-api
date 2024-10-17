import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];

        // If no token is provided
        if (!token) {
            return res.status(401).json({ success: false, error: 'No token provided' });
        }

        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_KEY);
        } catch (err) {
            return res.status(401).json({ success: false, error: 'Token is not valid' });
        }

        // If token is valid, find the user
        const user = await User.findById(decoded._id).select("-password"); // Exclude password from response

        // If the user doesn't exist
        if (!user) {
            return res.status(401).json({ success: false, error: 'User not found' });
        }

        // Attach user info to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Log the error for debugging
        console.error('Authentication error:', error);

        // Respond with a generic error message
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
};

export default verifyUser;
