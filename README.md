# Discohands

Democratically and anonymously choose topics to discuss.

## Dependencies

Node dependencies can be installed with `npm install`. Discohands also
depends on these services:

 - [Redis](http://redis.io)
 - [MongoDB](http://www.mongodb.org)
 - [Google OAuth 2.0](http://console.developers.google.com)

## Configuration

Discohands is configured through environment variables, or by a
`config.json` file in the same directory as `app.js`.

 - `NODE_ENV`: Run in `production` or `development` mode. Default
   `development`.
 - `SESSION_SECRET`: Secret key for stored sessions. Default "keyboard
   cat".
 - `MAXIMUM_TOPIC_AGE_DAYS`: Optional number of days after which a topic is omitted. Default is no omission due to topic age.   
 - `REDIS_URL` or `REDISCLOUD_URL`: Redis connection URL. Default
   `redis://localhost:6379`.
 - `MONGODB_URI` or `MONGOLAB_URI`: MongoDB connection URI. Default
   `mongodb://localhost/discohands`.
 - `ROOT_URL`: Root URL Discohands will be available at. Used for OAuth
   callback URL. Default `http://localhost:8080`.
 - `AUTHORIZED_DOMAIN`: Domain emails must be from in order to log in.
   Default `gmail.com`.
 - `GOOGLE_CLIENT_ID`: Google OAuth 2.0 client ID.
 - `GOOGLE_CLIENT_SECRET`: Google OAuth 2.0 client secret.

Google OAuth 2.0 credentials can be obtained through the [Google
Developers Console](http://console.developers.google.com) by creating a
new project, then creating a client ID under "APIs & auth",
"Credentials". The redirect URIs should be set to the Discohands root
URL `/auth/google/callback`.

## Development

```
node app
```

Google OAuth 2.0 credentials are required in development.
`http://localhost/auth/google/callback` can be configured as a valid
redirect URI in Google Developers Console.

## Deployment

Discohands can easily be deployed to [Heroku](http://heroku.com) with
[Redis Cloud](https://addons.heroku.com/rediscloud) and
[MongoLab](https://addons.heroku.com/mongolab).

## License

Copyright © 2014 Busbud, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
