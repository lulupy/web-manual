# Response

Koa Response 对象是 node 普通 # response 对象之上的抽象, 提供了日常 HTTP server 中有用的功能.

# res.header

响应 header 对象.

# res.status

返回响应状态. 默认 # res.status 没有值, 而不是像 node 的 # res.statusCode 默认为 200.

# res.status=

使用状态码或不区分大小写的字符串设置响应状态:

100 "continue"
101 "switching protocols"
102 "processing"
200 "ok"
201 "created"
202 "accepted"
203 "non-authoritative information"
204 "no content"
205 "# reset content"
206 "partial content"
207 "multi-status"
300 "multiple choices"
301 "moved permanently"
302 "moved temporarily"
303 "see other"
304 "not modified"
305 "use proxy"
307 "temporary redirect"
400 "bad request"
401 "unauthorized"
402 "payment required"
403 "forbidden"
404 "not found"
405 "method not allowed"
406 "not acceptable"
407 "proxy authentication required"
408 "request time-out"
409 "conflict"
410 "gone"
411 "length required"
412 "precondition failed"
413 "request entity too large"
414 "request-uri too large"
415 "unsupported media type"
416 "requested range not satisfiable"
417 "expectation failed"
418 "i'm a teapot"
422 "unprocessable entity"
423 "locked"
424 "failed dependency"
425 "unordered collection"
426 "upgrade required"
428 "precondition required"
429 "too many requests"
431 "request header fields too large"
500 "internal server error"
501 "not implemented"
502 "bad gateway"
503 "service unavailable"
504 "gateway time-out"
505 "http version not supported"
506 "variant also negotiates"
507 "insufficient storage"
509 "bandwidth limit exceeded"
510 "not extended"
511 "network authentication required"
注意: 不用担心没法记住这些状态码, 如果设置错误, 会有异常抛出, 并列出该状态码表, 从而帮助修改.

# res.length=

设置响应 Content-Length.

# res.length

如果 Content-Length 存在返回相应数值, 或通过 # res.body 计算得出, 否则返回 undefined.


# res.body

返回响应内容.

# res.body=

设置响应内容为如下值:

string written
Buffer written
Stream piped
Object json-stringified
null no content # response

如果 # res.status 没有设置, Koa 会自动设定 status 为 200 或 204.

String

Content-Type 默认设置为 text/html 或 text/plain, 两个的编码都是 utf-8. Content-Length 同样会被设置.

Buffer

Content-Type 默认设置为 application/octet-stream, 并设置 Content-Length.

Stream

Content-Type 默认设置为 application/octet-stream.

Object

Content-Type 默认设置为 to application/json.


# res.get(field)

获取响应头部字段值, field 区分大小写.

var etag = this.get('ETag');

# res.set(field, value)

设置响应头部字段 field 为 value:

this.set('Cache-Control', 'no-cache');

# res.set(fields)

使用对象同时设置多个响应头 fields

this.set({
  'Etag': '1234',
  'Last-Modified': date
});
# res.remove(field)

删除头部 field 字段.

# res.type

获取响应 Content-Type 字段, 不包含参数如 "charset".

var ct = this.type;
// => "image/png"


# res.redirect(url, [alt])

执行 [302] 重定向到 url.
