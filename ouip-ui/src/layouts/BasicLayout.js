import React from 'react';
import { Layout, Tabs } from 'antd';
import { connect } from 'dva';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import { getMenuData } from '../common/menu';
import styles from './BasicLayout.less'

const {TabPane} = Tabs;
const { Content, Header, Footer } = Layout;

const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);


const panes = [
  { title: '首页', content: <div style={{minHeight: 'calc(100vh - 124px)'}} >111</div> , key: '1' },
];

@connect(({ global }) => {
  return {
    ui: global.ui,
  }
}
)
export default class BasicLayout extends React.PureComponent {
 
  triggerMainMenu = () =>{
    this.props.dispatch({
      type: 'global/trigger',
      trigger: 'mainMenu',
    });
  }


  triggerSideMenu = () =>{
    this.props.dispatch({
      type: 'global/trigger',
      trigger: 'sideMenu',
    });
  }

  triggerTaskBar = () =>{
    this.props.dispatch({
      type: 'global/trigger',
      trigger: 'taskBar',
    });
  }

  reset =() => {
    this.props.dispatch({
      type: 'global/reset',
    });
  }

  render() {
    const {
      location,
    } = this.props;
    // const sideMenu = ui.sideMenu ? <SiderMenu menuData={getMenuData()} collapsed={false} location={location} />: <div />;
    return  (
      <Layout>
        {
          this.props.ui.sideMenu?<SiderMenu menuData={getMenuData()} collapsed={false} location={location} />: ''
         }
        
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader mainMenu={this.props.ui.mainMenu}  triggerSideMenu={this.triggerSideMenu} triggerMainMenu={this.triggerMainMenu} />
          </Header>
          <Content onClick={this.reset} >
            <Tabs
              onChange={(activeKey)=>{
                console.log(activeKey)
              }}
              hideAdd
              activeKey="1"
              type="editable-card"
              tabPosition="bottom"
            >
              {panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable>{pane.content}</TabPane>)}
            </Tabs>
          </Content>
          <Footer style={{ padding: 0 }}>
            <GlobalFooter taskBar={this.props.ui.taskBar} triggerTaskBar={this.triggerTaskBar} />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
