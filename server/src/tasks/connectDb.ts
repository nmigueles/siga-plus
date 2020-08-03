import mongoose from 'mongoose';
import { isProduction } from '../utils/enviroment';

const { MONGO_URI, MONGO_URI_PROD } = process.env;
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

let URI;

if (isProduction) {
  console.log('Database » Trying to connect to production db.');
  URI = MONGO_URI_PROD;
} else {
  console.log('Database » Trying to connect to local db.');
  URI = MONGO_URI;
}

mongoose.connect(URI, connectionOptions).then(
  () => console.log('Database » Connected.'),
  error => console.log('Database » Error in connection.', error)
);
