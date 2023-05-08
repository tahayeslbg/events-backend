import Event from '../../models/eventModel';
import Category from '../../models/categoryModel';
import { Request, Response } from 'express';

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(categoryId, {
      new: true,
    });
    if (deletedCategory) {
      for (const events of deletedCategory.events) {
        await Event.findByIdAndUpdate(events, { category: null });
      }
    }
    res.status(200).json(deletedCategory);
  } catch (error: any) {
    res.status(503).json({ error: error.message });
  }
};

export default deleteCategory;
