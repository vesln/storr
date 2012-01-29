/*!
 * storr - Minimalistic JSON storage.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Test dependencies.
 */
var fs = require('fs');
var path = require('path');

/**
 * The tested object.
 * 
 * @type {Object}
 */
var Storr = require('../lib/storr');

/**
 * Temporary data file.
 * 
 * @type {String}
 */
var file = path.join(__dirname, 'tmp', 'data.json');

/**
 * Removes the tmp file.
 */
function rm() {
  try {
    fs.unlinkSync(file);
  } catch(err) {
    if (err.code !== 'ENOENT') throw err;
  }
};

describe('Storr', function() {
  beforeEach(rm);
  afterEach(rm);
  
  describe('.set() \n    .get()', function() {
   it('should access a key value', function(done) {
     var storr = new Storr(file);
     storr.set('foo', 'bar', function(err) {
       storr.get('foo', function(err, val) {
         val.should.eql('bar');
         done();
       });
     });
   });
   
   describe('.use()', function() {
     it('should change the source and the init state.', function() {
       var storr = new Storr;
       storr.inited = true;
       storr.source = 'bar';
       storr.use('foo');
       storr.inited.should.be.false;
       storr.source.should.eql('foo');
     });
   });
   
   it('should return all the stored data when no key is passed', function(done) {
     var storr = new Storr(file);
      storr.set('foo', 'bar', function() {
        storr.get(function(val) {
          val.should.eql({foo: 'bar'});
          done();
        })
      });
    });
  });
  
  describe('.del()', function() {
   it('should delete a key', function(done) {
     var storr = new Storr(file);
     storr.set('foo', 'bar', function() {
       storr.del('foo', function() {
         storr.get('foo', function(val) {
            (val === null).should.be.true;
            done();
          });
       });
     });
   }); 
  });
  
  describe('.save()', function() {
    it('should save content to file.', function(done) {
      var storr = new Storr(file);
      storr.set('foo', ['bar', 'baz'], function() {
        storr.save(function(err) {
          (err === null).should.be.true;
          fs.readFileSync(file, 'utf8').should.eql('{"foo":["bar","baz"]}');
          done();
        })
      });
    }); 
  });
  
  describe('.destroy()', function() {
    it('should destroy the loaded file.', function(done) {
      var storr = new Storr(file);
      storr.set('foo', 'bar', function() {
        storr.save(function(err) {
          storr.destroy(function(err) {
            (err === null).should.be.true;
            path.existsSync(file).should.be.false;
            done();
          });
        })
      });
    });
  });
});