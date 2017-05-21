## 基本使用

```typescript jsx
<Modal 
    title="Basic Modal" 
    visible={true}
    onOk={handleOk} 
    onCancel={handleCancel}
        >
    <p>some contents...</p>
    <p>some contents...</p>
    <p>some contents...</p>
</Modal>
```

visible属性控制modal的显示或隐藏

onOk onCancel是两个回调函数 


一个完整的例子:

```js
import { Modal, Button } from 'antd';
class App extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open a modal dialog</Button>
        <Modal title="Basic Modal" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

