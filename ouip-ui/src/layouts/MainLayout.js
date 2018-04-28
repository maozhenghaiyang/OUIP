import React from 'react';
import { Layout, Tabs, Icon} from 'antd';
import { connect } from 'dva';
import GlobalHeader from '../components/GlobalHeader';
// import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import styles from './MainLayout.less';

const {TabPane} = Tabs;
const { Content, Header} = Layout;

const panelStyles = {width: '100%',minHeight: 'calc(100vh - 86px)',marginBottom:'5px', border: 0};

@connect(({ global }) => {
  return {
    ui: global.ui,
    functions: global.functions,
    activeFunction: global.activeFunction,
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

  closeCurrentTab = () => {
    this.props.dispatch({
      type: 'global/closeFunction',
      id: `${this.props.activeFunction}`,
    });
  }

  remove= (targetKey) => {
    this.props.dispatch({
      type: 'global/closeFunction',
      id: targetKey,
    });
  }

  changeTab = (targetKey) => {
    this.props.dispatch({
      type: 'global/activeFunction',
      id: targetKey,
    });
  }

  content= () => {
    const {activeFunction, functions} = this.props;
    const active = functions.filter((f)=>`${f.id}` === activeFunction)[0];
    if(functions && functions.length>0) {
      return (
        <div>
          {active.closable ? <div className={styles.closeTab} title="Close" onClick={this.closeCurrentTab} />:null}
          <Tabs 
            activeKey={`${activeFunction}`} 
            onChange={this.changeTab}
            type="line"
            tabPosition="bottom"
            hideAdd
            onEdit={this.onEdit}
          >
            {functions.map((f, index) => (
              <TabPane tab={<span>{f.name}{index!==0?<Icon type="close" onClick={()=>this.remove(`${f.id}`)}  />:null}</span>} key={`${f.id}`} closable={f.closable}>
                <iframe title={f.name}  style={panelStyles} src={f.action} />
              </TabPane>
))}
          </Tabs>
        </div>
      );
    } else {
      return <div className={styles.welcome} />
    }
  }

  render() {
    const {ui:{sideMenu}} = this.props;
    const side = sideMenu ? <SiderMenu /> : null;
    
    const content = this.content();
    return  (
      <Layout>
        { side }
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader mainMenu={this.props.ui.mainMenu}  triggerSideMenu={this.triggerSideMenu} triggerMainMenu={this.triggerMainMenu} />
          </Header>
          <Content onClick={this.hidden}>
            {content}
          </Content>
          {/* <Footer style={{ padding: 0 }}>
            <GlobalFooter />
          </Footer> */}
        </Layout>
      </Layout>
    );
  }
}
