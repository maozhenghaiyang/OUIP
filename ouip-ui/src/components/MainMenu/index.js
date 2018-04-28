import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import classNames from 'classnames';
import styles from './index.less';

class MainMenu extends PureComponent {

  openFunction = (func) => {
    this.props.dispatch({type: 'global/openFunction', function: func});
  }

  selectMenu = (select, level) => {
    this.props.dispatch({type: 'global/selectMenu', select, level});
  }

  buildMenus = (menus, level,id) => {
    if (menus && menus.length > 0) {
      return menus.map(m => {
        
        const svg = m.childrens ? <Icon type="caret-right" className={styles.itemCaret} /> : null;
        const openTab = m.function ? () => this.openFunction(m.function) : null;
        const selectMenu = () => this.selectMenu(m, level);
        const cls = classNames(m.childrens ? styles.item : styles.leafItem,m.id===id?styles.selected:null);
        return (
          <div
            className={cls}
            key={m.id}
            onClick={openTab}
            onMouseOver={selectMenu}
            onFocus={selectMenu}
          >
            {/* eslint-disable-next-line */}
            <label>{`${m.sequence}`.padStart(3, '0')}
            </label>
            <span id={`${m.id}`}>{m.name}</span>
            {svg}
          </div>
        )
      })
    } else {
      return null;
    }
  }

  render() {
    const menus = [this.props.menuTree.menus].concat(this.props.menus)
    const {selectMenus} = this.props
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
          {
            menus.map((ms, index) => (
              <div className={styles.menuList}>
                {this.buildMenus(ms,index,selectMenus[index])}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default connect(({global}) => {
  return {menuTree: global.session.menuTree, menus: global.menus, selectMenus: global.selectMenus};
})(MainMenu);