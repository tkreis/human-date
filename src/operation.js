/**
 * All Operations that a the parser knows
 */
var operations = {
  week: function (stack){return  new WeekOperation(stack)},
  numbers: function (stack){return new NumberOperation(stack)},
  next: function (stack){ return new NextOperation(stack)},

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
  }
};

module.exports = Operation
