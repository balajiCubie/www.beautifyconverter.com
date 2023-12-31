"use strict";function array_to_hash(a){var ret=Object.create(null);for(var i=0;i<a.length;++i)
ret[a[i]]=true;return ret;};function slice(a,start){return Array.prototype.slice.call(a,start||0);};function characters(str){return str.split("");};function member(name,array){for(var i=array.length;--i>=0;)
if(array[i]==name)
return true;return false;};function find_if(func,array){for(var i=0,n=array.length;i<n;++i){if(func(array[i]))
return array[i];}};function repeat_string(str,i){if(i<=0)return "";if(i==1)return str;var d=repeat_string(str,i>>1);d+=d;if(i&1)d+=str;return d;};function DefaultsError(msg,defs){Error.call(this,msg);this.msg=msg;this.defs=defs;};DefaultsError.prototype=Object.create(Error.prototype);DefaultsError.prototype.constructor=DefaultsError;DefaultsError.croak=function(msg,defs){throw new DefaultsError(msg,defs);};function defaults(args,defs,croak){if(args===true)
args={};var ret=args||{};if(croak)for(var i in ret)if(ret.hasOwnProperty(i)&&!defs.hasOwnProperty(i))
DefaultsError.croak("`"+i+"` is not a supported option",defs);for(var i in defs)if(defs.hasOwnProperty(i)){ret[i]=(args&&args.hasOwnProperty(i))?args[i]:defs[i];}
return ret;};function merge(obj,ext){var count=0;for(var i in ext)if(ext.hasOwnProperty(i)){obj[i]=ext[i];count++;}
return count;};function noop(){};var MAP=(function(){function MAP(a,f,backwards){var ret=[],top=[],i;function doit(){var val=f(a[i],i);var is_last=val instanceof Last;if(is_last)val=val.v;if(val instanceof AtTop){val=val.v;if(val instanceof Splice){top.push.apply(top,backwards?val.v.slice().reverse():val.v);}else{top.push(val);}}
else if(val!==skip){if(val instanceof Splice){ret.push.apply(ret,backwards?val.v.slice().reverse():val.v);}else{ret.push(val);}}
return is_last;};if(a instanceof Array){if(backwards){for(i=a.length;--i>=0;)if(doit())break;ret.reverse();top.reverse();}else{for(i=0;i<a.length;++i)if(doit())break;}}
else{for(i in a)if(a.hasOwnProperty(i))if(doit())break;}
return top.concat(ret);};MAP.at_top=function(val){return new AtTop(val)};MAP.splice=function(val){return new Splice(val)};MAP.last=function(val){return new Last(val)};var skip=MAP.skip={};function AtTop(val){this.v=val};function Splice(val){this.v=val};function Last(val){this.v=val};return MAP;})();function push_uniq(array,el){if(array.indexOf(el)<0)
array.push(el);};function string_template(text,props){return text.replace(/\{(.+?)\}/g,function(str,p){return props[p];});};function remove(array,el){for(var i=array.length;--i>=0;){if(array[i]===el)array.splice(i,1);}};function mergeSort(array,cmp){if(array.length<2)return array.slice();function merge(a,b){var r=[],ai=0,bi=0,i=0;while(ai<a.length&&bi<b.length){cmp(a[ai],b[bi])<=0?r[i++]=a[ai++]:r[i++]=b[bi++];}
if(ai<a.length)r.push.apply(r,a.slice(ai));if(bi<b.length)r.push.apply(r,b.slice(bi));return r;};function _ms(a){if(a.length<=1)
return a;var m=Math.floor(a.length/2),left=a.slice(0,m),right=a.slice(m);left=_ms(left);right=_ms(right);return merge(left,right);};return _ms(array);};function set_difference(a,b){return a.filter(function(el){return b.indexOf(el)<0;});};function set_intersection(a,b){return a.filter(function(el){return b.indexOf(el)>=0;});};function makePredicate(words){if(!(words instanceof Array))words=words.split(" ");var f="",cats=[];out:for(var i=0;i<words.length;++i){for(var j=0;j<cats.length;++j)
if(cats[j][0].length==words[i].length){cats[j].push(words[i]);continue out;}
cats.push([words[i]]);}
function compareTo(arr){if(arr.length==1)return f+="return str === "+JSON.stringify(arr[0])+";";f+="switch(str){";for(var i=0;i<arr.length;++i)f+="case "+JSON.stringify(arr[i])+":";f+="return true}return false;";}
if(cats.length>3){cats.sort(function(a,b){return b.length-a.length;});f+="switch(str.length){";for(var i=0;i<cats.length;++i){var cat=cats[i];f+="case "+cat[0].length+":";compareTo(cat);}
f+="}";}else{compareTo(words);}
return new Function("str",f);};function all(array,predicate){for(var i=array.length;--i>=0;)
if(!predicate(array[i]))
return false;return true;};function Dictionary(){this._values=Object.create(null);this._size=0;};Dictionary.prototype={set:function(key,val){if(!this.has(key))++this._size;this._values["$"+key]=val;return this;},add:function(key,val){if(this.has(key)){this.get(key).push(val);}else{this.set(key,[val]);}
return this;},get:function(key){return this._values["$"+key]},del:function(key){if(this.has(key)){--this._size;delete this._values["$"+key];}
return this;},has:function(key){return("$"+key)in this._values},each:function(f){for(var i in this._values)
f(this._values[i],i.substr(1));},size:function(){return this._size;},map:function(f){var ret=[];for(var i in this._values)
ret.push(f(this._values[i],i.substr(1)));return ret;},toObject:function(){return this._values}};Dictionary.fromObject=function(obj){var dict=new Dictionary();dict._size=merge(dict._values,obj);return dict;};