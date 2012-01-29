/*!
 * storr - Minimalistic JSON storage.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path');

/**
 * Storr constructor.
 * 
 * Examples:
 * 
 *    var storage = new Storr('/path/to/db.json');
 * 
 *    var storage = new Storr;
 *    storr.use('/path/to/db.json');
 * 
 * @param {String} Source.
 */
function Storr(source) {
  this.data = {};
  this.use(source);
};

/**
 * Sets a source file.
 * 
 * @param {String} Source.
 * @returns `this`.
 * @api public
 */
Storr.prototype.use = function(source) {
  this.source = source;
  this.inited = false;
  return this;
};

/**
 * Sets a value.
 * 
 * @param {String} Key.
 * @param {String} Value.
 * @param {Function} Callback.
 * @returns `this`.
 * @api public
 */
Storr.prototype.set = function(key, value, cb) {
  var self = this;
  
  this.load(function(err) {
    if (err) return cb(err);
    (self.data[key] = value) && cb(null);
  });
  
  return this;
};

/**
 * Returns a value.
 * 
 * @param {String} Key.
 * @param {Function} Callback.
 * @returns `this`.
 */
Storr.prototype.get = function(key, cb) {
  var self = this;
  var len = arguments.length;
  
  this.load(function(err) {
    if (err) return cb(null, err);
    if (len === 2) return cb(null, self.data[key] || null);
    key(self.data);
  });
  
  return this;
};

/**
 * Delets a key.
 * 
 * @param {String} Key.
 * @param {Function} Callback.
 * @returns `this`.
 * @api public
 */
Storr.prototype.del = function(key, cb) {
  var self = this;
  
  this.load(function(err) {
    if (err) return cb(err);
    delete self.data[key] && cb();
  })
  
  return this;
};

/**
 * Saves file content.
 * 
 * @param {Function} Callback.
 * @returns `this`.
 * @api public
 */
Storr.prototype.save = function(cb) {
  var self = this;
  
  this.load(function(err) {
    if (err) return cb(err);
    fs.writeFile(self.source, JSON.stringify(self.data), function(err) {
      cb(err || null)
    });
  });
  
  return this;
};

/**
 * Loads file content.
 * 
 * @param {String} Path to file.
 * @param {Function} Callback. 
 * @returns `this`.
 * @api private
 */
Storr.prototype.load = function(cb) {
  var self = this;
  if (this.inited) return cb(null);
  
  fs.readFile(this.source, 'utf8', function(err, data) {
    if (err && err.code !== 'ENOENT') return cb(err);
    self.data = data ? JSON.parse(data) : {};
    self.inited = true;
    cb(null);
  });
  
  return this;
};

/**
 * Destroies a storage file.
 * 
 * @param {Function} Callback.
 * @returns `this`.
 * @api public
 */
Storr.prototype.destroy = function(cb) {
  var self = this;
  
  this.load(function(err) {
    if (err) return cb(err);
    fs.unlink(self.source, function(err) {
      cb(err || null);
    });
  });
  
  return this;
};

/**
 * Expose `Storr`.
 */
module.exports = Storr;