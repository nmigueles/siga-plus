import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import 'dotenv/config';

import './tasks/connectDb';

import { isProduction } from './utils/enviroment';

import { notFoundHandler, errorHandler } from './middlewares';

const app = express();

import routesV1 from './routes/v1.routes';

app.use(helmet());
app.use(express.json());

if (!isProduction) app.use(morgan('dev'));

app.use('/api/v1', routesV1);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
