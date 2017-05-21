elements是react的最小构建块
一个element描述了页面应该呈现的样式

```jsx
const element = <h1>Hello, world</h1>;
```

不同于浏览器DOM elements, React elements是原始对象， 创建的成本很低.

注意:  有一个概念容易跟elements产生混淆， 就是组件(components), 
应该说组件可以产生elements


## 在DOM中渲染一个element

```html
<div id="root"></div>
```

react构建的应用一般来说只有一个'root' DOM节点， root节点里的所有都由React DOM来管理，

但如果你在已经存在的应用中集成React, 你希望创建多少独立分开的root DOM节点都可以


```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## 更新一个渲染了的Element

react element是不可变的. 一旦你创建了一个element, 你不能改变它的children或属性(attribute). 一个element就像电影中的一个片段, 它代表了在某一个具体时间点的ui

根据目前我们所掌握的知识,所以如果我们要更新一个渲染了的element, 我们需要创建一个新的element, 然后把它传给`ReactDOM.render()` 

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

注意: 

在实际中， 大多数react app只会调用一次`ReactDOM.render()`


## React只在需要的地方更新DOM

React DOM 把element和它的children与之前的做比较， 并且只是在它们之间不同的地方才改变DOM

在上个例子中，尽管我们每次都是创建一个新的element来描述整个ui树, 但每次只有文本节点会被改变



