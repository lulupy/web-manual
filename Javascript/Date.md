# Date

Date对象是JavaScript提供的日期和时间的操作接口

## Date对象有几个静态方法

### Date.now()

now方法返回当前距离1970年1月1日00:00:00的毫秒数
Date.now(); // 1427974222853

### Date.parse()

parse方法用来解析日期字符串，返回距离1970年1月1日 00:00:00的毫秒数

日期字符串的格式应该完全或者部分符合YYYY-MM-DDTHH:mm:ss.sssZ格式，Z表示时区，是可选的

如果解析失败，返回NaN

```js
Date.parse("January 26, 2011 13:51:50")
Date.parse("Mon, 25 Dec 1995 13:30:00 GMT")
Date.parse("Mon, 25 Dec 1995 13:30:00 +0430")
Date.parse("2011-10-10")
Date.parse("2011-10-10T14:48:00")
```



## new Date()

Date还可以当作构造函数使用。对它使用new命令，会返回一个Date对象的实例。如果不加参数，生成的就是代表当前时间的对象。

```js
var today = new Date();
```

作为构造函数时，Date对象可以接受多种格式的参数。

1. new Date(milliseconds)

Date对象接受从1970年1月1日00:00:00 UTC开始计算的毫秒数作为参数。这意味着如果将Unix时间戳（单位为秒）作为参数，必须将Unix时间戳乘以1000。

```js
new Date(1378218728000)
// Tue Sep 03 2013 22:32:08 GMT+0800 (CST)

// 1970年1月2日的零时
var Jan02_1970 = new Date(3600 * 24 * 1000);
// Fri Jan 02 1970 08:00:00 GMT+0800 (CST)

// 1969年12月31日的零时
var Dec31_1969 = new Date(-3600 * 24 * 1000);
// Wed Dec 31 1969 08:00:00 GMT+0800 (CST)
```

2. new Date(datestring)

Date对象还接受一个日期字符串作为参数，返回所对应的时间。

```js
new Date('January 6, 2013');
// Sun Jan 06 2013 00:00:00 GMT+0800 (CST)
```

3. new Date(year, month [, day, hours, minutes, seconds, ms]) 推荐使用

Date对象还可以接受多个整数作为参数，依次表示年、月、日、小时、分钟、秒和毫秒。如果采用这种格式，最少需要提供两个参数（年和月），其他参数都是可选的，默认等于0。因为如果只使用“年”这一个参数，Date对象会将其解释为毫秒数。

```js
new Date(2013)
// Thu Jan 01 1970 08:00:02 GMT+0800 (CST)
```

上面代码中，2013被解释为毫秒数，而不是年份。


各个参数的取值范围如下。

- year：四位年份，如果写成两位数，则加上1900
- month：表示月份，0表示一月，11表示12月
- date：表示日期，1到31
- hour：表示小时，0到23
- minute：表示分钟，0到59
- second：表示秒钟，0到59
- ms：表示毫秒，0到999

注意，月份从0开始计算，但是，天数从1开始计算。另外，除了日期默认为1，小时、分钟、秒钟和毫秒默认都是0。

```js
new Date(2013, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)

new Date(2013, 0, 1)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)

new Date(2013, 0, 1, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)

new Date(2013, 0, 1, 0, 0, 0, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
```



### get

- Date.prototype.getTime()：返回实例对象距离1970年1月1日00:00:00对应的毫秒数，等同于valueOf方法- 

- Date.prototype.getDate()：返回实例对象对应每个月的几号（从1开始）- 

- Date.prototype.getDay()：返回星期，星期日为0，星期一为1，以此类推- 

- Date.prototype.getFullYear()：返回四位的年份- 

- Date.prototype.getMonth()：返回月份（0表示1月，11表示12月）- 

- Date.prototype.getHours()：返回小时（0-23）- 

- Date.prototype.getMilliseconds()：返回毫秒（0-999）- 

- Date.prototype.getMinutes()：返回分钟（0-59）- 

- Date.prototype.getSeconds()：返回秒（0-59）- 

- Date.prototype.getTimezoneOffset()：返回当前时间与UTC的时区差异，以分钟表示，返回结果考虑到了夏令时因素


### set

- Date.prototype.setDate(date)：设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳- 

- Date.prototype.setFullYear(year [, month, date])：设置四位年份- 

- Date.prototype.setHours(hour [, min, sec, ms])：设置小时（0-23）- 

- Date.prototype.setMilliseconds()：设置毫秒（0-999）- 

- Date.prototype.setMinutes(min [, sec, ms])：设置分钟（0-59）- 

- Date.prototype.setMonth(month [, date])：设置月份（0-11）- 

- Date.prototype.setSeconds(sec [, ms])：设置秒（0-59）- 

- Date.prototype.setTime(milliseconds)：设置毫秒时间戳


### Date.prototype.toString()

toString方法返回一个完整的时间字符串

```js
var today = new Date();
today.toString(); // "Fri Apr 03 2015 11:17:29 GMT+0800 (CST)"
```


## 日期运算

类型转换时，Date对象的实例如果转为数值，则等于对应的毫秒数；如果转为字符串，则等于对应的日期字符串。所以，两个日期对象进行减法运算，返回的就是它们间隔的毫秒数；进行加法运算，返回的就是连接后的两个字符串。

```js
var then = new Date(2013,2,1);
var now = new Date(2013,3,1);

now - then
// 2678400000

now + then
// "Mon Apr 01 2013 00:00:00 GMT+0800 (CST)Fri Mar 01 2013 00:00:00 GMT+0800 (CST)"   
```
