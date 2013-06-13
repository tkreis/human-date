var Template = require('./template');
/**
 * Interpreter
 */
var Interpreter = function (lang){

  var compiled_lang = compile_language_file(lang.templates);

  this.read = function (string){
    return  search_for_match_in_langauge_file(string);
  }

  function compile_language_file (templates){
    var compiled_language_file = [];
    var i, template;
    for(i=0; i < templates.length; i++){
      template = new Template(templates[i]);
      template.compile(lang);
      compiled_language_file.push(template);
    }
    return compiled_language_file;

  }


  /**
   * Searches in the langauge file for a match
   */

  var search_for_match_in_langauge_file = function (string){
    var matches = [];
    for(p=0; p<compiled_lang.length; p++){
      if(compiled_lang[p].contained_by(string)){
        matches.push(compiled_lang[p]); 
      }
    }
    return matches;
  }
}

module.exports = Interpreter;
