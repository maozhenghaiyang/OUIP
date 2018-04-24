import React, { Fragment } from 'react';
import { Layout, Icon} from 'antd';
import { connect } from 'dva';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import { getMenuData } from '../common/menu';

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

class BasicLayout extends React.PureComponent {
 
  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      notices,
      location,
    } = this.props;
    
    return  (
      <Layout>
        <SiderMenu
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          isMobile={false}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              currentUser={currentUser}
              fetchingNotices={fetchingNotices}
              notices={notices}
              collapsed={collapsed}
              isMobile={false}
              onNoticeClear={this.handleNoticeClear}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
            />
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
              content
          </Content>
          <Footer style={{ padding: 0 }}>
            <GlobalFooter
              links={[
                {
                  key: 'Pro 首页',
                  title: 'Pro 首页',
                  href: 'http://pro.ant.design',
                  blankTarget: true,
                },
                {
                  key: 'github',
                  title: <Icon type="github" />,
                  href: 'https://github.com/ant-design/ant-design-pro',
                  blankTarget: true,
                },
                {
                  key: 'Ant Design',
                  title: 'Ant Design',
                  href: 'http://ant.design',
                  blankTarget: true,
                },
              ]}
              copyright={
                <Fragment>
                  Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
                </Fragment>
              }
            />
          </Footer>
        </Layout>
      </Layout>
    );

    
  }
}

export default connect(({ user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(BasicLayout);
