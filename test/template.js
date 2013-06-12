var assert = require('assert');
var expect = require('expect.js');
var Template = require('../src/template');


describe('Template', function(){
  describe('#compile', function(){
    it('should parse compile template correctly', function(){
      var subsitutes = [[1,2], ['week','month']];
      var raw_template = 'next {{number}} {{units}}';
      var template = new Template(raw_template);
      assert(template.compile(subsitutes),
             "next (1|2 (week|month)");
    });

    it('should throw and error when placeholder and subsitute dont match', function(){
      var subsitutes = [];
      var raw_template = '{{blah}}';
      var template = new Template(raw_template);
      expect(template.compile).to.throwError();

    });
  });
});

