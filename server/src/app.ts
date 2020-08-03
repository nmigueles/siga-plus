import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import 'dotenv/config';

import { isDevelopment } from './utils/enviroment';

import { notFoundHandler, errorHandler } from './middlewares';

const app = express();

import routesV1 from './routes/v1.routes';

app.use(helmet());
app.use(express.json());

if (isDevelopment) app.use(morgan('dev'));

// TODO Rate limit auth enpoints
app.use('/api/v1', routesV1);

app.get('/health', (_, res) => {
  res.sendStatus(200);
});
app.get('/', (_, res) => res.json({ name: 'sigaplus.api' }));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
