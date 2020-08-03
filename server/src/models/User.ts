import { Schema, model, Document } from 'mongoose';
import { ObjectID } from 'mongodb';

import { Privilege } from '../types';

export interface User extends Document {
  id?: ObjectID;
  name: string;
  username: string;
  password?: string;
  privileges: Privilege;
  expoPushToken: string;
}

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    carrera: { type: String, default: 'Ingeniería en Sistemas de la Información' },
    img: { type: String, default: 'https://modumcab.mx/images/users/avatar-1.png' },
    privileges: { type: [Number], default: [] },
    expoPushToken: { type: String, default: '' },
  },
  { timestamps: true }
);

export default model<User>('User', UserSchema);
