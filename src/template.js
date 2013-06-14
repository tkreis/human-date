/**
 * Template engine
 *
 */

var Template = function (raw, subsitutes){

  var original_raw = raw;
  var subsitution = /(\{\{[\s\S]+?\}\})/gi;
  var subsition_names = /\{\{([\s\S]+?)\}\}/gi;
  var single_subsitution = /(\{\{[\s\S]+?\}\})/;
  var subsition_name = /\{\{([\s\S]+?)\}\}/;
  var compiled;
  var placeholder_count = placeholder_count(raw);


  /**
   * Returns the meaing in the current context. In the following format:
   * {
   *  type: name that was in the curly brackets,
   *  attr: value that was encountered
   *  }
   */
  this.meaning = function (string){
    var matches = string.match(compiled);
    var i;
    var meanings = [];
    for(i=0; i<placeholder_count; i++){
      meanings.push({ 
        type: raw.match(subsition_names)[i].replace('{{','').replace('}}',''),
        attr: matches[i+1] // to avoid the first match, which is the entire string
      });
      
    }
    return meanings;
  }

  /**
   * Compiles the templates and subsitutes the placeholder by their value.
   */
  this.compile = function (subsitutes){
    compiled = replace_placeholders(subsitutes);
    return compiled;
  }

  /**
   * Returns true of false depending on whether a string partial 
   * includes the template.
   */
  this.contained_by = function (to_check){
    if(typeof(compiled) === 'undefined'){
      throw new Error("template not compiled");
    }
    return new RegExp(compiled).test(to_check);
  }


  function replace_placeholders(subsitutes){
    var i;
    var compiled = raw;
    var count = placeholder_count;
    for(i=0; i < count; i++){
      compiled = replace_placeholder(compiled, subsitutes); 
    }
    return compiled;
  }

  function replace_placeholder(raw, subsitutes){
    return raw.replace(single_subsitution,
                       prepare_subsitution( subsitutes[raw.match(subsition_name)[1]]
                                          ));
  }

  function prepare_subsitution(subsitute){
    if(typeof(subsitute.attr) !== 'undefined'){
      if(subsitute.various){
        return ('(['+subsitute.attr.join('|')+']*)');
      }
      return ('('+subsitute.attr.join('|')+')');
    }
    return ('('+subsitute.join('|')+')');
  }

  function placeholder_count(raw){
    matches = raw.match(subsitution);
    if(matches === null){
      return 0;
    }
    return matches.length;
  }
}

module.exports = Template;

