(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MarkdownTS"] = factory();
	else
		root["MarkdownTS"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/engine.ts":
/*!***********************!*\
  !*** ./src/engine.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __webpack_require__(/*! ./parser */ "./src/parser.ts");
var Engine = /** @class */ (function () {
    function Engine(parser) {
        this.parser = parser !== undefined ? parser : parser_1.Parser.createDefaultParser();
    }
    Engine.prototype.render = function (markdown) {
        return this.parser.parseMarkdown(markdown);
    };
    return Engine;
}());
exports.Engine = Engine;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(/*! ./engine */ "./src/engine.ts");
exports.Engine = engine_1.Engine;
var parser_1 = __webpack_require__(/*! ./parser */ "./src/parser.ts");
exports.Parser = parser_1.Parser;


/***/ }),

/***/ "./src/parser.ts":
/*!***********************!*\
  !*** ./src/parser.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rules = __webpack_require__(/*! ./rules */ "./src/rules/index.ts");
var Parser = /** @class */ (function () {
    function Parser(rules) {
        this.rules = rules.slice();
    }
    Parser.prototype.addRule = function (rule) {
        this.rules.push(rule);
        return this;
    };
    Parser.prototype.parseMarkdown = function (markdown) {
        var text = markdown;
        var history = [];
        this.rules.forEach(function (rule) {
            console.log("Applying rule: " + rule.constructor.name);
            var log = {
                rule: rule.constructor.name,
                input: text,
                output: rule.applyTo(text)
            };
            history.push(log);
            text = log.output;
        });
        console.table(history);
        return text;
    };
    Parser.createDefaultParser = function () {
        var p = new Parser([
            new Rules.TitleRule(),
            new Rules.ImageRule(),
            new Rules.HyperLinkRule(),
            new Rules.BoldRule(),
            new Rules.ItalicRule(),
            new Rules.StrikeRule(),
            new Rules.QuoteRule(),
            new Rules.LineRule(),
            new Rules.InlineCodeRule(),
            new Rules.ListRule(),
            new Rules.CodeBlockRule(),
            new Rules.ExecutableBlockRule(),
            new Rules.BlockQuoteRule(),
            new Rules.ParagraphRule(),
        ]);
        return p;
    };
    return Parser;
}());
exports.Parser = Parser;


/***/ }),

/***/ "./src/rules/BlockQuoteRule.ts":
/*!*************************************!*\
  !*** ./src/rules/BlockQuoteRule.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = __webpack_require__(/*! ./rule */ "./src/rules/rule.ts");
var TAG1 = ">";
var TAG2 = "&gt;";
var BlockQuoteRule = /** @class */ (function (_super) {
    __extends(BlockQuoteRule, _super);
    function BlockQuoteRule() {
        var _this = this;
        // super(/^(\t{0,})(\*|-|\d.)\s(.*)/gm);
        // Preseleziona una lista
        // imponendo che ci sia almeno una riga vuota prima della lista e che la lista non sia alla fine del file
        // vedi esempio sotto
        // const preselectRegex = /\n\n(^(\t{0,})(\*|-|\d.).*\n)+\n?/gm;
        var preselectRegex = /^((?:&gt;)+|>+)(.*)$/gm;
        _this = _super.call(this, preselectRegex) || this;
        _this.maxLevel = 0;
        return _this;
    }
    BlockQuoteRule.prototype.replace = function (match, tag, text) {
        var level = this.calculateLevel(tag);
        this.maxLevel = Math.max(level, this.maxLevel);
        var tagOpen = "<blockquote>";
        var tagClose = "</blockquote>";
        var result = tagOpen.repeat(level) + "\n" + text.trim() + "\n" + tagClose.repeat(level);
        return result;
    };
    BlockQuoteRule.prototype.calculateLevel = function (tagSequence) {
        var tag = tagSequence.startsWith(TAG1) ? TAG1 : "";
        tag = tagSequence.startsWith(TAG2) ? TAG2 : tag;
        var validSequence = tag !== "";
        if (validSequence) {
            var leftover = tagSequence.substring(tag.length);
            return 1 + this.calculateLevel(leftover);
        }
        else {
            return 0;
        }
    };
    BlockQuoteRule.prototype.afterReplace = function (text) {
        for (var i = 1; i <= this.maxLevel; i++) {
            text = text.replace(/\<\/blockquote>\s?\<blockquote>/gm, "");
        }
        return "\n" + text + "\n";
    };
    return BlockQuoteRule;
}(rule_1.ParsingRule));
exports.BlockQuoteRule = BlockQuoteRule;


/***/ }),

/***/ "./src/rules/CodeBlockRule.ts":
/*!************************************!*\
  !*** ./src/rules/CodeBlockRule.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = __webpack_require__(/*! ./rule */ "./src/rules/rule.ts");
var PlainCodeBlockRenderer = /** @class */ (function () {
    function PlainCodeBlockRenderer() {
    }
    PlainCodeBlockRenderer.prototype.render = function (block, language, code) {
        return "<pre class=\"" + language + "\">" + code + "</pre>";
    };
    return PlainCodeBlockRenderer;
}());
exports.PlainCodeBlockRenderer = PlainCodeBlockRenderer;
var RenderableBlockRule = /** @class */ (function (_super) {
    __extends(RenderableBlockRule, _super);
    function RenderableBlockRule(matcher, renderer) {
        var _this = _super.call(this, matcher) || this;
        _this.renderer = renderer;
        return _this;
    }
    RenderableBlockRule.prototype.replace = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        return (_a = this.renderer).render.apply(_a, args);
    };
    return RenderableBlockRule;
}(rule_1.ParsingRule));
exports.RenderableBlockRule = RenderableBlockRule;
var CodeBlockRule = /** @class */ (function (_super) {
    __extends(CodeBlockRule, _super);
    function CodeBlockRule(render) {
        if (render === void 0) { render = new PlainCodeBlockRenderer(); }
        return _super.call(this, /```([a-z]*)\n([\s\S]*?)\n```/g, render) || this;
    }
    return CodeBlockRule;
}(RenderableBlockRule));
exports.CodeBlockRule = CodeBlockRule;
var ExecutableBlockRule = /** @class */ (function (_super) {
    __extends(ExecutableBlockRule, _super);
    function ExecutableBlockRule(render) {
        if (render === void 0) { render = new PlainCodeBlockRenderer(); }
        return _super.call(this, /&&&([a-z]*)\n([\s\S]*?)\n&&&/g, render) || this;
    }
    return ExecutableBlockRule;
}(RenderableBlockRule));
exports.ExecutableBlockRule = ExecutableBlockRule;


/***/ }),

/***/ "./src/rules/HyperLinkRule.ts":
/*!************************************!*\
  !*** ./src/rules/HyperLinkRule.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = __webpack_require__(/*! ./rule */ "./src/rules/rule.ts");
var HyperLinkRule = /** @class */ (function (_super) {
    __extends(HyperLinkRule, _super);
    function HyperLinkRule() {
        return _super.call(this, /\[([^[]+)\]\(([^)]+)\)/g) || this;
    }
    HyperLinkRule.prototype.replace = function (match, text, href) {
        return "<a href=\"" + href + "\">" + text + "</a>";
    };
    return HyperLinkRule;
}(rule_1.ParsingRule));
exports.HyperLinkRule = HyperLinkRule;


/***/ }),

/***/ "./src/rules/ImageRule.ts":
/*!********************************!*\
  !*** ./src/rules/ImageRule.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = __webpack_require__(/*! ./rule */ "./src/rules/rule.ts");
var ImageRule = /** @class */ (function (_super) {
    __extends(ImageRule, _super);
    function ImageRule() {
        return _super.call(this, /!\[([^[]+)\]\(([^)]+)\)/g) || this;
    }
    ImageRule.prototype.replace = function (text, caption, source) {
        return "<img src=\"" + source + "\" alt=\"" + caption + "\" />";
    };
    return ImageRule;
}(rule_1.ParsingRule));
exports.ImageRule = ImageRule;


/***/ }),

/***/ "./src/rules/LineRule.ts":
/*!*******************************!*\
  !*** ./src/rules/LineRule.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = __webpack_require__(/*! ./rule */ "./src/rules/rule.ts");
var LineRule = /** @class */ (function (_super) {
    __extends(LineRule, _super);
    function LineRule() {
        return _super.call(this, /\n-{3,}/g) || this;
    }
    LineRule.prototype.replace = function () {
        return "<hr />";
    };
    return LineRule;
}(rule_1.ParsingRule));
exports.LineRule = LineRule;


/***/ }),

/***/ "./src/rules/ListRule.ts":
/*!*******************************!*\
  !*** ./src/rules/ListRule.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = __webpack_require__(/*! ./rule */ "./src/rules/rule.ts");
var ListRule = /** @class */ (function (_super) {
    __extends(ListRule, _super);
    function ListRule() {
        var _this = this;
        // super(/^(\t{0,})(\*|-|\d.)\s(.*)/gm);
        // Preseleziona una lista
        // imponendo che ci sia almeno una riga vuota prima della lista e che la lista non sia alla fine del file
        // vedi esempio sotto
        // const preselectRegex = /\n\n(^(\t{0,})(\*|-|\d.).*\n)+\n?/gm;
        var preselectRegex = /\n?\n?(^(\t{0,})(\*|-|\d.).*\n?)+/gm;
        _this = _super.call(this, preselectRegex) || this;
        _this.listRegex = /^(\t{0,})(\*|-|\d.)\s(.*)/gm;
        _this.maxLevel = 0;
        _this.replaceList = _this.replaceList.bind(_this);
        return _this;
    }
    ListRule.prototype.replace = function (match) {
        var result = match.replace(this.listRegex, this.replaceList).trim();
        return result;
    };
    ListRule.prototype.replaceList = function (match, tabs, symbol, text) {
        var level = tabs.length + 1;
        this.maxLevel = Math.max(level, this.maxLevel);
        var listType = symbol === "*" || symbol === "-" ? "ul" : "ol";
        var tagOpen = "<" + listType + "><li>";
        var tagClose = "</li></" + listType + ">";
        var result = tagOpen.repeat(level) + ("<span>" + text + "</span>") + tagClose.repeat(level) + "\n";
        return result;
    };
    ListRule.prototype.afterReplace = function (text) {
        for (var i = 1; i <= this.maxLevel; i++) {
            text = text.replace(/\<\/ul>\s*\<ul>/gm, "");
            text = text.replace(/\<\/ul>\s*\<ol>/gm, "");
            text = text.replace(/\<\/ol>\s*\<ol>/gm, "");
            text = text.replace(/\<\/ol>\s*\<ul>/gm, "");
            text = text.replace(/\<\/li>\s*\<li>\s*\<ul>/gm, "<ul>");
            text = text.replace(/\<\/li>\s*\<li>\s*\<ol>/gm, "<ol>");
        }
        return "\n" + text.trim() + "\n";
    };
    return ListRule;
}(rule_1.ParsingRule));
exports.ListRule = ListRule;
/**
la preselectRegex seleziona solamente la prima e la quarta lista. se non ci fosse il ritorna a capo finale non prenderebbe
neanche l'ultima

asddasd

* elem 1
* elem 2
    - child 1
        * child 2
            * child 2
    * child 2

asd
        * child 1
* elem 3
    * child 1

asd


asd

* elem 1
* elem 2
    1. child 1
    2. child 2
asd

asd

        * child 1
* elem 3
    * child 1
 
 */ 


/***/ }),

/***/ "./src/rules/ParagraphRule.ts":
/*!************************************!*\
  !*** ./src/rules/ParagraphRule.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = __webpack_require__(/*! ./rule */ "./src/rules/rule.ts");
var ParagraphRule = /** @class */ (function (_super) {
    __extends(ParagraphRule, _super);
    function ParagraphRule() {
        return _super.call(this, /^([^\n>&`#<]+.*)$/gm) || this;
    }
    ParagraphRule.prototype.replace = function (match, text) {
        return "\n<p>" + text.trim() + "</p>\n";
    };
    ParagraphRule.prototype.afterReplace = function (text) {
        return text.replace(/<\/p>\s<p>/g, ' ');
    };
    return ParagraphRule;
}(rule_1.ParsingRule));
exports.ParagraphRule = ParagraphRule;


/***/ }),

/***/ "./src/rules/TextStyleRules.ts":
/*!*************************************!*\
  !*** ./src/rules/TextStyleRules.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = __webpack_require__(/*! ./rule */ "./src/rules/rule.ts");
var InlineTextRule = /** @class */ (function (_super) {
    __extends(InlineTextRule, _super);
    function InlineTextRule(regex, tagOpen, tagClose) {
        var _this = _super.call(this, regex) || this;
        _this.tagOpen = tagOpen;
        _this.tagClose = tagClose;
        return _this;
    }
    InlineTextRule.prototype.replace = function (match, g1) {
        return "" + this.tagOpen + g1 + this.tagClose;
    };
    return InlineTextRule;
}(rule_1.ParsingRule));
var BoldRule = /** @class */ (function (_super) {
    __extends(BoldRule, _super);
    function BoldRule() {
        return _super.call(this, /(\*\*|__)(.*?)\1/g) || this;
    }
    BoldRule.prototype.replace = function (match, g1, g2) {
        return "<strong>" + g2 + "</strong>";
    };
    return BoldRule;
}(rule_1.ParsingRule));
exports.BoldRule = BoldRule;
var ItalicRule = /** @class */ (function (_super) {
    __extends(ItalicRule, _super);
    function ItalicRule() {
        return _super.call(this, /(\*|_)(.*?)\1/g) || this;
    }
    ItalicRule.prototype.replace = function (match, g1, g2) {
        return "<em>" + g2 + "</em>";
    };
    return ItalicRule;
}(rule_1.ParsingRule));
exports.ItalicRule = ItalicRule;
var StrikeRule = /** @class */ (function (_super) {
    __extends(StrikeRule, _super);
    function StrikeRule() {
        return _super.call(this, /~~(.*?)~~/g, "<del>", "</del>") || this;
    }
    return StrikeRule;
}(InlineTextRule));
exports.StrikeRule = StrikeRule;
var InlineCodeRule = /** @class */ (function (_super) {
    __extends(InlineCodeRule, _super);
    function InlineCodeRule() {
        return _super.call(this, /`([^`\n]+)`/g, "<code>", "</code>") || this;
    }
    return InlineCodeRule;
}(InlineTextRule));
exports.InlineCodeRule = InlineCodeRule;
var QuoteRule = /** @class */ (function (_super) {
    __extends(QuoteRule, _super);
    function QuoteRule() {
        return _super.call(this, /:"(.*?)":/g, "<q>", "</q>") || this;
    }
    return QuoteRule;
}(InlineTextRule));
exports.QuoteRule = QuoteRule;


/***/ }),

/***/ "./src/rules/TitleRule.ts":
/*!********************************!*\
  !*** ./src/rules/TitleRule.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = __webpack_require__(/*! ./rule */ "./src/rules/rule.ts");
var TitleRule = /** @class */ (function (_super) {
    __extends(TitleRule, _super);
    function TitleRule() {
        return _super.call(this, /(#+)(.*)/g) || this;
    }
    TitleRule.prototype.replace = function (text, chars, content) {
        var level = chars.length;
        return '<h' + level + '>' + content.trim() + '</h' + level + '>';
    };
    return TitleRule;
}(rule_1.ParsingRule));
exports.TitleRule = TitleRule;


/***/ }),

/***/ "./src/rules/index.ts":
/*!****************************!*\
  !*** ./src/rules/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = __webpack_require__(/*! ./rule */ "./src/rules/rule.ts");
exports.ParsingRule = rule_1.ParsingRule;
var TitleRule_1 = __webpack_require__(/*! ./TitleRule */ "./src/rules/TitleRule.ts");
exports.TitleRule = TitleRule_1.TitleRule;
var ImageRule_1 = __webpack_require__(/*! ./ImageRule */ "./src/rules/ImageRule.ts");
exports.ImageRule = ImageRule_1.ImageRule;
var TextStyleRules_1 = __webpack_require__(/*! ./TextStyleRules */ "./src/rules/TextStyleRules.ts");
exports.QuoteRule = TextStyleRules_1.QuoteRule;
exports.BoldRule = TextStyleRules_1.BoldRule;
exports.ItalicRule = TextStyleRules_1.ItalicRule;
exports.StrikeRule = TextStyleRules_1.StrikeRule;
exports.InlineCodeRule = TextStyleRules_1.InlineCodeRule;
var HyperLinkRule_1 = __webpack_require__(/*! ./HyperLinkRule */ "./src/rules/HyperLinkRule.ts");
exports.HyperLinkRule = HyperLinkRule_1.HyperLinkRule;
var ListRule_1 = __webpack_require__(/*! ./ListRule */ "./src/rules/ListRule.ts");
exports.ListRule = ListRule_1.ListRule;
var LineRule_1 = __webpack_require__(/*! ./LineRule */ "./src/rules/LineRule.ts");
exports.LineRule = LineRule_1.LineRule;
var CodeBlockRule_1 = __webpack_require__(/*! ./CodeBlockRule */ "./src/rules/CodeBlockRule.ts");
exports.CodeBlockRule = CodeBlockRule_1.CodeBlockRule;
exports.ExecutableBlockRule = CodeBlockRule_1.ExecutableBlockRule;
var BlockQuoteRule_1 = __webpack_require__(/*! ./BlockQuoteRule */ "./src/rules/BlockQuoteRule.ts");
exports.BlockQuoteRule = BlockQuoteRule_1.BlockQuoteRule;
var ParagraphRule_1 = __webpack_require__(/*! ./ParagraphRule */ "./src/rules/ParagraphRule.ts");
exports.ParagraphRule = ParagraphRule_1.ParagraphRule;


/***/ }),

/***/ "./src/rules/rule.ts":
/*!***************************!*\
  !*** ./src/rules/rule.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ParsingRule = /** @class */ (function () {
    function ParsingRule(regex) {
        this.regex = regex;
    }
    ParsingRule.prototype.applyTo = function (text) {
        var replaceResult = text.replace(this.regex, this.replace.bind(this));
        return this.afterReplace(replaceResult);
    };
    ParsingRule.prototype.replace = function (match) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        throw new Error("asd");
    };
    ParsingRule.prototype.afterReplace = function (text) {
        return text;
    };
    return ParsingRule;
}());
exports.ParsingRule = ParsingRule;


/***/ })

/******/ });
});
//# sourceMappingURL=bundle.js.map