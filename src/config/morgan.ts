/**
 * Module dependencies.
 */

import morgan from 'morgan';
import { Logger } from './logger';

morgan.token('message', (req: any, res: any) => res.locals.errorMessage || '');

const getIpFormat = () => (process.env.NODE_ENV === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req: any, res: any) => res.statusCode >= 400,
  stream: { write: (message: any) => Logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req: any, res: any) => res.statusCode < 400,
  stream: { write: (message: any) => Logger.error(message.trim()) },
});

/**
 * Export Morgan;
 */

export const Morgan = {
  successHandler,
  errorHandler,
};
