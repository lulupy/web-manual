# Date

创建 Date 实例用来处理日期和时间。Date 对象基于1970年1月1日（世界标准时间）起的毫秒数。

```js
var today = new Date();
var today = new Date(1453094034000); // by timestamp(accurate to the millimeter)
var birthday = new Date('December 17, 1995 03:24:00');
var birthday = new Date('1995-12-17 03:24:00');
var birthday = new Date(1995, 11, 17);
var birthday = new Date(1995, 11, 17, 3, 24, 0);
```

```js
new Date();
new Date(value);
new Date(dateString);
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
```

- value

代表自1970年1月1日00:00:00 (世界标准时间) 起经过的毫秒数。

- dateString

表示日期的字符串值。该字符串应该能被 Date.parse() 方法识别（符合 IETF-compliant RFC 2822 timestamps 或 version of ISO8601）。

- year

代表年份的整数值。为了避免2000年问题最好指定4位数的年份; 使用 1998, 而不要用 98.

- month

代表月份的整数值从0（1月）到11（12月）。
- day

代表一个月中的第几天的整数值，从1开始。

- hour

代表一天中的小时数的整数值 (24小时制)。

- minute

分钟数。

- second

秒数。

- millisecond

表示时间的毫秒部分的整数值。



记住一种格式:

YYYY-MM-DD HH:mm:ss
```js
var birthday = new Date('1995-12-17 03:24:00');
```


## 常用方法

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
