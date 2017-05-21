# Echarts

官网: http://echarts.baidu.com/
版本:  3.5.0

兼容性: 大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等）


## 安装

1. 从官网下载界面选择你需要的版本下载，根据开发者功能和体积上的需求，我们提供了不同打包的下载，如果你在体积上没有要求，可以直接下载完整版本。开发环境建议下载源代码版本，包含了常见的错误提示和警告。

2. npm安装

```js
npm install echarts --save
```

## 入门实例

```html
<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
<div id="main" style="width: 600px;height:400px;"></div>
<script src="lib/echarts.js"></script>
<script>


var myChart = echarts.init(document.getElementById('main'));
var option = {
    title: {
        text: 'EChart 入门示例'
    },
    tooltip: {},
    //说明
    legend: {
        data: ['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]

};

myChart.setOption(option);
</script>
```

通过 `echarts.init` 方法初始化一个 echarts 实例并通过 `setOption` 方法生成一个简单的柱状图



