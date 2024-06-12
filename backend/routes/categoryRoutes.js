import express from "express";

import {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    readCategory
} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/').post(authenticate, authorizeAdmin, createCategory);

router.route('/:categoryId').put(authenticate, authorizeAdmin, updateCategory);

router.route('/:categoryId').delete(authenticate, authorizeAdmin, deleteCategory);

router.route('/categories').get(authenticate, authorizeAdmin, getAllCategories);

router.route('/:id').get(authenticate, authorizeAdmin, readCategory);

export default router;