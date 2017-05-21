## react.js基本使用

### 准备工作

1. 导入库文件

```html
<script src="src/react.js"></script>
<script src="src/react-dom.js"></script>
<script src="src/browser.min.js"></script>
```

react.js是核心库
react-dom.js是用来操作dom的库
browser.min.js 是用来解析jsx语法的

2. 放置一个容器
```html
<div id="container"></div>
```

3. react.js使用的是jsx语法, 我们的script标签的type属性为text/babel
```html
<script type="text/babel"></script>
```

###  定义一个组件类

然后开始在我们的script标签内写代码，首先我们需要定义一个组件类

```
var StudentApp = React.createClass({
    render: function(){
        return <h1>学员信息表</h1>;
    }
});
```




注意： 组件类名的首字母必须大写

我们使用React.createClass方法创建一个组件类

传入一个对象作为参数， 对象有一个render方法, 这个方法用来输出html

render 方法的 return 可以直接跟html标签,不用加引号, 这就是jsx语法


### 将组件渲染到页面中

现在，我们在页面中还看不到任何的东西， 我们需要使用ReactDOM.render方法将我们刚刚定义的组件渲染到页面中

```jsx
ReactDom.render( <StudentApp />, document.getElementById('container') );
```
ReactDom.render参数说明:

1. 我们定义的组件类，把它写成闭合标签的形式(需要加/)
2. 需要插入的dom节点

### 模板中需要注意的地方

1. 只能有一个顶层标签

错误的写法:

```jsx
var StudentApp = React.createClass({
    render: function(){
        return (
            <h1>学员信息表</h1>
            <h2>3年2班</h2>
        );
    }
});
```

正确的写法: 

```
var StudentApp = React.createClass({
    render: function(){
        return (
            <div>
                <h1>学员信息表</h1>
                <h2>3年2班</h2>
            </div>     
        );
                   
        
    }
});
```

2. 标签必须闭合 

像input之类的标签要写成`<input/>` 不能写成<input>

3. class需要写成className

在jsx语法中, class是关键字， 所有需要在模版中把class替换成className


### JSX 语法

HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 JSX 的语法，它允许 HTML 与 JavaScript 的混写

```
var names = ['Alice', 'Emily', 'Kate'];

ReactDOM.render(
  <div>
  {
    names.map(function (name) {
      return <div>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('example')
);
```

遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析

JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员

```
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

### 组件传参

```
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});

ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('container')
);
```
组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 `<HelloMessage name="John">` ，就是 HelloMessage 组件加入一个 name 属性，值为 John。组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性就可以通过 this.props.name 读取。

### this.state

```
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```

上面代码是一个 LikeButton 组件，它的 getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。

由于 this.props 和 this.state 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性。

### 表单

用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取

```
var Input = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});

ReactDOM.render(<Input/>, document.body);
```


上面代码中，文本输入框的值，不能用 this.props.value 读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值。textarea 元素、select元素、radio元素都属于这种情况，











