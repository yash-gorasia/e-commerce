import Category from '../models/categoryModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const exsitingCategory = await Category.findOne({ name });

        if (exsitingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = await new Category({ name }).save();
        res.json(category);

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        const category = await Category.findOne({ _id: categoryId });

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        category.name = name;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findById({ _id: categoryId });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const deleteCategory = await category.deleteOne();

        res.json(deleteCategory);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "internal server error" })
    }
});

const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({});

        res.json(categories);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "internal server error" })
    }
});

const readCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById({ _id: id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "internal server error" })
    }
});

export { createCategory, updateCategory, deleteCategory, getAllCategories, readCategory };