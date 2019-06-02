import { NavigationActions, StackActions } from 'react-navigation'

let _container; // eslint-disable-line

function setContainer(container) {
  _container = container
}

function reset(routeName, params = {}) {
  _container.dispatch(StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        type: 'Navigation/NAVIGATE',
        routeName,
        params,
      }),
    ],
  }))
}

function navigate(routeName, params = {}, key = null) {
  _container.dispatch(NavigationActions.navigate({
    type: 'Navigation/NAVIGATE',
    // Add key for prevent multiple tap on same screen
    key: key || routeName,
    routeName,
    params,
  }))
}

function goBack() {
  return _container.dispatch(NavigationActions.back())
}


const navigator = {
  setContainer,
  navigate,
  reset,
  goBack,
}

export default navigator
