import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';

import { months } from './data/months.js'
import { stylesData } from './css/data.js';
import { limits } from './data/limits.js';

const date = new Date();
const month = months[date.getMonth()];

export default class Data extends Component {
  state = {
    expenses: [],
    hidden: true,
    total: 0
  }

  componentDidMount = () => {
    firebase.database().ref('expenses').orderByValue().on('value', (snapshot) => {
      const expenses = snapshot.val();
      this.setState({ expenses: expenses });

      {expenses.map((e, i) => 
        this.setState({
          total: this.state.total + e.value
        })
      )};
    });
  }

  displayDetails = () => {
    this.setState({
      hidden: !this.state.hidden //display one row at a time?
    });
  }

  removeDetail = (i) => {
    //alert(i)
  }

  render() {  
    return (
      <View style={stylesData.container}>
        <Text style={stylesData.title}>Your expenses for {month}</Text>
        <FlatList
          style={{ display: `${this.state.expenses == null? 'none' : 'flex'}`, flexGrow: 0}}
          data={this.state.expenses}
          renderItem={({item, index}) => 
            <View>
              <Text style={stylesData.expense}>{item.date} | {item.label}: 
                <Text style={item.value > limits[item.label]? stylesData.exceeds : ''}>
                  &nbsp;{item.value}$
                </Text>
              </Text>

              <View style={{ display: `${this.state.hidden? 'none' : 'flex'}`, marginLeft: 5}}> 
                {item.detail.map((d, i) => 
                  <Text style={{ marginTop: 5 }} key={i}>{d.date} - {d.description}: {d.value}$ <Text onPress={() => this.removeDetail(i)}>X</Text></Text>
                )}
              </View>
              <View style={{ width: 170, borderBottomColor: '#77777750', borderBottomWidth: 1, alignSelf: 'center', marginTop: 10, marginBottom: 10 }}></View>
            </View> 
          }
          keyExtractor={(item, index) => index }
          extraData={this.state}
        />

        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Total: {this.state.total}</Text>

        <TouchableOpacity style={stylesData.details} onPress={this.displayDetails}>
          <Text style={stylesData.details_text}>{this.state.hidden? `${'Details'.toUpperCase()}` : `${'Hide'.toUpperCase()}`}</Text>
        </TouchableOpacity>

        <Text>{this.state.expenses == null? 'There are currently no expenses :)' : ''}</Text>
      </View>
    );
  }
}