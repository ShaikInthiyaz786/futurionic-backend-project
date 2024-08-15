import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { createUserSchema, updateUserSchema } from '../../module/validation/userValidation.js';
import { validateRequest } from '../../middleware/validateRequest.js';

const router = express.Router();

// Get all users
router.get('/', getUsers);

// Get user by ID
router.get('/:id', getUserById);

// Create new user
router.post('/', validateRequest(createUserSchema), createUser);

// Update user by ID
router.put('/:id', validateRequest(updateUserSchema), updateUser);

// Delete user by ID
router.delete('/:id', deleteUser);

export default router;
