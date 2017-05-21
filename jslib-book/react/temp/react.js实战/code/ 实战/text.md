### 将静态文件改成组件

```
var StudentApp = React.createClass({
  render: function() {
    return (
        <div className="container">
            <h1>学员成信息表</h1>
            <div className="bs-example">
                <div className="form-group">
                    <label>按性别筛选</label>
                    <select className="form-control">
                        <option value="all">all</option>
                        <option value="1">男</option>
                        <option value="0">女</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>按名字筛选</label>
                    <input type="text" className="form-control" placeholder="请输入名字" />
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>年龄</th>
                            <th>身高（cm）</th>
                            <th>体重（kg）</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="tb">
                        <tr>
                            <td>aaa</td>
                            <td>女</td>
                            <td>18</td>
                            <td>165</td>
                            <td>45</td>
                            <td><a href="javascript:;">删除</a> </td>
                        </tr>
                        <tr>
                            <td>bbb</td>
                            <td>男</td>
                            <td>35</td>
                            <td>180</td>
                            <td>80</td>
                            <td><a href="javascript:;">删除</a> </td>
                        </tr>
                        <tr>
                            <td>ccc</td>
                            <td>女</td>
                            <td>22</td>
                            <td>171</td>
                            <td>60</td>
                            <td><a href="javascript:;">删除</a> </td>
                        </tr>
                        <tr>
                            <td>ddd</td>
                            <td>男</td>
                            <td>26</td>
                            <td>175</td>
                            <td>70</td>
                            <td><a href="javascript:;">删除</a> </td>
                        </tr>
                        <tr>
                            <td>bbb</td>
                            <td>女</td>
                            <td>18</td>
                            <td>170</td>
                            <td>50</td>
                            <td><a href="javascript:;">删除</a> </td>
                        </tr>
                        <tr>
                            <td>ddd</td>
                            <td>女</td>
                            <td>38</td>
                            <td>166</td>
                            <td>50</td>
                            <td><a href="javascript:;">删除</a> </td>
                        </tr>
                        <tr>
                            <td>ccc</td>
                            <td>男</td>
                            <td>30</td>
                            <td>175</td>
                            <td>65</td>
                            <td><a href="javascript:;">删除</a> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>   
    );
  }
});

ReactDOM.render(
  <StudentApp />,
  document.getElementById('student-app')
);
```

### 将主组件拆分成更小的组件

将主组件拆分成更小的组件，方便代码的阅读与维护

这里我我们将学生信息展示的部分，单独写成组件，取名为StudentInfoComponent


```
var StudentApp = React.createClass({
  render: function() {
    return (
        <div className="container">
            <h1>学员成信息表</h1>
            <div className="bs-example">
                ....
            </div>

            <StudentInfoComponent/>
            
        </div>   
    );
  }
});

var StudentInfoComponent = React.createClass({
    render: function(){
        return (
            <div className="table-responsive">
                ...
            </div>
        );
    } 
});

ReactDOM.render(
  <StudentApp />,
  document.getElementById('student-app')
);
```
### 使用数据渲染

```
var data = [
    {stName:"aaa",gender:"女",age:18,height:165,weigth:45,_id:2},
    {stName:"bbb",gender:"男",age:35,height:180,weigth:80,_id:0},
    {stName:"ccc",gender:"女",age:22,height:171,weigth:60,_id:6},
    {stName:"ddd",gender:"男",age:26,height:175,weigth:70,_id:1},
    {stName:"bbb",gender:"女",age:18,height:170,weigth:50,_id:3},
    {stName:"ddd",gender:"女",age:38,height:166,weigth:50,_id:4},
    {stName:"ccc",gender:"男",age:30,height:175,weigth:65,_id:5}
]
```


```
var StudentApp = React.createClass({
  render: function() {
    return (
        <div className="container">
            ...
            <StudentInfoComponent studentData={data}/>
            
        </div>   
    );
  }
});
var StudentInfoComponent = React.createClass({
    render: function(){
        var list = this.props.studentData;
        return (
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                       <tr>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>年龄</th>
                            <th>身高（cm）</th>
                            <th>体重（kg）</th>
                            <th>操作</th>
                        </tr> 
                    </thead>
                    <tbody id="tb">
                        {
                            list.map(function(item, i){
                                return (
                                    <tr key="{i}">
                                        <td>{item.stName}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.age}</td>
                                        <td>{item.height}</td>
                                        <td>{item.weigth}</td>
                                        <td><a href="javascript:;">删除</a> </td>
                                    </tr>
                                )
                            })
                        }                        
                        
                    </tbody>
                </table>
            </div>
        );
    } 
});
```

注意用数组的map方法， 不用forEach方法， forEach返回值，标示是否结束循环而不是改变数组

### 通过改变状态来过滤学生

每次更改状态都会重新渲染页面




### 删除学生

#### 子组件和父级组件通信

我们使用pubsub(发布订阅模式)在子组件中改变父组件的状态

首先我们需要倒入pubsub.js

```html
<script src="http://cdn.bootcss.com/pubsub-js/1.5.4/pubsub.js"></script>
```

订阅在父组件, 在组件渲染完成之后订阅，也就是生命周期的componentDidMount中

```
componentDidMount:function(){
        var self = this;
        PubSub.subscribe("delStudent",function(evName,_id){
            var list = self.state.list;
            _id = parseInt(_id);
            list = list.filter(function(item, i){
                console.log(item._id, _id, item._id==_id)
                return item._id!=_id;
            })
            self.setState({list: list});
        }); 
  },
```

发布在子组件中， 相当于触发事件
```
<a href="javascript:;" onClick={self.delStudentHandle} data-id={item._id} >删除</a>
<script type="text/babel">
delStudentHandle: function(ev){
    var _id = ev.target.dataset.id;        
    PubSub.publish("delStudent",_id);
}    
</script>
```

在这个地方，我是用的dataset来获取id, 更好的做法封装一个StudentItem组件，
每个组件实例都保存有相应的状态，更方便获取id







