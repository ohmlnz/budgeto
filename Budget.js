import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'react-native-firebase';

import { stylesBudget } from './css/budget.js';

export default class Budget extends Component {
	state = {
		limits: {},
		total: 0
	}

  componentDidMount = () => {
	  firebase.database().ref('limits').orderByValue().on('value', (snapshot) => {
	    const limits = snapshot.val();
	    this.setState({ limits: limits });


		  {Object.keys(limits).map((key, index) => 
				this.setState({
					total: this.state.total + limits[key]
				})
			)}
	  });
  }

  render() {
  	const limits = this.state.limits;
    return (
      <View style={stylesBudget.container}>
      	<Text style={{ fontSize: 20, marginBottom: 15 }}>Current limits on budget:</Text>
      	<View>
	        {Object.keys(limits).map((key, index) => 
	   					<Text style={{ fontSize: 15, marginTop: 3 }} key={index}>{`${key}: ${limits[key]}$`}</Text>
					)}
					<Text style={{ fontWeight: 'bold', marginTop: 5 }}>Total: {this.state.total}</Text>
				</View>
      </View>
    );
  }
}