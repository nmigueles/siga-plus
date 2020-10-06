import { Application } from '../declarations';
import { Model, Mongoose, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  fullname: string;
  degree: string;
  avatar: string;
  locked: boolean;
  expoPushToken: string;
}

export default function (app: Application): Model<User> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema(
    {
      username: { type: String, required: true, unique: true, lowercase: true },
      password: { type: String, required: true },
      fullname: { type: String, required: true },
      expoPushToken: { type: String, default: '' },
      degree: { type: String, default: 'Ingresante' },
      avatar: { type: String, default: 'https://modumcab.mx/images/users/avatar-1.png' },
      locked: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<User>(modelName, schema);
}
