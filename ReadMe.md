# Message Board

This uses pouchDB as it's data store.  There should already be some generated data in the `/data/` folder, however, if this is missing run the following in a temrinal:

```
cd data
node index.js
cd ..
```

To run the API

```
npm ci --production
NODE_ENV=production node application.js
```

You can then call: 
* GET: localhost:3000/v1/messages/messages/ to get all messages
* PUT: localhost:3000/v1/messages/message/ with a x-www-form-urlencoded body of `{title: 'abc', message: 'this is a message'}`

All other routes should 404.

To run tests:

```
npm i --save-dev
npm test
```

## Some design considerations

All routes should be authenticated, possibly by oAuth JWTs.

Data passed in and passed out should be validated using AJV for JSON schema validation.  Data passed in should also be sanitised before adding to a database.  

This should really run behind a web server that can offer rate limiting protection.