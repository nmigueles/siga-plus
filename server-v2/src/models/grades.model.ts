import { Application } from '../declarations';
import { Model, Mongoose, Document } from 'mongoose';
import { Course } from './courses.model';

export interface Grade extends Document {
  courseId: Course['_id'];
  instance: string;
  value: number;
}

export default function (app: Application): Model<Grade> {
  const modelName = 'grades';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      courseId: { type: Schema.Types.ObjectId, ref: 'courses', required: true },
      instance: { type: String, required: true }, // "PP"
      value: { type: Number, required: true }, // 8
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
  return mongooseClient.model<Grade>(modelName, schema);
}
