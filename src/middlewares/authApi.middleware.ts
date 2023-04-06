/**
 * Module dependencies.
 */

import { NextFunction } from "express"

/**
 * Constants.
 */

const api_keys = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IktldmluIFJhbW9zIiwiY29kZS1jaGFsbGVuZ2UiOiJ0ZXNzZXJhIiwiaWF0IjoxNTE2MjM5MDIyfQ.jQG79MZ2n4nThKacRtNfDRlhWUgUSouvQ4N7mzrp8bk',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IktldmluIFJhbW9zIiwiY29kZS1jaGFsbGVuZ2UiOiJ0ZXNzZXJhIiwidGVzdCI6IjEiLCJpYXQiOjE1MTYyMzkwMjJ9.Meuy54LyoinuKQZmOIha50siFEUNT39Jr82zzcDBTbU',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IktldmluIFJhbW9zIiwiY29kZS1jaGFsbGVuZ2UiOiJ0ZXNzZXJhIiwidGVzdCI6IjIiLCJpYXQiOjE1MTYyMzkwMjJ9.tXcZ6fY6rtrB46R40wunjCw-LQu7oI1ARpvskIHuLbY',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IktldmluIFJhbW9zIiwiY29kZS1jaGFsbGVuZ2UiOiJ0ZXNzZXJhIiwidGVzdCI6IjMiLCJpYXQiOjE1MTYyMzkwMjJ9.laXz1Il1YUs9bNi7twc2JGiEwQLQ9nk67kgOO8PMzNc',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IktldmluIFJhbW9zIiwiY29kZS1jaGFsbGVuZ2UiOiJ0ZXNzZXJhIiwidGVzdCI6IjQiLCJpYXQiOjE1MTYyMzkwMjJ9.ZSNbYER5zGZxz4_z-6XRAM0k9rqJHYbBB6j5TX3Ew3g'
]


/**
 * Api key.
 */

const authApi = async (req: any, res: any, next: NextFunction) => {
  if (req.token) return next();

  let apiKey;
  const providedApiKey = req.headers.authorization;
  if (providedApiKey) {
    apiKey = providedApiKey.split(" ")[1];
  }

  if (!apiKey) {
    return next(new Error(`Api key with the value ${providedApiKey} not found.`));
  }

  if (!api_keys.includes(apiKey)) {
    return next(new Error('Please authenticate.'));
  } else {
    req.token = apiKey;
    return next();
  }

}

/**
 * Export auth api key.
 */

export const AuthApi = {
  authApi
}