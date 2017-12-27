const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const path = require('path');

// Url for api calls to forward requests to
let url = `http://${process.env.API_HOST}`;

// Rules for proxy, redirect ajax calls to /api/* -> API_HOST/*
const options = {
    target: url,
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
};

// Create proxy
const proxyFunction = proxy(options);

// root directory to serve
const root = path.join(__dirname + '/build/index.html')

// Use proxy for calls to .../api/
app.use('/api', proxyFunction);

// Serve index.html from build directory
// app.use('/', express.static(path.join(__dirname, '/build')));

app.get('/*', express.static(path.join(__dirname, '/build')));
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, '/build/index.html'));
});
// Listen on port 80
app.listen(80);