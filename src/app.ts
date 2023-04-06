/**
 * Module dependencies.
 */

import express from 'express';
import routers from './routes/v1';
import { AuthApi, RateLimit } from './middlewares';
import { Morgan } from './config/morgan';
import { Logger } from './config/logger';

const app = express()

if (process.env.NODE_ENV !== 'test') {
  app.use(Morgan.successHandler);
  app.use(Morgan.errorHandler);
}

// limit repeated failed requests to auth endpoints.
if (process.env.NODE_ENV === 'production') {
  app.use('/v1/auth', RateLimit.authLimiter, AuthApi.authApi);
}

app.get('/', (req, res) => {
  res.send('v0.1.0');
})

// v1 api routes
app.use('/v1', RateLimit.authLimiter, AuthApi.authApi, routers);

// send back a 404 error for any unknown api request
app.use((req: any, res: any, next: (arg0: any) => void) => {
  Logger.error('Occur an error calling an non-existing endpoint');
  next(new Error('404 Not found'));
});

export default app;