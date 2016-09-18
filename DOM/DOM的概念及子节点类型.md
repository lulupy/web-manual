# javascript的组成

javascript是由三部分组成:

- ECMAscript
    定义了基本的语法，比如说数据类型， 函数， 流程控制等
- BOM
    定义了操作浏览器的接口
- DOM
    定义了操作html结构的接口，比如说获取html元素, 增加删除html元素，
    操作html元素属性，修改样式等


# DOM的概念及子节点类型

## 基本概念

### 什么是DOM

DOM: Document Object Model 文档对象模型

文档: html页面

文档对象: html页面中的元素

文档对象模型: DOM是JavaScript操作网页的接口。从本质上说，它将web 页面和脚本或编程语言连接起来了。


document.getElementById
document.getElementsByTagName

都是DOM提供的获取网页元素的方法

### 节点

DOM的最小组成单位叫做节点（node）。文档的树形结构（DOM树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。

节点的类型有七种。

- Document：整个文档树的顶层节点
- DocumentType：doctype标签（比如`<!DOCTYPE html>`）
- Element：网页的各种HTML标签（比如`<body>`、`<a>`等）
- Attribute：网页元素的属性（比如`class="right"`）
- Text：标签之间或标签包含的文本
- Comment：注释
- DocumentFragment：文档的片段

这七种节点都属于浏览器原生提供的节点对象的派生对象，具有一些共同的属性和方法。

### 节点树

一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是DOM。

最顶层的节点就是document节点，它代表了整个文档。文档里面最高一层的HTML标签，一般是<html>，它构成树结构的根节点（root node），其他HTML标签节点都是它的下级。


除了根节点以外，其他节点对于周围的节点都存在三种关系。

- 父节点关系（parentNode）：直接的那个上级节点
- 子节点关系（childNodes）：直接的下级节点
- 同级节点关系（sibling）：拥有同一个父节点的节点

DOM提供操作接口，用来获取三种关系的节点。其中，子节点接口包括firstChild（第一个子节点）和lastChild（最后一个子节点）等属性，同级节点接口包括nextSibling（紧邻在后的那个同级节点）和previousSibling（紧邻在前的那个同级节点）属性。

## 特征相关的属性

所有节点对象都是浏览器内置的Node对象的实例，继承了Node属性和方法。这是所有节点的共同特征。

以下属性与节点对象本身的特征相关。

### Node.nodeName，Node.nodeType

nodeName属性返回节点的名称，nodeType属性返回节点类型的常数值。具体的返回值，可查阅下方的表格。


|          类型          |         nodeName        | nodeType |
|------------------------|-------------------------|----------|
| ELEMENT_NODE           | 大写的HTML元素名        |        1 |
| ATTRIBUTE_NODE         | 等同于Attr.name         |        2 |
| TEXT_NODE              | #text                   |        3 |
| COMMENT_NODE           | #comment                |        8 |
| DOCUMENT_NODE          | #document               |        9 |
| DOCUMENT_FRAGMENT_NODE | #document-fragment      |       11 |
| DOCUMENT_TYPE_NODE     | 等同于DocumentType.name |       10 |

以document节点为例，它的nodeName属性等于#document，nodeType属性等于9。

```js
document.nodeName // "#document"
document.nodeType // 9
```

如果是一个`<p>`节点，它的nodeName是P，nodeType是1。文本节点的nodeName是#text，nodeType是3。

通常来说，使用nodeType属性确定一个节点的类型，比较方便

```js
document.getElementsByTagName('a').nodeType === 1
// true

document.getElementsByTagName('a').nodeType === Node.ELEMENT_NODE
// true
```

