# API

## NavLink

作用跟Link很像， 只是多了一个特性， 在匹配的时候会加上class或样式

### activeClassName: string

当NavLink所对应的url与浏览器url匹配时，为元素添加的class, 默认为'active'

### activeStyle: object

当NavLink所对应的url与浏览器url匹配时，为元素添加的style

### exatc: bool

为true时， 为完全匹配才算匹配

如:

```jsx
<NavLink to="/home"></NavLink>
```

/home
/home/
/home/detail

都是匹配的， 这是部分匹配

当exatc为true时

```jsx
<NavLink exact to="/home"></NavLink>
```

只有/home才匹配

### strict: bool

如果为true, 结尾斜线(结尾斜线)将影响是否匹配

```jsx
<NavLink strict to="/home"></NavLink>
```

/home/不匹配  如果strict为false /home/匹配

## Prompt

这个组件的使用场景是: 当用户准备离开当前页(改变url: 1. 直接修改url 2. 点击Link)

弹出确认框，让用户确认是否要离开， 比如说表单未填完的情况

### message: string

弹出的显示提示信息

```jsx
<Router>
    <Prompt message="你确定要离开吗？"/>
</Router>
```

当url改变就会弹出确认框

一个Router里只能有一个Prompt

```jsx
<Router>
    <Prompt message="aaaaaa？"/>
    <Prompt message="你确定要离开吗？"/>
</Router>
```

显示的message还是"你确定要离开吗？", 后写的起作用

### 与getUserConfirmation的关系

```jsx
//默认的getUserConfirmation
function getUserConfirmation(message, callback){
    const allowTransition = window.confirm(message)
    callback(allowTransition)
    
}

<Router getUserConfirmation={getUserConfirmation}>
    <Prompt message="你确定要离开吗？"/>
</Router>
```

1. 但url发生改变， Prompt触发调用getUserConfirmation
2. getUserConfirmation调用window.confirm，弹出浏览器自带的确认框
3. 点击确定， allowTransition为true, callback(true)做的事情就是允许跳转，改变ui
4. 点击取消, allowTransition为false, callback(false)就是阻止跳转


### message: func

message还可以为一个函数, 参数为用户希望跳转的url对应的loaction对象，
返回一个字符串为显示的提示信息， 或者为true, 表示允许跳转


### when: bool

控制Prompt是否生效

```jsx
<Router>
    <Prompt when={false} message="你确定要离开吗？"/>
</Router>
```

为false的时候就没有作用了， 这样的写法是避免了动态render Prompt

## Redirect

重定向， render一个<Redirct> 将会导航一个新的地址

### to: string

url

```jsx
<Router>
    <Redirect to="/user"></Redirect>    
</Router>
```

一渲染出来, 浏览器地址的url就为#/user

### to: object

locaton对象

```jsx
<Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: { referrer: currentLocation }
}}/>
```





## Route

### Route render methods

Route组件的渲染方法有三个( `<Route component>`, `<Route render>`, `<Route children>` )

它们三个不能共用， 在一个`<Route>`上， 只能使用一种渲染方法

### Route props

三个渲染方法都会接收下面三个route props:

1. match
2. location
3. history

例如: 如果使用的是`<Route component>`， 我们可以在要渲染的Component里使用这三个props

```jsx
<Route path="/topics/:topicId" component={Topic}></Route>

class Topic extends Component{
    render (){
        let {match} = this.props;
        return (
            <div>{match.params.topicId}</div>
        );
    }
}
```

### 渲染方法component

```jsx
<Route path="/" component={Home}>
```

当定义的path与location匹配时, Home Component将被渲染

渲染方法component和render的一点区别:

使用render时, 每次渲染都会创建一个新的component, 这就导致了存在的component(老的component的状态可能已经发生了改变)解除挂载(unmounting), 新的component挂载(mounting);  (验证不通过)

### 渲染方法render

## Switch

<Route>只要匹配就会渲染组件， 当多个<Route>放在一起时， 可能就会出现问题， 考虑下面这种情况：

```jsx
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
```

当url为'/about'时, About, User, NoMatch都会渲染， 因为三个Route都匹配

如果将它们放入Switch中

```jsx
<Switch>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```

那么只会渲染About

当url为/about, 则第一个Route匹配， Switch会停止其他Route的匹配

Switch的作用是只渲染一个Route

## withRouter

```jsx
class ShowTheLocation extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props

    return (
      <div>You are now at {location.pathname}</div>
    )
  }
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
const ShowTheLocationWithRouter = withRouter(ShowTheLocation)

class App extends Component {
    render (){
        return (
            <Router>
                <div>
                    <ShowTheLocationWithRouter />
                </div>
            </Router>
        )
    }
}
```

每次url改变都会导致ShowTheLocation重新渲染， 可以访问到 match, location, history



## 未解决问题

1. Route component很render的区别



