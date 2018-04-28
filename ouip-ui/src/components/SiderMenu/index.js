import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Layout, Menu} from 'antd';
import Ellipsis from '../Ellipsis'
import styles from './index.less';

const { Sider } = Layout;

const siderStyles = {position: 'absolute',top:'32px',minHeight:'calc(100vh - 75px)',maxHeight:'calc(100vh - 75px)',overflowY: 'auto'}

const menuStyles = { padding: '16px 0', width: '100%' }
class SiderMenu extends PureComponent {
  
  openFunction =(func) => {
    this.props.dispatch({
      type: 'global/openFunction',
      function: func,
    });
  }

  render() {
  const {menus,activeFunction} = this.props;
    return (
      <Sider style={siderStyles} className={styles.sider} >
        <Menu
          theme="dark"
          mode="inline"
          style={menuStyles}
          defaultSelectedKeys={[`${activeFunction}`]}
          onClick={({key})=>{
          this.openFunction(menus.filter(m=> (`${m.function.id}`===key))[0].function)
        }}
        >
          { menus.map((m)=>(<Menu.Item key={m.function.id}> <Ellipsis length={15} tooltip>{m.name}</Ellipsis></Menu.Item>)) }
        </Menu>
      </Sider>
    );
  }
};

export default connect(({ global }) => ({ menus: global.faqMenus, activeFunction: global.activeFunction}))(SiderMenu);