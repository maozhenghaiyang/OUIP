import React from 'react';
import { Redirect, Switch, Route } from 'dva/router';
import styles from './UserLayout.less';

import { getRoutes } from '../utils/utils';

class UserLayout extends React.PureComponent {
   
  render() {
    const { routerData, match } = this.props;
    return (
      <div className={styles.container}>
        <Switch>
          {getRoutes(match.path, routerData).map(item => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
              ))}
          <Redirect exact from="/login" to="/login" />
        </Switch>
      </div>
    );
  }
}

export default UserLayout;
