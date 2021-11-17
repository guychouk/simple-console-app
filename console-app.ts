import chalk from 'chalk';
import EventEmitter from 'events';
import fs from 'fs';
import glob from 'glob';

type Configuration = {
    first: string;
    last: string;
};

const log = console.log;
const prompt = new EventEmitter();
const resultStyle = chalk.blue.bold;
const questionStyle = chalk.greenBright.bold;
const results: Configuration = { first: '', last: '' };

let currentQuestion = '';

process.stdin.resume();

process.stdin.on('data', function (data) {
    prompt.emit(currentQuestion, data.toString().trim());
});

prompt.on(':new', function (name, question) {
    currentQuestion = name;
    log(question);
    process.stdout.write('> ');
});

prompt.emit(':new', 'first', questionStyle('First name?'));

prompt.on('first', function (data) {
    results.first = data;
    prompt.emit(':new', 'last', questionStyle('Last name?'));
});

prompt.on('last', function (data) {
    results.last = data;
    prompt.emit(':end');
});

prompt.on(':end', function () {
    log(resultStyle(`Your name is ${results.first} ${results.last}`));
    process.stdin.pause();
});
