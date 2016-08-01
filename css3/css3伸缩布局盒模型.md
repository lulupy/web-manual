http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html


<!-- # 弹性盒模型
- 注意在使用弹性盒模型的时候 父元素必须要加display:box 或 display:inline-box
    + 注意区别（设置box表现的像block, ）
- Box-orient 定义盒模型的布局方向（定义在父元素上）
    + Horizontal 水平显示
    + vertical 垂直方向
- box-direction 元素排列顺序（定义在父元素上）
    + Normal 正序
    + Reverse 反序
- box-ordinal-group 设置元素的具体位置（定义在子元素上）
    + 相当于设置了优先级, 一个设置３，　一个设置６，６肯定排在３的前面


－　Box-flex 定义盒子的弹性空间（定义在子元素上）
　　＋　子元素的尺寸=盒子的尺寸*子元素的box-flex属性值 / 所有子元素的box-flex属性值的和 
－　box-pack 对盒子富裕的空间进行管理（定义在父元素上）
    ＋　Start 所有子元素在盒子左侧显示，富裕空间在右侧
    ＋　End 所有子元素在盒子右侧显示，富裕空间在左侧
    ＋　Center 所有子元素居中
    ＋　Justify 富余空间在子元素之间平均分布

－　box-align 在垂直方向上对元素的位置进行管理（定义在父元素上）
    ＋　Star 所有子元素在据顶
    ＋　End 所有子元素在据底
    ＋　Center 所有子元素居中 -->