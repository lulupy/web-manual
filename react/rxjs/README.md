## Observable

Rx 提供了一种叫 Observable 的数据类型

Observable 其实就是一个异步的数组


我们先定义一个数组

```js
[ 14, 9, 5, 2, 10, 13, 4 ]
```

如果我告诉你这个数组是不可变的， 那怎么获取其中的偶数

```js
[ 14, 9, 5, 2, 10, 13, 4 ]
filter( (x) -> x % 2 == 0 )
[ 14, 2, 10, 4 ]
```

现在想象一下这个场景， 我们点击鼠标， 然后记录下位置信息， 那么我们在时间轴上画出来应该是这个样子：

![](https://cdn-images-1.medium.com/max/800/1*FjTqms95LbK_ztsZXiNpoQ.png)

这就是一个事件流(stream of events), 通常我们也可以叫它"Observable"

事件流是不可变的， 因为一个事件发生了， 你不可能退回到那个时间点


但是， 如果我们只对x<250事件感兴趣， 我们可以对这个事件流进行过滤:

```js
filter( (event) -> event.x < 250 )
```


![](https://cdn-images-1.medium.com/max/800/1*DvH5Iqul7Nxor7r7AencgA.png)


对于事件流， 你可以像数组一样操作它， 比如map, filter, reduce等等， 甚至于merge, delay, concat, buffer, distinct, first, last, zip, startWith, window, takeUntil, skip, scan, sample, amb, join, flatMap


[2 minute introduction to rx](https://medium.com/@andrestaltz/2-minute-introduction-to-rx-24c8ca793877)


## 实例： 请求数据
