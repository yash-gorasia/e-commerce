import User from "../models/userModel.js"; // Import the User model
import asyncHandler from "../middlewares/asyncHandler.js"; // Import the asyncHandler middleware
import bcrypt from "bcryptjs"; // Import bcrypt
import generateToken from "../utils/createToken.js"; // Import the generateToken function

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body; // Destructure the username, email, and password from req.body

    if (!username || !email || !password) { // If username, email, or password is missing
        res.status(400); // Set the status code to 400
        throw new Error("Please fill in all fields"); // Throw an error
    };

    const userExists = await User.findOne({ email }); // Check if the user already exists
    if (userExists) { // If the user already exists
        res.status(400); // Set the status code to 400
        throw new Error("User already exists"); // Throw an error
    };

    const salt = await bcrypt.genSalt(10); // Generate a salt, it will add random characters to the password
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    const newUser = await User.create({ username, email, password: hashedPassword }); // Create a new user

    try {
        newUser.save(); // Save the new user
        generateToken(res, newUser._id); // Generate a token


        res.status(201).json({ // Send a response
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            isAdmin: newUser.isAdmin
        });
    } catch (error) {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; // Destructure the email and password from req.body

    const existingUser = await User.findOne({ email }); // Find the user by email

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password); // Compare the password

        if (isPasswordValid) {
            generateToken(res, existingUser._id); // Generate a token

            res.status(200).json({ // Send a response
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            });
            return; // we return to stop the function

        }
    }

    res.status(401); // Set the status code to 401
    throw new Error("Invalid email or password"); // Throw an error
});

export { createUser, loginUser }; // Export the createUser, loginUser function