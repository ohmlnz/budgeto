import React, { PureComponent } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import HomeScreen from './HomeScreen';
import Data from './Data';
import Budget from './Budget';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};


export default class TabViewExample extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: 'add', title: 'Add' },
      { key: 'current', title: 'Current' },
      { key: 'budget', title: 'Budget' }
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => (
    <TabBar {...props} 
      style={{ backgroundColor: '#898c8e' }} 
      indicatorStyle={{ backgroundColor: '#5b5b5b' }} 
    /> );

  _renderScene = SceneMap({
    add: HomeScreen,
    current: Data,
    budget: Budget
  });

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});