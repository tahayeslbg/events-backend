import Category from '../../models/categoryModel';
import { Request, Response } from 'express';

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(503).json({ error: error.message });
  }
};

export default getCategories;
