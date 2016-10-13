# 第一课

## jQuery基础

- 什么是JQ？
    + 一个优秀的JS库，大型开发必备
- JQ的好处？
    + 简化JS的复杂操作
    + 不再需要关心兼容性
    + 提供大量实用方法
- 如何学习JQ？
    + www.jquery.com
    + JQ只是辅助工具，要正确面对
    + 需要分阶段学习

## JQ设计思想？
- 选择网页元素
    + 模拟CSS选择元素
    + 独有表达式选择
    + 多种筛选方法
- JQ写法
    + 方法函数化
    + 链式操作
    + 取值赋值合体
- JQ与JS关系
    + 可以共存，不能混用

- $()下的常用方法
    + has()
    + not()
    + filter()
    + next()
    + prev()
    + find()
    + eq()
    + index()
    + attr()

- 编写选项卡

- $()下的常用方法
    + addClass()   removeClass()
    + width()   innerWidth()   outerWidth()
    + insertBefore()  before()
    + insertAfter()   after()
    + appendTo()   append()
    + prependTo()   prepend()
    + remove()
    + on()  off()
    + scrollTop()

- 编写弹窗

- $()下的常用方法
    + ev  pageX  which  
    + preventDefault  stopPropagation
    + one()
    + offset()  position()
    + offsetParent()
    + val()
    + size()
    + each()

- 编写拖拽

- $()下的常用方法
    + hover()
    + show()  hide()
    + fadeIn()   fadeOut()
    + fadeTo()
    + slideDown()   slideUp()

## 本课练习

- 理解jquery设计思想
- 记住大部分jquery API的使用
- 英文：http://api.jquery.com/
- 中文： http://www.css88.com/jqapi-1.9/
- http://tangram.baidu.com/api
- 课上的例子写一遍
- 之前做过的效果改写成JQ（三个

# 第二课

- 基础方法扩充
    + get()  :   下标和length属性
    + outerWidth()  :   针对隐藏元素和参数true
    + text()   :   合体的特例
    + remove()  :  detach()
    + $()   :  $(document).ready()

- $()下的常用方法
    + parents()   closest()
    + siblings()  
    + nextAll()  prevAll()
    + parentsUntil()   nextUntil()   prevUntil()
    + clone()
    + wrap()  wrapAll()  wrapInner()  unwrap()
    + add()  slice()
    + serialize()    serializeArray()

- $()下的常用方法
    + animate()
    + stop()
    + delay()
    + delegate()   undelegate()
    + trigger()
    + ev.data    ev.target   ev.type
- $下的常用方法
    + type()
    + trim()
    + inArray()
    + proxy()
    + noConflict()
    + parseJSON()
    + makeArray()


    + ajax() :  json形式的配置参数
    + url    success
    + error   contentType
    + data     type
    + dataType    cache     timeout
    + 抽象出来的方法
    + get()
    + post()
    + getJSON()
    + 支持jsonp的形式：指定?callback=?

- 插件
    + $
    + $.extend
    + $.fn
    + $.fn.extend


- 继续深入的话，我们还应该掌握哪些？
    + $.Callbacks()    :   回调对象
    + deferred()  :  延迟对象
    + $.hodeReady()   :  持有和释放ready
    + $.dequeue()  :  执行队列
    + $.support  :   功能检测

- 本课练习
    + 理解jquery设计思想
    + 记住大部分jquery API的使用
    + 英文：http://api.jquery.com/
    + 中文：http://www.css88.com/jqapi-1.7/
    + tangram.baidu.com/
    + 做一个复杂一些的jquery效果














