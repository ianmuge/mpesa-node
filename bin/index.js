#!/usr/bin/env node
require('dotenv').config();
const program = require('commander');
program.version('0.0.1');
require("./mpesa")(program);
program.parse(process.argv);
