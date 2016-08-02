var koa = require('koa');
var parse = require('co-body');

var app = new koa();
app.use(function *(){
    // var body = yield parse.json(this);

    var body = yield parse.form(this);

    // var body = yield parse.text(this);

    // var body = yield parse(this);
    console.log(body);
    console.log(typeof(body))
    
    this.body = body;
})

app.listen(3100);