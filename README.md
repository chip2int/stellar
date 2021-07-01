# Stellar Code Challenge

The main goal is to build endpoints that would create endpoints for the following:
- Creating a new snippet. POST  **http://localhost:3000/api/**
- Retrieve an existing snippet. GET **http://localhost:3000/api/snippets/<name>**
- Like a snippet. POST  **http://localhost:3000/api/snippets/<name>**
  
To start the app, run **npm run start**
To test, use Postman or CURL.

**node/express** is used to build the server app. **moment.js** is also used for date/time computation.
Error handling is done where applicable with appropriate response status codes being returned. Ideally, to make
this production worthy, a Database would be needed to persist the data as well as tests needed to be written. 
**mocha/chai** could be used for this purpose.
