var language = {
  units: ['week'],
  range: ['next','in'],
  numbers_text: ['one','two', 'three','four', 'five','six', 'seven','eight', 'nine','ten'],
  numbers: [1,2,3,4,5,6,7,8,9,10],
  template: ['next {{number}} {{units}}']
};


var HumanizeDate = function (offset){
  var that = this;
  this.offset = offset;

  /**
   * Method that does the parsing
   */
  this.parse = function (string){
    var tokens = tokenize(string);
    var result = new Interpreter.read(tokens);

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

/**
 * Interpreter
 */
var Interpreter = function (){

  this.read = function (tokens){

  }

  /**
   * Interpreting one token at a time. Depending on the read token it might make look ahead 1 additional token
   */
  var interpret = function (token){
    console.log(token);
    language.template[0].compile
  }

  /**
   * Searches in the langauge file for a match
   */

  var  search_for_match_in_langauge_file = function (token){
    for(p=0; p<language.range.length; p++){
      if (token == language.range[p]){
        return language.range[p];
      }
    }
    return null;
  }
}



module.exports = HumanizeDate;
