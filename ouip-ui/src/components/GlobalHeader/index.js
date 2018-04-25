import React, { PureComponent } from 'react';
import { Icon,Badge} from 'antd';
import styles from './index.less';
import MainMenu from '../MainMenu'

export default class GlobalHeader extends PureComponent {
 
  render() {
    const {mainMenu} = this.props
    return (
      <div className={styles.header}>
        { mainMenu? <MainMenu />: ''}
        <Icon className={styles.trigger} type="bars" onClick={this.props.triggerSideMenu} />
        <div className={styles.right}>
          <Icon className={styles.trigger} type="bars" onClick={this.props.triggerMainMenu} />
          <Icon className={styles.trigger} type="user" onClick={this.toggle} />
          <span className={styles.time}>18:24</span>
          <Badge  className={styles.badge} count={10}>
            <Icon type="bell" className={styles.notice} />
          </Badge>
        </div>
      </div>
    );
  }
}
