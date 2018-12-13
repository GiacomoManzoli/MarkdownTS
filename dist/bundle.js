!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.MarkdownTS=t():e.MarkdownTS=t()}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){this.regex=e}return e.prototype.applyTo=function(e){var t=e.replace(this.regex,this.replace.bind(this));return this.afterReplace(t)},e.prototype.replace=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];throw new Error("asd")},e.prototype.afterReplace=function(e){return e},e}();t.ParsingRule=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(4),o=function(){function e(e){this.rules=e.slice()}return e.prototype.addRule=function(e){return this.rules.push(e),this},e.prototype.parseMarkdown=function(e){var t=e;return this.rules.forEach(function(e){t=e.applyTo(t)}),t},e.createDefaultParser=function(){return new e([new n.TitleRule,new n.ImageRule,new n.HyperLinkRule,new n.BoldRule,new n.ItalicRule,new n.StrikeRule,new n.QuoteRule,new n.LineRule,new n.InlineCodeRule,new n.ListRule,new n.CodeBlockRule])},e}();t.Parser=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(3);t.Engine=n.Engine;var o=r(1);t.Parser=o.Parser},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1),o=function(){function e(e){this.parser=void 0!==e?e:n.Parser.createDefaultParser()}return e.prototype.render=function(e){return this.parser.parseMarkdown(e)},e}();t.Engine=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.ParsingRule=n.ParsingRule;var o=r(5);t.TitleRule=o.TitleRule;var u=r(6);t.ImageRule=u.ImageRule;var i=r(7);t.QuoteRule=i.QuoteRule,t.BoldRule=i.BoldRule,t.ItalicRule=i.ItalicRule,t.StrikeRule=i.StrikeRule,t.InlineCodeRule=i.InlineCodeRule;var c=r(8);t.HyperLinkRule=c.HyperLinkRule;var l=r(9);t.ListRule=l.ListRule;var a=r(10);t.LineRule=a.LineRule;var s=r(11);t.CodeBlockRule=s.CodeBlockRule},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var u=function(e){function t(){return e.call(this,/(#+)(.*)/g)||this}return o(t,e),t.prototype.replace=function(e,t,r){var n=t.length;return"<h"+n+">"+r.trim()+"</h"+n+">"},t}(r(0).ParsingRule);t.TitleRule=u},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var u=function(e){function t(){return e.call(this,/!\[([^[]+)\]\(([^)]+)\)/g)||this}return o(t,e),t.prototype.replace=function(e,t,r){return'<img src="'+r+'" alt="'+t+'" />'},t}(r(0).ParsingRule);t.ImageRule=u},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var u=r(0),i=function(e){function t(t,r,n){var o=e.call(this,t)||this;return o.tagOpen=r,o.tagClose=n,o}return o(t,e),t.prototype.replace=function(e,t){return""+this.tagOpen+t+this.tagClose},t}(u.ParsingRule),c=function(e){function t(){return e.call(this,/(\*\*|__)(.*?)\1/g)||this}return o(t,e),t.prototype.replace=function(e,t,r){return"<strong>"+r+"</strong>"},t}(u.ParsingRule);t.BoldRule=c;var l=function(e){function t(){return e.call(this,/(\*|_)(.*?)\1/g)||this}return o(t,e),t.prototype.replace=function(e,t,r){return"<em>"+r+"</em>"},t}(u.ParsingRule);t.ItalicRule=l;var a=function(e){function t(){return e.call(this,/~~(.*?)~~/g,"<del>","</del>")||this}return o(t,e),t}(i);t.StrikeRule=a;var s=function(e){function t(){return e.call(this,/`([^`\n]+)`/g,"<code>","</code>")||this}return o(t,e),t}(i);t.InlineCodeRule=s;var p=function(e){function t(){return e.call(this,/:"(.*?)":/g,"<q>","</q>")||this}return o(t,e),t}(i);t.QuoteRule=p},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var u=function(e){function t(){return e.call(this,/\[([^[]+)\]\(([^)]+)\)/g)||this}return o(t,e),t.prototype.replace=function(e,t,r){return'<a href="'+r+'">'+t+"</a>"},t}(r(0).ParsingRule);t.HyperLinkRule=u},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var u=function(e){function t(){var t=this;return(t=e.call(this,/\n?\n?(^(\t{0,})(\*|-|\d.).*\n?)+/gm)||this).listRegex=/^(\t{0,})(\*|-|\d.)\s(.*)/gm,t.maxLevel=0,t.replaceList=t.replaceList.bind(t),t}return o(t,e),t.prototype.replace=function(e){return e.replace(this.listRegex,this.replaceList).trim()},t.prototype.replaceList=function(e,t,r,n){var o=t.length+1;this.maxLevel=Math.max(o,this.maxLevel);var u="*"===r||"-"===r?"ul":"ol",i="</li></"+u+">";return("<"+u+"><li>").repeat(o)+"<span>"+n+"</span>"+i.repeat(o)+"\n"},t.prototype.afterReplace=function(e){for(var t=1;t<=this.maxLevel;t++)e=(e=(e=(e=(e=(e=e.replace(/\<\/ul>\s*\<ul>/gm,"")).replace(/\<\/ul>\s*\<ol>/gm,"")).replace(/\<\/ol>\s*\<ol>/gm,"")).replace(/\<\/ol>\s*\<ul>/gm,"")).replace(/\<\/li>\s*\<li>\s*\<ul>/gm,"<ul>")).replace(/\<\/li>\s*\<li>\s*\<ol>/gm,"<ol>");return"\n"+e.trim()+"\n"},t}(r(0).ParsingRule);t.ListRule=u},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var u=function(e){function t(){return e.call(this,/\n-{3,}/g)||this}return o(t,e),t.prototype.replace=function(){return"<hr />"},t}(r(0).ParsingRule);t.LineRule=u},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var u=r(0),i=function(){function e(){}return e.prototype.renderCode=function(e,t){return'<pre class="'+e+'">'+t+"</pre>"},e}();t.PlainCodeBlockRenderer=i;var c=function(e){function t(t){void 0===t&&(t=new i);var r=e.call(this,/```([a-z]*)\n([\s\S]*?)\n```/g)||this;return r.codeRenderer=t,r}return o(t,e),t.prototype.replace=function(e,t,r){return this.codeRenderer.renderCode(t,r)},t}(u.ParsingRule);t.CodeBlockRule=c}])});
//# sourceMappingURL=bundle.js.map