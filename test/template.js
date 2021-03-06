var assert = require('assert');
var expect = require('expect.js');
var Template = require('../src/template');


describe('Template', function(){
  var subsitutes = {numbers: [1,2], units: ['week','month']};
  var raw_template = 'next {{numbers}} {{units}}';
  var template = new Template(raw_template);

  describe('#compile', function(){
    it('should parse compile template correctly', function(){
      assert.equal(template.compile(subsitutes),
             "next\\s?(1|2)\\s?(week|month)");
    });

    it('should parse compile template correctly', function(){
      var subsitutes_with_object= {numbers: {attr: [1,2], various: true },
                                   units: ['week','month']};

      assert.equal(template.compile(subsitutes_with_object),
             "next\\s?([1|2]*)\\s?(week|month)");
    });
  });

  describe('#contained_by', function(){
    it('should return true when string is contained', function(){
      var raw_template = 'next'
      var template = new Template(raw_template);
      template.compile({});
      assert(template.contained_by('next week'),
             true);
    });
  });

  describe('#meaning', function(){
    it('should tell the correct meaning', function(){
      var subsitutes = {numbers: [1,2], units: ['week','month'], prox: ['next']};
      var raw_template = '{{prox}} {{numbers}} {{units}}';
      var template = new Template(raw_template);
      template.compile(subsitutes);
      assert.deepEqual(template.meaning('next 2 week'),
             [{type: 'prox', attr: 'next'},
               {type: 'numbers', attr: 2 },
               {type: 'units', attr: 'week'} ]
            );
    });
  });
});

