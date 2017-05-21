## typescript

关于typescript我们需要了解基本写法

#### 类型批注



```js
function add(left: number, right: number): number {
    return left + right;
}
```

参数left, right都为number, 返回值为number

#### 接口

```js
interface Shape {
    name: string;
    width: number;
    height: number;
    color?: string;//表示可选
}
 
function area(shape : Shape) {
    let area = shape.width * shape.height;
    return "I'm " + shape.name + " with area " + area + " cm squared";
}
 
console.log( area( {name: "rectangle", width: 30, height: 15} ) );
console.log( area( {name: "square", width: 30, height: 30, color: "blue"} ) );
```

接口可以作为一个类型批注。


## rc-animate

[项目地址](https://github.com/fis-components/rc-animate)


### 基本用法

```js
const Div = (props) => {
    const {style, show} = props;
    const newStyle = Object.assign({}, style, {
        display: show ? '': 'none',
    })
    console.log(newStyle);
    return <div style={newStyle}/>;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enter: true
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            enter: !this.state.enter
        })
    }
    render() {
        const style = {
            width: '200px',
            height: '200px',
            backgroundColor: 'red',
        };
        return (
            <div>
                <button onClick={this.toggle}>显示/隐藏</button>
                <Animate
                  component=""
                  showProp="show"
                  transitionName="fade"
                >
                    <Div show={this.state.enter} style={style}></Div>
                </Animate>
            </div>
            
        );
    }
}
```

这种用法需要Animate的showProp和transitionName进行配合

- showProp代表监听的子component的属性

比如这里的设置为`show`, 如果Div的属性show为true, 则为Div中的div加上fade-enter和fade-enter-active class
如果Div的属性show为true, 如果为false, 则为Div中的div加上fade-leave和fade-leave-active class


- transitionName代表class前缀

比如这里设置成`fase`， 就是fade-enter... , 设置成`slider`就是 slider-enter


先添加fade-enter, 然后间隔很短的时间再添加fade-enter-active, 虽然看上去像是同时添加的，但确实有时间间隔

因为不管是采用css3的过度或动画，都是从一个状态到另一个状态， 有间隔时间才能体现出变化

所以我们的css可以这麽写:

过渡方式：

```css
.fade-enter{
    opacity: 0;
}

.fade-enter.fade-enter-active{
    transition: 1s;
    opacity: 1;
}

.fade-leave{
    opacity: 1;
}

.fade-leave.fade-leave-active{
    transition: 1s;
    opacity: 0;
}
```

动画方式：

```css
.fade-enter{
    opacity: 0;
    animation-duration: .5s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
    animation-play-state: paused;
}

.fade-enter.fade-enter-active{
    animation-name: fadeIn;
    animation-play-state: running;
}

.fade-leave{
    opacity: 1;
    animation-duration: .5s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
    animation-play-state: paused;
}

.fade-leave.fade-leave-active{
    animation-name: fadeOut;
    animation-play-state: running;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
```

### 也可以不设置showProp


就会根据 Animate元素有没有 children 进行 enter leave 的动画了


```js
<Animate
    component=""
    transitionName="fade">

    {this.state.enter?
        <div key="1" style={{
            display:this.state.enter?'block':'none',
            marginTop: '20px',
            width: '200px',
            height: '200px',
            backgroundColor: 'red'
        }}></div>:
    null}
    </Animate>
```

### 使用js动画



