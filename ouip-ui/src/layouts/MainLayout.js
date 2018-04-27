import React from 'react';
import { Layout, Tabs} from 'antd';
import { connect } from 'dva';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import styles from './MainLayout.less';

const {TabPane} = Tabs;
const { Content, Header, Footer } = Layout;

const content = (
  <div style={{flex: 'auto'}} >
    <iframe title="xxx" style={{width: '100%',minHeight: 'calc(100vh - 110px)', border: 0}}  src="https://www.bing.com" />
  </div> 
)

const panes = [
  { title: 'ABCDEFG', content, key: '1' },
];

@connect(({ global }) => {
  return {
    ui: global.ui,
  }
}
)
export default class MainLayout extends React.PureComponent {
 
  triggerMainMenu = () =>{
    this.props.dispatch({
      type: 'global/triggerMainMenu',
    });
  }

  triggerSideMenu = () =>{
    this.props.dispatch({
      type: 'global/triggerSideMenu',
    });
  }

  hidden =() => {
    this.props.dispatch({
      type: 'global/hidden',
    });
  }

  render() {
    const {ui:{sideMenu} } = this.props;
    const side = sideMenu ? <SiderMenu /> : null;
    return  (
      <Layout>
        { side }
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader mainMenu={this.props.ui.mainMenu}  triggerSideMenu={this.triggerSideMenu} triggerMainMenu={this.triggerMainMenu} />
          </Header>
          <Content onClick={this.hidden} >
            <div className={styles.closeTab} title="Close" />
            <Tabs activeKey="1" type="editable-card" tabPosition="bottom" >
              {panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable>{pane.content}</TabPane>)}
            </Tabs>
          </Content>
          <Footer style={{ padding: 0 }}>
            <GlobalFooter />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
