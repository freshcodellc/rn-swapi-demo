import SwapiDemo from './SwapiDemo';
import PersonDetail from './components/PersonDetail';


export default class MainRouter {
  constructor(navigator) {
    this.navigator = navigator;
  }

  push(props, route) {
    const routesList = this.navigator.getCurrentRoutes();
    const nextIndex = routesList[routesList.length - 1].index + 1;
    route.props = props;
    route.index = nextIndex;
    this.navigator.push(route);
  }

  pop() {
    this.navigator.pop();
  }

  toHome(transition = 'FloatFromLeft') {
    this.push({}, {
      title: 'Demo',
      component: SwapiDemo,
      transition: transition
    })
  }

  toPersonDetail(url, transition = 'FloatFromRight') {
    this.push({url}, {
      title: 'Person Detail',
      component: PersonDetail,
      transition: transition
    })
  }
}
