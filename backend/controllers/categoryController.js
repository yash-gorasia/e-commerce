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

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const category = await Category.findById({ _id: categoryId });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        category.name = name;
        const updateCategory = await category.save();


        res.json(updateCategory);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "internal server error" })
    }
});


export { createCategory, updateCategory };