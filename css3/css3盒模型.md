# box-sizing
取值

content-box | border-box

### context-box(默认值)

css属性中width设置了内容高度

元素高度　＝　内容高度 + padding + border

元素高度　＝　内容高度 + padding + border


### border-box

css属性中width设置了元素的高度

内容的高度 =  元素高度　－　padding - border

内容的高度 =  元素高度　－　padding - border



# resize (缩放属性)
```css
/* Keyword values */
resize: none;
resize: both; /* 可以修改高度和宽度 */
resize: horizontal;　/* 只能修改高度 */
resize: vertical;　/* 只能修改宽度 */

```

必须加overflow属性


#　outline(外轮廓)
```
outline: [outline-color] || [outline-style] || [outline-width] || [outline-offset]
```


与border对比:
- outline不占用网页布局空间
- outline四边的都是一样的,不能像border一样单独设置
- border设置的边框只能向外扩展，outline可以通过设置outline-offset向内部创建轮廓


# -webkit-box-reflect(倒影)

只有webkit支持

三个参数：

- direction  方向     above|below|left|right;
- 距离
- 渐变（可选）


```css
img{
    -webkit-box-reflect: below 10px linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.6));
}
```


 