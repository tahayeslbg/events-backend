import { IEvent } from '../eventModel';
import { Schema, Types, model } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  surname: string;
  password: string;
  emailAddress: string;
  role: string;
  calendar: Array<IEvent>;
  tickets: Array<IEvent>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String },
    emailAddress: { type: String, required: true },
    role: { type: String, default: 'user' },
    calendar: [{ type: Schema.Types.ObjectId, ref: 'Event', default: Array }],
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Event', default: Array }],
  },
  { timestamps: true }
);

const User = model<IUser>('User', UserSchema);

export default User;
