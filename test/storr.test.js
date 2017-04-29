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

describe('Storr', () => {
  beforeEach(rm);
  afterEach(rm);
  
  describe('.set() \n    .get()', () => {
   it('should access a key value', done => {
     var storr = new Storr(file);
     storr.set('foo', 'bar', err => {
       storr.get('foo', (err, val) => {
         val.should.eql('bar');
         done();
       });
     });
   });
   
   describe('.use()', () => {
     it('should change the source and the init state.', () => {
       var storr = new Storr;
       storr.inited = true;
       storr.source = 'bar';
       storr.use('foo');
       storr.inited.should.be.false;
       storr.source.should.eql('foo');
     });
   });
   
   it('should return all the stored data when no key is passed', done => {
     var storr = new Storr(file);
      storr.set('foo', 'bar', () => {
        storr.get(val => {
          val.should.eql({foo: 'bar'});
          done();
        })
      });
    });
  });
  
  describe('.del()', () => {
   it('should delete a key', done => {
     var storr = new Storr(file);
     storr.set('foo', 'bar', () => {
       storr.del('foo', () => {
         storr.get('foo', val => {
            (val === null).should.be.true;
            done();
          });
       });
     });
   }); 
  });
  
  describe('.save()', () => {
    it('should save content to file.', done => {
      var storr = new Storr(file);
      storr.set('foo', ['bar', 'baz'], () => {
        storr.save(err => {
          (err === null).should.be.true;
          fs.readFileSync(file, 'utf8').should.eql('{"foo":["bar","baz"]}');
          done();
        })
      });
    }); 
  });
  
  describe('.destroy()', () => {
    it('should destroy the loaded file.', done => {
      var storr = new Storr(file);
      storr.set('foo', 'bar', () => {
        storr.save(err => {
          storr.destroy(err => {
            (err === null).should.be.true;
            path.existsSync(file).should.be.false;
            done();
          });
        })
      });
    });
  });
});