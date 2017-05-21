# Popover(弹出层)

## 基本用法

```jsx
import React from 'react';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';

export default class PopoverExampleSimple extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        };
    }
    handleTouchTap = (event)=>{
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    }
    handleRequestClose = (reason)=>{
        this.setState({
          open: false
        });
    }
    render(){
        return (
            <div>
                <button onTouchTap={this.handleTouchTap}>click me!</button>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    animation={PopoverAnimationVertical}
                >
                    <div style={{height:200,width:200,border:'2px solid red'}}>hello world!</div>
                </Popover>
            </div>
            
        );
    }
}
```

我们先来`Popover`一些props的意思:

- open type:bool  default:false 如果为true, 这个popover显示
- anchorEl  type:object  为一个DOM节点，将作为设置popover位置的一个参考点
- onRequestClose type:function  popover被请求关闭时，将触发这个函数，我们知道当popover显示的时候，一般情况下，我们点击其他任意区域，应该能关闭popover, materail-ui的处理是点击其他任意区域的时候触发onRequestClose， 然后由你来决定是否关闭popover

改回调函数接受一个参数reason,代表需要关闭窗口的原因，值有两个: `clickAway`和 `offScreen`
```jsx
function(reason: string) => void
```
－ animation type:function 动画的方式

## anchorOrigin和targetOrigin

anchorOrigin和targetOrigin共同决定了popover的位置, anchor是我们指定的anchorEl，这里的是button, target代表的就是需要显示的popover, anchorOrigin和targetOrigin分别代表了anchor和target一个点，这两个点重合就决定了popover的位置

比如说:

```jsx
anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
targetOrigin={{horizontal: 'left', vertical: 'top'}}
``` 

anchor的右下点，需要和target的左上点重合


## 其他的props

- animated type:bool default:true  If true, the popover will apply transitions when it is added to the DOM.

- autoCloseWhenOffScreen type:bool default:true 如果设置为true, 当anchor滚动出屏幕自动关闭

－ canAutoPosition type:bool default:true 如果设置为true,不管anchorOrigin,targetOrigin的值，自动适应屏幕

－ 


