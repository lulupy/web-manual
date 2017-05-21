# react-redux

react-redux是redux作者为方便在react中使用redux而写的库

使用 react-redux必须遵守它的组件拆分规范

react-redux将组件分成两种: ui组件和容器组件

### UI 组件
UI 组件有以下几个特征：

- 只负责 UI 的呈现，不带有任何业务逻辑
- 没有状态（即不使用this.state这个变量）
- 所有数据都由参数（this.props）提供
- 不使用任何 Redux 的 API

因为不含有状态，UI 组件又称为"纯组件"，即它纯函数一样，纯粹由参数决定它的值。

一个ui组件， 计数器

```js
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}
```

显示值value, 事件处理函数onIncreaseClick都是直接由props获得，没有state， 也没有具体的业务逻辑

### 容器组件

- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 Redux 的 API

UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑


如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图

### connect()

React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。


```js
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```

Counter是 UI 组件, App就是生成的容器组件， 其中connect可以接收两个参数， 这个两个参数分别代表了

- 输入逻辑：外部的数据（即state对象 redux中的state）如何转换为 UI 组件的参数
- 输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。


### mapStateToProps

mapStateToProps是一个函数, 它接收state对象 redux中的state为参数， 返回一个对象， 对象的属性对应者props

```js
function mapStateToProps(state){
    return {
        value: state.count
    }
}
```


mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

大概向下面这样

```js
store.subscribe(function(){
    var props = mapStateToProps(store.getState())
    <Counter ...props>
})
```
### mapDispatchToProps

如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。

返回的也是一个对象， 对应的是props中事件处理函数

```js
function mapDispatchToProps(dispatch){
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}
```

### 将容器组件与store结合起来

上面只是定义了容器组件的业务逻辑， 但是没有指定store, 容器组件就无法拿到state和dispatch

#### <Provider> 组件

一种解决方法是将store对象作为参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，一级级将store传下去就很麻烦。

React-Redux 提供Provider组件，可以让容器组件拿到store

```js
import {Provider} from 'react-redux'
const store = createStore(
  counter
);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
```

不管是否嵌套App组件都可以拿到store

```js
<Provider store={store}>
    <div>
        ...
        <App />
        ...
    </div>
    
</Provider>
```

它的原理是React组件的[context](https://facebook.github.io/react/docs/context.html)属性

Provider的源码

```js
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}
```

React-Redux自动生成的容器组件的代码，就类似下面这样
可以获取到store， 也就可以获取到state和dispatch

```js
class App extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    // ...
  }
}

App.contextTypes = {
  store: React.PropTypes.object
}
```







