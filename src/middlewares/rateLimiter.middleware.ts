/**
 * Module dependencies.
 */

import rateLimit from 'express-rate-limit';

/**
 * Rate Limit.
 */

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  skipSuccessfulRequests: true,
});

/**
 * Export rate limit.
 */

export const RateLimit = {
  authLimiter
}