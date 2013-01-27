Staticfy
--------

Helper for creating static sites. Takes a string or buffer and writes it to
a file accessible with the given URL.

# API

`staticfy(str, url, root[, callback(err)])`

# Examples

If the target path don't include an extension, the file will be written to
`index.html` in the given path.

```js
var staticfy = require('staticfy');
staticfy('<h1>Hello World!</h1>', '/', '/var/www', function (err) {
  if (err) throw err;
  console.log('index.html written in /var/www');
});
```

If a filename with an extension is given, that file will be written.

```js
var staticfy = require('staticfy');
staticfy('body { background: pink; }', '/assets/master.css', '/var/www', function (err) {
  if (err) throw err;
  console.log('master.css written to /var/www/assets/');
});
```

# Installation

`npm install staticfy`

# License

ISC

