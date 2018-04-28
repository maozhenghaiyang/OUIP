import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import styles from './index.less';

class MainMenu extends PureComponent {
 
  openFunction =(func) => {
    this.props.dispatch({
      type: 'global/openFunction',
      function: func,
    });
  }

  render() {
    const {menuTree} = this.props;
    return (
      <div className={styles.menuView}>
        <div className={styles.menuCategory}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.menuListContainer}>
          <div className={styles.menuList}>
            {
              menuTree.menus.map(m=> {
                const svg = m.childrens ? <Icon type="caret-right" className={styles.itemCaret} /> : null;
                const openTab = m.function ? ()=> this.openFunction(m.function) : null;
                return (
                  <div className={m.childrens ? styles.item: styles.leafItem} key={m.id} onClick={openTab}>
                    {/* eslint-disable-next-line */}
                    <label>{`${m.sequence}`.padStart(3,'0')}</label>
                    <span>{m.name}</span>
                    {svg}
                  </div>
              )
            }
           )
          }
          </div>
          <div className={styles.menuList} />
          <div className={styles.menuList} />
          <div className={styles.menuList} />
          <div className={styles.menuList} />
        </div>
      </div>
    );
  }
}

export default connect(({ global }) => ({ menuTree: global.session.menuTree}))(MainMenu);