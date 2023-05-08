import slugify from 'slugify';
import { IEvent } from '../eventModel';
import { Schema, Types, model } from 'mongoose';

export interface ICategory {
  _id: Types.ObjectId;
  slug: string;
  name: string;
  events: Array<IEvent>;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: String,
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        default: Array,
      },
    ],
  },
  { timestamps: true }
);

CategorySchema.pre<ICategory>('save', function (next) {
  this.slug = slugify(this.name, { lower: true, replacement: '-' });
  next();
});

const Category = model<ICategory>('Category', CategorySchema);

export default Category;
