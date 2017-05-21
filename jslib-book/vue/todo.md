## v-for

语法:

    vaule,key in items
    value,key in items

## 事件修饰符

事件处理函数只有纯粹的逻辑判断， 不处理DOM事件的细节， 这些可以通过事件修饰符来处理， 比如说， 阻止冒泡， 取消默认行为， 判断按键


修饰符的位置

v-on:eventName.修饰符

修饰符:

.stop 阻止冒泡 .prevent 取消默认行为

按键修饰符:

.enter .tab .delete .esc .space .up ...

## v-show

v-show="表达式"

元素会被渲染在页面中， 只根据表达式的值进行css切换






