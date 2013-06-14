var assert = require('assert');
var Parser = require('../src/parser');


describe('Parser', function(){
  // Sun Oct 10 2010 00:00:00 GMT-0700 (MST)
  var offset = new Date('10.10.10');
  var parser = new Parser(offset);

  describe('#parse', function(){
    it('should parse "next week" correctly', function(){
      compareDate(parser.parse('next week'),
      addDaysToDate(offset, 7));
    });

    it('should parse "in 2 weeks" correctly', function(){
      compareDate(parser.parse('in 2 weeks'),
      addDaysToDate(offset, 14));
    });

    it('should parse "in 3 weeks" correctly', function(){
      compareDate(parser.parse('in 3 weeks'),
      addDaysToDate(offset, 21));
    });

    it('should parse "tomorrow" correctly', function(){
      compareDate(parser.parse('tomorrow'),
      addDaysToDate(offset, 1 ));
    });

    it('should parse "yesterday" correctly', function(){
      compareDate(parser.parse('yesterday'),
      removeDaysFromDate(offset, 1 ));
    });

    it('should parse "in 12 hours" correctly', function(){
      compareDate(parser.parse('in 12 hours'),
      addHoursToDate(offset, 12 ));
    });

    it('should parse "12 hours before" correctly', function(){
      compareDate(parser.parse('12 hours before'),
      removeHoursFromDate(offset, 12 ));
    });

  });
});

function addDaysToDate(date, days){
  return new Date(getTimestamp(date)+(days*1000*60*60*24))
}

function addHoursToDate(date, hours){
  return new Date(getTimestamp(date)+(hours*1000*60*60))
}

function removeHoursFromDate(date, hours){
  return new Date(getTimestamp(date)-(hours*1000*60*60))
}

function removeDaysFromDate(date, days){
  return new Date(getTimestamp(date)-(days*1000*60*60*24))
}

function compareDate(date, date2){
if(getTimestamp(date) !== getTimestamp(date2)){
  console.log('---------');
  console.log(date);
  console.log(date2);
}
  assert.equal(getTimestamp(date), getTimestamp(date2));
}

function getTimestamp(date){
  return date.getTime();
}
