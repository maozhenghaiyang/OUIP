import React, { PureComponent } from 'react';
import { Layout, Menu} from 'antd';
import styles from './index.less';

const { Sider } = Layout;

export default class SiderMenu extends PureComponent {
  
  render() {
  
    return (
      <Sider
        style={{position: 'absolute',top:'32px',minHeight:'calc(100vh - 64px)'}}
        className={styles.sider}
      >
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          onOpenChange={this.handleOpenChange}
          style={{ padding: '16px 0', width: '100%' }}
        >
          <Menu.Item key="1">常用菜单1</Menu.Item>
          <Menu.Item key="2">常用菜单2</Menu.Item>
          <Menu.Item key="3">常用菜单3</Menu.Item>
          <Menu.Item key="4">常用菜单4</Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
