var Interpreter = require('./interpreter');
var Template = require('./template');

var language = {
  units: ['week'],
  range: ['next','in'],
  numbers_text: ['one','two', 'three','four', 'five','six', 'seven','eight', 'nine','ten'],
  numbers: [1,2,3,4,5,6,7,8,9,10 ],
  templates: ['next {{numbers}}* {{units}}']
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
    console.log(string);
    console.log(interpreted);
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
      new Operation(stack).calculate_new_offset(new_date, first);
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


var operations = {
    
  week: function (stack){return  new WeekOperation(stack)},
  numbers: function (stack){return new NumberOperation(stack)},
  next: function (stack){ return new NextOperation(stack)},
  get_class: function (meaning_obj){
    var operation_class = operations[meaning_obj.attr];
    if(typeof(operation_class) === 'undefined'){
      operation_class = operations[meaning_obj.type]
    }
    console.log( "-----");
    console.log( "-----");
    console.log( operations['']);
    console.log( meaning_obj);

    console.log(meaning_obj);
    console.log("this:");
    console.log( "-----");
    console.log( "-----");
    return operation_class;
  }


};

function Operation (stack){
  this.calculate_new_offset = function(offset, value){
    new operations.get_class(value)(stack).calculate_new_offset(offset, value);
  }
}

function WeekOperation (stack){
  
  this.NAME = 'week';
  this.lookahead = 0;

  var WEEK = 1000*60*90*7;

  this.calculate_new_offset = function (offset, value){
    var new_offset = offset.getTime() + WEEK;
  }
};

function NumberOperation (stack){
  this.NAME = 'number';
  this.lookahead = 1;

  this.calculate_new_offset = function (offset, value){
    operations.get_class(stack.pop()).calculate_new_offset(stack);
  }
};

function NextOperation (stack){
  this.NAME = 'week';
  this.lookahead = 0;

  this.calculate_new_offset = function (offset, value){
  }
};


module.exports = HumanizeDate;
