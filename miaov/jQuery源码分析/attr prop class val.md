# attr prop class

## 代码结构

```js
jQuery.fn.extend({
    attr
    removeAttr
    prop
    removeProp
    addClass
    removeClass
    toggleClass
    hasClass
    val
});
jQuery.extend({
    valHooks
    attr
    removeAttr
    attrHooks
    propFix
    prop
    propHooks
});
```

### access函数

```js
jQuery.fn.extend({
    attr: function( name, value ) {
        return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
    },
    prop: function( name, value ) {
        return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
    }
})
```

access处理的情况： 

1. 多参数判断
2. 参数为对象

这样像jQuery.attr这样的函数只需要关心一个元素的设置和获取


### jQuery.attr(elem, name, value)

```js
attr: function( elem, name, value ) {
    var hooks, ret,
        nType = elem.nodeType;
    
    // don't get/set attributes on text, comment and attribute nodes
    if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
        return;
    }
    

    //不能设置attribute的元素，用prop代替
    //比如说document就不能设置attribute
    if ( typeof elem.getAttribute === core_strundefined ) {
        return jQuery.prop( elem, name, value );
    }

    //nType为1代表是元素节点 jQuery.isXMLDoc判断是否为xml节点
    //这里是处理一些兼容性问题 如果是元素节点并且不是xml节点则处理
    //因为xml节点没有兼容性问题
    if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
        //属性名最好是小写
        name = name.toLowerCase();
        //我们先来看下jQuery.attrHooks[ name ]
        //jQuery.attrHooks是什么东西？ hooks一般是jq中处理兼容性的具体处理方式
        //下面详细介绍
        hooks = jQuery.attrHooks[ name ] ||
            ( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
    }
    
    //代表传的两个参数， 表示设置
    if ( value !== undefined ) {
        
        //但是如果你传的是null $('div').attr('attr', null);
        //会删除这个属性
        if ( value === null ) {
            jQuery.removeAttr( elem, name );

        } else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
            return ret;

        } else {
            //value+"" 转成字符串
            elem.setAttribute( name, value + "" );
            return value;
        }

    } else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
        return ret;

    } else {
        //获取属性值
        //jQuery.find.attr其实是Sizzle中的方法
        //jQuery.find = Sizzle;
        ret = jQuery.find.attr( elem, name );

        // Non-existent attributes return null, we normalize to undefined
        return ret == null ?
            undefined :
            ret;
    }
}

```

####  jQuery.attrHooks[ name ]

在jq中使用$.support来判断兼容性

然后分别有不同的hooks来处理具体的兼容性问题

hooks的结构可能为:

```js
hooks = {
    x1: {
        set: function(){},
        get: function(){}
    },
    x2: {
        set: function(){},
        get: function(){}
    }
}
```

一类hooks下包含一个或多个子项，每个子项可能有set或get方法,
set代表设置值的兼容性处理函数， get表示取值的兼容处理函数
比如说attrHooks，只有一个type的set方法， 表示设置type的属性有兼容性问题

```js
jQuery.attrHooks = {
    type: {
        set: function(){}
    }
}
```

如果找到就使用兼容性处理函数



```js


} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
    return ret;

} else {
    elem.setAttribute( name, value + "" );
    return value;
}
```


`(ret = hooks.set( elem, value, name )) !== undefined`

如果set返回undefined， 代表没有兼容性处理



```js
attrHooks = {
    type: {
        set: function( elem, value ) {
            //如果有兼容性问题则， 则进行处理，然后返回值， 没有就不管，函数默认返回undefined
            if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
                // Setting the type on a radio button after the value resets the value in IE6-9
                // Reset value to default in case type is set after value during creation
                var val = elem.value;
                elem.setAttribute( "type", value );
                if ( val ) {
                    elem.value = val;
                }
                return value;
            }
        }
    }
}
```

然后我们来看下这个兼容性问题是怎么处理的

jQuery.support.radioValue

```js
//Support: IE9, IE10
input = document.createElement("input");
input.value = "t";
input.type = "radio";
support.radioValue = input.value === "t";
```

如果我先给一个input设置value, 然后改变它的type为radio, 正常情况下它的value依然应该不变
但是在ie9, ie10中， 它的value会变成on

所以这里在处理的时候是先改变type， 再设置value

```js
var val = elem.value;
elem.setAttribute( "type", value );
if ( val ) {
    elem.value = val;
}
return value;
```

#### boolHook


```js
hooks = jQuery.attrHooks[ name ] ||
            ( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
```


```js
booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped";


// /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i
jQuery.expr.match.bool = new RegExp( "^(?:" + booleans + ")$", "i" );


boolHook = {
    set: function( elem, value, name ) {
        if ( value === false ) {
            // Remove boolean attributes when set to false
            jQuery.removeAttr( elem, name );
        } else {
            elem.setAttribute( name, name );
        }
        return name;
    }
}
```

这里是针对布尔属性的操作

false删除, true设置

```js
//<input type="text" checked="checked"/>
$('input').attr('checked', true);
//<input type="text"/>
$('input').attr('checked', false);
```

### jQuery.removeAttr(elem, value )

源码:

```js
removeAttr: function( elem, value ) {
    var name, propName,
        i = 0,
        //  core_rnotwhite=/\S+/g
        //  同时删除多个属性  $('div').removeAttr('attr1 attr2')
        attrNames = value && value.match( core_rnotwhite );

    if ( attrNames && elem.nodeType === 1 ) {
        while ( (name = attrNames[i++]) ) {
            //jQuery.propFix = {
            //  "for": "htmlFor",
            //  "class": "className"
            //}
            //for和class是关键字 div.removeClass('className') div.removeClass('htmlFor')
            propName = jQuery.propFix[ name ] || name;
            

            //布尔属性removeAttribute之后，还需要改对应的property值
            // Boolean attributes get special treatment (#10870)
            if ( jQuery.expr.match.bool.test( name ) ) {
                // Set corresponding property to false
                elem[ propName ] = false;
            }

            elem.removeAttribute( name );
        }
    }
}
```

### jQuery.prop( elem, name, value ) 

大体上都跟attr差不多， 我们只看下它的兼容性问题。

```js
var rfocusable = /^(?:input|select|textarea|button)$/i;

propHooks: {
    tabIndex: {
        get: function( elem ) {
            return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
                elem.tabIndex :
                -1;
        }
    }
}
```

#### tabIndex

用来控制按tab键切换光标的顺序

```html
<input type="text" tabindex="2">
<input type="text" tabindex="1">
```

不加tabindex, 光标的切换按照元素的出现的先后顺序
加了之后， tabindex值小的先获取光标

tabindex为－1是能获取焦点
tabindex为0 可以获取焦点，div都可以（ie chrome下测试）

在获取的tabIndex的值的时候有个小问题

```html
<div id="div1">1111</div>
<script>
var div = document.getElementById('div1');
alert(div.tabIndex);
</script>
```

应该是-1, ie为0


所以:

```js
elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
        elem.tabIndex :
        -1;
```

在ie下下面三种情况tabIndex的值是正确的:

1. 明确设置了tabindex属性
2. 可获取焦点的元素(input|select|textarea|button)
3. a标签


### jQuery.fn.addClass( value )

```js
addClass: function( value ) {
    var classes, elem, cur, clazz, j,
        i = 0,
        len = this.length,
        //value是否为字符串
        proceed = typeof value === "string" && value;

    //value为函数的情况
    //$('div').addClass(function(i, className){})
    if ( jQuery.isFunction( value ) ) {
        return this.each(function( j ) {
            jQuery( this ).addClass( value.call( this, j, this.className ) );
        });
    }

    if ( proceed ) {
        //多个class
        //$('div').addClass('class1 class2');
        classes = ( value || "" ).match( core_rnotwhite ) || [];

        for ( ; i < len; i++ ) {
            elem = this[ i ];
            //下面分析 
            cur = elem.nodeType === 1 && ( elem.className ?
                ( " " + elem.className + " " ).replace( rclass, " " ) :
                " "
            );

            if ( cur ) {
                j = 0;
                while ( (clazz = classes[j++]) ) {
                    //这一句是关键, 查找clazz是否之前就存在
                    //这里多亏了( " " + elem.className + " " )这句
                    //在首尾都加上了空格， 比如说'class1 class2' 这样是找不到的
                    //' class1 class2 '可以找到
                    if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
                        cur += clazz + " ";
                    }
                }
                elem.className = jQuery.trim( cur );

            }
        }
    }

    return this;
}
```


```js
cur = elem.nodeType === 1 && ( elem.className ?
                ( " " + elem.className + " " ).replace( rclass, " " ) :
                " "
            );
```

elem.className 之前是否有class

之前没有class的情况

```html
<div class=""></div>
<div></div>
```

`( " " + elem.className + " " ).replace( rclass, " " )`

rclass 为 `/[\t\r\n\f]/g` 包括字表符等

```html
<div class="class1  class2"></div>
```

上面打的是制表符， 看上去都是空格， 它们是不一样的， 所以需要把它们换成空格


### jQuery.fn.toggleClass( value, stateVal )

这个我们只讲下用法

```js
$('div').toggleClass('class1');
$('div').toggleClass('class1 class2');

//传true相当于addClass
//传false相当于removeClass
$('div').toggleClass('class1', true);
$('div').toggleClass('class1', false);

//删除并缓存class
$('div').toggleClass(false);
//恢复class
$('div').toggleClass(true);

```

### jQuery.fn.val(value)

#### hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];


valHooks有这么几个子项:

option select radio checkbox


然后，它要么是elem.type 要么是elem.nodeName.toLowerCase();

我们来看下type的情况

```html
<select name="" id=""></select>
<select name="" id="" multiple="multiple"></select>
<option value=""></option>
<input type="radio">
<input type="checkbox">
<script>
console.log($('select')[0].type);//select-one
console.log($('select')[1].type);//select-multiple
console.log($('option')[0].type);//undefined
console.log($('[type="radio"]')[0].type);//radio
console.log($('[type="checkbox"]')[0].type);//checkbox
</script>
```

#### valHooks.option.get

```js
get: function( elem ) {
    // attributes.value is undefined in Blackberry 4.7 but
    // uses .value. See #6932
    var val = elem.attributes.value;
    return !val || val.specified ? elem.value : elem.text;
}
```



```html
<option>111</option>
<script>
// 在大部分浏览器中，如果不给option设置vlaue，访问value会得到它的文本值
option.value;//111

//但在ie低版本中为空
//option.value;//''
</script>
```

如果不设置value, 在ie低版本中，elem.attributes.value为一个对象;
elem.attributes.value.specified为false

#### valHooks.select.get

关于select取值的问题, 当为多选的时候， 只能获取选择到的第一个值(chrome, firefox, ie, safari)

```html
<select name="" id="s1" multiple="multiple">
    <option value="01">01</option>
    <option value="02">02</option>
    <option value="03">03</option>
</select>
<button id="b1"></button>
<script>
var select = document.getElementById('s1');
var btn = document.getElementById('b1');
btn.onclick = function(){
   alert(select.value);
}  
</script>
```

不知道为什么要这么设计， jq中改变了这一些行为， 如果是多选，返回的是一个数组

源码:

```js
get: function( elem ) {
    //elem为select
    var value, option,
        options = elem.options,
        index = elem.selectedIndex,
        one = elem.type === "select-one" || index < 0,
        values = one ? null : [],
        max = one ? index + 1 : options.length,
        i = index < 0 ?
            max :
            one ? index : 0;

    // Loop through all the selected options
    for ( ; i < max; i++ ) {
        option = options[ i ];

        // IE6-9 doesn't update selected after form reset (#2551)
        // 在IE6-9中，form.reset之后， select.options[0].selected为false  
        // select.selectedIndex确为0
        if ( ( option.selected || i === index ) &&
                //jQuery.support.optDisabled表示option是否支持disabled属性
                ( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&

                ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

            // Get the specific value for the option
            value = jQuery( option ).val();

            // We don't need an array for one selects
            if ( one ) {
                return value;
            }

            // Multi-Selects return an array
            values.push( value );
        }
    }

    return values;
},
```

#### valHooks.select.set

```js
$('select').val(['11','22']);
```

可以传入一个数组

其实就是查找，option的值是否在传入的数组中，是的话就将selected设置为true

```js
option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0;
```

raido, checkbox的处理方式一样








