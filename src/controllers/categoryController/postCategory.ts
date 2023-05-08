import Category from '../../models/categoryModel';
import { Request, Response } from 'express';

const postCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error: any) {
    res.status(503).json({ error: error.message });
  }
};

export default postCategory;
