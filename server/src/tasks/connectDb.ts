import mongoose from 'mongoose';
import { isProduction, isTest } from '../utils/enviroment';

const { MONGO_URI, MONGO_URI_PROD } = process.env;
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

let URI: string;

if (isProduction) {
  console.log('Database » Trying to connect to production db.');
  URI = MONGO_URI_PROD;
} else {
  URI = MONGO_URI;
}

export async function connect() {
  try {
    await mongoose.connect(URI, connectionOptions);
    if (!isTest) console.log('Database » Connected.');
  } catch (error) {
    console.error('Database » Error in connection.', error.message);
    process.exit(0);
  }
}

export async function disconnect() {
  await mongoose.disconnect();
}
