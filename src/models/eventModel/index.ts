import { ICategory } from '../../models/categoryModel';
import { Schema, model } from 'mongoose';
import slugify from 'slugify';

export interface IEvent {
  title: string;
  slug: string;
  description: string;
  image: string;
  place: string;
  date: string;
  category: ICategory;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: String,
    description: { type: String, required: true },
    image: { type: String },
    place: { type: String, required: true },
    date: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);

EventSchema.pre<IEvent>('save', function (next) {
  const uid = new Date().getTime().toString(36);
  this.slug =
    slugify(this.title, { lower: true, replacement: '-' }) + '-' + uid;
  next();
});

const Event = model<IEvent>('Event', EventSchema);

export default Event;
