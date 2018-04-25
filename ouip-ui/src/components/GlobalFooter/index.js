import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default class Footer extends React.Component {
 
  render() {
    const clsString = classNames(styles.globalFooter,this.props.taskBar? styles.toogleOn: styles.toogleOff);
    return (
      <div className={clsString}  />
    );
  }

}  