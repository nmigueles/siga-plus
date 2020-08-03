import app from './app';
import { AddressInfo } from 'net';

import { isProduction } from './utils/enviroment';

import { connect } from './tasks/connectDb';

// First connect, then start the app.
(async () => await connect())();

const server = app.listen(process.env.PORT || 3000, () => {
  const { address, port } = server.address() as AddressInfo;
  const host = address === '::' && !isProduction ? 'localhost' : address;

  console.log('Server started » http://%s:%s', host, port);
});
