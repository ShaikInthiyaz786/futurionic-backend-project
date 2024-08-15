import { createUserSchema, updateUserSchema } from '../validation/userValidation.js';
import { User } from "../../config/database.js";

export const createUser = async (req, res) => {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = value;

    try {
        const newUser = await User.create({ username, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Failed to create user:", error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const updateUser = async (req, res) => {
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = req.params;
    const { username, password } = value;

    try {
        const user = await User.findByPk(id);
        if (user) {
            user.username = username;
            user.password = password;
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

export const getUsers = async (req, res) => {
    try {
        console.log("Hello world");
        const users = await User.findAll(); // Use the correct model
        res.status(200).json(users);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id); // Use the correct model
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// export const createUser = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const newUser = await User.create({ username, password });
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error("Failed to create user:", error);
//         res.status(500).json({ error: 'Failed to create user' });
//     }
// };

// export const updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { username, password } = req.body;

//     console.log("Update Request Received:", id, username, password);

//     try {
//         // Find the user by ID
//         const user = await User.findByPk(id); // Use the correct model

//         if (user) {
//             console.log("User Found:", user);

//             // Update the user properties
//             user.username = username;
//             user.password = password;

//             // Save the updated user back to the database
//             await user.save();

//             console.log("User Updated Successfully");

//             // Respond with the updated user
//             res.status(200).json(user);
//         } else {
//             console.log("User Not Found");
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         console.error("Error during update:", error);
//         res.status(500).json({ error: 'Failed to update user' });
//     }
// };

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id); // Use the correct model
        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
