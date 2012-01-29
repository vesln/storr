[![Build Status](https://secure.travis-ci.org/vesln/storr.png)](http://travis-ci.org/vesln/storr)

# storr - Minimalistic JSON storage.

## Description

storr is the most simple JSON storage created ever.

Since I'm CLI junkie, I want to have simple tool for saving some sort of data that just works™.

## Synopsis

```js

var Storr = require('storr');
var storr = new Storr('/path/to/db.json'); // Or var storr = new Storr; storr.use('/db.json');

storr.set('foo', 'bar', function(err) {
	if (err) throw err;
});

storr.get('foo', function(err, val) {
	if (err) throw err;
});

storr.del('foo', function(err, val) {
	if (err) throw err;
});


storr.save(function(err) {
	if (err) throw err;
});

```

## Requirements

- NPM (http://npmjs.org/)
- Node.js 0.6 (http://nodejs.org/)

## Install

```
$ npm install storr
```

## Tests

```
$ npm install
$ make test
```

## License

MIT License

Copyright (C) 2012 Veselin Todorov

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.