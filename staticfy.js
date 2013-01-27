//
// # Staticfy
//
// Save the given string to a file that can be accessed with the given URL.
//
// ## Example
//
// `staticfy(html_blob, '/', '/path/to/root');`
//
// Will save html_blob as index.html in _/path/to/root_.
//
// `staticfy(html_blob, '/blog/feed', '/path/to/root');`
//
// Will save html_blob as index.html in _/path/to/root/blog/feed_.
//
// `staticfy(css_blob, '/assets/master.css', '/path/to/root')`
//
// Saves css_blob in /path/to/root/assets/ as master.css.
//

var mkdirp = require('mkdirp');
var fs     = require('fs');
var path   = require('path');

//
// ## API
//
// * _str_ the string or buffer to write.
// * _target_ URL to save as, no extension saves as index.html at given path.
// * _root_ path to root directory.
// * _callback_ (optional) called when done.
//
// If no callback is given and an error is encountered, the error is thrown.
//
module.exports = function (str, target, root, callback) {
  var fn  = callback || false;

  // Determine wether or not to save as index.html.
  var ext = path.extname(target);
  if (ext.length === 0) {
    target += '/index.html';
  }
  target = path.normalize(target);

  // Construct path to final directory and create it.
  var targetdir = path.join(root, path.dirname(target));
  target = path.join(root, target);
  mkdirp(targetdir, function (err) {
    if (err) {
      if (fn) {
        fn(err);
      } else {
        throw err;
      }
      return;
    }

    // Write data to file.
    fs.writeFile(target, str, function (err) {
      if (err) {
        if (fn) {
          fn(err);
        } else {
          throw err;
        }
        return;
      }

      if (fn) fn();
    });
  });
};

