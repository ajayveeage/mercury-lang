// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require('moo');
const IR = require('./mercuryIR.js');

const lexer = moo.compile({
	// comment:	/(?:\/\/|\$).*?$/,
	comment:	/(?:\/\/).*?$/,
	
	//instrument: [/synth/, /sample/, /polySynth/, /loop/, /emitter/],
	/*instrument:	{
					match: [/synth\ /, /sample\ /, /polySynth\ /, /loop\ /,/emitter\ / ],
					value: x => x.slice(0, x.length-1)
				},*/

	list:		[/ring/, /array/, /list/],
	newObject:	[/new/, /make/, /add(?: |$)/],
	setObject:	[/set/, /apply/, /give/, /send/],
	print:		[/print/, /post/, /log/],

	//action:		[/ring\ /, /new\ /, /set\ /],
	//kill:		/kill[\-|_]?[a|A]ll/,

	seperator:	/,/,
	//newLine:	/[&;]/,
	
	//note:		/[a-gA-G](?:[0-9])?(?:#+|b+|x)?/,
	number:		/[+-]?(?:[0-9]|[0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
	// hex:		/0x[0-9a-f]+/,
	
	divider:	/[/:]/,

	lParam:		'(',
	rParam:		')',
	lArray:		'[',
	rArray:		']',
	// lFunc:		'{',
	// rFunc:		'}'
	
	string:		{ 
					match: /["'`](?:\\["\\]|[^\n"'``])*["'`]/, 
					value: x => x.slice(1, x.length-1)
				},
	
	//identifier:	/[a-zA-Z\_\-][a-zA-Z0-9\_\-\.]*/,
	//identifier:	/[a-zA-Z\_\-][^\s]*/,
	identifier:	/[^0-9\s][^\s\(\)\[\]]*/,

	// signal:		/~(?:\\["\\]|[^\n"\\ \t])+/,
	// osc:		/\/(?:\\["\\]|[^\n"\\ \t])*/,

	ws:			/[ \t]+/,
});
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main$ebnf$1", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "main$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "globalStatement", "_", "main$ebnf$1"], "postprocess": (d) => { return { "@global" : d[1] }}},
    {"name": "main$ebnf$2", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "main$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "listStatement", "_", "main$ebnf$2"], "postprocess": (d) => { return { "@list" : d[1] }}},
    {"name": "main$ebnf$3", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "main$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "objectStatement", "_", "main$ebnf$3"], "postprocess": (d) => { return { "@object" : d[1] }}},
    {"name": "objectStatement", "symbols": [(lexer.has("newObject") ? {type: "newObject"} : newObject), "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), "__", "objectIdentifier"], "postprocess":  (d) => {
        	return {
        		//"@action" : 'new',
        		"@new" : {
        			"@inst" : d[2].value,
        			"@type" : d[4]
        		}
        	}
        }},
    {"name": "objectStatement", "symbols": [(lexer.has("newObject") ? {type: "newObject"} : newObject), "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), "__", "objectIdentifier", "__", "objExpression"], "postprocess":  (d) => {
        	return {
        		//"@action" : 'new',
        		"@new" : {
        			"@inst" : d[2].value,
        			"@type" : d[4],
        			"@functions" : d[6]
        		}
        	}
        }},
    {"name": "objectStatement", "symbols": [(lexer.has("setObject") ? {type: "setObject"} : setObject), "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), "__", "objExpression"], "postprocess":  (d) => {	
        	return {
        		"@set" : {
        			"@name" : d[2].value,
        			"@functions" : d[4]
        		}
        		//"@action" : 'set',
        	}
        }},
    {"name": "objectIdentifier", "symbols": ["name"], "postprocess": id},
    {"name": "objectIdentifier", "symbols": ["array"], "postprocess": id},
    {"name": "listStatement", "symbols": [(lexer.has("list") ? {type: "list"} : list), "_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", "paramElement"], "postprocess":  (d) => {
        	return {
        		"@name" : d[2].value,
        		"@params" : d[4]
        	}
        } },
    {"name": "globalStatement", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": (d) => { return { "@comment" : d[0].value }}},
    {"name": "globalStatement", "symbols": [(lexer.has("print") ? {type: "print"} : print), "_", "objExpression"], "postprocess": (d) => { return { "@print" : d[2] }}},
    {"name": "objExpression", "symbols": ["paramElement"], "postprocess": (d) => [d[0]]},
    {"name": "objExpression", "symbols": ["paramElement", "__", "objExpression"], "postprocess": (d) => [d[0], d[2]].flat(Infinity)},
    {"name": "function", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", "functionArguments"], "postprocess":  (d) => {
        	return { 
        		//"@function": IR.bindFunction(d[0].value),
        		"@function": { 
        			"@name": IR.keyBind(d[0].value),
        			"@args": d[2]
        		}
        	}
        }},
    {"name": "functionArguments$ebnf$1", "symbols": ["params"], "postprocess": id},
    {"name": "functionArguments$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "functionArguments$ebnf$2", "symbols": [(lexer.has("rParam") ? {type: "rParam"} : rParam)], "postprocess": id},
    {"name": "functionArguments$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "functionArguments", "symbols": [(lexer.has("lParam") ? {type: "lParam"} : lParam), "_", "functionArguments$ebnf$1", "_", "functionArguments$ebnf$2"], "postprocess": (d) => d[2]},
    {"name": "array$ebnf$1", "symbols": ["params"], "postprocess": id},
    {"name": "array$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "array$ebnf$2", "symbols": [(lexer.has("rArray") ? {type: "rArray"} : rArray)], "postprocess": id},
    {"name": "array$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "array", "symbols": [(lexer.has("lArray") ? {type: "lArray"} : lArray), "_", "array$ebnf$1", "_", "array$ebnf$2"], "postprocess": (d) => { return { "@array" : d[2] }}},
    {"name": "params$ebnf$1", "symbols": [(lexer.has("seperator") ? {type: "seperator"} : seperator)], "postprocess": id},
    {"name": "params$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "params", "symbols": ["paramElement", "_", "params$ebnf$1"], "postprocess": (d) => [d[0]]},
    {"name": "params$ebnf$2", "symbols": [(lexer.has("seperator") ? {type: "seperator"} : seperator)], "postprocess": id},
    {"name": "params$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "params", "symbols": ["paramElement", "_", "params$ebnf$2", "_", "params"], "postprocess": (d) => [d[0], d[4]].flat(Infinity)},
    {"name": "paramElement", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": (d) => { return IR.num(d) }},
    {"name": "paramElement", "symbols": ["name"], "postprocess": (d) => d[0]},
    {"name": "paramElement", "symbols": ["array"], "postprocess": (d) => d[0]},
    {"name": "paramElement", "symbols": ["function"], "postprocess": (d) => d[0]},
    {"name": "paramElement", "symbols": ["division"], "postprocess": (d) => d[0]},
    {"name": "division", "symbols": [(lexer.has("number") ? {type: "number"} : number), (lexer.has("divider") ? {type: "divider"} : divider), (lexer.has("number") ? {type: "number"} : number)], "postprocess": (d) => { return IR.division(d) }},
    {"name": "name", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": (d) => { return IR.identifier(d) }},
    {"name": "name", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": (d) => { return { "@string" : d[0].value }}},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": (d) => null},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": (d) => null},
    {"name": "wschar", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
