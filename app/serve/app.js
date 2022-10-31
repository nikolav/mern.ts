#!/usr/bin / env node
const path = require('path');

const express = require('express');
const logger = require('morgan');
const compress = require('compression');

const app = express();

app.use(logger('combined'));
app.use(compress());

app.use('/docs', express.static(path.join(__dirname, '..', 'docs')));
app.use(express.static(path.join(__dirname, '..', 'dist')));

module.exports = app;