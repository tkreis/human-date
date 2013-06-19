var Interpreter = require('./interpreter');
var Template = require('./template');
var Operation = require('./operation');

var language = {
  units: ['week', 'hours', 'weeks'],
  modifiers: ['next','in', 'before', 'from'],
  day_movements: ['tomorrow', 'yesterday'],
  numbers_text: ['one','two', 'three','four', 'five','six', 'seven','eight', 'nine','ten'],
  numbers: { attr: [1,2,3,4,5,6,7,8,9,10], various: true },
  templates: ['{{modifiers}} {{numbers}} {{units}}',
              'next {{units}}', '{{day_movements}}',
              '{{numbers}} {{units}} {{modifiers}} {{day_movements}}?',
              ]
};


var HumanizeDate = function (offset){
  var that = this;
  that.offset = offset;

  /**
  * Method that does the parsing
  */
  this.parse = function (string){
    // var tokens = tokenize(string);
    var interpreted = new Interpreter(language).read(string);
    return calculate_date(interpreted, string);
  }

  function calculate_date(interpreted, string){
    var new_date = that.offset;
    var stack;
    var first;
    var i;
    for(i = 0; i < interpreted.length; i++){
      stack = interpreted[i].meaning(string).reverse();
      first = stack.pop();
      new_date = new Operation(stack).calculate_new_offset(new_date, first);
    }
    return new_date;
  }

  /**
  * Splitting up the input string. For now we generate tokens depending on 'spaces'.
  * Different language might need have specific rules depending
  * on how their language is structured.
  */
  function tokenize (string){
    return string.split(' ').reverse();
  }

}

module.exports = HumanizeDate;
