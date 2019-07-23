# card-redactor
Replace matched instances of card numbers with all zeros

## Prerequisites
1. Linux-based machine
2. Node v8+

## Installation
```
git clone git@github.com:akhale3/card-redactor.git
cd card-redactor
npm install
```

## Configuration
1. Provide an input text file containing the hex transaction buffers, one per line. Add the input text file name to the environment variable `INPUT_FILE` in `.env`. Use `input.txt` as a reference or overwrite its contents.
2. Provide a list of known BIN values to match card numbers on by replacing the value for the environment variable `BINS` in `.env`.
3. Optionally, provide an output file name to write the redacted buffers to by replacing the value for the environment variable `OUTPUT_FILE` in `.env`. By default, this is written to `output.txt`.
4. The output text file is overwritten with each run. If you wish to append instead, replace the value for the environment variable `APPEND` with `true`.

## Usage
```shell
npm start
```
