# react-transition-group

## 安装

```shell
npm i react-transition-group --save
```

- high-level API: CSSTransitionGroup
- Low-level API: TransitionGroup


## high-level API: CSSTransitionGroup

CSSTransitonGroup的作用是: 当一个dom元素进入或离开文档时，执行css 过渡或动画

设计灵感来自ng-animate.


基本的思想是:

1. 当一个dom元素进入文档时， 给它加上一个 enter 类名， 在下个

