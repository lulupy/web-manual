# jquery插件使用

[jquery插件查询地址](http://plugins.jquery.com/)

##  如何选择插件
- 插件的作者
- 社区活跃人数
- 更新情况
- 看源码(通常没有时间和精力)

### jQuery Validation
地址:　[http://plugins.jquery.com/validation/](http://plugins.jquery.com/validation/)


表单验证插件

####  基本api
- validate()

###### validate()
核心方法
```js
$("#demoForm").validate({
    debug: true,
    rules: {
        username: {
            required: true,
            minlength: 2,
            maxlength: 10
        },
        password: {
            required: true,
            minlength: 2,
            maxlength: 16
        }
    },
    messages: {
        username: {
            required: '请输入用户名',
            minlength: '用户名不能小于2个字符',
            maxlength: '用户名不能超过10个字符',
            remote: '用户名不存在'
        },
        password: {
            required: '请输入密码',
            minlength: '密码不能小于2个字符',
            maxlength: '密码不能超过16个字符'
        }

    }
});
```
两个概念：
- method: 验证方法， 指的校验的逻辑
- rule: 验证规则, 指的是元素和验证方法的关联

###### 基本验证方法
-　required 必填
-　remote 远程验证
-　minlength 最小长度
-　maxlength 最大长度
-　min max  range 
-　url email date dateISO
-　number digits(非负整数)
-　equalTo 与另一个元素值相等

###### remote
```js
username: {
    required: true,
    minlength: 2,
    maxlength: 10,
    remote: {
        url: "remote.json", //服务器地址
        type: "post", //请求方法
        data: { //发送的数据，默认的会把元素的值发送过去
            //我们再增加一个登陆时间的数据
            loginTime: function(){
                return +new　Date();//＇＋＇数据转换
            }
        }
    }
}
```

remote.json
```json
true //返回true代表成功, false代表验证失败
```
后台写的时候不会这么简单，肯定会查找数据库并做判断

###### equalTo

```js
rules: {
    password: {
        required: true,
        minlength: 2,
        maxlength: 16
    },
    "confirm-password": {
        equalTo: "#password" //传入一个选择符
    }
},
messages: {
    password: {
        required: "必须填写密码",
        minlength: "密码最小为2位",
        maxlength: "密码最大为16位"
    },
    "confirm-password": {
        equalTo: "两次输入的密码不一致"
    }
},
```


###### validate方法的配置选项
- rules　定义校验规则
- messages　定义提示信息
- submitHandler 通过验证后运行的函数，可以加上表单提交的方法
- invalidHandler　无效表单提交后运行的元素



```js
submitHandler: function (form) {
    //form为dom对象
    console.log($(form).serialize());
}
```

```js
invalidHandler: function(event, validator){
    //validator为Validator对象
    console.log('错误数: ' + validator.numberOfInvalids());
}
```

- onsubmit 是否在表单提交时验证,默认为true
- onfocusout　是否在表单获取焦点时验证
- onkeyup　是否在敲击键盘时验证
- onclick　是否在点击鼠标时验证
- focusInvalid　提交表单后，未通过验证的表单是否会自动获取焦点
- focusCleanup　当未通过验证的元素获取焦点时，是否移除错误提示


- errorClass 
- validClass
- errorElement 使用什么标签标记错误
- wrapper　使用什么标签把上边的errorElement包裹起来
- errorLabelContainer 把错误的信息统一发在一个容器里面


```js
{
    errorElement: 'li',
    wrapper: 'ul',
    errorLabelContainer: '#info'
}
```



- errorPlacement 自定义错误信息放在哪里
- highlight 可以给未通过验证的元素加效果
- unhighlight 去除未通过元素的效果,一般和highlight一起使用



```js
errorPlacement: function (error, element) {    
    error.insertBefore("#info");
}
```

```js

highlight: function(element, errorClass, validClass) {
    $(element).addClass(errorClass).removeClass(validClass);//默认行为,增加errorClass,移除validClass
    $(element).fadeOut().fadeIn();//淡出淡入
},
unhighlight: function(element, errorClass, validClass) {
    $(element).removeClass(errorClass).addClass(validClass);//默认行为
},
```








### 高级api
- valid() 
- rules()


###### valid()
检查表单或某些元素是否验证，　返回true或false
```js
$('#form').valid(); //检查整个表单
$('#username').valid();　//检查某个字段
```

###### rules()
- rules() 获取表单元素的校验规则
- rules('add', rules) 向表单元素增加校验规则
- rules('remove', rules) 删除表单元素的校验规则

**注意是表单元素，而不是整个表单，对整个表单无效**


```js
$('#username').rules();//获取
$('#username').rules('add', {required: true});//增加
$('#username').rules('remove', "required minlength");//删除
```


### Validator对象
```js
var validator = $('form').validate({
    rules: {
        username: {
            required: true
        }
    }
})
```

validate方法返回的就是一个Validator对象

###### Validator对象的方法
- Validator.form 验证表单是否通过, 返回true/false
- Validator.element(element)　验证某个元素是否通过,　传入的是一个css选择器, 返回true/false
- Validator.restForm() 重置表单
- Validator.showErrors(errors)　针对某个元素显示特定的错误
- Validator.numberOfInvalids()　返回没有通过验证的元素个数


```js
validator.showErrors({
    username: "你填错了" 
});
```

在控制台运行上面代码, 会直接为username字段显示错误，通常在自定义验证方法的时候用得到


###### Validator对象的静态方法
不需要捕获Validator对象就可以直接调用的方法
- jQuery.validator.addMethod(name, method [,message]) 增加自定义的验证方法
- jQuery.validator.format(template, argument1,argumaentN...)　格式化字符串
- jQuery.validator.setDefault(options) 修改插件默认值


格式化字符串
```js
var template = $.validator.format("{0}-{1}-{2}");//返回了一个模板函数
template("你","好","吗");//调用模板函数生产字符串
//结果"你-好-吗"
```


修改插件默认值
```js
$.validator.setDefault({
    debug: true
});
```


增加自定义的验证方法
```js
$.validator.addMethod("postcode", function(value, element, params){
    var postcode = /^[0-9]{6}$/;
    return postcode.test(value);
}, $.validator.format("请填写正确的{0}邮编！"));
```










