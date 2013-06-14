/**
* All Operations that a the parser knows
*/
var operations = {
  week: function (stack){return  new WeekOperation(stack)},
  weeks: function (stack){return  new WeekOperation(stack)},
  hours: function (stack){return  new HourOperation(stack)},
  numbers: function (stack){return new NumberOperation(stack)},
  next: function (stack){ return new NextOperation(stack)},
  'in': function (stack){ return new InOperation(stack)},
  before: function (stack){ return new BeforeOperation(stack)},
  tomorrow: function (stack) { return new TomorrowOperation(stack)},
  yesterday: function (stack) { return new YesterdayOperation(stack)}

};

function get_class (meaning_obj){
  var operation_class = operations[meaning_obj.attr];
  if(typeof(operation_class) === 'undefined'){
    operation_class = operations[meaning_obj.type]
  }
  return operation_class;
}

/**
* Entry point. This just calls the next token
*/
function Operation (stack){
  this.calculate_new_offset = function(offset, value){
    return new get_class(value)(stack).calculate_new_offset(offset, value);
  }
}

/**
* Adds an offset of 7 week to the date
*/
function WeekOperation (stack){
  var WEEK = 1000*60*60*24*7;

  this.calculate_new_offset = function (offset, value){
    return (new Date(new_offset = offset.getTime() + WEEK));
  }
};

/**
* Adds an offset of 1 hour to the date
*/
function HourOperation (stack){
  var HOUR = 1000*60*60;

  this.calculate_new_offset = function (offset, value){
    var next_element = stack.pop();
    if(typeof(next_element) !== 'undefined'){
    stack.push(next_element);
    return new Date(offset.getTime() + (get_class(next_element)(stack).calculate_new_offset(offset, next_element) * HOUR));
    }
    return new Date(offset.getTime() + HOUR);
  }
};

/**
* Repeats the next token as many times as the value of this node is.
*/
function NumberOperation (stack){

  this.calculate_new_offset = function (offset, value){
    var i;
    var next_element = stack.pop();
    for(i=0; i< value.attr; i++){
      offset = get_class(next_element)(stack).calculate_new_offset(offset, next_element);
    }
    return offset;
  }
};

function NextOperation (stack){
  this.calculate_new_offset = function (offset, value){
    var next_element = stack.pop();
    return new get_class(next_element)(stack).calculate_new_offset(offset, value);
  }
};


function BeforeOperation (stack){
  this.IDENTIFIER = 'before';

  this.calculate_new_offset = function (offset, value){
    var next_element = stack.pop();
    if(typeof(next_element) !== 'undefined' && different_type(next_element, this)){
      return calculate_new_negative_date(
        new get_class(next_element)(stack).calculate_new_offset(offset, next_element),
      offset);
    }
    stack.push(next_element);
    return -1;
  }

  /**
  * Calculates the difference between the new and old time this diference is then subtracted from the original offset. And therefore in the past.
  */
  function calculate_new_negative_date(future_time, offset){
    return new Date(offset - ( future_time.getTime() - offset.getTime()));
  }
};

function InOperation (stack){
  this.calculate_new_offset = function (offset, value){
    var next_element = stack.pop();
    return new get_class(next_element)(stack).calculate_new_offset(offset, next_element);
  }
};

function TomorrowOperation (stack){
  this.calculate_new_offset = function (offset, value){
    return  new Date(new DayOperation(stack).get_offset() + offset.getTime());
  }
};

function YesterdayOperation (stack){
  this.calculate_new_offset = function (offset, value){
    return  new Date( offset.getTime() - new DayOperation(stack).get_offset());
  }
};

function DayOperation (stack){
  var DAY = 24*60*60*1000;

  this.get_offset = function (){
    return  DAY;
  }

  this.calculate_new_offset = function (offset, value){
    return offset;
  }
};

function different_type(a,b){
  if(a.IDENTIFIER == b.IDENTIFIER){
    return false;
  }
}

module.exports = Operation
