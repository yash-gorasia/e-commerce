import User from "../models/userModel.js"; // Import the User model
import asyncHandler from "../middlewares/asyncHandler.js"; // Import the asyncHandler middleware

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body; // Destructure the username, email, and password from req.body
   
    if( !username || !email || !password ) { // If username, email, or password is missing
        res.status(400); // Set the status code to 400
        throw new Error("Please fill in all fields"); // Throw an error
    };

    const userExists = await User.findOne({ email }); // Check if the user already exists
    if(userExists) { // If the user already exists
        res.status(400); // Set the status code to 400
        throw new Error("User already exists"); // Throw an error
    };
});

export { createUser }; // Export the createUser function