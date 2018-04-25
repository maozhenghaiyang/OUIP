import React, { PureComponent } from 'react';
import styles from './index.less';

export default class MainMenu extends PureComponent {
 
  render() {
    const fontColor = '#000'
    return (
      <div className={styles.menuView}>
        <div className={styles.menuCategory}>
          <span>一级</span>
          <span>二级</span>
          <span>三级</span>
          <span>四级</span>
          <span>五级</span>
        </div>
        <div className={styles.menuListContainer}>
          <div className={styles.menuList}>
            <div className={styles.menuViewListItem} >
              {/* eslint-disable-next-line */}
              <label style={{color:`${fontColor}`}}> 11</label>
              <span style={{color:`${fontColor}`}}>菜单测试</span>
              <svg width="8" height="8" >
                <path d="M 0 0 V 8 L 3 4 z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
