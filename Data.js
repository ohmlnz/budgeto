import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import firebase from 'react-native-firebase';

import { months } from './data/months.js'
import { stylesData } from './css/data.js';
import { limits } from './data/limits.js';

const date = new Date();
const month = months[date.getMonth()];

export default class Data extends Component {
  state = {
    expenses: []
  }

  componentDidMount = () => {
    firebase.database().ref('expenses').orderByValue().on('value', (snapshot) => {
      const expenses = snapshot.val();
      this.setState({ expenses: expenses });
    });
  }

  render() {
    return (
      <View style={stylesData.container}>
        <Text style={stylesData.title}>Your expenses for {month}</Text>
        <FlatList
          data={this.state.expenses}
          renderItem={({item, index}) => 
            <Text>{item.date} | {item.label}: 
              <Text style={item.value > limits[item.label]? stylesData.exceeds : ''}>
                &nbsp;{item.value}$
              </Text>
            </Text> 
          }
          keyExtractor={(item, index) => index }
        />
      </View>
    );
  }
}