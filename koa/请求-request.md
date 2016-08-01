## req.header
请求头对象.


## req.headers

req.header 的别名

## req.method

请求方法.


## req.length

将请求的 Content-Length 返回为数字, 或 undefined.

## req.url

获取请求 URL.





## req.path

获取请求 pathname.


## req.querystring

获取原始 query string, 不包含 ?.



## req.search

获取原始 query string, 包含 ?.



## req.host

获取 host, 不包含端口号. 当 app.proxy 为 true 时支持 X-Forwarded-Host, 否者就使用 Host.

## req.hostname

获取 hostname 如果有的话. 当 app.proxy 设为 true 时支持 X-Forwarded-Host, 否则直接使用 Host.

## req.type

获取请求 Content-Type 字段, 不包含参数, 如 "charset".

var ct = this.type;
// => "image/png"

## req.charset

获取请求 charset, 没有返回 undefined

this.## request.charset
// => "utf-8"

## req.query

获取解析后的 query-string, 如果没有返回空对象. 注意: 该方法不支持嵌套解析.

例如 "color=blue&size=small":

{
  color: 'blue',
  size: 'small'
}





## req.protocol

返回请求协议, "https" 或 "http". 当 app.proxy 为 true 时支持 X-Forwarded-Proto.





