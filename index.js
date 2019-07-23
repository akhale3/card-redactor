'use strict';

require('dotenv').config();
const bins = process.env.BINS && process.env.BINS.split(',') || [];
const validator = require('card-validator');
const fs = require('fs');

const toHex = ascii => {
  return ascii.split('').map(digit => 30 + parseInt(digit)).join('');
};


const toAscii = hex => {
  return hex.split('').filter((digit, index) => index % 2 !== 0).join('');
};

const redact = cardNumberLength => {
  const pattern = '30';

  return pattern.repeat(cardNumberLength);
};

const isValid = candidate => {
  let cardNumberValidation = validator.number(toAscii(candidate));

  if (cardNumberValidation.isValid) {
    return true;
  }

  cardNumberValidation = validator.number(toAscii(candidate.substr(0, 30)));

  if (cardNumberValidation.isValid) {
    return true;
  }

  return false;
};

const search = hex => {
  let cardNumber;
  let candidate;
  let match;

  bins.forEach(bin => {
    match = hex.match(toHex(bin));

    if (match === null) {
      return;
    }

    candidate = hex.substr(match.index, 32);

    if (isValid(candidate)) {
      cardNumber = candidate;
    }
  });

  return cardNumber;
};

const replace = (hex, cardNumber) => {
  return hex.replace(cardNumber, redact(cardNumber.length / 2));
};

const main = () => {
  const lineReader = require('readline').createInterface({
    input: fs.createReadStream(process.env.INPUT_FILE)
  });
  const writeStream = fs.createWriteStream(process.env.OUTPUT_FILE, {
    flags: (process.env.APPEND === 'true') ? 'a' : 'w'
  });

  lineReader.on('line', line => {
    writeStream.write(replace(line, search(line)) + "\n");
  });
};

module.exports = {
  main
};
