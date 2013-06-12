var assert = require('assert');
var Parser = require('../src/parser');


describe('Parser', function(){
  // Sun Oct 10 2010 00:00:00 GMT-0700 (MST)
  var offset = new Date('10.10.10');
  var parser = new Parser(offset);

  describe('#parse', function(){
//    it('should parse "next week" correctly', function(){
//      compareDate(parser.parse('next week'),
//                  addDaysToDate(offset, 7));
//                   
//    });
//    it('should parse "in 2 weeks" correctly', function(){
//      compareDate(parser.parse('next week'),
//                  addDaysToDate(offset, 14));
//                   
//    });
  });
});

function addDaysToDate(date, days){
 return new Date(getTimestamp(date)+(days*1000*60*60*24))
}

function compareDate(date, date2){

  console.log(date);
  console.log(date2);
  assert.equal(getTimestamp(date), getTimestamp(date2));
}

function getTimestamp(date){
  return date.getTime();
}
