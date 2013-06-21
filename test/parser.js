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

    it('should parse "12 hours before yesterday" correctly', function(){
      compareDate(parser.parse('12 hours before yesterday'),
      removeDaysFromDate(removeHoursFromDate(offset, 12 ),1));
    });

    it('should parse "12 hours before tomorrow" correctly', function(){
      compareDate(parser.parse('12 hours before tomorrow'),
      addDaysToDate(removeHoursFromDate(offset, 12 ),1));
    });

    it('should parse "12 hours from yesterday" correctly', function(){
      compareDate(parser.parse('12 hours from yesterday'),
      removeDaysFromDate(addHoursToDate(offset, 12 ),1));
    });

    it('should parse "12 hours from tomorrow" correctly', function(){
      compareDate(parser.parse('12 hours from tomorrow'),
      addDaysToDate(addHoursToDate(offset, 12 ),1));
    });

    it('should parse "28.8.1991" correctly', function(){
      compareDate(parser.parse('28.8.1991'),
                  new Date('8.28.1991'));
    });

    it('should parse "09.9.1988" correctly', function(){
      compareDate(parser.parse('09.9.1988'),
                  new Date('09.9.1988'));
    });

    it('should parse "09 September 1988" correctly', function(){
      compareDate(parser.parse('09 September 1988'),
                  new Date('09.9.1988'));
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
  console.log('----------------[ERROR - Date missmatch]------------------');
  console.log(date);
  console.log(date2);
}
  assert.equal(getTimestamp(date), getTimestamp(date2));
}

function getTimestamp(date){
  return date.getTime();
}
