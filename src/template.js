/**
 * Template engine
 *
 */

var Template = function (raw, subsitutes){

  var subsitution = /(\{\{[\s\S]+?\}\})/gi;
  var single_subsitution = /(\{\{[\s\S]+?\}\})/;

  this.compile = function (subsitutes){
    check_placeholder_count(raw, subsitutes);
    return replace_placeholders(subsitutes) 
  }

  function check_placeholder_count(raw, subsitutes){
    if(placeholder_count(raw) != subsitutes.length){
      throw new Error("Placeholder count doesn't fit");
    }
  }

  function replace_placeholders(subsitutes){
    var i;
    var compiled = raw;
    for(i=0; i < subsitutes.length; i++){
      compiled = replace_placeholder(compiled, subsitutes[i]); 
    }
    return compiled;
  }

  function replace_placeholder(raw, subsitute){
    return raw.replace(single_subsitution, prepare_subsitution(subsitute));
  }

  function prepare_subsitution(subsitute){
    return ('('+subsitute.join('|')+')');
  }

  function placeholder_count(raw){
    return raw.match(subsitution).length;
  }
}

module.exports = Template;
