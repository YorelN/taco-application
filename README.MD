# Taco Front-end Application - React

## How to Use

First, pull the dependencies 

```bash
npm install

yarn
```

Then, for `development` purposes, use 

```bash
yarn dev

npm run dev
```

***Note*** that for API usage, you will have to edit the package.json file's `proxy` configuration if not using the (Docker reposirtory)[https://github.com/AmFlint/docker-taco]

For example, if you want to run the back-end api on address `localhost:8000`, you might want to set it up this way:
```json
"proxy": {
    "/api": {
      "target": "http://localhost:8000",
      "pathRewrite": {
        "^/api": ""
      }
    }
  },
```

***Note*** for Developers, for API calls, we are using a proxy intercepting requests on `/api` route, which makes it easier to move the application from one environment to another (local, test, production). For every call please just write the address following this format

```javascript
// With proxy set to target http://localhost:8000, the AJAX call will be proxied to match the url GET http://localhost:8000
axios.get('/api');

// Proxy the request to http://localhost:8000/toto
axios.get('/api/toto');

// Proxy request to http://localhost:8000/tata/tutu
axios.get('/api/tata/tutu');
```