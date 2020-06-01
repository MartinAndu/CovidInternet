'use strict';


import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
/*
const http = require('http');
const fs = require('fs');

const express = require('express');
const multer = require('multer');
const csv = require('fast-csv');

const Router = express.Router;
const upload = multer({ dest: 'tmp/csv/' });
const app = express();
const router = new Router();
const server = http.createServer(app);
const port = 9000

*/
ReactDOM.render(<App />, document.getElementById('root'))
/*

// Start server
function startServer() {
  server.listen(port, function () {
    console.log('Express server listening on ', port);
  });
}

setImmediate(startServer);*/