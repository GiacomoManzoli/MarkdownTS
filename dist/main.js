let markdown = 
`# Markdown Parser

Some text. TypeScript ~~sucks~~ is awesome!

**bold text** __also blod__

*text* _text_

* list 1
* list 2

---

1. list 1
1. list 2

[Google!](http://www.google.it)

## Can parse Image!

\`inline code\`

![An image](https://markdown-here.com/img/logo-2015/austin.png)

Other text :"quoted":

---

asdasd

1. elem 1
1. elem 2
	- child 3
		* child 4 
			1. child 5
			1. 6
		* 5
			* 61
1. elem 3


${"```"}javascript
var x = new Y();
${"```"}

${"```"}
var x = new Y();
${"```"}

${"```"}javascript
digraph G { A -> B}
${"```"}

`


/*
	* child 2 
asd
		* child 1
* elem 3
	* child 1

asd

* elem 1
* elem 2
	1. child 1
	2. child 2 
asd
		* child 1
* elem 3
	* child 1
*/

let engine = new MarkdownTS.Engine();

let html = engine.render(markdown);
document.getElementById("input").innerText = markdown;
document.getElementById("result").innerHTML = html;
document.getElementById("output").innerText = html;
