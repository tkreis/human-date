/**
 * All Operations that a the parser knows
 */
var operations = {
  week: function (stack){return  new WeekOperation(stack)},
  month: function (stack){return  new MonthOperation(stack)},
  month_text: function (stack){return  new MonthTextOperation(stack)},
  year: function (stack){return  new YearOperation(stack)},
  day: function (stack){return  new DayOperation(stack)},
  weeks: function (stack){return  new WeekOperation(stack)},
  hours: function (stack){return  new HourOperation(stack)},
  numbers: function (stack){return new NumberOperation(stack)},
  next: function (stack){ return new NextOperation(stack)},
  'in': function (stack){ return new InOperation(stack)},
  before: function (stack){ return new BeforeOperation(stack)},
  from: function (stack){ return new FromOperation(stack)},
  tomorrow: function (stack) { return new TomorrowOperation(stack)},
  yesterday: function (stack) { return new YesterdayOperation(stack)}
};

function get_class (meaning_obj){
  var operation_class;
  if(typeof(meaning_obj) === 'undefined'){
    return (function(){return new NullOperation()})
  }

  operation_class =  operations[meaning_obj.attr];

  if(typeof(operation_class) === 'undefined'){
    operation_class = operations[meaning_obj.type]
  }
  return operation_class;
}

/**
 * Entry point. This just calls the next token
 */
function Operation (stack){
  this.IDENTIFIER = 'operation';
  this.calculate_new_offset = function(offset, value){
    return new get_class(value)(stack).calculate_new_offset(offset, value);
  }
}

/**
 * Adds an offset of 7 week to the date
 */
function WeekOperation (stack){
  var WEEK = 1000*60*60*24*7;
  this.IDENTIFIER = 'week';

  this.calculate_new_offset = function (offset, value){
    return (new Date(new_offset = offset.getTime() + WEEK));
  }
};

/**
 * Adds an offset of 1 hour to the date
 */
function HourOperation (stack){
  var HOUR = 1000*60*60;
  this.IDENTIFIER = 'hour';

  this.calculate_new_offset = function (offset, value){
    var next_element = stack.pop();
    var result;
    if(typeof(next_element) !== 'undefined'){
      result = new Date(offset.getTime() + (get_class(next_element)(stack).calculate_new_offset(offset, next_element) * HOUR));
      stack.push(next_element);
      return result;
    }

    return new Date(offset.getTime() + HOUR);
  }
};

/**
 * Repeats the next token as many times as the value of this node is.
 */
function NumberOperation (stack){
  this.IDENTIFIER = 'number';

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
  this.IDENTIFIER = 'next';
  this.calculate_new_offset = function (offset, value){
    var next_element = stack.pop();
    return new get_class(next_element)(stack).calculate_new_offset(offset, value);
  }
};


function FromOperation (stack){
  this.IDENTIFIER = 'from';
  this.calculate_new_offset = function (offset, value){
    var next_element = stack.pop();
    if(typeof(next_element) !== 'undefined' && different_type(next_element, this)){

      return calculate_new_positive_date(
        new get_class(next_element)(stack).calculate_new_offset(offset, next_element),
        offset);
    }
    stack.push(next_element);
    return +1;
  }

  function calculate_new_positive_date(future_time, offset){
    return new Date(offset - ( future_time.getTime() - offset.getTime()));
  }
}

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
  this.IDENTIFIER = 'in';
  this.calculate_new_offset = function (offset, value){
    var next_element = stack.pop();
    return new get_class(next_element)(stack).calculate_new_offset(offset, next_element);
  }
};




function TomorrowOperation (stack){
  this.IDENTIFIER = 'tomorrow';
  this.calculate_new_offset = function (offset, value){
    return new Date(new AddDayOperation(stack).get_offset() + offset.getTime());
  }
};

function YesterdayOperation (stack){
  this.IDENTIFIER = 'yesterday';
  this.calculate_new_offset = function (offset, value){
    return  new Date( offset.getTime() - new AddDayOperation(stack).get_offset());
  }
};

function AddDayOperation (stack){
  this.IDENTIFIER = 'add_day';
  var DAY = 24*60*60*1000;

  this.get_offset = function (){
    return  DAY;
  }

  this.calculate_new_offset = function (offset, value){
    return offset;
  }
};




function MonthOperation (stack){
  this.IDENTIFIER = 'month';
  this.calculate_new_offset = function (offset, value){
    return new Date(evaluate_next_element(stack, offset).setMonth(value.attr-1));
  }
};

function MonthTextOperation (stack){
  var months =  {'January': 1, 'February': 2,
    'March': 3,'April': 4, 
    'May': 5, 'June':  6, 'July': 7,
    'August':  8, 'September': 9, 'October': 10,
    'November': 11, 'Dezember':  12};

    this.IDENTIFIER = 'month_text';
    this.calculate_new_offset = function (offset, value){
      value.attr = months[value.attr];
      return new MonthOperation(stack).calculate_new_offset(offset, value);
    }
};

function DayOperation (stack){
  this.IDENTIFIER = 'day';
  this.calculate_new_offset = function (offset, value){
    return new Date(evaluate_next_element(stack, offset).setDate(value.attr));
  }
};

function YearOperation (stack){
  this.IDENTIFIER = 'year';
  this.calculate_new_offset = function (offset, value){
    return new Date(evaluate_next_element(stack, offset).setYear(value.attr));
  }
};

function NullOperation (stack){
  this.IDENTIFIER = 'null';
  this.calculate_new_offset = function (offset, value){
    return offset;
  }
};


function evaluate_next_element(stack, offset){
  var next_element = stack.pop();
  return new Date(get_class(next_element)(stack).calculate_new_offset(offset, next_element));

}
function different_type(a,b){
  return !(a.IDENTIFIER != b.IDENTIFIER);
}

//typeof(a) !== 'undefined' && typeof(b) !== 'undefined' && 

module.exports = Operation
