import Category from '../../models/categoryModel'
import { Request, Response } from 'express'

const putCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const { categoryId } = req.params
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    )
    res.status(200).json(updatedCategory)
  } catch (error: any) {
    res.status(503).json({ error: error.message })
  }
}

export default putCategory
