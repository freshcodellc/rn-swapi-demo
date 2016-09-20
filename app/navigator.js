import React, { Component } from 'react';
import SwapiDemo from './SwapiDemo';
import PersonDetail from './components/PersonDetail';
import MainRouter from './router';

import {
  Navigator,
  BackAndroid
} from 'react-native';

class MainNavigator extends Component {
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress',
      this.handleBackAndroid.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress',
      this.handleBackAndroid.bind(this));
  }

  handleBackAndroid() {
    if (!this.props.test.isTesting) {
      this.router.pop();
    }
    return true;
  }

  renderScene(route, navigator) {
    this.router = this.router || new MainRouter(navigator);
    if (route.component) {
      return React.createElement(route.component, Object.assign({}, route.props,
        {
          ref: view => this[route.name] = view,
          router: this.router,
        }
      ));
    }
  }

  configureScene(route, routeStack) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    if (route.transition) return Navigator.SceneConfigs[route.transition];
    else return Navigator.SceneConfigs.FloatFromRight;
  }

  render() {
    return (
        <Navigator
          ref={view => this.navigator = view}
          initialRoute={{
            title: 'Dashboard',
            component: SwapiDemo,
            index: 0
          }}
          configureScene={this.configureScene.bind(this)}
          renderScene={this.renderScene.bind(this)}
          />
    );
  }
};

export default MainNavigator;
