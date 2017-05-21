# Context

在react中，我们的数据通常是在componets中从上到下一层一层传递的，通过改变顶层组件的state来改变嵌套组件的props来更新显示

在有些情况下，你希望在整个componet树结构中都可以使用一些数据，而且不想一层一层的传递数据，这时你需要用到react的`context` API

## 为什么不要使用Context

在大多数的应用中并不需要使用context.

如果你想你的应用更稳定，不要使用context, 这是一个实验性的API, 并且很可能在未来的移除

如果你对像`Redux`或`Mobx`等状态管理库(state management libraries)不熟悉，不要使用context.

在很多实际的应用中， 使用这些库来管理那些关联到多个components的state是一个很好的选择.
使用Redux可能比使用context能更好的解决你的问题.

如果你不是一个经验丰富的React开发者，不用使用context.
使用props和state来实现你的功能通常来说是更好的方式.

如果你不管这些警告坚持要使用context, 尽量将使用context的代码隔离在一个很小的区域，并且避免直接使用context API, 

这样，在context Api改变的时候可能更好更新你的代码

##  怎样使用context

假如你的代码结构像这样：

```jsx
class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.props.color}}>
        {this.props.children}
      </button>
    );
  }
}

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button color={this.props.color}>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  render() {
    const color = "purple";
    const children = this.props.messages.map((message) =>
      <Message text={message.text} color={color} />
    );
    return <div>{children}</div>;
  }
}
```

在这个例子中， 我们手动的传递`color`props从上到下，用来控制`Button`和`Message`的样式。

下面是使用context的代码：

```jsx
class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: React.PropTypes.string
};

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  getChildContext() {
    return {color: "purple"};
  }

  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  color: React.PropTypes.string
};
```

通过在`MessageList`(context的提供者)加入`childContextTypes`和`getChildContext`,
React将数据自动的在子组件中传递下，只要是在`MessageList`的任意子组件都可以通过定义`contextTypes`来访问到context中数据。

如果contextTypes没有定义，`context`将会是一个空对象

## 在生命周期函数中引用context

```jsx
constructor(props, context)
componentWillReceiveProps(nextProps, nextContext)
shouldComponentUpdate(nextProps, nextState, nextContext)
componentWillUpdate(nextProps, nextState, nextContext)
componentDidUpdate(prevProps, prevState, prevContext)
```

## 更新context

不要这么做.

当state和props改变时将会调用`getChildContext`函数，你可以使用
`this.setState`来触发一个本地state更新，这样将会产生一个新的context,
并且子组件将会接收到变化.

```jsx
class MediaQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {type:'desktop'};
  }

  getChildContext() {
    return {type: this.state.type};
  }

  componentDidMount() {
    const checkMediaQuery = () => {
      const type = window.matchMedia("(min-width: 1025px)").matches ? 'desktop' : 'mobile';
      if (type !== this.state.type) {
        this.setState({type});
      }
    };

    window.addEventListener('resize', checkMediaQuery);
    checkMediaQuery();
  }

  render() {
    return this.props.children;
  }
}

MediaQuery.childContextTypes = {
  type: React.PropTypes.string
};
```












