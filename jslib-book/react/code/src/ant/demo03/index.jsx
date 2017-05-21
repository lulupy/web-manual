import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import 'antd/dist/antd.css';
class App extends React.Component {
  state = {
    collapsed: false,
    mode: 'inline',
  }

  onCollapse = (collapsed) => {
     console.log(collapsed);
     this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  render() {
    return (
        <Layout>
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{height: '360px'}}>
                <Menu 
                    theme="dark"
                    mode={this.state.mode}
                >
                    <Menu.Item key="1">Tom</Menu.Item>
                    <Menu.Item key="2">Bill</Menu.Item>
                    <Menu.Item key="3">Alex</Menu.Item>
                </Menu>
            </Sider>
        </Layout>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))